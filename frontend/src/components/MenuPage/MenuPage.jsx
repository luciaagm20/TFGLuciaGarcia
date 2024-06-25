import Navbar from "../Navbar/Navbar";
import "./menuPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Button/Button";

const MenuPage = ({ isLoggedIn, setLoggedIn, isAdminUser, setAdminUser }) => {
  const { id } = useParams();
  const [menuData, setMenuData] = useState(null);
  const [mealData, setMealData] = useState({});
  // const [foodData, setFoodData] = useState({});

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
        // setMenuData(response.data?.[0]);
        console.log(response);
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
        setLoggedIn(false);
        navigate("/login");
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
      console.log("food_ids", food_ids, mealData);
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
          setLoggedIn(false);
          navigate("/");
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
        // Simular un clic en el enlace para iniciar la descarga
        link.click();
      })
      .catch((error) => {
        console.error("Error al descargar el menú en PDF:", error);
        // Manejar errores si es necesario
      });
  };

  if (!menuData) {
    return <div>Loading...</div>;
  }

  // return (
  //   <>
  //     <Navbar
  //       isLoggedIn={isLoggedIn}
  //       setLoggedIn={setLoggedIn}
  //       isAdminUser={isAdminUser}
  //       setAdminUser={setAdminUser}
  //     />
  //     <div className="menuPageContainer">
  //       <h1>Weekly Menu</h1>
  //       <span>{`${menuData?.start_date} - ${menuData?.end_date}`}</span>
  //       <table>
  //         <thead>
  //           <tr>
  //             <th>Monday</th>
  //             <th>Tuesday</th>
  //             <th>Wednesday</th>
  //             <th>Thursday</th>
  //             <th>Friday</th>
  //             <th>Saturday</th>
  //             <th>Sunday</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           <tr>
  //             {Object.values(mealData).map((el) => (
  //               <td>
  //                 {el.map((mealDay) => (
  //                   <div>
  //                     {mealDay.meal} <br />
  //                     {`${mealDay.food} (${mealDay.calories} kcal)`}
  //                   </div>
  //                 ))}
  //               </td>
  //             ))}
  //           </tr>
  //         </tbody>
  //       </table>
  //       <button onClick={downloadPDF}>Descargar Menú Semanal en PDF</button>
  //     </div>
  //   </>
  // );
  return (
    <>
    <Navbar
          isLoggedIn={isLoggedIn}
          setLoggedIn={setLoggedIn}
          isAdminUser={isAdminUser}
          setAdminUser={setAdminUser}
        />
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
