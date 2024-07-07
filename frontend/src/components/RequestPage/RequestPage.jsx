import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import axios from "axios";
import "./requestPage.css";

import Button from "../Button/Button";
import ErrorMessagePage from "../ErrorMessage/ErrorMessagePage";

const RequestPage = ({ isOpen, onClose, clientId }) => {
  const [request, setRequest] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const handleRequest = () => {
    const requestData = {
      client: parseInt(clientId, 10),
      text: request,
    };

    handleSendRequest(requestData);
  };

  const handleSendRequest = async (requestData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/request/",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Peticion enviada con éxito:", response.data);
    } catch (error) {
      console.error("Error al enviar la peticion:", error);
      setErrorModalOpen(true);
    }
  };

  return (
    <>
      {errorModalOpen && (
        <ErrorMessagePage
          isOpen={errorModalOpen}
          onClose={() => setErrorModalOpen(false)}
          message={"Error sending the request. Please, try again."}
        />
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="formRequest">
          <label htmlFor="Request">Request</label>
          <textarea
            className="textArea"
            name="request"
            id="Request"
            value={request}
            placeholder="Please, type your request"
            required={true}
            onChange={(e) => setRequest(e.target.value)}
          ></textarea>
        </div>
        <Button
          value="Send Request"
          onClick={() => {
            handleRequest();
            onClose();
          }}
          disabled={false}
        />
      </Modal>
    </>
  );
};

export default RequestPage;
