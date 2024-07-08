import { useState, useEffect } from "react";
import { useNavigate, useParams, generatePath } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import Input from "../Input/Input";
import Navbar from "../Navbar/Navbar";
import "./profilePage.css";
import axios from "axios";
import Button from "../Button/Button";
import RequestPage from "../RequestPage/RequestPage";
import ErrorMessagePage from "../ErrorMessage/ErrorMessagePage";

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
  const [errorDataModalOpen, setErrorDataModalOpen] = useState(false);
  const [errorUpdateModalOpen, setErrorUpdateModalOpen] = useState(false);
  const [errorDeleteModalOpen, setErrorDeleteModalOpen] = useState(false);

  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
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
          `http://localhost:8000/api/clients/${clientId}/`,
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

        if (response.data?.allergies) {
          const allergies = response.data.allergies.map((allergy) => ({
            label: allergy,
            value: allergy,
          }));
          setSelectedAllergy(allergies);
        }
        setSelectedGender({
          label: response.data?.gender,
          value: response.data?.gender,
        });

        if (response.data?.meals) {
          const meals = response.data.meals.map((meal) => ({
            label: meal,
            value: meal,
          }));
          setSelectedMeals(meals);
        }
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
        setErrorDataModalOpen(true);
      }
    };

    fetchData();
    // array vacio (de dependencias) porque solo quiero que se haga cuando se inicialice la página
  }, []);

  const handleSubmitProfile = () => {
    const formData = {
      username: updatedName,
      email: updatedEmail,
      password: updatedPassword,
      meals: selectedMeals.map((meal) => meal.value),
      weight: updatedWeight,
      age: updatedAge,
      height: updatedHeight,
      gender: selectedGender.value,
      activity: selectedActivity.value,
      goal: selectedGoal.value,
      allergies: selectedAllergy.map((allergy) => allergy.value),
    };
    updateProfile(formData);
  };

  const updateProfile = async (formData) => {
    try {
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
      console.error("Error al actualizar los datos del cliente:", error);
      setErrorUpdateModalOpen(true);
    }
  };

  const handleDelete = async (clientId) => {
    try {
      await axios.delete(`http://localhost:8000/api/clients/${clientId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
      setErrorDeleteModalOpen(true);
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
      {errorDataModalOpen && (
        <ErrorMessagePage
          isOpen={errorDataModalOpen}
          onClose={() => setErrorDataModalOpen(false)}
          message={
            "Oops! It seems there was an issue loading your data. Please try again"
          }
        />
      )}
      {errorUpdateModalOpen && (
        <ErrorMessagePage
          isOpen={errorUpdateModalOpen}
          onClose={() => setErrorUpdateModalOpen(false)}
          message={
            "Oops! It seems there was an issue updating your data. Please try again"
          }
        />
      )}
      {errorDeleteModalOpen && (
        <ErrorMessagePage
          isOpen={errorDeleteModalOpen}
          onClose={() => setErrorDeleteModalOpen(false)}
          message={
            "Oops! It seems there was an issue deleting your account. Please try again"
          }
        />
      )}
      <div className="formWrapper">
        <Input
          label="Name"
          value={updatedName}
          type="text"
          placeholder="Type your Username"
          required={true}
          disabled={isAdminUser}
          onChange={(e) => setUpdatedName(e.target.value)}
        />
        <Input
          label="Email"
          value={updatedEmail}
          type="email"
          placeholder="Type your Email"
          required={true}
          onChange={isAdminUser ? null : (e) => setUpdatedEmail(e.target.value)}
        />
        {!isAdminUser && (
          <Input
            label="Password"
            value={updatedPassword}
            type="password"
            placeholder="Type new password"
            required={true}
            onChange={
              isAdminUser ? null : (e) => setUpdatedPassword(e.target.value)
            }
            disabled={isAdminUser}
          />
        )}
        <Input
          label="Weight"
          value={updatedWeight}
          type="number"
          placeholder="Type your weight"
          required={true}
          onChange={
            isAdminUser ? null : (e) => setUpdatedWeight(e.target.value)
          }
        />
        <Input
          label="Age"
          value={updatedAge}
          type="number"
          placeholder="Type your age"
          required={true}
          onChange={isAdminUser ? null : (e) => setUpdatedAge(e.target.value)}
        />
        <Input
          label="Height"
          value={updatedHeight}
          type="number"
          placeholder="Type your height"
          required={true}
          onChange={
            isAdminUser ? null : (e) => setUpdatedHeight(e.target.value)
          }
        />
        <Dropdown
          options={genderOptions}
          onChange={isAdminUser ? null : setSelectedGender}
          placeholder="Select gender"
          multipleSelect={false}
          value={selectedGender}
          label="Gender"
        />
        <Dropdown
          options={allergyOptions}
          onChange={
            isAdminUser ? null : (selection) => setSelectedAllergy(selection)
          }
          placeholder="Select allergy"
          multipleSelect={true}
          value={selectedAllergy}
          label="Allergies"
        />
        <Dropdown
          options={mealOptions}
          onChange={
            isAdminUser ? null : (selection) => setSelectedMeals(selection)
          }
          placeholder="Select Meals"
          multipleSelect={true}
          value={
            selectedMeals.length > 0
              ? selectedMeals
              : [{ label: "No meals selected", value: "" }]
          }
          label="Meals"
        />
        <Dropdown
          options={goalOptions}
          onChange={isAdminUser ? null : setSelectedGoal}
          placeholder="Select goal"
          multipleSelect={false}
          value={selectedGoal}
          label="Goal"
        />
        <Dropdown
          options={activityOptions}
          onChange={isAdminUser ? null : setSelectedActivity}
          placeholder="Select activity level"
          multipleSelect={false}
          value={selectedActivity}
          label="Activity"
        />
        {!isAdminUser && (
          <Button
            value="Save changes"
            onClick={() => {
              handleSubmitProfile();
              const path = generatePath("/client_page/:clientId", { clientId });
              navigate(path);
            }}
            disabled={isAdminUser}
          />
        )}

        <Button
          value="Delete account"
          onClick={() => {
            handleDelete(clientId);
            navigate("/home");
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
        <RequestPage
          isOpen={requestModalOpen}
          onClose={() => setRequestModalOpen(false)}
          clientId={clientId}
        />
      </div>
    </>
  );
};

export default ProfilePage;
