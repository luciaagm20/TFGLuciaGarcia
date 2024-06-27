import Navbar from "../Navbar/Navbar";
import "./clientListPage.css";
import { useNavigate, generatePath } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../Button/Button";
import ErrorMessagePage from "../ErrorMessage/ErrorMessagePage";

const ClientListPage = ({
  isLoggedIn,
  setLoggedIn,
  isAdminUser,
  setAdminUser,
}) => {
  const [clientsData, setClientsData] = useState(null);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
        setErrorModalOpen(true);
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
      {errorModalOpen && (
        <ErrorMessagePage
          isOpen={errorModalOpen}
          onClose={() => setErrorModalOpen(false)}
          message={"Error loading clients data"}
        />
      )}
      <div className="clientListPageContainer">
        <h2>List of registered users</h2>
        <div className="clientTableContainer">
          <table className="clientTable">
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {clientsData?.map((data) => {
                return (
                  <tr key={data.id}>
                    <td>{data.email}</td>
                    <td>{data.username}</td>
                    <td>{data.gender}</td>
                    <td>{data.meals.map((meal) => {
                      return (
                        <p>{meal}</p>
                      )
                    })}</td>
                    <td>{data.weight}</td>
                    <td>{data.age}</td>
                    <td>{data.height}</td>
                    <td>{data.goal}</td>
                    <td>{data.allergies.map((allergy) => {
                      return (
                        <p>{allergy}</p>
                      )
                    })}</td>
                    <td>
                     <div>  <Button
                        value="Profile"
                        onClick={() => navigate(`/profile/${data.id}`)}
                        disabled={false}
                      />
  
                      <Button
                        value="Delete"
                        onClick={() => navigate(`/delete/${data.id}`)}
                        disabled={false}
                      />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ClientListPage;
