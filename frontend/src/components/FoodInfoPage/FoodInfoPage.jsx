import { useState, useEffect } from "react";
import { useNavigate, useParams, generatePath } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import Input from "../Input/Input";
import Navbar from "../Navbar/Navbar";
import "./foodInfoPage.css";
import axios from "axios";

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

const FoodInfoPage = ({
  isLoggedIn,
  setLoggedIn,
  isAdminUser,
  setAdminUser,
}) => {
  const { foodId } = useParams();
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
        console.log("response " + response.data?.water);
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
        console.error("Error al obtener los datos del cliente:", error);
        setLoggedIn(false);
        navigate("/login");
      }
    };

    fetchData();
    // array vacio (de dependencias) porque solo quiero que se haga cuando se inicialice la página
  }, []);

  //   const handleGroupChange = (selectedGroup) => {
  //     setSelectedGroup(selectedGroup)
  //     setSelectedSubGroup(null);
  //     setUpdatedGroupCode(selectedGroup.code);
  //   };

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
      console.log(formData);
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
      setLoggedIn(false);
      navigate("/");
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
      <div className="formWrapper">
        <Input
          label="Food name"
          value={updatedFoodName}
          type="text"
          placeholder="Food name"
          required={true}
          // onChange={setUpdatedName}
          onChange={(e) => setUpdatedFoodName(e.target.value)}
        />
        <Input
          label="Water"
          value={updatedWater}
          type="number"
          placeholder="Water"
          required={true}
          // onChange={setUpdatedEmail}
          onChange={(e) => setUpdatedWater(e.target.value)}
        />
        <Input
          label="Protein"
          value={updatedProtein}
          type="number"
          placeholder="Protein"
          required={true}
          // onChange={setUpdatedWeight}
          onChange={(e) => setUpdatedProtein(e.target.value)}
        />
        <Input
          label="Carbohidrates"
          value={updatedCarbohidrates}
          type="number"
          placeholder="Carbohidrates"
          required={true}
          // onChange={setUpdatedAge}
          onChange={(e) => setUpdatedCarbohidrates(e.target.value)}
        />
        <Input
          label="Fats"
          value={updatedFats}
          type="number"
          placeholder="Fats"
          required={true}
          // onChange={setUpdatedHeight}
          onChange={(e) => setUpdatedFats(e.target.value)}
        />
        <Input
          label="Sugars"
          value={updatedSugars}
          type="number"
          placeholder="Sugars"
          required={true}
          // onChange={setUpdatedHeight}
          onChange={(e) => setUpdatedSugars(e.target.value)}
        />
        <Input
          label="Glucose"
          value={updatedGlucose}
          type="number"
          placeholder="Glucose"
          required={true}
          // onChange={setUpdatedHeight}
          onChange={(e) => setUpdatedGlucose(e.target.value)}
        />
        <Input
          label="Lactose"
          value={updatedLactose}
          type="number"
          placeholder="Lactose"
          required={true}
          // onChange={setUpdatedHeight}
          onChange={(e) => setUpdatedLactose(e.target.value)}
        />
        <Input
          label="Group code"
          value={updatedGroupCode}
          type="number"
          placeholder="Group code"
          required={true}
          disabled={true}
          // onChange={setUpdatedHeight}
          // onChange={(e) => setUpdatedGroupCode(e.target.value)}
        />

        <Input
          label="Subgroup code"
          value={updatedSubgroupCode}
          type="number"
          placeholder="Subgroup code"
          required={true}
          disabled={true}
          // onChange={setUpdatedHeight}
          // onChange={(e) => setUpdatedSubgroupCode(e.target.value)}
        />
        <Dropdown
          options={groupOptions}
          onChange={setSelectedGroup}
          //   onChange={() => {
          //     handleGroupChange()
          //   }}
          placeholder="Select group"
          multipleSelect={false}
          value={selectedGroup}
          label="Group"
        />

        <Dropdown
          options={subGroupOptions[selectedGroup?.value]}
          onChange={setSelectedSubGroup}
          placeholder="Select subgroup"
          multipleSelect={false}
          value={selectedSubGroup}
          label="Subgroup"
        />
      </div>
      <button
        onClick={() => {
          // TODO: Send post with updated info
          handleSubmitFood();
          navigate("/list_food");
        }}
      >
        Save changes
      </button>
    </>
  );
};

export default FoodInfoPage;
