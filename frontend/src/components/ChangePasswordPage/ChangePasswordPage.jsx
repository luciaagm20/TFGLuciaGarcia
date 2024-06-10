import { useEffect, useState} from "react";
import { useClientInfo } from "./ChangePasswordPage.hooks";
import { useNavigate } from "react-router-dom"; 


import Input from "../Input/Input";

const ChangePasswordPage = ({ isLoggedIn, setLoggedIn }) => {
  const [updatedPassword, setUpdatedPassword] = useState("");
  const clientInfo = useClientInfo();
  const navigate = useNavigate();

  useEffect(() => {
    if (clientInfo.password) {
      setUpdatedPassword(clientInfo.password);
    }
  }, [clientInfo]);

  return (
    <>
      <div className="formPassword">
        <Input
          label="Password"
          value={updatedPassword}
          type="password"
          placeholder="Type new password"
          required={true}
          // onChange={setUpdatedPassword}
          onChange={(e) => setUpdatedPassword(e.target.value)}
        />
      </div>
      {/* Esto no me funciona */}
      <button onClick={() => navigate("/profile")}>Change Password</button>
    </>
  );
};

export default ChangePasswordPage;
