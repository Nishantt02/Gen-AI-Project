import { generateInterviewreport } from "../service/ai.service.js";
import { PDFParse } from "pdf-parse";
import interview from "../models/InterviewModel.js";

export const createInterviewReport = async (req, res) => {
  try {
    // frontend will send the job description, resume and self-description in the request body
    if (
      !req.body ||
      !req.body.jobDescription ||
      !req.body.resume ||
      !req.body.selfdescription
    ) {
      return res.status(400).json({
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
    return res.status(400).json({
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
  // parse the pdf file and get the text content of the resume.means convert the pdf file into the text format and store it in the variable resumeContent
  const resumeContent = await new PDFParse(
    Uint8Array.from(req.file.buffer),
  ).getText();
  if (!resumeContent.text || !resumeContent.text.trim()) {
    return res.status(400).json({ message: "resume file is empty or Invalid" });
  }

  const { jobDescription, selfdescription } = req.body;
  if (!jobDescription || !selfdescription) {
    {
      return res.status(400).json({
        message: "Missing required files:jobDescription,selfdescription,resume",
      });
    }
  }
  const interviewreportbyai = await generateInterviewreport({
    resume: resumeContent.text,
    jobDescription,
    selfdescription,
  });

  const interviewreport = await interview.create({
    users: req.user.id,
    jobDescription,
    resume: resumeContent.text,
    selfdescription,
    ...interviewreportbyai,
  });
  res
    .status(200)
    .json({
      message: "interview report generated successfully",
      report: interviewreport,
    });
};

// controller to get the Interview report by the Interview id of the spesfic user
export const getInterviewreport = async (req, res) => {
  
  const { interviewId } = req.params;
  if (!interviewId) {
    res.status(400).json({ message: "No interview report found" });
  }
  const Interviewreport = await interview.findOne({
    _id: interviewId,
    user: req.user._id,
  });

  if (!Interviewreport) {
    res.status(404).json({ message: "No Interview report found here" });
  }
  res
    .status(200)
    .json({
      message: "Interview report generate successfully",
      Interviewreport,
    });
};

// controller to get the Interview report of all the loggined user
export const getAllInterviewReportsController = async (req, res) => {
  const interviewReports = await interview
    .find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
    );

  res.status(200).json({
    message: "Interview reports fetched successfully.",
    interviewReports,
  });
};
