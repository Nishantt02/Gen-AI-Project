import axios from "axios";
import { authRequestConfig } from "./authToken.js";

// Generate interview report
export async function generateInterviewreport({
  jobdescription,
  selfdescription,
  resume,
}) {
  if (!(resume instanceof File)) {
    throw new Error(
      "Please select a resume file before generating the report.",
    );
  }

  const formData = new FormData();

  formData.append("jobDescription", jobdescription);
  formData.append("selfdescription", selfdescription);
  formData.append("resume", resume, resume.name);
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/interviews/generate-report`,
    formData,
    authRequestConfig(),
  );

  return response.data;
}

// Get interview report by ID
export const getInterviewReportById = async (interviewId) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/interviews/getreport/${interviewId}`,
    authRequestConfig(),
  );

  return response.data;
};

// Get all interview reports for the current user which is loggined
export const getInterviewbyuser = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/interviews/`,
    authRequestConfig(),
  );

  return response.data;
};

export const getresumepdf = async (interviewId) => {
  if (!interviewId) {
    throw new Error("An interview report ID is required to download the PDF.");
  }

  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/interviews/resume/pdf/${interviewId}`,
    {},
    {
      responseType: "blob",
      ...authRequestConfig(),
    },
  );
  return response.data;
}
