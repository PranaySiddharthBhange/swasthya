// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { Button, Input } from "@nextui-org/react";
// import { useParams } from "react-router-dom";
// function UpdateDisease() {
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);
//   const { patientId, diseaseId } = useParams();
//   const [disease, updateDisease] = useState("");
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const AuthorizationToken = user.token;
//         const response = await axios.get(
//           `/api/diseases/${patientId}/${diseaseId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${AuthorizationToken}`,
//             },
//           }
//         );
//         console.log(response.data);
//         updateDisease(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [patientId, user.token]);

//   return <div>update Disease</div>;
// }

// export default UpdateDisease;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, Input } from "@nextui-org/react";
import { useParams } from "react-router-dom";

function UpdateDisease({ setProgress }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { patientId, diseaseId } = useParams();
  const [disease, updateDisease] = useState("");

  useEffect(() => {
    setProgress(20);
    const fetchData = async () => {
      try {
        setProgress(60);

        const AuthorizationToken = user.token;
        const response = await axios.get(
          `/api/diseases/${patientId}/${diseaseId}`,
          {
            headers: {
              Authorization: `Bearer ${AuthorizationToken}`,
            },
          }
        );
        setProgress(100);

        console.log("==============HereIam================");
        console.log(response.data);
        updateDisease(response.data.disease);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [patientId, user.token]);
  const handelUpdate = async (e) => {
    e.preventDefault();
    const AuthorizationToken = user.token;

    await axios
      .put(
        `/api/diseases/${patientId}/${diseaseId}`,
        { disease },
        {
          headers: {
            Authorization: `Bearer ${AuthorizationToken}`,
          },
        }
      )
      .then((response) => {
        navigate(`/${patientId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {JSON.stringify(disease)}
        </label>
        <Input
          type="text"
          value={disease} // Set the value of the input to the disease state
          onChange={(e) => updateDisease(e.target.value)} // Update the disease state when input changes
          className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter Disease"
        />
      </div>

      <Button onClick={handelUpdate}>Update</Button>
    </div>
  );
}

export default UpdateDisease;
