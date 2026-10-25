import { useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { InterviewContext } from "../interview.context.jsx";
import {
  generateInterviewreport,
  getInterviewReportById,
  getInterviewbyuser,
} from "../services/interview.auth.api.js";


export const useInterview = () => 
    {
  const { loading, setloading, report, setReport, reports, setReports } = useContext(InterviewContext);

// the main work useparams is to read the url parameter like interviewid
  const { interviewId } = useParams();

  const generatereport = async ({jobdescription, resume, selfdescription}) => {
    try {
      setloading(true);
      const data = await generateInterviewreport({
        jobdescription,
        resume,
        selfdescription,
      });
    setReport(data.report)
    return data.report;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setloading(false);
    }
  };


   const getInterviewbyid = async (interviewid) => {
      try {
        setloading(true);
        const data=await getInterviewReportById(interviewid);
        const savedReport = data.Interviewreport;
        setReport(savedReport);
        return savedReport;
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setloading(false);
      }
  }

  const Interviewbyuser = useCallback(async () => {
    try {
      setloading(true);

      const data = await getInterviewbyuser();

      const userReports = data.interviewReports ?? [];

      setReports(userReports);

      return userReports;
    } catch (error) {
      console.error(
        "Failed to fetch user reports:",
        error.response?.data || error.message
      );

      setReports([]);
      throw error;
    } finally {
      setloading(false);
    }
  }, [setReports, setloading]);
  useEffect(()=>{
    if (interviewId && report?._id !== interviewId) {
      getInterviewbyid(interviewId).catch(() => {});
    }
  }, [interviewId, report?._id])

  return({loading, setloading, report, setReport, reports, setReports,generatereport,getInterviewbyid,Interviewbyuser});
};
