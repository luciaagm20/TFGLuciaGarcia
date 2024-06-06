import Navbar from "../Navbar/Navbar";
import "./clientPage.css";
import { useMenuInfo } from "./ClientPage.hooks";
import MenuCard from "../MenuCard/MenuCard"; 


const ClientPage = ({ isLoggedIn, setLoggedIn }) => {
    const menuList = useMenuInfo();
    return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
      <div className="clientPageContainer">
        {menuList.map(menuItem => {
            return <MenuCard
                    id={menuItem.id}
                    initialDate={menuItem.start_date}
                    finalDate={menuItem.end_date}
                />
        })
        }
      </div>
    </>
  );
};

export default ClientPage;
