import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import axios from "axios";
import "./changePasswordPage.css";
import { useEffect } from "react";

import Input from "../Input/Input";
import Button from "../Button/Button";
import ErrorMessagePage from "../ErrorMessage/ErrorMessagePage";

const ChangePasswordPage = ({ isOpen, onClose, clientId }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const [updatedPassword, setUpdatedPassword] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedWeight, setUpdatedWeight] = useState(0);
  const [updatedAge, setUpdatedAge] = useState(0);
  const [updatedHeight, setUpdatedHeight] = useState(0);

  const [isAdmin, setIsAdmin] = useState(false);

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAllergy, setSelectedAllergy] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);

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
        setIsAdmin(response.data?.is_superuser);

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
        console.error("Error al obtener la contraseña:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmitPassword = () => {
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
      is_superuser: isAdmin,
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
    }
  };
  return (
    <>
      {errorModalOpen && (
        <ErrorMessagePage
          isOpen={errorModalOpen}
          onClose={() => setErrorModalOpen(false)}
          message={"Error changing password. Please, try again."}
        />
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="formRequest">
          <Input
            label="Password"
            value={updatedPassword}
            type="password"
            placeholder="Type new password"
            required={true}
            onChange={(e) => setUpdatedPassword(e.target.value)}
          />
        </div>
        <Button
          value="Save new password"
          onClick={() => {
            handleSubmitPassword();
            onClose();
          }}
        />
      </Modal>
    </>
  );
};

export default ChangePasswordPage;
