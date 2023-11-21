import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePatientForm from "./pages/PatientForm";
import Profile from "./pages/Profile";
import AllCasepapers from "./pages/AllCasepapers";
import Casepaper from "./pages/Casepaper";
import CasepaperForm from "./pages/CasepaperForm";
import UpdatePatient from "./pages/UpdatePatient";
import UpdateDisease from "./pages/UpdateDisease";
import UpdateCasepaper from "./pages/UpdateCasepaper";
import CopyCasepaper from "./pages/CopyCasepaper";
import React, { useState } from "react";
import LoadingBar from "react-top-loading-bar";
import Aboutus from "./pages/Aboutus";
import Doctors from "./pages/Doctors";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
function App() {
  const [progress, setProgress] = useState(0);

  return (
    <>
      <Router>
        <div>
          <LoadingBar
            color="#f5a524"
            height="3px"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard setProgress={setProgress} />} />

            <Route
              path="/login"
              element={<Login setProgress={setProgress} />}
            />

            <Route
              path="/add"
              element={<CreatePatientForm setProgress={setProgress} />}
            />
            <Route
              path="/:patientId"
              element={<Profile setProgress={setProgress} />}
            />
            <Route
              path="/allcasepapers/:patientId/:diseaseId/:diseaseName"
              element={<AllCasepapers setProgress={setProgress} />}
            />

            <Route
              path="/update/:patientId"
              element={<UpdatePatient setProgress={setProgress} />}
            />
            <Route
              path="/update/disease/:patientId/:diseaseId"
              element={<UpdateDisease setProgress={setProgress} />}
            />

            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/home" element={<Home />} />

            <Route
              path="new/:patientId/:diseaseId"
              element={<CasepaperForm setProgress={setProgress} />}
            />

            <Route
              path="/:patientId/:diseaseId/:casepaperId"
              element={<Casepaper setProgress={setProgress} />}
            />

            <Route
              path="/update/:patientId/:diseaseId/:casepaperId"
              element={<UpdateCasepaper setProgress={setProgress} />}
            />

            <Route
              path="/copy/:patientId/:diseaseId/:casepaperId"
              element={<CopyCasepaper setProgress={setProgress} />}
            />

            <Route
              path="/register"
              element={<Register setProgress={setProgress} />}
            />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
