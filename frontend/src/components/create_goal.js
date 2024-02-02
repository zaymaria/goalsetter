import React, { useState } from "react";
import axios from "axios";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateGoal = () => {
    const [goal, setGoal] = useState({
        goal_description: "",
        goal_sphere: "",
        goal_priority: "",
        goal_timeframe: "",
        goal_completed: false
    });

    const [descriptionError, setDescriptionError] = useState("");

    const onChangeGoalDescription = (e) => {
        setGoal({ ...goal, goal_description: e.target.value });
        setDescriptionError("");
    }

    const onChangeGoalSphere = (e) => {
        setGoal({ ...goal, goal_sphere: e.target.value });
    }

    const onChangeGoalPriority = (e) => {
        setGoal({ ...goal, goal_priority: e.target.value });
    }

    const onChangeGoalTimeframe = (e) => {
        setGoal({ ...goal, goal_timeframe: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (!goal.goal_description.trim()) {
            setDescriptionError("Описание цели обязательно");
            return;
        }
        
        const newGoal = {
          goal_description: goal.goal_description,
          goal_sphere: goal.goal_sphere,
          goal_timeframe: goal.goal_timeframe,
          goal_priority: goal.goal_priority,
          goal_completed: goal.goal_completed
        };
    
        axios
        .post("/goals/add", newGoal)
        .then((res) => {
          toast.success("Цель успешно создана!", { autoClose: 2000, hideProgressBar: true });
        })
        .catch((error) => {
          setDescriptionError("Не удалось создать цель. Попробуйте позже.");
        });
    
        setGoal({
          goal_description: "",
          goal_sphere: "",
          goal_priority: "",
          goal_timeframe: "",
          goal_completed: false
        });
      }

      const descriptionTooltip = (
        <Tooltip id="description-tooltip">
          Это обязательное поле
        </Tooltip>
      );
  
    return (
        <div className="wrapper">
            <h3 className="header">Создать новую цель</h3>
            <ToastContainer />
            <form onSubmit={onSubmit}>
                <div className="form-group mb-3">
                    <label className="form-header">Описание цели:<span className="text-danger">*</span> </label>
                    <OverlayTrigger
                        placement="top"
                        overlay={descriptionTooltip}
                    >
                    <input
                        type="text"
                        className={`form-control ${descriptionError ? "is-invalid" : ""}`}
                        value={goal.goal_description}
                        onChange={onChangeGoalDescription}
                    />
                    </OverlayTrigger>
                </div>
                <div className="form-group mb-3">
                    <label className="form-header">Категория: </label>
                    <select
                        className="form-select"
                        value={goal.goal_sphere}
                        onChange={onChangeGoalSphere}
                    >
                       <option value="">Выбрать категорию</option>
                        <option value="Здоровье">Здоровье</option>
                        <option value="Образование">Образование</option>
                        <option value="Дом">Дом</option>
                        <option value="Работа">Работа</option>
                        <option value="Хобби">Хобби</option>
                        <option value="Спорт">Спорт</option>
                        <option value="Персональное развитие">Персональное развитие</option>
                        <option value="Прочее">Прочее</option>
                    </select>
                </div>
                <div className="form-group mb-3">
                    <label className="form-header">Временной интервал: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={goal.goal_timeframe}
                        onChange={onChangeGoalTimeframe}
                    />
                </div>
                <div className="form-group mb-3">
                    <label className="form-header">Важность:</label>
                    <div className="d-flex">
                    <div className="form-check form-check-inline">
                        <input
                        className="form-check-input"
                        type="radio"
                        name="priorityOptions"
                        id="priorityLow"
                        value="Низкая"
                        checked={goal.goal_priority === "Низкая"}
                        onChange={onChangeGoalPriority}
                        />
                        <label className="form-check-label">Низкая</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                        className="form-check-input"
                        type="radio"
                        name="priorityOptions"
                        id="priorityMedium"
                        value="Средняя"
                        checked={goal.goal_priority === "Средняя"}
                        onChange={onChangeGoalPriority}
                        />
                        <label className="form-check-label">Средняя</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                        className="form-check-input"
                        type="radio"
                        name="priorityOptions"
                        id="priorityHigh"
                        value="Высокая"
                        checked={goal.goal_priority === "Высокая"}
                        onChange={onChangeGoalPriority}
                        />
                        <label className="form-check-label">Высокая</label>
                    </div>
                  </div>
                </div>
                <div type="button" class="form-group mt-4">
                    <input type="submit" value="Создать цель" className="btn btn-primary submit-button p-2"/>
                </div>
            </form>
        </div>
     );
}

export default CreateGoal;