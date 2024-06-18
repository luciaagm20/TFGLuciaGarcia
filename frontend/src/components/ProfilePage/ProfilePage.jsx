import { useState, useEffect } from "react";
import { useNavigate, useParams, generatePath } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import Input from "../Input/Input";
import Navbar from "../Navbar/Navbar";
import "./profilePage.css";
import ChangePasswordPage from "../ChangePasswordPage/ChangePasswordPage";
import Modal from "../Modal/Modal";
import axios from "axios";


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

const ProfilePage = ({
  isLoggedIn,
  setLoggedIn,
  isAdminUser,
  setAdminUser,
}) => {
  const { clientId } = useParams();
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedWeight, setUpdatedWeight] = useState(0);
  const [updatedAge, setUpdatedAge] = useState(0);
  const [updatedHeight, setUpdatedHeight] = useState(0);

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAllergy, setSelectedAllergy] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/clients/${clientId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUpdatedName(response.data?.username);
        setUpdatedEmail(response.data?.email);
        setUpdatedWeight(response.data?.weight);
        setUpdatedAge(response.data?.age);
        setUpdatedHeight(response.data?.height);
        setSelectedAllergy({
          label: response.data?.allergies,
          value: response.data?.allergies,
        });
        setSelectedGender({
          label: response.data?.gender,
          value: response.data?.gender,
        });
        setSelectedMeals({
          label: response.data?.number_meals,
          value: response.data?.number_meals,
        });
        setSelectedGoal({
          label: response.data?.goal,
          value: response.data?.goal,
        });
        setSelectedActivity({
          label: response.data?.activity,
          value: response.data?.activity,
        });
      } catch (error) {
        console.error("Error al obtener los datos del cliente:", error);
        setLoggedIn(false);
        navigate("/login");
      }
    };

    fetchData();
    // array vacio (de dependencias) porque solo quiero que se haga cuando se inicialice la página
  },[])

  const handleSubmitProfile = () => {
    const formData = {
      "username": updatedName,
      "email": updatedEmail,
      "password": "david1234",
      "number_meals": selectedMeals.value,
      "weight": updatedWeight,
      "age": updatedAge,
      "height": updatedHeight,
      "gender": selectedGender.value,
      "activity": selectedActivity.value,
      "goal": selectedGoal.value,
      "allergies": selectedAllergy.value,
  }
  updateProfile(formData)
  }

  const updateProfile = async (formData) => {
    try {
      console.log(formData)
      const response = await axios.put(
        `http://localhost:8000/api/clients/${clientId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     
    } catch (error) {
      console.error("Error al obtener los datos del menú:", error);
      setLoggedIn(false);
      navigate("/");
    }
  }
  

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
          handleSubmitProfile()
          const path = generatePath("/client_page/:clientId", { clientId })
          navigate(path);
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
