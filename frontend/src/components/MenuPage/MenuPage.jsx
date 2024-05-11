import logo from "../../images/logo.png";
import "./menuPage.css";

const MenuPage = () => {
  return (
    <div className="menuPageContainer">
      <h1>Menú Semanal</h1>
        <h2>Fecha de inicio: 13/05/2024</h2>
        <h2>Fecha de fin: 19/05/2024</h2>
        
        <table>
            <tr>
                <th>Lunes</th>
                <th>Martes</th>
                <th>Miercoles</th>
                <th>Jueves</th>
                <th>Viernes</th>
                <th>Sabado</th>
                <th>Domingo</th>
            </tr>
            <tr>
                <td>Alimento</td>
                <td>Alimento</td>
                <td>Alimento</td>
                <td>Alimento</td>
                <td>Alimento</td>
                <td>Alimento</td>
                <td>Alimento</td>
            </tr>
        </table>
      
    </div>
  );
};

export default MenuPage;
