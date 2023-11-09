import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, Input } from "@nextui-org/react";
import { useParams } from "react-router-dom";

const UpdatePatient = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { patientId } = useParams();

  const initialFormData = {
    name: "",
    age: "",
    gender: "Female",
    physicianName: "",
    maritalStatus: "",
    informant: "",
    address: "",
    bloodGroup: "",
    allergies: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const AuthorizationToken = user.token;
        const response = await axios.get(`/api/patients/${patientId}`, {
          headers: {
            Authorization: `Bearer ${AuthorizationToken}`,
          },
        });
        console.log(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [patientId, user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const AuthorizationToken = user.token;

    const dataToSubmit = { ...formData };
    for (const key in dataToSubmit) {
      if (dataToSubmit[key] === "") {
        dataToSubmit[key] = "N/A";
      }
    }

    await axios
      .put(`/api/patients/${patientId}`, dataToSubmit, {
        headers: {
          Authorization: `Bearer ${AuthorizationToken}`,
        },
      })
      .then((response) => {
        navigate(`/${patientId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (user) {
    return (
      <form onSubmit={handleSubmit} className="w-1/2 mx-auto mt-4">
        <div className="mb-4">
          <label className="block mb-2">Name:</label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Age:</label>
          <Input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Select Gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Physician Name:</label>
          <Input
            type="text"
            name="physicianName"
            value={formData.physicianName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Marital Status:</label>
          <Input
            type="text"
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Informant:</label>
          <Input
            type="text"
            name="informant"
            value={formData.informant}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Address:</label>
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Blood Group:</label>
          <Input
            type="text"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Allergies:</label>
          <Input
            type="text"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
          />
        </div>

        <Button color="warning" type="submit">
          Update Patient
        </Button>
      </form>
    );
  } else {
    navigate("/login");
    return null;
  }
};

export default UpdatePatient;
