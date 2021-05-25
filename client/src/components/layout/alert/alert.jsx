import React, { useContext } from "react";
import AlertContext from "../../../context/alert/AlertContext";
import "./alert.css"

const Alert = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className={alert.type === "error" ? "fas fa-exclamation-triangle" : "far fa-check-circle"} /> {alert.msg}
      </div>
    ))
  );
};

export default Alert;
