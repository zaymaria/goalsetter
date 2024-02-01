import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateGoal from "./components/create_goal";
import EditGoal from "./components/edit_goal"; 
import GoalsList from "./components/goals_list"; 
import logo from "./logo.png";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand navbar-light bg-light w-100 header-link">
          <Link to="/" className="navbar-brand">
            <img src={logo} className="logo" alt="Логотип" />
          </Link>
          <Link to="/" className="app-name">Установщик целей</Link>
          <div className ="collapse navbar-collapse p-6">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item" >
                <Link to="/" className="nav-link mx-4">Все цели</Link>
              </li>
              <li className="nav-item">
                <Link to="/create" className="nav-link mx-4">Создать цель</Link>
              </li>
            </ul>          
          </div>
        </nav>

        <Routes>
            <Route path="/" element={<GoalsList />} />
            <Route path="/edit/:id" element={<EditGoal />} />
            <Route path="/create" element={<CreateGoal />} />
            <Route path="*" element={ 
                <main className="message">
                  <p>Здесь ничего нет!</p>
                </main>
              }
            />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

