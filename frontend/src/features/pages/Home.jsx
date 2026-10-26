import React, { useState, useRef,useEffect } from "react";
import "../style/home.scss";
import { useInterview } from "../hooks/UserInterview.js";
import { useNavigate } from "react-router-dom";

function Home() {
  const { loading, generatereport, reports, Interviewbyuser } = useInterview();
  const [jobdescription, setJobdescription] = useState("");
  const [selfdescription, setSelfdescription] = useState("");
  const [reportsError, setReportsError] = useState("");
  const resumeref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    Interviewbyuser().catch(() => {
      setReportsError("Unable to load your interview reports. Please try again.");
    });
  }, [Interviewbyuser]);

  const Handlegeneratereport = async () => {
    try {
      const resume = resumeref.current?.files?.[0];

      if (!resume) {
        alert("Please upload your resume.");
        return;
      }

      const data = await generatereport({
        jobdescription,
        selfdescription,
        resume,
      });

      if (!data?._id) {
        console.error("Invalid API response:", data);
        return;
      }

      navigate(`/interview/${data._id}`);
    } catch (error) {
      console.error(
        "Report generation failed:",
        error.response?.data || error.message,
      );
    }
  };
  if (loading) {
    return <h1>loading your interview plans</h1>;
  }

  return (
    <main className="home">
      <h1>Create Your Custom Interview Plan</h1>

      <div className="Interview-Input-group">
        {/* Resume Upload and Self Description */}
        <div className="right">
          <div className="input-group">
            <label htmlFor="resume">Upload Resume</label>
            <input
              ref={resumeref}
              type="file"
              id="resume"
              name="resume"
              accept=".pdf,.doc,.docx"
            />
          </div>

          <div className="input-group">
            <label htmlFor="self-description">Self Description</label>
            <textarea
              // onChange={(e)=>selfdescription(e.target.value)}
              onChange={(e) => setSelfdescription(e.target.value)}
              name="self-description"
              id="self-description"
              placeholder="Enter your self description here..."
            />
          </div>
        </div>

        {/* Job Description */}

        <div className="left">
          <div className="input-group">
            <label htmlFor="job-description">Job Description</label>

            <textarea
              onChange={(e) => setJobdescription(e.target.value)}
              name="job-description"
              id="job-description"
              placeholder="Enter your job description here..."
            />

            {/* <button type="button">Submit</button> */}
          </div>
        </div>
      </div>

      <button
        onClick={Handlegeneratereport}
        type="button"
        className="generate-btn"
      >
        Generate Interview Report
      </button>
  
      
      <section className="recent-reports" aria-labelledby="recent-reports-title">
        <h2 id="recent-reports-title">My Recent Interview Reports</h2>
        {reportsError ? (
          <p role="alert">{reportsError}</p>
        ) : reports.length === 0 ? (
          <p className="no-reports">You haven't generated any interview reports yet.</p>
        ) : (
          <ul className="reports-list">
            {reports.map((report) => (
              <li key={report._id}>
                <button
                  type="button"
                  className="report-item"
                  onClick={() => navigate(`/interview/${report._id}`)}
                >
                  <h3>{report.title || "Interview Report"}</h3>
                  <span className="report-meta">
                    Generated on{" "}
                    {report.createdAt
                      ? new Date(report.createdAt).toLocaleDateString()
                      : "date unavailable"}
                  </span>
                  <span
                    className={`match-score ${
                      report.matchScore >= 80
                        ? "score--high"
                        : report.matchScore >= 60
                          ? "score--mid"
                          : "score--low"
                    }`}
                  >
                    Match Score:{" "}
                    {report.matchScore != null
                      ? `${report.matchScore}%`
                      : "Not available"}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
      <footer className="page-footer">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Help Center</a>
      </footer>

    </main>
  );
}
export default Home;
