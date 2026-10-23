import React from "react";
import "../style/home.scss";
import Interview from "";

function Home() {
  return (
    <main className="home">
      <h1>Create Your Custom Interview Plan</h1>

      <div className="Interview-Input-group">
        {/* Resume Upload and Self Description */}
        <div className="right">
          <div className="input-group">
            <label htmlFor="resume">Upload Resume</label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf,.doc,.docx"
            />
          </div>

          <div className="input-group">
            <label htmlFor="self-description">Self Description</label>
            <textarea
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
              name="job-description"
              id="job-description"
              placeholder="Enter your job description here..."
            />

            {/* <button type="button">Submit</button> */}
          </div>
        </div>
      </div>

      <button type="button" className="generate-btn">
        Generate Interview Report
      </button>
    </main>
  );
}
export default Home;
