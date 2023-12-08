import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CopyCasepaper = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { patientId, diseaseId, casepaperId } = useParams();
  const [showAppearence, setshowAppearence] = useState(false);
  const [showMensuration, setshowMensuration] = useState(false);
  const [showPregnancy, setshowPregnancy] = useState(false);
  const [showStatus, setshowStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const AuthorizationToken = user.token;
        const response = await axios.get(
          `/api/casepapers/${patientId}/${diseaseId}/${casepaperId}`,
          {
            headers: {
              Authorization: `Bearer ${AuthorizationToken}`,
            },
          }
        );
        console.log(response.data);
        console.log(
          "><<<<<<<<<===============================Without deleting I here =====================>>>>>>>>>>"
        );
        console.log(response.data);
        const copy = { ...response.data };
        delete copy._id;

        console.log(
          "><<<<<<<<<===============================Hello I here =====================>>>>>>>>>>"
        );
        setFormData(copy);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [patientId, user.token]);

  const [formData, setFormData] = useState({
    problems: [
      {
        location: "",
        sensation: "",
        modality: "",
        concomitant: "",
        duration: "",
        severity: "",
        comment: "",
        medications: [
          {
            name: "",
            description: "",
            dosage: "",
            quantity: "",
          },
        ],
        tests: [
          {
            name: "",
            result: "",
            data: "",
          },
        ],
      },
    ],
    status: {
      hunger: "",
      cravings: "",
      perspiration: "",
      appetite: "",
      thirst: "",
      urin: "",
      stool: "",
      sleep: "",
      fatigue: "",
      heartRate: "",
      bloodPressure: "",
      temperature: "",
      smoking: "",
      alcohol: "",
      recentSurgeries: "",
    },
    appearence: {
      height: "",
      weight: "",
      disability: "",
      birthMark: "",
      expresion: "",
    },
    mensuration: {
      regularity: "",
      duration: "",
      quantity: "",
      clots: "",
      stains: "",
      odor: "",
      leucorrhoea: "",
      color: "",
      lquantity: "",
      lodor: "",
    },
    pregnancy: {
      status: "",
      gestationalAge: "",
      gpaLsd: "",
      delivery: "",
      birthWeight: "",
      complications: "",
      babyMilestones: "",
    },
  });

  const handleAddProblem = () => {
    setFormData((prevData) => ({
      ...prevData,
      problems: [
        ...prevData.problems,
        {
          location: "",
          sensation: "",
          modality: "",
          concomitant: "",
          duration: "",
          severity: "",
          medications: [
            {
              name: "",
              description: "",
              dosage: "",
              quantity: "",
            },
          ],
          tests: [
            {
              name: "",
              result: "",
              data: "",
            },
          ],
        },
      ],
    }));
  };

  const handleAddMedication = (problemIndex) => {
    setFormData((prevData) => {
      const newProblems = [...prevData.problems];
      newProblems[problemIndex].medications.push({
        name: "",
        description: "",
        dosage: "",
        quantity: "",
      });
      return { ...prevData, problems: newProblems };
    });
  };

  const handleAddTest = (problemIndex) => {
    setFormData((prevData) => {
      const newProblems = [...prevData.problems];
      newProblems[problemIndex].tests.push({
        name: "",
        result: "",
        data: "",
      });
      return { ...prevData, problems: newProblems };
    });
  };

  const handleRemoveProblem = (problemIndex) => {
    setFormData((prevData) => {
      const newProblems = [...prevData.problems];
      newProblems.splice(problemIndex, 1);
      return { ...prevData, problems: newProblems };
    });
  };

  const handleRemoveMedication = (problemIndex, medicationIndex) => {
    setFormData((prevData) => {
      const newProblems = [...prevData.problems];
      newProblems[problemIndex].medications.splice(medicationIndex, 1);
      return { ...prevData, problems: newProblems };
    });
  };

  const handleRemoveTest = (problemIndex, testIndex) => {
    setFormData((prevData) => {
      const newProblems = [...prevData.problems];
      newProblems[problemIndex].tests.splice(testIndex, 1);
      return { ...prevData, problems: newProblems };
    });
  };

  const handleInputChange = (
    field,
    value,
    problemIndex,
    medicationIndex,
    testIndex
  ) => {
    setFormData((prevData) => {
      const newProblems = [...prevData.problems];

      if (testIndex !== undefined) {
        newProblems[problemIndex].tests[testIndex][field] = value;
      }
      if (medicationIndex !== undefined) {
        newProblems[problemIndex].medications[medicationIndex][field] = value;
      } else if (problemIndex !== undefined) {
        newProblems[problemIndex][field] = value;
      }
      return { ...prevData, problems: newProblems };
    });
  };

  const handleStatusChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      status: {
        ...prevData.status,
        [field]: value,
      },
    }));
  };
  const handleAppearanceChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      appearence: {
        ...prevData.appearence,
        [field]: value,
      },
    }));
  };
  const handleMensurationChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      mensuration: {
        ...prevData.mensuration,
        [field]: value,
      },
    }));
  };
  const handlePregnancyChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      pregnancy: {
        ...prevData.pregnancy,
        [field]: value,
      },
    }));
  };
  const handleStatus = () => {
    if (showStatus) {
      setshowStatus(false);
    } else {
      setshowStatus(true);
    }
  };
  const handleAppearance = () => {
    if (showAppearence) {
      setshowAppearence(false);
    } else {
      setshowAppearence(true);
    }
  };
  const handleMensuration = () => {
    if (showMensuration) {
      setshowMensuration(false);
    } else {
      setshowMensuration(true);
    }
  };
  const handlePregnancy = () => {
    if (showPregnancy) {
      setshowPregnancy(false);
    } else {
      setshowPregnancy(true);
    }
  };

  const handleButtonClick = async () => {
    console.log(formData);

    // Create a deep copy of the formData
    const formDataCopy = JSON.parse(JSON.stringify(formData));

    // Helper function to replace empty values with "N/A"
    const replaceEmptyWithNA = (obj) => {
      for (const key in obj) {
        if (obj[key] === "" || undefined) {
          obj[key] = "N/A";
        }
      }
    };

    // Replace empty values with "N/A" in each section
    replaceEmptyWithNA(formDataCopy.status);
    replaceEmptyWithNA(formDataCopy.appearence);
    replaceEmptyWithNA(formDataCopy.mensuration);
    replaceEmptyWithNA(formDataCopy.pregnancy);

    formDataCopy.problems.forEach((problem) => {
      replaceEmptyWithNA(problem);
      problem.medications.forEach((medication) => {
        replaceEmptyWithNA(medication);
      });
    });
    formDataCopy.problems.forEach((problem) => {
      replaceEmptyWithNA(problem);
      problem.tests.forEach((test) => {
        replaceEmptyWithNA(test);
      });
    });

    console.log("========================Here Iam ===============");
    console.log(formDataCopy);

    const AuthorizationToken = user.token;

    await axios
      .post(`/api/casepapers/${patientId}/${diseaseId}`, formDataCopy, {
        headers: {
          Authorization: `Bearer ${AuthorizationToken}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    window.history.back();
  };
  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-4">Casepaper</h1>
      <Button onClick={handleStatus}>Add Status</Button>
      <Button onClick={handleAppearance}>Add Appearance</Button>
      <Button onClick={handleMensuration}>Add Mensuration</Button>
      <Button onClick={handlePregnancy}>Add Pregnancy</Button>

      {/* problem  */}
      {formData.problems.map((problem, problemIndex) => (
        <div key={problemIndex} className="mb-4 border p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">
            Problem {problemIndex + 1}
          </h2>
          <Button
            color="warning"
            onClick={() => handleRemoveProblem(problemIndex)}
          >
            Remove Problem
          </Button>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Location"
              value={problem.location}
              onChange={(e) =>
                handleInputChange("location", e.target.value, problemIndex)
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Comment"
              value={problem.comment}
              onChange={(e) =>
                handleInputChange("comment", e.target.value, problemIndex)
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Sensation"
              value={problem.sensation}
              onChange={(e) =>
                handleInputChange("sensation", e.target.value, problemIndex)
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Modality"
              value={problem.modality}
              onChange={(e) =>
                handleInputChange("modality", e.target.value, problemIndex)
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Concomitant"
              value={problem.concomitant}
              onChange={(e) =>
                handleInputChange("concomitant", e.target.value, problemIndex)
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Duration"
              value={problem.duration}
              onChange={(e) =>
                handleInputChange("duration", e.target.value, problemIndex)
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Severity"
              value={problem.severity}
              onChange={(e) =>
                handleInputChange("severity", e.target.value, problemIndex)
              }
              className="border rounded w-full p-2"
            />
          </div>
          <Button
            color="warning"
            onClick={() => handleAddMedication(problemIndex)}
          >
            Add Medication
          </Button>
          <Button color="danger" onClick={() => handleAddTest(problemIndex)}>
            Add Test
          </Button>
          {problem.medications.map((medication, medicationIndex) => (
            <div key={medicationIndex} className="mb-2 border p-2 rounded">
              <h3 className="text-md font-semibold mb-1">
                Medication {medicationIndex + 1}
              </h3>
              <Button
                onClick={() =>
                  handleRemoveMedication(problemIndex, medicationIndex)
                }
              >
                Remove Medication
              </Button>
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={medication.name}
                  onChange={(e) =>
                    handleInputChange(
                      "name",
                      e.target.value,
                      problemIndex,
                      medicationIndex
                    )
                  }
                  className="border rounded w-full p-2"
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Description"
                  value={medication.description}
                  onChange={(e) =>
                    handleInputChange(
                      "description",
                      e.target.value,
                      problemIndex,
                      medicationIndex
                    )
                  }
                  className="border rounded w-full p-2"
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Dosage"
                  value={medication.dosage}
                  onChange={(e) =>
                    handleInputChange(
                      "dosage",
                      e.target.value,
                      problemIndex,
                      medicationIndex
                    )
                  }
                  className="border rounded w-full p-2"
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Quantity"
                  value={medication.quantity}
                  onChange={(e) =>
                    handleInputChange(
                      "quantity",
                      e.target.value,
                      problemIndex,
                      medicationIndex
                    )
                  }
                  className="border rounded w-full p-2"
                />
              </div>
            </div>
          ))}
          {/* test  */}
          {problem.tests.map((test, testIndex) => (
            <div key={testIndex} className="mb-2 border p-2 rounded">
              <h3 className="text-md font-semibold mb-1">
                Test {testIndex + 1}
              </h3>
              <Button onClick={() => handleRemoveTest(problemIndex, testIndex)}>
                Remove Test
              </Button>
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={test.name}
                  onChange={(e) =>
                    handleInputChange(
                      "name",
                      e.target.value,
                      problemIndex,
                      undefined,

                      testIndex
                    )
                  }
                  className="border rounded w-full p-2"
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Result"
                  value={test.result}
                  onChange={(e) =>
                    handleInputChange(
                      "result",
                      e.target.value,
                      problemIndex,
                      undefined,
                      testIndex
                    )
                  }
                  className="border rounded w-full p-2"
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Data"
                  value={test.data}
                  onChange={(e) =>
                    handleInputChange(
                      "data",
                      e.target.value,
                      problemIndex,
                      undefined,

                      testIndex
                    )
                  }
                  className="border rounded w-full p-2"
                />
              </div>
            </div>
          ))}
        </div>
      ))}
      <Button onClick={handleAddProblem}>Add Problem</Button>

      {showStatus && (
        <div className="mb-4 border p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Status</h2>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Hunger"
              value={formData.status.hunger}
              onChange={(e) => handleStatusChange("hunger", e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Cravings"
              value={formData.status.cravings}
              onChange={(e) => handleStatusChange("cravings", e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Perspiration"
              value={formData.status.perspiration}
              onChange={(e) =>
                handleStatusChange("perspiration", e.target.value)
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Appetite"
              value={formData.status.appetite}
              onChange={(e) => handleStatusChange("appetite", e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Thirst"
              value={formData.status.thirst}
              onChange={(e) => handleStatusChange("thirst", e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Urin"
              value={formData.status.urin}
              onChange={(e) => handleStatusChange("urin", e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Stool"
              value={formData.status.stool}
              onChange={(e) => handleStatusChange("stool", e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Sleep"
              value={formData.status.sleep}
              onChange={(e) => handleStatusChange("sleep", e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Fatigue"
              value={formData.status.fatigue}
              onChange={(e) => handleStatusChange("fatigue", e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Heart Rate"
              value={formData.status.heartRate}
              onChange={(e) => handleStatusChange("heartRate", e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Blood Pressure"
              value={formData.status.bloodPressure}
              onChange={(e) =>
                handleStatusChange("bloodPressure", e.target.value)
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Temperature"
              value={formData.status.temperature}
              onChange={(e) =>
                handleStatusChange("temperature", e.target.value)
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Smoking"
              value={formData.status.smoking}
              onChange={(e) => handleStatusChange("smoking", e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Alcohol"
              value={formData.status.alcohol}
              onChange={(e) => handleStatusChange("alcohol", e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Recent Surgeries"
              value={formData.status.recentSurgeries}
              onChange={(e) =>
                handleStatusChange("recentSurgeries", e.target.value)
              }
              className="border rounded w-full p-2"
            />
          </div>
        </div>
      )}
      {/* appearence  */}
      {showAppearence && (
        <div className="mb-4 border p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Appearance</h2>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Height"
              value={formData.appearence.height}
              onChange={(e) => handleAppearanceChange("height", e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Weight"
              value={formData.appearence.weight}
              onChange={(e) => handleAppearanceChange("weight", e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Disability"
              value={formData.appearence.disability}
              onChange={(e) =>
                handleAppearanceChange("disability", e.target.value)
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Birth Mark"
              value={formData.appearence.birthMark}
              onChange={(e) =>
                handleAppearanceChange("birthMark", e.target.value)
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Expression"
              value={formData.appearence.expresion}
              onChange={(e) =>
                handleAppearanceChange("expresion", e.target.value)
              }
              className="border rounded w-full p-2"
            />
          </div>
        </div>
      )}

      {/* menstruration  */}
      {showMensuration && (
        <div className="mb-4 border p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Mensuration</h2>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Regularity"
              value={formData.mensuration.regularity}
              onChange={(e) =>
                handleMensurationChange("regularity", e.target.value)
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Duration"
              value={formData.mensuration.duration}
              onChange={(e) =>
                handleMensurationChange("duration", e.target.value)
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Quantity"
              value={formData.mensuration.quantity}
              onChange={(e) =>
                handleMensurationChange("quantity", e.target.value)
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Clots"
              value={formData.mensuration.clots}
              onChange={(e) => handleMensurationChange("clots", e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Stains"
              value={formData.mensuration.stains}
              onChange={(e) =>
                handleMensurationChange("stains", e.target.value)
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Odor"
              value={formData.mensuration.odor}
              onChange={(e) => handleMensurationChange("odor", e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Leucorrhoea"
              value={formData.mensuration.leucorrhoea}
              onChange={(e) =>
                handleMensurationChange("leucorrhoea", e.target.value)
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Color"
              value={formData.mensuration.color}
              onChange={(e) => handleMensurationChange("color", e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Quantity (lquantity)"
              value={formData.mensuration.lquantity}
              onChange={(e) =>
                handleMensurationChange("lquantity", e.target.value)
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Odor (lodor)"
              value={formData.mensuration.lodor}
              onChange={(e) => handleMensurationChange("lodor", e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>
        </div>
      )}

      {/* preg  */}
      {showPregnancy && (
        <div className="mb-4 border p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Pregnancy</h2>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Status"
              value={formData.pregnancy.status}
              onChange={(e) => handlePregnancyChange("status", e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Gestational Age"
              value={formData.pregnancy.gestationalAge}
              onChange={(e) =>
                handlePregnancyChange("gestationalAge", e.target.value)
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="GPA LSD"
              value={formData.pregnancy.gpaLsd}
              onChange={(e) => handlePregnancyChange("gpaLsd", e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Delivery"
              value={formData.pregnancy.delivery}
              onChange={(e) =>
                handlePregnancyChange("delivery", e.target.value)
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Birth Weight"
              value={formData.pregnancy.birthWeight}
              onChange={(e) =>
                handlePregnancyChange("birthWeight", e.target.value)
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Complications"
              value={formData.pregnancy.complications}
              onChange={(e) =>
                handlePregnancyChange("complications", e.target.value)
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Baby Milestones"
              value={formData.pregnancy.babyMilestones}
              onChange={(e) =>
                handlePregnancyChange("babyMilestones", e.target.value)
              }
              className="border rounded w-full p-2"
            />
          </div>
        </div>
      )}

      <div className="mt-4">
        <Button color="primary" onClick={handleButtonClick}>
          Make Copy
        </Button>
      </div>
      {/* <pre className="mt-4">{JSON.stringify(formData, null, 2)}</pre> */}
    </div>
  );
};

export default CopyCasepaper;
