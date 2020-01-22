import React from "react";

function Input(props) {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <br />
      <input
        id={props.id}
        type="text"
        name={props.name}
        onChange={props.onChange}
        value={props.value}
      ></input>
      {props.error && <div style={{ color: "red" }}>{props.error}</div>}
    </div>
  );
}

export default Input;
