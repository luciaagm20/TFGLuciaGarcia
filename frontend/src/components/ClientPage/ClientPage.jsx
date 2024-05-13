import React from 'react';
import "./clientPage.css";

const ClientPage = ({ userData }) => {
  return (
    <div className="clientPageContainer">
      <h2>List of registered users</h2>
      <table>
        <thead>
          <tr>
            <th>User name</th>
            <th>Gender</th>
            <th>e-mail</th>
            <th>Number of meals</th>
            <th>Weight (kg)</th>
            <th>Age</th>
            <th>Height (cm)</th>
            <th>Goal</th>
            <th>Allergies</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((data) => (
            <tr key={data.id}>
              <td>{data.name}</td>
              <td>{data.gender}</td>
              <td>{data.email}</td>
              <td>{data.number_meals}</td>
              <td>{data.weight}</td>
              <td>{data.age}</td>
              <td>{data.height}</td>
              <td>{data.goal}</td>
              <td>{data.allergies}</td>
              <td>
                <a href={`/profile/${data.id}`} className="btn btn-primary">Profile</a>
                <a href={`/delete/${data.id}`} className="btn btn-danger">Delete</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        
    </div>
  );
};

export default ClientPage;
