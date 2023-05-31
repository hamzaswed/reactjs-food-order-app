import React, { Fragment } from "react";

const CheckoutInput = (props) => {
  return (
    <Fragment>
      <label htmlFor={props.input.id}>{props.inputText}</label>
      <input {...props.input} onChange={props.onChange} onBlur={props.onBlur} />
    </Fragment>
  );
};

export default CheckoutInput;
