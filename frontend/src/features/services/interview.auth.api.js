import axios from "axios";

// these are the api for the genertate report of Interview 
export async function generateInterviewreport({jobdescription,selfdescription,resumefile})
{
    
 // create the form data because the data from frontend is send in form of file to backend so create the form data.
    const formData = new FormData()
    formData.append("jobDescription", jobdescription)
    formData.append("selfDescription", selfdescription)
    formData.append("resume", resumefile)

    const response = await api.post("/api/interviews/generate-report", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return response.data

}


export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/api/interviews/report/${interviewId}`)

    return response.data
}
