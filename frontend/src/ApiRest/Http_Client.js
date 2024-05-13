import React, { useEffect, useState } from "react";
import ClientPage from "../components/ClientPage/ClientPage";

function App() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/listClient/")
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (ClientPage(data));
}

export default App;