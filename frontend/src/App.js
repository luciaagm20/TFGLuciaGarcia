import './App.css';
import { useState, useEffect } from react
import LandingPage from './components/LandingPage/LandingPage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import MenuPage from './components/MenuPage/MenuPage';
import ClientPage from './components/ClientPage/ClientPage';

function App() {
 /*  return (
    <div className="App">        
      <ClientPage />
    </div>
  ); */ 

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/listClient/")
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="App">
      <ClientPage userData={userData} />
    </div>
  );
}

export default App;
