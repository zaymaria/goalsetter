import React, { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";
import axios from "axios";

const EditGoal = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [state, setState] = useState({
    goal_description: "",
    goal_sphere: "",
    goal_timeframe: "",
    goal_priority: "",
    goal_completed: false
  });

  useEffect(() => {
    axios.get(`http://localhost:4000/goals/${id}`)
      .then((res) => {
        const { goal_description, goal_sphere, goal_timeframe, goal_priority, goal_completed } = res.data;
        setState({
          goal_description,
          goal_sphere,
          goal_timeframe,
          goal_priority,
          goal_completed
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const onChangeGoalDescription = (e) => {
    setState({ ...state, goal_description: e.target.value });
  };

  const onChangeGoalSphere = (e) => {
    setState({ ...state, goal_sphere: e.target.value });
  };

  const onChangeGoalTimeframe = (e) => {
    setState({ ...state, goal_timeframe: e.target.value });
  };

  const onChangeGoalPriority = (e) => {
    setState({ ...state, goal_priority: e.target.value });
  };

  const onChangeGoalCompleted = () => {
    setState({ ...state, goal_completed: !state.goal_completed });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const obj = {
      goal_description: state.goal_description,
      goal_sphere: state.goal_sphere,
      goal_timeframe: state.goal_timeframe,
      goal_priority: state.goal_priority,
      goal_completed: state.goal_completed
    };

    axios.post(`http://localhost:4000/goals/update/${id}`, obj)
      .then((res) => console.log(res.data));
     navigate("/");
  };

   return (
    <div>
      <h3 className="header">Обновить цель</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group mb-3">
         <label className="form-header">Описание цели:<span className="text-danger">*</span> </label>
          <input
            type="text"
            className="form-control"
            value={state.goal_description}
            onChange={onChangeGoalDescription}
          />
        </div>
        <div className="form-group mb-3">
            <label className="form-header">Категория: </label>
            <select
              className="form-control"
              value={state.goal_sphere}
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
        <div className="form-group">
          <label className="form-header">Временной интервал: </label>
          <input
            type="text"
            className="form-control"
            value={state.goal_timeframe}
            onChange={onChangeGoalTimeframe}
          />
        </div>
        <div className="form-group">
        <label className="form-header">Важность:</label>
          <div className="d-flex">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityLow"
                value="Низкая"
                checked={state.goal_priority === "Низкая"}
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
                checked={state.goal_priority === "Средняя"}
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
                checked={state.goal_priority === "Высокая"}
                onChange={onChangeGoalPriority}
              />
              <label className="form-check-label">Высокая</label>
            </div>
          </div>
        </div>
        <div className="form-check mt-4">
          <input
            type="checkbox"
            className="form-check-input"
            id="completedCheckbox"
            name="completedCheckbox"
            onChange={onChangeGoalCompleted}
            checked={state.goal_completed}
          />
          <label className="form-check-label goal-done" htmlFor="completedCheckbox">
            Цель выполнена
          </label>
        </div>
        <br />
        <div type="button" class="form-group mt-2">
          <input type="submit" value="Обновить цель" className="btn btn-primary submit-button p-2" />
        </div>
      </form>
    </div>
  );
};

export default EditGoal;


