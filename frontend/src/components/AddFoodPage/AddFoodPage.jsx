import "./addFoodPage.css";
import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import Input from "../Input/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../Modal/Modal";

const groupOptions = [
  { label: "starters and dishes", value: "starters and dishes", code: 1 },
  {
    label: "fruits, vegetables, legumes and nuts",
    value: "fruits, vegetables, legumes and nuts",
    code: 3,
  },
  { label: "cereal products", value: "cereal products", code: 4 },
  { label: "meat, egg and fish", value: "meat, egg and fish", code: 6 },
  { label: "milk and milk products", value: "milk and milk products", code: 7 },
  { label: "beverages", value: "beverages", code: 8 },
  {
    label: "sugar and confectionery",
    value: "sugar and confectionery",
    code: 9,
  },
  { label: "ice cream and sorbet", value: "ice cream and sorbet", code: 10 },
  { label: "fats and oils", value: "fats and oils", code: 11 },
  { label: "miscellaneous", value: "miscellaneous", code: 12 },
];
const subGroupOptions = {
  "starters and dishes": [
    { label: "mixed salads", value: "mixed salads" },
    { label: "soups", value: "soups" },
    { label: "dishes", value: "dishes" },
    { label: "pizzas, crepe and pies", value: "pizzas, crepe and pies" },
    { label: "sandwiches", value: "sandwiches" },
    {
      label: "savoury pastries and other starters",
      value: "savoury pastries and other starters",
    },
  ],
  "fruits, vegetables, legumes and nuts": [
    { label: "vegetables", value: "vegetables" },
    { label: "potatoes and other tubers", value: "potatoes and other tubers" },
    { label: "legumes", value: "legumes" },
    { label: "fruits", value: "fruits" },
    { label: "nuts and seeds", value: "nuts and seeds" },
  ],
  "cereal products": [
    { label: "pasta, rice and grains", value: "pasta, rice and grains" },
    { label: "breads and similar", value: "breads and similar" },
    { label: "savoury biscuits", value: "savoury biscuits" },
  ],
  "meat, egg and fish": [
    { label: "cooked meat", value: "cooked meat" },
    { label: "raw meat", value: "raw meat" },
    {
      label: "delicatessen meat and similar",
      value: "delicatessen meat and similar",
    },
    { label: "other meat products", value: "other meat products" },
    { label: "fish, cooked", value: "fish, cooked" },
    { label: "seafood, cooked", value: "seafood, cooked" },
    { label: "seafood, raw", value: "seafood, raw" },
    { label: "fish products", value: "fish products" },
    { label: "eggs", value: "eggs" },
    { label: "meat substitute", value: "meat substitute" },
  ],
  "milk and milk products": [
    { label: "milk", value: "milk" },
    {
      label: "dairy products and similar",
      value: "dairy products and similar",
    },
    { label: "cheese and similar", value: "cheese and similar" },
    { label: "cream and similar", value: "cream and similar" },
  ],
  beverages: [
    { label: "non-alcoholic beverages", value: "non-alcoholic beverages" },
    { label: "alcoholic beverages", value: "alcoholic beverages" },
  ],
  "sugar and confectionery": [
    { label: "sugars and honey", value: "sugars and honey" },
    {
      label: "chocolate and chocolate products",
      value: "chocolate and chocolate products",
    },
    {
      label: "non-chocolate confectionery",
      value: "non-chocolate confectionery",
    },
    { label: "jam", value: "jam" },
    { label: "Viennese pastries", value: "Viennese pastries" },
    { label: "sweet biscuits", value: "sweet biscuits" },
    { label: "breakfast cereals", value: "breakfast cereals" },
    { label: "cereal bars", value: "cereal bars" },
    { label: "cakes and pastry", value: "cakes and pastry" },
  ],
  "ice cream and sorbet": [
    { label: "ice cream", value: "ice cream" },
    { label: "sorbet", value: "sorbet" },
    { label: "frozen desserts", value: "frozen desserts" },
  ],
  "fats and oils": [
    { label: "butters", value: "butters" },
    { label: "vegetable oils", value: "vegetable oils" },
    { label: "margarines", value: "margarines" },
    { label: "fish oils", value: "fish oils" },
    { label: "other fats", value: "other fats" },
  ],
  miscellaneous: [
    { label: "sauces", value: "sauces" },
    { label: "condiments", value: "condiments" },
    { label: "cooking aids", value: "cooking aids" },
    { label: "salts", value: "salts" },
    { label: "spices", value: "spices" },
    { label: "herbs", value: "herbs" },
    { label: "seaweed", value: "seaweed" },
    {
      label: "foods for particular nutritional uses",
      value: "foods for particular nutritional uses",
    },
    { label: "miscellaneous ingredients", value: "miscellaneous ingredients" },
  ],
};

const AddFoodPage = ({
  isOpen,
  onClose,
  //   isLoggedIn,
  //   setLoggedIn,
  //   isAdminUser,
  //   setAdminUser,
}) => {
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
      console.log(foodData);
      const response = await axios.post(
        "http://localhost:8000/api/food/",
        foodData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Alimento registrado con éxito:", response.data);
    } catch (error) {
      console.error("Error al registrar el alimento:", error);
      navigate("/");
    }
  };

  return (
    // <Modal isOpen={isOpen} onClose={onClose}>
    <>
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
          label="Food code"
          value={registerFoodCode}
          type="number"
          placeholder="Food code"
          required={true}
          onChange={(e) => setRegisterFoodCode(e.target.value)}
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
          onChange={(e) => setRegisterGroupCode(e.target.value)}
        />
        <Input
          label="Subgroup code"
          value={registerSubgroupCode}
          type="number"
          placeholder="Subgroup code"
          required={true}
          onChange={(e) => setRegisterSubgroupCode(e.target.value)}
        />
        <Dropdown
          options={groupOptions}
          onChange={setSelectedGroup}
          placeholder="Select Group"
          multipleSelect={false}
          value={selectedGroup}
          label="Group"
        />
        <Dropdown
          options={subGroupOptions[selectedGroup?.value]}
          onChange={setSelectedSubGroup}
          placeholder="Select Subgroup"
          multipleSelect={false}
          value={selectedSubGroup}
          label="Subgroup"
        />
      </div>
      <button
        onClick={() => {
          handleSubmit();
        //   onClose();
        }}
      >
        Save Food
      </button>
    </>
  );
};

export default AddFoodPage;
