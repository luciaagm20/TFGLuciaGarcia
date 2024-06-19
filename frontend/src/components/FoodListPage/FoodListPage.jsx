import Navbar from "../Navbar/Navbar";
import "./foodListPage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AddFoodPage from "../AddFoodPage/AddFoodPage";
import Modal from "../Modal/Modal";

const groupOptions = [
  { label: "starters and dishes", value: "starters and dishes" },
  {
    label: "fruits, vegetables, legumes and nuts",
    value: "fruits, vegetables, legumes and nuts",
  },
  { label: "cereal products", value: "cereal products" },
  { label: "meat, egg and fish", value: "meat, egg and fish" },
  { label: "milk and milk products", value: "milk and milk products" },
  { label: "beverages", value: "beverages" },
  { label: "sugar and confectionery", value: "sugar and confectionery" },
  { label: "ice cream and sorbet", value: "ice cream and sorbet" },
  { label: "fats and oils", value: "fats and oils" },
  { label: "miscellaneous", value: "miscellaneous" },
];

const FoodListPage = ({
  isLoggedIn,
  setLoggedIn,
  isAdminUser,
  setAdminUser,
}) => {
  const [foodData, setFoodData] = useState(null);
  const [postFoodModalOpen, setPostFoodModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
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

  const handleDelete = async (foodId) => {
    try {
      await axios.delete(`http://localhost:8000/api/food/${foodId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Filtrar la comida eliminada de la lista
      setFoodData(foodData.filter((food) => food.id !== foodId));
    } catch (error) {
      console.error("Error al eliminar el alimento:", error);
    }
  };

  const handleFilterByGroupName = async (groupName) => {
    try {
      debugger
      const url = groupName
        ? `http://localhost:8000/api/food/filter-by-group-name/?group_name=${encodeURIComponent(groupName)}`
        : "http://localhost:8000/api/food/";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFoodData(response.data);
    } catch (error) {
      console.error("Error al filtrar alimentos por grupo:", error);
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
      <div className="foodListPageContainer">
        {/* <button
          onClick={() => {
            setPostFoodModalOpen(!postFoodModalOpen);
          }}
        >
          Add new food
        </button> */}
        <select
          value={selectedGroup}
          onChange={(e) => {
            setSelectedGroup(e.target.value);
            handleFilterByGroupName(e.target.value);
          }}
        >
          <option value="">All Groups</option>
          {groupOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button onClick={() => navigate("/register_food")}>Add new food</button>
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
                  <button
                    onClick={() => handleDelete(data.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={postFoodModalOpen}
        onClose={() => setPostFoodModalOpen(false)}
      >
        <AddFoodPage />
      </Modal>
    </>
  );
};

export default FoodListPage;
