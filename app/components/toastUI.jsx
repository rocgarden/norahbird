import React from 'react'
import PropTypes from "prop-types";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaInfo,
  FaCheck,
  FaExclamationTriangle,
  FaBug,
  FaExclamationCircle
} from "react-icons/fa";
import classes from './toastUI.module.css';

export const displayIcon = (type) => {
  switch (type) {
    case "success":
      return <FaCheck />;
    case "info":
      return <FaInfo />;
    case "error":
      return <FaExclamationCircle />;
    case "warning":
      return <FaExclamationTriangle />;
    default:
      return <FaBug />;
  }
};

const ToastUI = ({ type, message }) =>
  toast[type](
    <div className={classes.displayDiv}>
      <div className={classes.messageDiv}>
        {message}
      </div>
      </div>
    
    );
  

ToastUI.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

ToastUI.dismiss = toast.dismiss;

export default ToastUI;
