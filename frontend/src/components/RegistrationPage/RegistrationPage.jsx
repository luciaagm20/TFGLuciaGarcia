import "./registrationPage.css";
import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import Input from "../Input/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../Modal/Modal";


const genderOptions = [
  { label: "Female", value: "Female" },
  { label: "Male", value: "Male" },
];
const allergyOptions = [
  { label: "None", value: "None" },
  { label: "Celiac disease", value: "Celiac disease" },
  { label: "Lactose intolerant", value: "Lactose intolerant" },
  { label: "Egg allergy", value: "Egg allergy" },
  { label: "Seafood", value: "Seafood" },
];
const mealOptions = [
  { label: "Breakfast", value: "Breakfast" },
  { label: "Lunch", value: "Lunch" },
  { label: "Dinner", value: "Dinner" },
  { label: "Snack", value: "Snack" },
];
const goalOptions = [
  { label: "Maintenance", value: "Maintenance" },
  { label: "Muscle gain", value: "Muscle gain" },
  { label: "Fat loss", value: "Fat loss" },
];
const activityOptions = [
  { label: "Sedentary", value: "Sedentary" },
  { label: "Light activity", value: "Light activity" },
  { label: "Moderate activity", value: "Moderate activity" },
  { label: "Daily exercise", value: "Daily exercise" },
  { label: "Intense exercise", value: "Intense exercise" },
];

const RegistrationPage = ({ isOpen, onClose }) => {
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerWeight, setRegisterWeight] = useState(0);
  const [registerAge, setRegisterAge] = useState(0);
  const [registerHeight, setRegisterHeight] = useState(0);

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAllergy, setSelectedAllergy] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = () => {
    const userData = {
      "username": registerName,
      "email": registerEmail,
      "password": registerPassword,
      "meals": selectedMeals.map((meal) => meal.value),
      "weight": registerWeight,
      "age": registerAge,
      "height": registerHeight,
      "gender": selectedGender?.value,
      "activity": selectedActivity?.value,
      "goal": selectedGoal?.value,
      "allergies": selectedAllergy.map((allergy) => allergy.value),
    };

    handleRegistration(userData)
  }

  const handleRegistration = async (userData) => {
    try {
      console.log(userData);
      const response = await axios.post(
        "http://localhost:8000/api/clients/",
        userData
      );
      console.log("Usuario registrado con éxito:", response.data);
    } 
    catch (error) {
      console.error("Error al registrar al usuario:", error);
      // setLoggedIn(false);
      navigate("/");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    
      <div className="registrationPageContainer">
        <Input
          label="Name"
          value={registerName}
          type="text"
          placeholder="Type your Username"
          required={true}
          onChange={(e) => setRegisterName(e.target.value)}
        />
        <Input
          label="Email"
          value={registerEmail}
          type="email"
          placeholder="Type your Email"
          required={true}
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <Input
          label="Password"
          value={registerPassword}
          type="password"
          placeholder="Type password"
          required={true}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <Input
          label="Weight"
          value={registerWeight}
          type="number"
          placeholder="Type your weight"
          required={true}
          onChange={(e) => setRegisterWeight(e.target.value)}
        />
        <Input
          label="Age"
          value={registerAge}
          type="number"
          placeholder="Type your age"
          required={true}
          onChange={(e) => setRegisterAge(e.target.value)}
        />
        <Input
          label="Height"
          value={registerHeight}
          type="number"
          placeholder="Type your height"
          required={true}
          onChange={(e) => setRegisterHeight(e.target.value)}
        />
        <Dropdown
          options={genderOptions}
          onChange={setSelectedGender}
          placeholder="Select gender"
          multipleSelect={false}
          value={selectedGender}
          label="Gender"
        />
        <Dropdown
          options={allergyOptions}
          onChange={(selection) => setSelectedAllergy(selection)}
          placeholder="Select allergy"
          multipleSelect={true}
          value={selectedAllergy}
          label="Allergies"
        />
        <Dropdown
          options={mealOptions}
          onChange={(selection) => setSelectedMeals(selection)}
          placeholder="Select Meals"
          multipleSelect={true}
          value={selectedMeals}
          label="Meals"
        />
        <Dropdown
          options={goalOptions}
          onChange={setSelectedGoal}
          placeholder="Select goal"
          multipleSelect={false}
          value={selectedGoal}
          label="Goal"
        />
        <Dropdown
          options={activityOptions}
          onChange={setSelectedActivity}
          placeholder="Select activity level"
          multipleSelect={false}
          value={selectedActivity}
          label="Activity"
        />
      </div>
      <button onClick={() => {
        handleSubmit()
        onClose()
      }}>
        Register
      </button>
    </Modal>
  );
};

export default RegistrationPage;
