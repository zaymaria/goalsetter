import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt  } from "@fortawesome/free-solid-svg-icons";

const DeleteGoal = ({ goalId, onGoalDeleted }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/goals/delete/${goalId}`);
      console.log("Goal deleted successfully");
      onGoalDeleted(goalId); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className="delete-button" onClick={handleDelete}>
      <FontAwesomeIcon icon={faTrashAlt} className="delete-icon" />
    </button>
  );
};

export default DeleteGoal;

