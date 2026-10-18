import { generateInterviewreport } from "../service/ai.service.js";
import { upload } from "../middlewares/file.middleware.js";
import Pdfparser from "pdf-parse";
import interviewModel from "../models/InterviewModel.js";

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
  // parse the pdf file and get the text content of the resume.
  const resumeContent = await Pdfparser(resumefile.buffer);

  const { jobDescription, selfdescription } = req.body;
  if (!resumefile || !jobDescription || !selfdescription) {
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
  res.status(200).json({ report: interviewreportbyai });
  
const interviewreport=await interviewModel.create({
  user:req.user.id,
  jobDescription,
  resume:resumeContent.text,
  selfdescription,
  ...interviewreportbyai
})
res.status(200).json({report:interviewreport});
};
