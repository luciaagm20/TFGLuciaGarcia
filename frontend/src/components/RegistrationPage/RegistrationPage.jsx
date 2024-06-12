import "./registrationPage.css";
import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import Input from "../Input/Input";

const genderOptions = [
  { label: "Female", value: "Female" },
  { label: "Male", value: "Male" },
];
const allergyOptions = [
  { label: "None", value: "None" },
  { label: "Celiac disease", value: "Celiac disease" },
  { label: "Lactose intolerant", value: "Lactose intolerant" },
  { label: "Egg allergies", value: "Egg allergies" },
];
const mealOptions = [
  { label: "Breakfast", value: "Breakfast" },
  { label: "Meal", value: "Meal" },
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

const RegistrationPage = ({ handleRegistration }) => {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerWeight, setRegisterWeight] = useState(0);
  const [registerAge, setRegisterAge] = useState(0);
  const [registerHeight, setRegisterHeight] = useState(0);

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAllergy, setSelectedAllergy] = useState(null);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleSubmit = () => {
    const userData = {
      name: registerName,
      email: registerEmail,
      password: registerPassword,
      weight: registerWeight,
      age: registerAge,
      height: registerHeight,
      gender: selectedGender?.value,
      allergies: selectedAllergy?.value,
      meals: selectedMeals.map((meal) => meal.value),
      goal: selectedGoal?.value,
      activity: selectedActivity?.value,
    };

    handleRegistration(userData);
  };


  return (
    <>
      <div className="registrationPageContainer">
        <Input
          label="Name"
          value={registerName}
          type="text"
          placeholder="Type your Username"
          required={true}
          onChange={setRegisterName}
        />
        <Input
          label="Email"
          value={registerEmail}
          type="email"
          placeholder="Type your Email"
          required={true}
          onChange={setRegisterEmail}
        />
        <Input
          label="Password"
          value={registerPassword}
          type="password"
          placeholder="Type password"
          required={true}
          onChange={setRegisterPassword}
        />
        <Input
          label="Weight"
          value={registerWeight}
          type="number"
          placeholder="Type your weight"
          required={true}
          onChange={setRegisterWeight}
        />
        <Input
          label="Age"
          value={registerAge}
          type="number"
          placeholder="Type your age"
          required={true}
          onChange={setRegisterAge}
        />
        <Input
          label="Height"
          value={registerHeight}
          type="number"
          placeholder="Type your height"
          required={true}
          onChange={setRegisterHeight}
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
          onChange={setSelectedAllergy}
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
      <button onClick={handleSubmit}>Register</button>
    </>
  );
  
};

export default RegistrationPage;
