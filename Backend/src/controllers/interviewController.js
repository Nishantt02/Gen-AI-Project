import { generateInterviewreport } from "../service/ai.service.js";
import { PDFParse } from "pdf-parse";
import interview from '../models/InterviewModel.js'

export const createInterviewReport = async (req, res) => {
  try {
    // frontend will send the job description, resume and self-description in the request body
    if (
      !req.body ||
      !req.body.jobDescription ||
      !req.body.resume ||
      !req.body.selfdescription
    ) {
      return res
        .status(400)
        .json({
          message:
            "Missing required fields: jobDescription, resume, selfdescription",
        });
    }
    const report = await generateInterviewreport(req.body ?? {});
    console.log("\n========== GENERATED INTERVIEW REPORT ==========\n");
    console.log(JSON.stringify(report, null, 2));
    console.log("\n========== END INTERVIEW REPORT ==============\n");
    return res.status(200).json({ report });
  } catch (error) {
    console.error("\n========== INTERVIEW REPORT ERROR ============");
    console.error(error?.stack || error);
    console.error("==============================================\n");
    return res
      .status(400)
      .json({
        message: error.message || "Could not generate interview report.",
      });
  }
};

// frontend will send the job description, resume and self-description in the request body

export const generateInterviewReportController = async (req, res) => {
  // check if the required files are present in the request or not
  const resumefile = req.file;

    if (!resumefile) {
       return res.status(400).json({
       message: "Resume file is required",
      });
    }
  // parse the pdf file and get the text content of the resume.
  // const resumeContent = new PDFParse(resumefile.buffer);
  const resumeContent=await (new PDFParse(Uint8Array.from(req.file.buffer))).getText();
  if(!resumeContent.text || !resumeContent.text.trim()){
    return res.status(400).json({message:"resume file is empty or Invalid"});
  }

  const { jobDescription, selfdescription } = req.body;
  if (!jobDescription || !selfdescription) {
    {
      return res
        .status(400)
        .json({
          message:
            "Missing required files:jobDescription,selfdescription,resume",
        });
    }
  }
  const interviewreportbyai = await generateInterviewreport({
    resume: resumeContent.text,
    jobDescription,
    selfdescription,
  });

const interviewreport=await interview.create({
  users:req.user.id,
  jobDescription,
  resume:resumeContent.text,
  selfdescription,
  ...interviewreportbyai
})
res.status(200).json({message:"interview report generated successfully",report:interviewreport});

}