import { useState} from "react";
import { useNavigate } from "react-router-dom"; 
import Modal from "../Modal/Modal";
import axios from "axios";

import Input from "../Input/Input";

const RequestPage = ({ isOpen, onClose, clientId }) => {
  const [request, setRequest] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleRequest = () => {
    const requestData = {
      "client": parseInt(clientId, 10),
      "text": request,
    };

    handleSendRequest(requestData)
  }

  const handleSendRequest = async (requestData) => {
    try {
      console.log(requestData);
      const response = await axios.post(
        "http://localhost:8000/api/request/",
        requestData,
        {headers: {
            Authorization: `Bearer ${token}`,
        }},
      );
      console.log("Peticion enviada con éxito:", response.data);
    } 
    catch (error) {
      console.error("Error al enviar la peticion:", error);
      navigate("/");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="formRequest">
        <Input
          label="Request"
          value={request}
          type="request"
          placeholder="Please, type your request"
          required={true}
          onChange={(e) => setRequest(e.target.value)}
        />
      </div>
      <button onClick={() => {
        handleRequest()
        onClose()
      }}>
        Register
      </button>
    </Modal>
  );
};

export default RequestPage;
