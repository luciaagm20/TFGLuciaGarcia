import { useState, useEffect } from "react";
import { useNavigate, useParams, generatePath } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import Input from "../Input/Input";
import Navbar from "../Navbar/Navbar";
import "./foodInfoPage.css";
import axios from "axios";
import Button from "../Button/Button";
import ErrorMessagePage from "../ErrorMessage/ErrorMessagePage";

const groupOptions = [
  { label: "starters and dishes", value: "starters and dishes", code: 1 },
  {
    label: "fruits, vegetables, legumes and nuts",
    value: "fruits, vegetables, legumes and nuts",
    code: 2,
  },
  { label: "cereal products", value: "cereal products", code: 3 },
  { label: "meat, egg and fish", value: "meat, egg and fish", code: 4 },
  { label: "milk and milk products", value: "milk and milk products", code: 5 },
  { label: "beverages", value: "beverages", code: 6 },
  {
    label: "sugar and confectionery",
    value: "sugar and confectionery",
    code: 7,
  },
  { label: "ice cream and sorbet", value: "ice cream and sorbet", code: 8 },
  { label: "fats and oils", value: "fats and oils", code: 9 },
  { label: "miscellaneous", value: "miscellaneous", code: 10 },
];
const subGroupOptions = {
  "starters and dishes": [
    { label: "mixed salads", value: "mixed salads", code: 101 },
    { label: "soups", value: "soups", code: 102 },
    { label: "dishes", value: "dishes", code: 103 },
    {
      label: "pizzas, crepe and pies",
      value: "pizzas, crepe and pies",
      code: 104,
    },
    { label: "sandwiches", value: "sandwiches", code: 105 },
    {
      label: "savoury pastries and other starters",
      value: "savoury pastries and other starters",
      code: 106,
    },
  ],
  "fruits, vegetables, legumes and nuts": [
    { label: "vegetables", value: "vegetables", code: 201 },
    {
      label: "potatoes and other tubers",
      value: "potatoes and other tubers",
      code: 202,
    },
    { label: "legumes", value: "legumes", code: 203 },
    { label: "fruits", value: "fruits", code: 204 },
    { label: "nuts and seeds", value: "nuts and seeds", code: 205 },
  ],
  "cereal products": [
    {
      label: "pasta, rice and grains",
      value: "pasta, rice and grains",
      code: 301,
    },
    { label: "breads and similar", value: "breads and similar", code: 302 },
    { label: "savoury biscuits", value: "savoury biscuits", code: 303 },
  ],
  "meat, egg and fish": [
    { label: "cooked meat", value: "cooked meat", code: 401 },
    { label: "raw meat", value: "raw meat", code: 402 },
    {
      label: "delicatessen meat and similar",
      value: "delicatessen meat and similar",
      code: 403,
    },
    { label: "other meat products", value: "other meat products", code: 404 },
    { label: "fish, cooked", value: "fish, cooked", code: 405 },
    { label: "seafood, cooked", value: "seafood, cooked", code: 407 },
    { label: "seafood, raw", value: "seafood, raw", code: 408 },
    { label: "fish products", value: "fish products", code: 409 },
    { label: "eggs", value: "eggs", code: 410 },
    { label: "meat substitute", value: "meat substitute", code: 411 },
  ],
  "milk and milk products": [
    { label: "milk", value: "milk", code: 501 },
    {
      label: "dairy products and similar",
      value: "dairy products and similar",
      code: 502,
    },
    { label: "cheese and similar", value: "cheese and similar", code: 503 },
    { label: "cream and similar", value: "cream and similar", code: 504 },
  ],
  beverages: [
    {
      label: "non-alcoholic beverages",
      value: "non-alcoholic beverages",
      code: 602,
    },
    { label: "alcoholic beverages", value: "alcoholic beverages", code: 603 },
  ],
  "sugar and confectionery": [
    { label: "sugars and honey", value: "sugars and honey", code: 701 },
    {
      label: "chocolate and chocolate products",
      value: "chocolate and chocolate products",
      code: 702,
    },
    {
      label: "non-chocolate confectionery",
      value: "non-chocolate confectionery",
      code: 703,
    },
    { label: "jam", value: "jam", code: 704 },
    { label: "Viennese pastries", value: "Viennese pastries", code: 705 },
    { label: "sweet biscuits", value: "sweet biscuits", code: 706 },
    { label: "breakfast cereals", value: "breakfast cereals", code: 707 },
    { label: "cereal bars", value: "cereal bars", code: 708 },
    { label: "cakes and pastry", value: "cakes and pastry", code: 709 },
  ],
  "ice cream and sorbet": [
    { label: "ice cream", value: "ice cream", code: 801 },
    { label: "sorbet", value: "sorbet", code: 802 },
    { label: "frozen desserts", value: "frozen desserts", code: 803 },
  ],
  "fats and oils": [
    { label: "butters", value: "butters", code: 901 },
    { label: "vegetable oils", value: "vegetable oils", code: 902 },
    { label: "margarines", value: "margarines", code: 903 },
    { label: "fish oils", value: "fish oils", code: 904 },
    { label: "other fats", value: "other fats", code: 905 },
  ],
  miscellaneous: [
    { label: "sauces", value: "sauces", code: 1001 },
    { label: "condiments", value: "condiments", code: 1002 },
    { label: "cooking aids", value: "cooking aids", code: 1003 },
    { label: "salts", value: "salts", code: 1004 },
    { label: "spices", value: "spices", code: 1005 },
    { label: "herbs", value: "herbs", code: 1006 },
    { label: "seaweed", value: "seaweed", code: 1007 },
    {
      label: "foods for particular nutritional uses",
      value: "foods for particular nutritional uses",
      code: 1008,
    },
    {
      label: "miscellaneous ingredients",
      value: "miscellaneous ingredients",
      code: 1009,
    },
  ],
};

const FoodInfoPage = ({
  isLoggedIn,
  setLoggedIn,
  isAdminUser,
  setAdminUser,
}) => {
  const { foodId } = useParams();
  const [errorGetModalOpen, setErrorGetModalOpen] = useState(false);
  const [errorUpdateModalOpen, setErrorUpdateModalOpen] = useState(false);

  const [updatedFoodName, setUpdatedFoodName] = useState("");
  const [updatedWater, setUpdatedWater] = useState(0);
  const [updatedProtein, setUpdatedProtein] = useState(0);
  const [updatedCarbohidrates, setUpdatedCarbohidrates] = useState(0);
  const [updatedFats, setUpdatedFats] = useState(0);
  const [updatedSugars, setUpdatedSugars] = useState(0);
  const [updatedGlucose, setUpdatedGlucose] = useState(0);
  const [updatedLactose, setUpdatedLactose] = useState(0);
  const [updatedFoodCode, setUpdatedFoodCode] = useState(0);
  const [updatedGroupCode, setUpdatedGroupCode] = useState(0);
  const [updatedSubgroupCode, setUpdatedSubgroupCode] = useState(0);

  const [selectedGroup, setSelectedGroup] = useState([]);
  const [selectedSubGroup, setSelectedSubGroup] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/food/${foodId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUpdatedFoodName(response.data?.food_name);
        setUpdatedWater(response.data?.water);
        setUpdatedProtein(response.data?.protein);
        setUpdatedCarbohidrates(response.data?.carbohydrates);
        setUpdatedFats(response.data?.fats);
        setUpdatedSugars(response.data?.sugars);
        setUpdatedGlucose(response.data?.glucose);
        setUpdatedLactose(response.data?.lactose);
        setUpdatedFoodCode(response.data?.food_code);
        setUpdatedGroupCode(response.data?.group_code);
        setUpdatedSubgroupCode(response.data?.subgroup_code);
        setSelectedGroup([
          {
            label: response.data?.group_name,
            value: response.data?.group_name,
          },
        ]);
        setSelectedSubGroup([
          {
            label: response.data?.subgroup_name,
            value: response.data?.subgroup_name,
          },
        ]);
      } catch (error) {
        console.error("Error al obtener los datos del alimento:", error);
        setErrorGetModalOpen(true);
      }
    };

    fetchData();
    // array vacio (de dependencias) porque solo quiero que se haga cuando se inicialice la página
  }, []);

  const handleSubmitFood = () => {
    const formData = {
      group_code: updatedGroupCode,
      subgroup_code: updatedSubgroupCode,
      group_name: selectedGroup.value,
      subgroup_name: selectedSubGroup.value,
      food_code: updatedFoodCode,
      food_name: updatedFoodName,
      water: updatedWater,
      protein: updatedProtein,
      carbohydrates: updatedCarbohidrates,
      fats: updatedFats,
      sugars: updatedSugars,
      glucose: updatedGlucose,
      lactose: updatedLactose,
    };
    updateFood(formData);
  };

  const updateFood = async (formData) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/food/${foodId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error al modificar los datos:", error);
      setErrorUpdateModalOpen(true);
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

      {errorGetModalOpen && (
        <ErrorMessagePage
          isOpen={errorGetModalOpen}
          onClose={() => setErrorGetModalOpen(false)}
          message={"Error retrieving food data. Please, try again."}
        />
      )}
      {errorUpdateModalOpen && (
        <ErrorMessagePage
          isOpen={errorUpdateModalOpen}
          onClose={() => setErrorUpdateModalOpen(false)}
          message={"Error modifying food data. Please, try again."}
        />
      )}
      <div className="foodInfoWrapper">
        <Input
          label="Food name"
          value={updatedFoodName}
          type="text"
          placeholder="Food name"
          required={true}
          onChange={
            !isAdminUser ? null : (e) => setUpdatedFoodName(e.target.value)
          }
          className={!isAdminUser ? "disabled-input" : ""}
        />
        <Input
          label="Water"
          value={updatedWater}
          type="number"
          placeholder="Water"
          required={true}
          onChange={
            !isAdminUser ? null : (e) => setUpdatedWater(e.target.value)
          }
          className={!isAdminUser ? "disabled-input" : ""}
        />
        <Input
          label="Protein"
          value={updatedProtein}
          type="number"
          placeholder="Protein"
          required={true}
          onChange={
            !isAdminUser ? null : (e) => setUpdatedProtein(e.target.value)
          }
          className={!isAdminUser ? "disabled-input" : ""}
        />
        <Input
          label="Carbohidrates"
          value={updatedCarbohidrates}
          type="number"
          placeholder="Carbohidrates"
          required={true}
          onChange={
            !isAdminUser ? null : (e) => setUpdatedCarbohidrates(e.target.value)
          }
          className={!isAdminUser ? "disabled-input" : ""}
        />
        <Input
          label="Fats"
          value={updatedFats}
          type="number"
          placeholder="Fats"
          required={true}
          onChange={!isAdminUser ? null : (e) => setUpdatedFats(e.target.value)}
          className={!isAdminUser ? "disabled-input" : ""}
        />
        <Input
          label="Sugars"
          value={updatedSugars}
          type="number"
          placeholder="Sugars"
          required={true}
          onChange={
            !isAdminUser ? null : (e) => setUpdatedSugars(e.target.value)
          }
          className={!isAdminUser ? "disabled-input" : ""}
        />
        <Input
          label="Glucose"
          value={updatedGlucose}
          type="number"
          placeholder="Glucose"
          required={true}
          onChange={
            !isAdminUser ? null : (e) => setUpdatedGlucose(e.target.value)
          }
          className={!isAdminUser ? "disabled-input" : ""}
        />
        <Input
          label="Lactose"
          value={updatedLactose}
          type="number"
          placeholder="Lactose"
          required={true}
          onChange={
            !isAdminUser ? null : (e) => setUpdatedLactose(e.target.value)
          }
          className={!isAdminUser ? "disabled-input" : ""}
        />

        <Dropdown
          // options={groupOptions}
          options={isAdminUser ? groupOptions: []}
          onChange={
            !isAdminUser
              ? null
              : (selected) => {
                  setSelectedGroup(selected);
                  setSelectedSubGroup(subGroupOptions[selectedGroup?.value]);
                  setUpdatedGroupCode(selected?.code);
                }
          }
          placeholder="Select group"
          multipleSelect={false}
          value={selectedGroup}
          label="Group"
          className={!isAdminUser ? "disabled-input" : ""}
        />

        <Dropdown
          options={subGroupOptions[selectedGroup?.value]}
          onChange={
            !isAdminUser
              ? null
              : (selected) => {
                  setSelectedSubGroup(selected);
                  setUpdatedSubgroupCode(selected?.code);
                }
          }
          placeholder="Select subgroup"
          multipleSelect={false}
          value={selectedSubGroup}
          label="Subgroup"
          className={!isAdminUser ? "disabled-input" : ""}
        />

        {isAdminUser && (
          <Input
            label="Group code"
            value={updatedGroupCode}
            type="number"
            placeholder="Group code"
            required={true}
            disabled={true}
            className="disabled-input"
          />
        )}

        {isAdminUser && (
          <Input
            label="Subgroup code"
            value={updatedSubgroupCode}
            type="number"
            placeholder="Subgroup code"
            required={true}
            disabled={true}
            className="disabled-input"
          />
        )}
        <div className="buttons">
          {isAdminUser && (
            <Button
              value="Save changes"
              onClick={() => {
                handleSubmitFood();
                navigate("/list_food");
              }}
              disabled={!isAdminUser}
            />
          )}

          <Button
            value="Cancel"
            onClick={() => {
              navigate(-1);
            }}
            disabled={false}
          />
        </div>
      </div>
    </>
  );
};

export default FoodInfoPage;
