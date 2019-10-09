import React from "react";
import "./MessageDialog.css";
export default function MessagDaialog(props) {
  return (
    <div className={`MessagDaialog ${props.outcome}`}>{props.message}</div>
  );
}
