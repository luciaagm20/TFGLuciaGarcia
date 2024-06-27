import Navbar from "../Navbar/Navbar";
import "./menuPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Button/Button";
import ErrorMessagePage from "../ErrorMessage/ErrorMessagePage";


const MenuPage = ({ isLoggedIn, setLoggedIn, isAdminUser, setAdminUser }) => {
  const { id } = useParams();
  const [menuData, setMenuData] = useState(null);
  const [mealData, setMealData] = useState({});

  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [errorDownloadModalOpen, setErrorDownloadModalOpen] = useState(false);
  const [errorMenuModalOpen, setErrorMenuModalOpen] = useState(false);


  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const clientId = localStorage.getItem("clientId");


  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/menu/${id}/`,
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
    const fetchMealData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/foodIntake/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const mealsByDay = Object.groupBy(
          response.data,
          ({ day_of_week }) => day_of_week
        );
        setMealData(mealsByDay);
      } catch (error) {
        console.error("Error al obtener los datos del menú:", error);
        setErrorMenuModalOpen(true)
      }
    };

    fetchMenuData();
    fetchMealData();
  }, [id]);

  useEffect(() => {
    if (Boolean(Object.keys(mealData).length)) {
      const food_ids = Object.values(mealData).reduce((acc, week) => {
        const weekFoodIds = week.map((day) => day.food);
        return [...acc, ...weekFoodIds];
      }, []);
      const fetchFoodData = async () => {
        try {
          const response = await axios.post(
            `http://localhost:8000/api/food/retrieve_multiple/`,
            { ids: food_ids },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const foodData = response.data;
          const formattedMealData = Object.values(mealData).reduce(
            (acc, week) => {
              const updatedWeek = week.map((day) => {
                const mealFood = foodData.find((food) => {
                  return food.id === day.food;
                });
                return { ...day, food: mealFood.name };
              });
              return { ...acc, [updatedWeek[0].day_of_week]: updatedWeek };
            },
            {}
          );
          setMealData(formattedMealData);
        } catch (error) {
          console.error("Error al obtener los datos del menú:", error);
          setErrorMenuModalOpen(true)

        }
      };

      fetchFoodData();
    }
    // esto es lo que tiene que cambiar para que entre en el useEffect
  }, [Object.keys(mealData).length]);

  const downloadPDF = () => {
    axios({
      url: `http://localhost:8000/api/menu/download-weekly-menu/?menu_id=${id}`,
      method: "GET",
      responseType: "blob", // importante para recibir datos binarios
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // Crear una URL local para el archivo blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        // Crear un elemento <a> para descargar el archivo
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `weekly_menu_${id}.pdf`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("Error al descargar el menú en PDF:", error);
        setErrorDownloadModalOpen(true)
      });
  };

  if (!menuData) {
    return <div>Loading...</div>;
  }

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
      {errorMenuModalOpen && (
        <ErrorMessagePage
          isOpen={errorMenuModalOpen}
          onClose={() => setErrorMenuModalOpen(false)}
          message={"Oops! It seems there was an error loading the menu. Please, try again."}
        />
      )}
      {errorDownloadModalOpen && (
        <ErrorMessagePage
          isOpen={errorDownloadModalOpen}
          onClose={() => setErrorDownloadModalOpen(false)}
          message={"Oops! It seems there was an error loading the PDF. Please, try again."}
        />
      )}
      <div className="menuPageContainer">
        
        <h1>Weekly Menu</h1>
        <span>{`${menuData?.start_date}`}</span>
        <span>{`${menuData?.end_date}`}</span>
        <div className="table">
          {Object.keys(mealData).map((day, index) => (
            <div className="dayCard" key={index}>
              <h3>{day}</h3>
              {mealData[day].map((mealDay, idx) => (
                <div className="meal" key={idx}>
                  <p>
                    <strong>{mealDay.meal}</strong>
                  </p>
                  <p>{`${mealDay.food} (${mealDay.calories} kcal)`}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <Button value="Download PDF" onClick={downloadPDF} disabled={false} />
      </div>
    </>
  );
};

export default MenuPage;
