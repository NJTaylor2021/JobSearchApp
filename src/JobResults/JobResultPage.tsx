import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { JobResult } from "../types/JobResult";
import SearchJobs from "../api/searchJobs";
import "./JobResultPage.css";

function JobResultPage() {
  const [searchParams] = useSearchParams();
  const jobTitle = searchParams.get("title") ?? "";
  const locations = searchParams.get("locations") ?? "";

  const [jobs, setJobs] = useState<JobResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Runs the search for jobs, updating isLoading and error while it searches
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    SearchJobs(jobTitle, locations)
      .then(setJobs)
      .catch((err) => {
        console.error("Job search failed:", err);
        setError(
          "Something went wrong while attempting to fetch jobs. Please try again later.",
        );
      })
      .finally(() => setIsLoading(false));
  }, [jobTitle, locations]);

  if (isLoading) return <p>...Loading</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const returnHome = () => {
    navigate("/");
  };

  return (
    <div className="job-result-container">
      <h2 style={{ color: "white" }}>Results</h2>
      <ul className="job-list">
        {jobs.map((job) => (
          <li key={job.ID} className="job-card">
            <a
              href={job.redirectURL}
              target="_blank"
              rel="noopener noreferrer"
              className="job-card-link"
            >
              <span className="job-card-info">
                {job.title} - {job.company} - {job.location}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <button
        type="submit"
        onClick={returnHome}
        className="results-home-button"
      >
        Return Home
      </button>
    </div>
  );
}

export default JobResultPage;
