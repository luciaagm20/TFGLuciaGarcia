import Navbar from "../Navbar/Navbar";
import "./foodListPage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AddFoodPage from "../AddFoodPage/AddFoodPage";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import RequestPage from "../RequestPage/RequestPage";
import ErrorMessagePage from "../ErrorMessage/ErrorMessagePage";

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
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [errorFoodModalOpen, setErrorFoodModalOpen] = useState(false);
  const [errorDeleteModalOpen, setErrorDeleteModalOpen] = useState(false);
  const [errorFilterModalOpen, setErrorFilterModalOpen] = useState(false);

  const [foodData, setFoodData] = useState(null);
  const [postFoodModalOpen, setPostFoodModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const clientId = localStorage.getItem("clientId");


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
        setErrorFoodModalOpen(true);
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
      setFoodData(foodData.filter((food) => food.id !== foodId));
    } catch (error) {
      console.error("Error al eliminar el alimento:", error);
      setErrorDeleteModalOpen(true);
    }
  };

  const handleFilterByGroupName = async (groupName) => {
    try {
      const url = groupName
        ? `http://localhost:8000/api/food/filter-by-group-name/?group_name=${encodeURIComponent(
            groupName
          )}`
        : "http://localhost:8000/api/food/";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFoodData(response.data);
    } catch (error) {
      console.error("Error al filtrar alimentos por grupo:", error);
      setErrorFilterModalOpen(true);
    }
  };

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

      {errorFoodModalOpen && (
        <ErrorMessagePage
          isOpen={errorFoodModalOpen}
          onClose={() => setErrorFoodModalOpen(false)}
          message={"Error loading food data"}
        />
      )}
      {errorDeleteModalOpen && (
        <ErrorMessagePage
          isOpen={errorDeleteModalOpen}
          onClose={() => setErrorDeleteModalOpen(false)}
          message={"Error deleting the food"}
        />
      )}
      {errorFilterModalOpen && (
        <ErrorMessagePage
          isOpen={errorFilterModalOpen}
          onClose={() => setErrorFilterModalOpen(false)}
          message={"Error filtering the food"}
        />
      )}
      <div className="foodListPageContainer">
        <Dropdown
          options={groupOptions}
          onChange={(selected) => {
            setSelectedGroup(selected);
            handleFilterByGroupName(selected.value);
          }}
          placeholder="All"
          multipleSelect={false}
          value={selectedGroup}
          label="Groups"
        />

        {isAdminUser && (
          <Button
            value="Add new food"
            onClick={() => navigate("/register_food")}
            disabled={!isAdminUser}
          />
        )}
        <h2>List of food database</h2>
        <div className="foodTableContainer">
          <table className="foodTable">
            <thead>
              <tr>
                <th>Food name</th>
                <th>Group name - code</th>
                <th>Subgroup name - code</th>
                <th></th>
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
                    <div>
                      <Button
                        value="More Info"
                        onClick={() => navigate(`/info_food/${data.id}`)}
                        disabled={false}
                      />
                      {isAdminUser && (
                        <Button
                          value="Delete"
                          onClick={() => handleDelete(data.id)}
                          disabled={!isAdminUser}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={postFoodModalOpen}
        onClose={() => setPostFoodModalOpen(false)}
      >
        <AddFoodPage />
      </Modal>
      <RequestPage
        isOpen={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        clientId={clientId}
      />
    </>
  );
};

export default FoodListPage;
