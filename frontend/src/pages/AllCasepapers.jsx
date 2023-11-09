import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function AllCasepapers({ setProgress }) {
  const copy = "copy";
  const [casepapers, setCasepapers] = useState("");
  const [lastCasepaperId, setLastCasepaperId] = useState(null);

  const { patientId, diseaseId, diseaseName } = useParams();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setProgress(40);
    console.log("===================India is best=====================");
    console.log(patientId, diseaseId);
    const fetchData = async () => {
      try {
        setProgress(60);

        const AuthorizationToken = user.token;

        const response = await axios.get(
          `/api/casepapers/${patientId}/${diseaseId}`,
          {
            headers: {
              Authorization: `Bearer ${AuthorizationToken}`,
            },
          }
        );
        setProgress(80);

        if (Array.isArray(response.data) && response.data.length > 0) {
          const lastCasepaper = response.data[response.data.length - 1];
          setLastCasepaperId(lastCasepaper._id);
        } else {
          setLastCasepaperId("");
        }
        console.log("===================Responce=====================");

        console.log(response.data);

        setCasepapers(response.data);
        setProgress(100);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <h2 className="text-large">{diseaseName}</h2>

      <Link to={`/new/${patientId}/${diseaseId}`}>Add Casepaper</Link>
      <div></div>
      {casepapers.length > 0 && (
        <div>
          <Link to={`/copy/${patientId}/${diseaseId}/${lastCasepaperId}`}>
            Copy Last Casepaper
          </Link>
        </div>
      )}

      {Array.isArray(casepapers) ? (
        casepapers
          .slice()
          .reverse()
          .map((casepaper, index) => (
            <li key={index}>
              <Link to={`/${patientId}/${diseaseId}/${casepaper._id}`}>
                {formatDistanceToNow(new Date(casepaper.createdAt), {
                  addSuffix: true,
                })}
              </Link>
            </li>
          ))
      ) : (
        <p>casepapers is not an array or is empty.</p>
      )}
    </div>
  );
}

export default AllCasepapers;
