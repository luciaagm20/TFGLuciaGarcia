import { useState, useEffect } from "react";
import Dropdown from "../Dropdown/Dropdown";
import Input from "../Input/Input";
import Navbar from "../Navbar/Navbar";
import { useClientInfo } from "./ProfilePage.hooks";
import "./profilePage.css";
import ChangePasswordPage from "../ChangePasswordPage/ChangePasswordPage";
import Modal from "../Modal/Modal";

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

const ProfilePage = ({ isLoggedIn, setLoggedIn }) => {
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedWeight, setUpdatedWeight] = useState(0);
  const [updatedAge, setUpdatedAge] = useState(0);
  const [updatedHeight, setUpdatedHeight] = useState(0);

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAllergy, setSelectedAllergy] = useState(null);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const clientInfo = useClientInfo();
  useEffect(() => {
    if (clientInfo.name) {
      setUpdatedName(clientInfo.name);
    }
    if (clientInfo.email) {
      setUpdatedEmail(clientInfo.email);
    }
    if (clientInfo.weight) {
      setUpdatedWeight(clientInfo.weight);
    }
    if (clientInfo.age) {
      setUpdatedAge(clientInfo.age);
    }
    if (clientInfo.height) {
      setUpdatedHeight(clientInfo.height);
    }
    if (clientInfo.gender) {
      setSelectedGender({
        label: clientInfo.gender,
        value: clientInfo.gender,
      });
    }
    if (clientInfo.allergies) {
      setSelectedAllergy({
        label: clientInfo.allergies,
        value: clientInfo.allergies,
      });
    }
    if (clientInfo.number_meals) {
      const preselectedMeals = mealOptions.filter((option) =>
        clientInfo.number_meals.includes(option.value)
      );
      setSelectedMeals(preselectedMeals);
    }
    if (clientInfo.goal) {
      setSelectedGoal({
        label: clientInfo.goal,
        value: clientInfo.goal,
      });
    }
    if (clientInfo.activity) {
      setSelectedActivity({
        label: clientInfo.activity,
        value: clientInfo.activity,
      });
    }
  }, [clientInfo]);
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
      <div className="formWrapper">
        <Input
          label="Name"
          value={updatedName}
          type="text"
          placeholder="Type your Username"
          required={true}
          // onChange={setUpdatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
        />
        <Input
          label="Email"
          value={updatedEmail}
          type="email"
          placeholder="Type your Email"
          required={true}
          // onChange={setUpdatedEmail}
          onChange={(e) => setUpdatedEmail(e.target.value)}
        />
        <Input
          label="Weight"
          value={updatedWeight}
          type="number"
          placeholder="Type your weight"
          required={true}
          // onChange={setUpdatedWeight}
          onChange={(e) => setUpdatedWeight(e.target.value)}
        />
        <Input
          label="Age"
          value={updatedAge}
          type="number"
          placeholder="Type your age"
          required={true}
          // onChange={setUpdatedAge}
          onChange={(e) => setUpdatedAge(e.target.value)}
        />
        <Input
          label="Height"
          value={updatedHeight}
          type="number"
          placeholder="Type your height"
          required={true}
          // onChange={setUpdatedHeight}
          onChange={(e) => setUpdatedHeight(e.target.value)}
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
          multipleSelect={false}
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
      <button
        onClick={() => {
          setPasswordModalOpen(!passwordModalOpen);
        }}
      >
        Change password
      </button>
      <button
        onClick={() => {
          // TODO: Send post with updated info
          // useSaveProfile({name: updatedName, email:updatedEmail, gender: selectedGender.value})
        }}
      >
        Save changes
      </button>
      <Modal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
      >
        <ChangePasswordPage />
      </Modal>
    </>
  );
};

export default ProfilePage;
