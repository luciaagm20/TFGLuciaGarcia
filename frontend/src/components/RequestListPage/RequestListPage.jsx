import Navbar from "../Navbar/Navbar";
import "./requestListPage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const RequestListPage = ({
  isLoggedIn,
  setLoggedIn,
  isAdminUser,
  setAdminUser,
}) => {
  const [requestData, setRequestData] = useState(null);
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
        console.error("Error al obtener los datos de los clientes:", error);
        setLoggedIn(false);
        navigate("/login");
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
      <div className="requestListPageContainer">
        <h2>List of requests</h2>
        <table>
          <thead>
            <tr>
              <th>User id</th>
              <th>Text</th>
            </tr>
          </thead>
          <tbody>
            {requestData?.map((data) => (
              <tr key={data.id}>
                <td>{data.client_id}</td>
                <td>{data.text}</td>
                <td>
                  <a
                    href={`/profile/${data.client_id}`}
                    className="btn btn-primary"
                  >
                    Profile
                  </a>
                  <button
                    onClick={() => handleDelete(data.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RequestListPage;
