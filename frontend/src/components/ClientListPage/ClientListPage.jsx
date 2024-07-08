import Navbar from "../Navbar/Navbar";
import "./clientListPage.css";
import { useNavigate, generatePath } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../Button/Button";
import ErrorMessagePage from "../ErrorMessage/ErrorMessagePage";
import ChangePasswordPage from "../ChangePasswordAdmin/ChangePasswordPage";

const ClientListPage = ({
  isLoggedIn,
  setLoggedIn,
  isAdminUser,
  setAdminUser,
}) => {
  const [clientsData, setClientsData] = useState(null);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [errorDeleteModalOpen, setErrorDeleteModalOpen] = useState(false);


  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const clientId = localStorage.getItem("clientId");

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

  const handleDelete = async (clientId) => {
    try {
      await axios.delete(`http://localhost:8000/api/clients/${clientId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClientsData(clientsData.filter((client) => client.id !== clientId));
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
      setErrorDeleteModalOpen(true);
    }
  };
  console.log(passwordModalOpen)

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        setLoggedIn={setLoggedIn}
        isAdminUser={isAdminUser}
        setAdminUser={setAdminUser}
        passwordModalOpen={passwordModalOpen}
        setPasswordModalOpen={setPasswordModalOpen}
      />
      {errorModalOpen && (
        <ErrorMessagePage
          isOpen={errorModalOpen}
          onClose={() => setErrorModalOpen(false)}
          message={"Error loading clients data"}
        />
      )}
      {errorDeleteModalOpen && (
        <ErrorMessagePage
          isOpen={errorDeleteModalOpen}
          onClose={() => setErrorDeleteModalOpen(false)}
          message={"Oops! It seems there was an issue deleting the account. Please try again"}
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
              {clientsData?.filter(client => !client.is_superuser).map((data) => {
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
                        onClick={() => handleDelete(data.id)}
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
        <ChangePasswordPage isOpen={passwordModalOpen} onClose={() => setPasswordModalOpen(false)} clientId={clientId}/>
      </div>
    </>
  );
};

export default ClientListPage;
