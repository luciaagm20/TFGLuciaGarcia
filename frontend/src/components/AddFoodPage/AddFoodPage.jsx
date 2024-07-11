import "./addFoodPage.css";
import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import Input from "../Input/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../Button/Button";
import Navbar from "../Navbar/Navbar";
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

const AddFoodPage = ({
  isLoggedIn,
  setLoggedIn,
  isAdminUser,
  setAdminUser,
}) => {
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const [registerFoodName, setRegisterFoodName] = useState("");
  const [registerWater, setRegisterWater] = useState(0);
  const [registerProtein, setRegisterProtein] = useState(0);
  const [registerCarbohidrates, setRegisterCarbohidrates] = useState(0);
  const [registerFats, setRegisterFats] = useState(0);
  const [registerSugars, setRegisterSugars] = useState(0);
  const [registerGlucose, setRegisterGlucose] = useState(0);
  const [registerLactose, setRegisterLactose] = useState(0);
  const [registerFoodCode, setRegisterFoodCode] = useState(0);
  const [registerGroupCode, setRegisterGroupCode] = useState(0);
  const [registerSubgroupCode, setRegisterSubgroupCode] = useState(0);

  const [selectedGroup, setSelectedGroup] = useState([]);
  const [selectedSubGroup, setSelectedSubGroup] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = () => {
    const foodData = {
      group_code: registerGroupCode,
      subgroup_code: registerSubgroupCode,
      group_name: selectedGroup.value,
      subgroup_name: selectedSubGroup.value,
      food_code: registerFoodCode,
      food_name: registerFoodName,
      water: registerWater,
      protein: registerProtein,
      carbohydrates: registerCarbohidrates,
      fats: registerFats,
      sugars: registerSugars,
      glucose: registerGlucose,
      lactose: registerLactose,
    };

    handleRegistration(foodData);
  };

  const handleRegistration = async (foodData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/food/",
        foodData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Alimento registrado con éxito")
    } catch (error) {
      console.error("Error al registrar el alimento:", error);
      setErrorModalOpen(true);
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
      {errorModalOpen && (
        <ErrorMessagePage
          isOpen={errorModalOpen}
          onClose={() => setErrorModalOpen(false)}
          message={"Error registering the food. Please fill in all fields correctly and try again."}
        />
      )}
      <div className="addFoodPageContainer">
        <Input
          label="Food name"
          value={registerFoodName}
          type="text"
          placeholder="Food name"
          required={true}
          onChange={(e) => setRegisterFoodName(e.target.value)}
        />
        <Input
          label="Water"
          value={registerWater}
          type="number"
          placeholder="Water"
          required={true}
          onChange={(e) => setRegisterWater(e.target.value)}
        />
        <Input
          label="Protein"
          value={registerProtein}
          type="number"
          placeholder="Protein"
          required={true}
          onChange={(e) => setRegisterProtein(e.target.value)}
        />
        <Input
          label="Carbohidrates"
          value={registerCarbohidrates}
          type="number"
          placeholder="Carbohidrates"
          required={true}
          onChange={(e) => setRegisterCarbohidrates(e.target.value)}
        />
        <Input
          label="Fats"
          value={registerFats}
          type="number"
          placeholder="Fats"
          required={true}
          onChange={(e) => setRegisterFats(e.target.value)}
        />
        <Input
          label="Sugars"
          value={registerSugars}
          type="number"
          placeholder="Sugars"
          required={true}
          onChange={(e) => setRegisterSugars(e.target.value)}
        />
        <Input
          label="Glucose"
          value={registerGlucose}
          type="number"
          placeholder="Glucose"
          required={true}
          onChange={(e) => setRegisterGlucose(e.target.value)}
        />
        <Input
          label="Lactose"
          value={registerLactose}
          type="number"
          placeholder="Lactose"
          required={true}
          onChange={(e) => setRegisterLactose(e.target.value)}
        />
        <Input
          label="Group code"
          value={registerGroupCode}
          type="number"
          placeholder="Group code"
          required={true}
          disabled={true}
        />
        <Input
          label="Subgroup code"
          value={registerSubgroupCode}
          type="number"
          placeholder="Subgroup code"
          required={true}
          disabled={true}
        />
        <Dropdown
          options={groupOptions}
          onChange={(selected) => {
            setSelectedGroup(selected);
            setSelectedSubGroup(subGroupOptions[selectedGroup?.value]);
            setRegisterGroupCode(selected?.code);
          }}
          placeholder="Select group"
          multipleSelect={false}
          value={selectedGroup}
          label="Group"
        />
        <Dropdown
          options={subGroupOptions[selectedGroup?.value]}
          onChange={(selected) => {
            setSelectedSubGroup(selected);
            setRegisterSubgroupCode(selected?.code);
          }}
          placeholder="Select subgroup"
          multipleSelect={false}
          value={selectedSubGroup}
          label="Subgroup"
        />
        <div className="foodSaveButtons">
          <Button
            value="Save food"
            onClick={() => {
              handleSubmit();
              navigate("/list_food");
            }}
            disabled={false}
          />
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

export default AddFoodPage;
