import Navbar from "../Navbar/Navbar";
import "./clientPage.css";
import MenuCard from "../MenuCard/MenuCard";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import RequestPage from "../RequestPage/RequestPage";
import ErrorMessagePage from "../ErrorMessage/ErrorMessagePage";


const ClientPage = ({ isLoggedIn, setLoggedIn, isAdminUser, setAdminUser }) => {
  const [clientName, setClientName] = useState("");
  const [menuData, setMenuData] = useState(null);
  const { clientId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [errorClientModalOpen, setErrorClientModalOpen] = useState(false);
  const [errorMenuModalOpen, setErrorMenuModalOpen] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/clients/${clientId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClientName(response.data?.username);
      } catch (error) {
        console.error("Error al obtener los datos del cliente:", error);
        setErrorClientModalOpen(true);
        setLoggedIn(false);
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/menu/filter-by-client/?id_cliente=${clientId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMenuData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de los menus:", error);
        setErrorMenuModalOpen(true);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        setLoggedIn={setLoggedIn}
        signUpModalOpen={signUpModalOpen}
        setSignUpModalOpen={setSignUpModalOpen}
        requestModalOpen={requestModalOpen}
        setRequestModalOpen={setRequestModalOpen}
        isAdminUser={isAdminUser}
        setAdminUser={setAdminUser}
        clientId={clientId}
      />
      {errorClientModalOpen && (
        <ErrorMessagePage
          isOpen={errorClientModalOpen}
          onClose={() => setErrorClientModalOpen(false)}
          message={"Error loading user data."}
        />
      )}
      {errorMenuModalOpen && (
        <ErrorMessagePage
          isOpen={errorMenuModalOpen}
          onClose={() => setErrorMenuModalOpen(false)}
          message={"Error loading menu data."}
        />
      )}
      <div className="clientPageContainer">
        <h1>Welcome, {clientName}</h1>
        <h2>Weekly Menu</h2>
        <div className="menuListContainer">
          {Boolean(menuData?.length > 0) ? (
            menuData.map((menuItem) => (
              <MenuCard
                key={menuItem.id}
                id={menuItem.id}
                initialDate={menuItem.start_date}
                finalDate={menuItem.end_date}
              />
            ))
          ) : (
            <p>No hay menús disponibles aún.</p>
          )}
        </div>
        <RequestPage isOpen={requestModalOpen} onClose={() => setRequestModalOpen(false)} clientId={clientId}/>
      </div>
    </>
  );
};

export default ClientPage;
