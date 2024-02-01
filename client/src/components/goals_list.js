import React, { useState, useEffect } from "react";
import axios from "axios";
import Goal from "./goal"; 

const GoalsList = () => {
  const [goals, setGoals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/goals");
        setGoals(response.data);
      } catch (error) {
        setError("Не удалось загрузить данные. Пожалуйста, попробуйте позже.");
      }
    };
  
    fetchData();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  const handleDelete = (deletedGoalId) => {
    setGoals(goals.filter((goal) => goal._id !== deletedGoalId));
  };

  const goalList = goals.map((currentGoal, index) => (
    <Goal goal={currentGoal} key={index} onDelete={handleDelete} />
  ));

  return (
    <div>
      <h3 className="header">Список моих целей</h3>
      <table className="table table-striped table-bordered text-center" style={{ fontSize: "18px" }}>
        <thead className="table-primary fst-normal" style={{ fontSize: "20px" }}>
          <tr>
            <th className="p-3">Описание цели</th>
            <th className="p-3">Категория</th>
            <th className="p-3">Временной интервал</th>
            <th className="p-3">Важность</th>
            <th className="p-3">Изменить</th>
            <th className="p-3">Удалить</th>
          </tr>
        </thead>
        <tbody>{goalList}</tbody>
      </table>
    </div>
  );
};

export default GoalsList;