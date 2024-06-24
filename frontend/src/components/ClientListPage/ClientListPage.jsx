import Navbar from "../Navbar/Navbar";
import "./clientListPage.css";
import { useNavigate, generatePath } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ClientListPage = ({
  isLoggedIn,
  setLoggedIn,
  isAdminUser,
  setAdminUser,
}) => {
  const [clientsData, setClientsData] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log("is admin user clientPage Admin app: " + isAdminUser)

  useEffect(() => {
    const fetchClientsData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/clients/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClientsData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de los clientes:", error);
        setLoggedIn(false);
        navigate("/login");
      }
    };

    fetchClientsData();
  }, [token, setLoggedIn, navigate]);

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        setLoggedIn={setLoggedIn}
        isAdminUser={isAdminUser}
        setAdminUser={setAdminUser}
      />
      <div className="clientListPageContainer">
        <h2>List of registered users</h2>
        <table>
          <thead>
            <tr>
              <th>e-mail</th>
              <th>User name</th>
              <th>Gender</th>
              <th>Meals</th>
              <th>Weight (kg)</th>
              <th>Age</th>
              <th>Height (cm)</th>
              <th>Goal</th>
              <th>Allergies</th>
            </tr>
          </thead>
          <tbody>
            {clientsData?.map((data) => (
              <tr key={data.id}>
                <td>{data.email}</td>
                <td>{data.username}</td>
                <td>{data.gender}</td>
                <td>{data.meals}</td>
                <td>{data.weight}</td>
                <td>{data.age}</td>
                <td>{data.height}</td>
                <td>{data.goal}</td>
                <td>{data.allergies}</td>
                <td>
                  <a href={`/profile/${data.id}`} className="btn btn-primary">
                    Profile
                  </a>
                  <a href={`/delete/${data.id}`} className="btn btn-danger">
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ClientListPage;
