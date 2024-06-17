import "./adminPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const AdminPage = ({ isLoggedIn, setLoggedIn }) => {
  const [clientData, setClientData] = useState(null);
  const [menuData, setMenuData] = useState(null);
  const [listClients, setListClients] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isLoggedIn) {
          navigate("/login");
          return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
          setLoggedIn(false);
          navigate("/login");
          return;
        }

        const clientId = localStorage.getItem("clientId");
        if (!clientId) {
          console.error("No client ID found");
          setLoggedIn(false);
          navigate("/login");
          return;
        }
        const response = await axios.get(
          `http://localhost:8000/api/clients/${clientId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClientData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos del cliente:", error);
        setLoggedIn(false);
        navigate("/login");
      }
    };

    fetchData();
  }, [isLoggedIn, setLoggedIn, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoggedIn(false);
          navigate("/login");
          return;
        }

        const clientId = localStorage.getItem("clientId");

        const response = await axios.get(
          `http://localhost:8000/api/menu/${clientId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMenuData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de los menus:", error);
        setLoggedIn(false);
        navigate("/login");
      }
    };

    fetchData();
  }, [isLoggedIn, setLoggedIn, navigate]);

  if (!clientData) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
      <Navbar listClients={listClients} setListClients={setListClients} />
      <div className="adminPageContainer">
        <h1>Wellcome, {clientData.username}</h1>
        <h2>Weekly Menu</h2>
        {menuData.length > 0 ? (
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
    </>
  );
};

export default ClientPage;
