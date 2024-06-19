import Navbar from "../Navbar/Navbar";
import "./foodListPage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const FoodListPage = ({
  isLoggedIn,
  setLoggedIn,
  isAdminUser,
  setAdminUser,
}) => {
  const [foodData, setFoodData] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/food/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFoodData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de los alimentos:", error);
        setLoggedIn(false);
        navigate("/login");
      }
    };

    fetchFoodData();
  }, [token, setLoggedIn, navigate]);

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        setLoggedIn={setLoggedIn}
        isAdminUser={isAdminUser}
        setAdminUser={setAdminUser}
      />
      <div className="foodListPageContainer">
        <h2>List of food database</h2>
        <table>
          <thead>
            <tr>
              <th>Food name</th>
              <th>Group name - code</th>
              <th>Subgroup name - code</th>
            </tr>
          </thead>
          <tbody>
            {foodData?.map((data) => (
              <tr key={data.id}>
                <td>{data.food_name}</td>
                <td>
                  {data.group_name} - {data.group_code}
                </td>
                <td>
                  {data.subgroup_name} - {data.subgroup_code}
                </td>
                <td>
                  <a href={`/info_food/${data.id}`} className="btn btn-primary">
                    More Info
                  </a>
                  {/* <button
                    onClick={() => {
                      // TODO: Send post with updated info
                      handleSubmitProfile();
                      const path = generatePath("/client_page/:clientId", {
                        data.id,
                      });
                      navigate(path);
                    }}
                  >
                    Save changes
                  </button> */}
                  {/* <a href={`/delete/${data.id}`} className="btn btn-danger">
                    Delete
                  </a> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FoodListPage;
