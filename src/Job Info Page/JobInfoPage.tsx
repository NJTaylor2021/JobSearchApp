import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./JobInfoPage.css";

/**
 * This interface defines the information about the SVG and the selected states
 * the user gave on the home page.
 */
interface JobInfoLocation {
  stateData: { id: string; name: string; d: string }[];
  selectedStates: Set<string>;
}

function JobInfoPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // If the user did not previously choose any states, then go back to home
  useEffect(() => {
    if (!location.state) navigate("/", { replace: true });
  }, [location.state, navigate]);

  const { stateData, selectedStates } =
    (location.state as JobInfoLocation) || {};

  const selectOptions: string[] = ["Entry Level", "Mid Level", "Senior Level"];
  const [selected, setSelected] = useState<string>(selectOptions[0]);
  const [jobTitleInput, setJobTitleInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleJobLookup = () => {
    if (jobTitleInput === "") {
      setError("You must input a job title.");
      return;
    }

    const jobTitle = selected + " " + jobTitleInput;
    const params = new URLSearchParams({
      title: jobTitle,
      locations: Array.from(selectedStates).join(","),
    });
    navigate(`/jobs?${params}`);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="jobinfo-page-wrapper">
      <div className="jobinfo-svg-wrapper">
        <svg
          viewBox="0 0 959 593"
          id="jobinfo-usMap"
          xmlns="http://www.w3.org/2000/svg"
        >
          {stateData.map(({ id, name, d }) => (
            <path
              inkscape:connector-curvature="0"
              key={id}
              id={id}
              data-name={name}
              className={
                selectedStates.has(id) ? "state selected" : "jobinfo-state"
              }
              d={d}
            />
          ))}
        </svg>
      </div>

      <div className="input-controls-wrapper">
        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
          {selectOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Please Input Your Desired Job Title"
          onChange={(e) => setJobTitleInput(e.target.value)}
        ></input>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="jobInfo-button-wrapper">
          <button type="submit" onClick={handleJobLookup}>
            Lookup Jobs
          </button>

          <button type="submit" onClick={handleBack}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobInfoPage;
