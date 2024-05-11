import "./registrationPage.css";

const RegistrationPage = () => {
  return (
    <div className="registrationPageContainer">
        <h2>Registration</h2>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required></input>

        <label for="gender">Gender:</label>
        <select id="gender" name="gender" required>
            <option value="1">Female</option>
            <option value="2">Malet</option>
                
        </select>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required></input>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required></input>

        <label for="weight">Weight (kg):</label>
        <input type="number" id="weight" name="weight" required></input>

        <label for="age">Age:</label>
        <input type="number" id="age" name="age" required></input>

        <label for="height">Height (cm):</label>
        <input type="number" id="height" name="height" required></input>

        <label for="goal">Goal:</label>
        <select id="goal" name="goal" required>
            <option value="1">Maintenance</option>
            <option value="2">Muscle gain</option>
            <option value="3">Fat loss</option>
        </select>

        <label for="allergies">Allergy and intolerance:</label>
        <select id="allergies" name="allergies" required>
            <option value="1">Celiac disease</option>
            <option value="2">Lactose intolerant</option>
            <option value="3">Seafood</option>
            <option value="4">Egg allergy</option>
            <option value="5">None</option>
        </select>

        <input type="submit" value="Register"></input>
      
    </div>
  );
};

export default RegistrationPage;