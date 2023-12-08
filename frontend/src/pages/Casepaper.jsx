import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@nextui-org/react";
import "./print.css";
function Casepaper({ setProgress }) {
  const navigate = useNavigate();

  const [casepaper, setCasepaper] = useState("");
  const { patientId, diseaseId, casepaperId } = useParams();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setProgress(50);
    console.log("===================Specific Casepaper=====================");
    console.log(patientId, diseaseId, casepaperId);
    const fetchData = async () => {
      try {
        setProgress(70);
        const AuthorizationToken = user.token;

        const response = await axios.get(
          `/api/casepapers/${patientId}/${diseaseId}/${casepaperId}`,
          {
            headers: {
              Authorization: `Bearer ${AuthorizationToken}`,
            },
          }
        );
        setProgress(100);
        console.log("===================Responce=====================");

        console.log(response.data);

        setCasepaper(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const deleteCasepaper = async () => {
    try {
      const AuthorizationToken = user.token;
      const response = await axios.delete(
        `/api/casepapers/${patientId}/${diseaseId}/${casepaperId}`,
        {
          headers: {
            Authorization: `Bearer ${AuthorizationToken}`,
          },
        }
      );

      console.log(response);
      navigate(`/${patientId}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="printable" // Add this class to the main container
      style={{
        margin: "30px",
      }}
    >
      {/* <div>
        {casepaper.problems && casepaper.problems.length > 0 ? (
          <div>
            <h1>Problems:</h1>
            <ul>
              {casepaper.problems.map((problem, index) => (
                <li key={index}>
                  <b>Problem {index + 1}:</b>
                  <p>location: {problem.location}</p>
                  <p>sensation: {problem.sensation}</p>
                  <p>modality: {problem.modality}</p>
                  <p>concomitant: {problem.concomitant}</p>
                  <p>duration: {problem.duration}</p>
                  <p>severity: {problem.severity}</p>
                  <p>comment: {problem.comment}</p>

                  <div>
                    <ul>
                      {problem.medications && problem.medications.length > 0 ? (
                        problem.medications.map((medication, medIndex) => (
                          <li key={medIndex}>
                            <b>
                              Problem {index + 1} Medication {medIndex + 1}
                            </b>
                            <p>Name: {medication.name}</p>
                            <p>Dosage: {medication.dosage}</p>
                            <p>description: {medication.description}</p>{" "}
                            <p>quantity: {medication.quantity}</p>
                          </li>
                        ))
                      ) : (
                        <p>No medications available for this problem.</p>
                      )}
                    </ul>
                  </div>

                  <div>
                    <ul>
                      {problem.tests && problem.tests.length > 0 ? (
                        problem.tests.map((test, testIndex) => (
                          <li key={testIndex}>
                            <b>
                              Problem {index + 1} Test {testIndex + 1}
                            </b>
                            <p>Name: {test.name}</p>
                            <p>Result: {test.result}</p>
                            <p>Data: {test.data}</p>
                          </li>
                        ))
                      ) : (
                        <p>No tests available for this problem.</p>
                      )}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No problems available for this casepaper.</p>
        )}
      </div> */}
      <div>
        {casepaper.problems && casepaper.problems.length > 0 ? (
          <div>
            <h1 style={{ color: "#333" }}>Problems:</h1>
            <ul>
              {casepaper.problems.map((problem, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #4CAF50",
                    borderRadius: "8px",
                    padding: "10px",
                    margin: "10px 0",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#ECF0F1",
                  }}
                >
                  <b style={{ color: "#3498DB" }}>Problem {index + 1}:</b>
                  <p>location: {problem.location}</p>
                  <p>sensation: {problem.sensation}</p>
                  <p>modality: {problem.modality}</p>
                  <p>concomitant: {problem.concomitant}</p>
                  <p>duration: {problem.duration}</p>
                  <p>severity: {problem.severity}</p>
                  <p>comment: {problem.comment}</p>

                  <div>
                    <ul>
                      {problem.medications && problem.medications.length > 0 ? (
                        problem.medications.map((medication, medIndex) => (
                          <li
                            key={medIndex}
                            style={{
                              border: "1px solid #3498DB",
                              borderRadius: "6px",
                              padding: "8px",
                              margin: "8px 0",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                              backgroundColor: "#D6EAF8",
                            }}
                          >
                            <b style={{ color: "#3498DB" }}>
                              Problem {index + 1} Medication {medIndex + 1}
                            </b>
                            <p>Name: {medication.name}</p>
                            <p>Dosage: {medication.dosage}</p>
                            <p>description: {medication.description}</p>{" "}
                            <p>quantity: {medication.quantity}</p>
                          </li>
                        ))
                      ) : (
                        <p>No medications available for this problem.</p>
                      )}
                    </ul>
                  </div>

                  <div>
                    <ul>
                      {problem.tests && problem.tests.length > 0 ? (
                        problem.tests.map((test, testIndex) => (
                          <li
                            key={testIndex}
                            style={{
                              border: "1px solid #E74C3C",
                              borderRadius: "6px",
                              padding: "8px",
                              margin: "8px 0",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                              backgroundColor: "#FADBD8",
                            }}
                          >
                            <b style={{ color: "#E74C3C" }}>
                              Problem {index + 1} Test {testIndex + 1}
                            </b>
                            <p>Name: {test.name}</p>
                            <p>Result: {test.result}</p>
                            <p>Data: {test.data}</p>
                          </li>
                        ))
                      ) : (
                        <p>No tests available for this problem.</p>
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        ) : (
          <p>No problems available for this casepaper.</p>
        )}
      </div>
      <Link to={`/update/${patientId}/${diseaseId}/${casepaperId}`}>
        <Button color="success">Update</Button>{" "}
      </Link>
      <Button color="danger" onClick={deleteCasepaper}>
        Delete
      </Button>
      <Button color="secondary" onClick={() => window.print()}>
        Print
      </Button>{" "}
      <h1>Create On {casepaper.createdAt}</h1>
      {casepaper.status && (
        <div
          style={{
            border: "1px solid #4CAF50",
            borderRadius: "8px",
            padding: "10px",
            margin: "10px 0",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ECF0F1",
          }}
        >
          <h1 className="text-xl">Status</h1>
          <p>hunger : {casepaper.status.hunger}</p>
          <p>cravings : {casepaper.status.cravings}</p>
          <p>perspiration : {casepaper.status.perspiration}</p>
          <p>appetite : {casepaper.status.appetite}</p>
          <p>thirst : {casepaper.status.thirst}</p>
          <p>urin : {casepaper.status.urin}</p>
          <p>stool : {casepaper.status.stool}</p>
          <p>sleep : {casepaper.status.sleep}</p>
          <p>fatigue : {casepaper.status.fatigue}</p>
          <p>heartRate : {casepaper.status.heartRate}</p>
          <p>bloodPressure : {casepaper.status.bloodPressure}</p>
          <p>temperature : {casepaper.status.temperature}</p>
          <p>smoking : {casepaper.status.smoking}</p>
          <p>alcohol : {casepaper.status.alcohol}</p>
          <p>recentSurgeries : {casepaper.status.recentSurgeries}</p>
        </div>
      )}
      {casepaper.appearence && (
        <div
          style={{
            border: "1px solid #4CAF50",
            borderRadius: "8px",
            padding: "10px",
            margin: "10px 0",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ECF0F1",
          }}
        >
          <h1 className="text-xl">appearence</h1>
          <p>height : {casepaper.appearence.height}</p>
          <p>weight : {casepaper.appearence.weight}</p>
          <p>disability : {casepaper.appearence.disability}</p>
          <p>birthMark : {casepaper.appearence.birthMark}</p>
          <p>expresion : {casepaper.appearence.expresion}</p>
        </div>
      )}
      {casepaper.mensuration && (
        <div
          style={{
            border: "1px solid #4CAF50",
            borderRadius: "8px",
            padding: "10px",
            margin: "10px 0",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ECF0F1",
          }}
        >
          <h1 className="text-xl">mensuration</h1>
          <p>regularity : {casepaper.mensuration.regularity}</p>
          <p>duration : {casepaper.mensuration.duration}</p>
          <p>quantity : {casepaper.mensuration.quantity}</p>
          <p>clots : {casepaper.mensuration.clots}</p>
          <p>stains : {casepaper.mensuration.stains}</p>
          <p>odor : {casepaper.mensuration.odor}</p>
          <p>leucorrhoea : {casepaper.mensuration.leucorrhoea}</p>
          <p>color : {casepaper.mensuration.color}</p>
          <p>lquantity : {casepaper.mensuration.lquantity}</p>
          <p>lodor : {casepaper.mensuration.lodor}</p>
        </div>
      )}
      {casepaper.pregnancy && (
        <div
          style={{
            border: "1px solid #4CAF50",
            borderRadius: "8px",
            padding: "10px",
            margin: "10px 0",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ECF0F1",
          }}
        >
          <h1 className="text-xl">pregnancy</h1>
          <p>status : {casepaper.pregnancy.status}</p>
          <p>gestationalAge : {casepaper.pregnancy.gestationalAge}</p>
          <p>gpaLsd : {casepaper.pregnancy.gpaLsd}</p>
          <p>delivery : {casepaper.pregnancy.delivery}</p>
          <p>birthWeight : {casepaper.pregnancy.birthWeight}</p>
          <p>complications : {casepaper.pregnancy.complications}</p>
          <p>babyMilestones : {casepaper.pregnancy.babyMilestones}</p>
        </div>
      )}
    </div>
  );
}

export default Casepaper;
