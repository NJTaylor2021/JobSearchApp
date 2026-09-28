import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./HomePage/MainPage.tsx";
import JobInfoPage from "./Job Info Page/JobInfoPage.tsx";
import JobResultPage from "./JobResults/JobResultPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/jobform" element={<JobInfoPage />} />
        <Route path="/jobs" element={<JobResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
