import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";

import axios from "axios";

function Profile({ setProgress }) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = useState(null);

  const [disease, setDisease] = useState("");
  const { user } = useSelector((state) => state.auth);

  const { patientId } = useParams();

  const handleButtonClick = async () => {
    console.log("Disease: ", disease);
    const AuthorizationToken = user.token;

    try {
      const response = await axios.post(
        `/api/diseases/${patientId}`,
        { disease },
        {
          headers: {
            Authorization: `Bearer ${AuthorizationToken}`,
          },
        }
      );
      setDisease("");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePatient = async () => {
    try {
      const AuthorizationToken = user.token;
      const response = await axios.delete(`/api/patients/${patientId}`, {
        headers: {
          Authorization: `Bearer ${AuthorizationToken}`,
        },
      });

      navigate("/");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDisease = async (diseaseId) => {
    try {
      const AuthorizationToken = user.token;
      const response = await axios.delete(
        `/api/diseases/${patientId}/${diseaseId}`,
        {
          headers: {
            Authorization: `Bearer ${AuthorizationToken}`,
          },
        }
      );

      window.location.reload();

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setProgress(0);
    const fetchData = async () => {
      try {
        const AuthorizationToken = user.token;

        const response = await axios.get(`/api/patients/${patientId}`, {
          headers: {
            Authorization: `Bearer ${AuthorizationToken}`,
          },
        });
        setProgress(100);

        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [patientId, user.token, disease]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 mt-4">
      {data ? (
        <div style={{ display: "flex" }}>
          {/* <div style={{ flex: 1, marginRight: "20px" }}>
            <h1 className="text-3xl font-bold mb-4">Patient Profile</h1>
            <Link to={`/update/${patientId}`}>Update</Link>

            <Button color="warning" className="mb-4" onClick={deletePatient}>
              Delete
            </Button>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>ID:</strong> {data._id}
              </div>
              <div>
                <strong>Name:</strong> {data.name}
              </div>
              <div>
                <strong>Age:</strong> {data.age}
              </div>
              <div>
                <strong>Gender:</strong> {data.gender}
              </div>
              <div>
                <strong>Physician Name:</strong> {data.physicianName}
              </div>
              <div>
                <strong>Marital Status:</strong> {data.maritalStatus}
              </div>
              <div>
                <strong>Informant:</strong> {data.informant}
              </div>
              <div>
                <strong>Address:</strong> {data.address}
              </div>
              <div>
                <strong>Blood Group:</strong> {data.bloodGroup}
              </div>
              <div>
                <strong>Allergies:</strong> {data.allergies}
              </div>
              <div>
                <strong>Created At:</strong>{" "}
                {formatDistanceToNow(new Date(data.createdAt), {
                  addSuffix: true,
                })}
              </div>
              <div>
                <strong>Updated At:</strong>{" "}
                {formatDistanceToNow(new Date(data.updatedAt), {
                  addSuffix: true,
                })}
              </div>
            </div>
          </div> */}
          <div
            style={{ flex: 1, marginRight: "20px" }}
            className="bg-white p-4 rounded shadow-md"
          >
            <h1 className="text-3xl font-bold mb-4">Patient Profile</h1>
            <Link to={`/update/${patientId}`} className="text-blue-500">
              <Button color="warning" className="mb-4">
                Update
              </Button>
            </Link>

            <Button color="warning" className="mb-4" onClick={deletePatient}>
              Delete
            </Button>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>ID:</strong> {data._id}
              </div>
              <div>
                <strong>Name:</strong> {data.name}
              </div>
              <div>
                <strong>Age:</strong> {data.age}
              </div>
              <div>
                <strong>Gender:</strong> {data.gender}
              </div>
              <div>
                <strong>Physician Name:</strong> {data.physicianName}
              </div>
              <div>
                <strong>Marital Status:</strong> {data.maritalStatus}
              </div>
              <div>
                <strong>Informant:</strong> {data.informant}
              </div>
              <div>
                <strong>Address:</strong> {data.address}
              </div>
              <div>
                <strong>Blood Group:</strong> {data.bloodGroup}
              </div>
              <div>
                <strong>Allergies:</strong> {data.allergies}
              </div>
              <div>
                <strong>Created At:</strong>{" "}
                {formatDistanceToNow(new Date(data.createdAt), {
                  addSuffix: true,
                })}
              </div>
              <div>
                <strong>Updated At:</strong>{" "}
                {formatDistanceToNow(new Date(data.updatedAt), {
                  addSuffix: true,
                })}
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <Button color="warning" onPress={onOpen} className="mt-4">
              Add Disease
            </Button>
            <Modal placement="top" isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      New Disease
                    </ModalHeader>
                    <ModalBody>
                      <Input
                        className="max-w-xs"
                        type="text"
                        placeholder="Enter Disease"
                        value={disease}
                        onChange={(e) => setDisease(e.target.value)}
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button
                        color="warning"
                        onPress={() => {
                          onClose();
                          handleButtonClick();
                        }}
                      >
                        Create
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
            {/* <ul>
              {data.disease
                .slice()
                .reverse()
                .map((disease) => (
                  <li key={disease._id} className="mb-2">
                    <Link
                      to={`/allcasepapers/${data._id}/${disease._id}/${disease.disease}`}
                      className="text-blue-500"
                    >
                      <div>
                        {disease.disease} ({disease.casepapers.length})
                      </div>
                    </Link>
                    <Link to={`/update/disease/${patientId}/${disease._id}`}>
                      Update
                    </Link>
                    <button onClick={() => deleteDisease(disease._id)}>
                      Delete
                    </button>
                  </li>
                ))}
            </ul> */}
            <ul>
              {data.disease
                .slice()
                .reverse()
                .map((disease) => (
                  <li
                    key={disease._id}
                    className="mb-2 bg-white p-4 rounded shadow-md"
                  >
                    <Link
                      to={`/allcasepapers/${data._id}/${disease._id}/${disease.disease}`}
                      className="text-blue-500"
                    >
                      <div>
                        {disease.disease} ({disease.casepapers.length})
                      </div>
                    </Link>
                    <div className="flex space-x-2">
                      <Link
                        to={`/update/disease/${patientId}/${disease._id}`}
                        className="text-green-500"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => deleteDisease(disease._id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
