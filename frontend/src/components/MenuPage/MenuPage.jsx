import Navbar from "../Navbar/Navbar";
import "./menuPage.css";

const MenuPage = ({ isLoggedIn, setLoggedIn, weeklyMenu }) => {
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
      <div className="menuPageContainer">
        <h1>Weekly Menu</h1>
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Start date</th>
              <th>End date</th>
            </tr>
          </thead>
          <tbody>
            {weeklyMenu.map((menuItem) => (
              <tr key={menuItem.id}>
                <td>{menuItem.client.name}</td>
                <td>{menuItem.start_date}</td>
                <td>{menuItem.end_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MenuPage;
