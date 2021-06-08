import React, { useContext } from "react";
import AlertContext from "../../../context/alert/AlertContext";
import "./alert.css"

const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { alert } = alertContext;

  return (
    alert && 
    <div className={`alert alert-${alert.type}`}>
      <i className={alert.type === "error" ? "fas fa-exclamation-triangle" : "far fa-check-circle"} /> {alert.msg}
    </div>
  );
};

export default Alert;
