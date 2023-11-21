import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, Card, CardHeader } from "@nextui-org/react";
import { Link } from "react-router-dom";

function Dashboard({ setProgress }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("all");

  useEffect(() => {
    setProgress(10);
    if (!user) {
      // navigate("/login");
      navigate("/home");
    } else {
      setProgress(40);

      axios
        .get("/api/patients/", {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((response) => setData(response.data))
        .catch((error) => console.log(error));
      setProgress(100);
    }
  }, [user, navigate]);

  const handleCreateClick = () => navigate("/add");

  // const filteredData = data.filter((patient) =>
  //   patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );
  const filteredData = Array.isArray(data)
    ? data.filter((patient) =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  let sortedData = [...filteredData];

  if (sortOption === "Male" || sortOption === "Female") {
    sortedData = sortedData.filter((patient) => patient.gender === sortOption);
  } else if (sortOption === "sortbyage") {
    sortedData.sort((a, b) => b.age - a.age);
  }

  return (
    <div className="container mx-auto p-4">
      <section className="text-center mb-8">
        <h1 className="text-3xl font-bold">Welcome {user && user.name}</h1>
        <p className="text-lg">Patient Dashboard</p>
        <Button color="warning" onClick={handleCreateClick} className="mt-4">
          Create
        </Button>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 rounded border"
          />
        </div>
        <div className="mt-4">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full p-2 rounded border"
          >
            <option value="all">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="sortbyage">Sort by Age</option>
          </select>
        </div>
      </section>

      {sortedData.length > 0 ? (
        <div>
          {sortedData.reverse().map((patient) => (
            <div key={patient._id}>
              <Link to={`/${patient._id}`}>
                <Card style={{ padding: "10px", margin: "15px" }}>
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-lg">{patient.name}</h4>
                    <p className="text-xs uppercase font-bold">
                      {patient.gender}
                    </p>
                    <small className="text-gray-600">{patient.allergies}</small>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <h3 className="text-center mt-4">No Patients found</h3>
      )}
    </div>
  );
}

export default Dashboard;
