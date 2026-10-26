import axios from "axios";

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
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication token not found. Please log in again.");
  }

  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/interviews/generate-report`,
    formData,
    { withCredentials: true },
  );

  return response.data;
}

// Get interview report by ID
export const getInterviewReportById = async (interviewId) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/interviews/getreport/${interviewId}`,
    { withCredentials: true },
  );

  return response.data;
};

// Get all interview reports for the current user which is loggined
export const getInterviewbyuser = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/interviews/`,
    { withCredentials: true },
  );

  return response.data;
};
