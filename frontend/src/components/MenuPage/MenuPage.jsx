import Navbar from "../Navbar/Navbar";
import "./menuPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const MenuPage = ({ isLoggedIn, setLoggedIn }) => {
  const { id } = useParams();
  const [menuData, setMenuData] = useState(null);
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

        const response = await axios.get(
          `http://localhost:8000/api/menu/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMenuData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos del menú:", error);
        setLoggedIn(false);
        navigate("/login");
      }
    };

    fetchData();
  }, [id, isLoggedIn, setLoggedIn, navigate]);

  if (!menuData) {
    return <div>Loading...</div>;
  }

  console.log(menuData.end_date)

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
      <div className="menuPageContainer">
        <h1>Weekly Menu</h1>
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Start date</th>
              <th>End date</th>
            </tr>
          </thead>
          <tbody>
            {/* Aqui no me salen los datos aunque se me imprimen bien arriba */}
            <tr key={menuData.id}>
              <td>{menuData.client_id}</td>
              <td>{menuData.start_date}</td>
              <td>{menuData.end_date}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MenuPage;
