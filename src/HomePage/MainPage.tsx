import { useState } from "react";
import { useNavigate } from "react-router-dom";
import setupStateData from "./SetupStateData";
import "./MainPage.css";

function MainPage() {
  const [selectedStates, setSelectedStates] = useState<Set<string>>(new Set());
  const stateData = setupStateData();
  const navigate = useNavigate();

  const toggleState = (id: string) => {
    setSelectedStates((prev) => {
      // prev is of type Set<string>
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);

      return next;
    });
  };

  const toggleAll = (isChecked: boolean) => {
    stateData.forEach((state) => {
      const id = state.id;
      if (isChecked) {
        if (!selectedStates.has(id)) toggleState(id);
      } else setSelectedStates(new Set());
    });
  };

  const handleNavigation = () => {
    navigate("/jobform", { state: { stateData, selectedStates } });
  };

  return (
    <div className="page-wrapper">
      <h1>Select all States You Would Like To Apply In</h1>
      <div className="svg-wrapper">
        <svg
          viewBox="0 0 959 593"
          id="usMap"
          xmlns="http://www.w3.org/2000/svg"
        >
          {stateData.map(({ id, name, d }) => (
            <path
              inkscape:connector-curvature="0"
              id={id}
              data-name={name}
              className={selectedStates.has(id) ? "state selected" : "state"}
              onClick={() => toggleState(id)}
              d={d}
            />
          ))}
        </svg>
      </div>

      <div className="row-control">
        <div className="checkbox-wrapper">
          <label>Select All</label>
          <input
            id="selectAll"
            type="checkbox"
            onChange={(e) => toggleAll(e.target.checked)}
          />
        </div>

        <div className="button-wrapper">
          <button id="Submit" type="submit" onClick={handleNavigation}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
