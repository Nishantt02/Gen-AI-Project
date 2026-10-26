import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { z } from "zod";
import puppeteer from "puppeteer";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.google_genAI_api_key });

// this is the Zod schema for the report that helps validate the AI service's output
// Checks whether the returned data satisfies your backend's validation rules or not.

const reportSchema = z.object({
  technicalQuestions: z.array(
    z.object({
      question: z.string().min(1),
      intention: z.string().min(1),
      answers: z.string().min(1),
    }),
  ),
  behavioralQuestions: z.array(
    z.object({
      question: z.string().min(1),
      intention: z.string().min(1),
      answers: z.string().min(1),
    }),
  ),
  skillGaps: z.array(
    z.object({
      skills: z.string().min(1),
      severity: z.enum(["low", "medium", "high"]),
    }),
  ),

  matchScore: z.number().min(0).max(100),
  preparationPlan: z.array(
    z.object({
      day: z.number().int().nonnegative(),
      focus: z.string().min(1),
      tasks: z.string().min(1),
    }),
  ),
});

// this is the JSON schema for the report that
//  helps the AI service to generate the report in a structured format
const reportJsonSchema = {
  type: "OBJECT",
  properties: {
    technicalQuestions: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          question: { type: "STRING" },
          intention: { type: "STRING" },
          answers: { type: "STRING" },
        },
        required: ["question", "intention", "answers"],
      },
    },
    behavioralQuestions: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          question: { type: "STRING" },
          intention: { type: "STRING" },
          answers: { type: "STRING" },
        },
        required: ["question", "intention", "answers"],
      },
    },
    skillGaps: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          skills: { type: "STRING" },
          severity: { type: "STRING", enum: ["low", "medium", "high"] },
        },
        required: ["skills", "severity"],
      },
    },
    preparationPlan: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          day: { type: "INTEGER" },
          focus: { type: "STRING" },
          tasks: { type: "STRING" },
        },
        required: ["day", "focus", "tasks"],
      },
    },

    matchScore: {
      type: "NUMBER",
    },
  },
  required: [
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "preparationPlan",
    "matchScore",
  ],
};

// this will generate the Interview report
// using the Google GenAI API and validate the output against the Zod schema
export async function generateInterviewreport({
  jobDescription,
  resume,
  selfdescription,
}) {
  if (!process.env.google_genAI_api_key) {
    throw new Error("Missing google_genAI_api_key in the backend environment.");
  }
  for (const [name, value] of Object.entries({
    jobDescription,
    resume,
    selfdescription,
  })) {
    if (typeof value !== "string" || !value.trim()) {
      throw new Error(`${name} is required.`);
    }
  }

  const prompt = `Generate an interview preparation report from the information below. Return all four requested sections, with clear sample answers.\n\nJob Description:\n${jobDescription}\n\nResume:\n${resume}\n\nSelf-description:\n${selfdescription}`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: reportJsonSchema,
    },
  });

  console.log(response.text);
  // here we get the response in json format and
  //  validate it against the Zod schema to ensure it meets our backend's requirements.

  if (!response.text)
    throw new Error("The AI service returned an empty report.");
  let parsed;
  try {
    // convert the json into the javascript object using the parse method
    parsed = JSON.parse(response.text);
  } catch {
    throw new Error(
      "The AI service returned invalid JSON for the interview report.",
    );
  }
  return reportSchema.parse(parsed);
  // here it return the parsed js object.
}
console.log(
  "AI service initialized; interview reports can be generated through POST /api/interviews/generate.",
);



// it is used to generate the pdf from html generate from the ai
export const generatePdfFromHtml = async (html) => {
  let browser;

  try {
    // Validate the HTML input
    if (typeof html !== "string" || !html.trim()) {
      throw new Error("HTML content is missing or invalid");
    }

    // Launch browser
    browser = await puppeteer.launch({
      headless: true
    });

    const page = await browser.newPage();

    // Set HTML content
    await page.setContent(html, {
      waitUntil: "networkidle0"
    });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true
    });

    return pdfBuffer;

  } catch (error) {
    console.error("PDF generation failed:", error);
    throw error;

  } finally {
    if (browser) {
      await browser.close();
    }
  }
}


// create the api of the which takes the resume in pdf format,job description and self description
//  and returns the interview report in json format.


export async function GenerateresumePDF({
  resume,
  jobDescription,
  selfdescription
}) {
  const resumeJsonSchema = {
    type: "OBJECT",
    properties: {
      html: { type: "STRING" },
    },
    required: ["html"],
  };

const prompt = `
Generate a professional, ATS-friendly resume in HTML.

Resume:
${resume}

Self Description:
${selfdescription}

Job Description:
${jobDescription}

Requirements:
- Return a JSON object containing a single field named "html".
- The html field must contain a complete HTML document.
- Include HTML, head, and body elements.
- Use simple, professional CSS.
- Keep the resume to approximately 1-2 pages.
- Do not invent skills, qualifications, or experience.
- Do not wrap the HTML in Markdown code fences.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: resumeJsonSchema
    }
  });

  // Step 1: Check Gemini's response
  // console.log("Gemini response:", response.text);

  if (!response.text) {
    throw new Error("Gemini returned an empty response");
  }

  // Step 2: Parse the JSON response
  let jsonContent;

  try {
    jsonContent = JSON.parse(response.text);
  } catch (error) {
    console.error("JSON parsing error:", error);
    throw new Error("Gemini returned invalid JSON");
  }



  if (
    typeof jsonContent.html !== "string" ||
    !jsonContent.html.trim()
  ) {
    throw new Error(
      "Gemini response does not contain valid HTML"
    );
  }

  // Step 4: Generate the PDF
  const pdfBuffer = await generatePdfFromHtml(jsonContent.html);

  return pdfBuffer;
}


