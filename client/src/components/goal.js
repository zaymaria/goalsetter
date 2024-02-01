import React from "react";
import { Link } from "react-router-dom";
import DeleteGoal from "./delete_goal.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";


const Goal = ({ goal, onDelete }) => (
  <tr>
    <td className={goal.goal_completed ? "completed description-column" : "description-column"} >{goal.goal_description}</td>
    <td className={goal.goal_completed ? "completed" : ""}>{goal.goal_sphere}</td>
    <td className={goal.goal_completed ? "completed" : ""}>{goal.goal_timeframe}</td>
    <td className={goal.goal_completed ? "completed" : ""}>{goal.goal_priority}</td>
    <td>
      <Link to={`/edit/${goal._id}`}><FontAwesomeIcon icon={faEdit} className="edit-icon" /></Link>
    </td>
    <td>
      <DeleteGoal goalId={goal._id} onGoalDeleted={onDelete} />
    </td>
  </tr>
);

export default Goal;