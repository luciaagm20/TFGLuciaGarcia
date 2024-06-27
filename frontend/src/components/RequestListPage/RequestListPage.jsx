import Navbar from "../Navbar/Navbar";
import "./requestListPage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../Button/Button";
import ErrorMessagePage from "../ErrorMessage/ErrorMessagePage";

const RequestListPage = ({
  isLoggedIn,
  setLoggedIn,
  isAdminUser,
  setAdminUser,
}) => {
  const [requestData, setRequestData] = useState(null);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorDeleteModalOpen, setErrorDeleteModalOpen] = useState(false);


  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/request/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequestData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de las solicitudes:", error);
        setErrorModalOpen(true);
      }
    };

    fetchRequestData();
  }, [token, setLoggedIn, navigate]);

  const handleDelete = async (requestId) => {
    try {
      await axios.delete(`http://localhost:8000/api/request/${requestId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Filtrar la comida eliminada de la lista
      setRequestData(requestData.filter((request) => request.id !== requestId));
    } catch (error) {
      console.error("Error al eliminar:", error);
      setErrorDeleteModalOpen(true);
    }
  };

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
          message={"Error loading requests"}
        />
      )}
      {errorDeleteModalOpen && (
        <ErrorMessagePage
          isOpen={errorDeleteModalOpen}
          onClose={() => setErrorDeleteModalOpen(false)}
          message={"Error deleting the request. Please, try again."}
        />
      )}
      <div className="requestListPageContainer">
        <h2>List of requests</h2>
        <div className="requestListContainer">
          <table className="requestList">
            <thead>
              <tr>
                <th>User id</th>
                <th>Text</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {requestData?.map((data) => (
                <tr key={data.id}>
                  <td>{data.client_id}</td>
                  <td>{data.text}</td>
                  <td>
                    <div>
                      <Button
                        value="Profile"
                        onClick={() => navigate(`/profile/${data.client_id}`)}
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RequestListPage;
