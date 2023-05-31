import React, { useState } from "react";

const useInputValidator = () => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const inValidInputValue = value.trim().length === 0;

  const enteredValueisInValid = isTouched && inValidInputValue;

  const changeInputHandler = (event) => {
    setValue(event.target.value);
  };

  const blurInputHandler = () => {
    setIsTouched(true);
  };

  const resetValue = () => {
    setValue("");
    setIsTouched(false);
  };

  return {
    value,
    inValidInputValue,
    enteredValueisInValid,
    changeInputHandler,
    blurInputHandler,
    resetValue,
  };
};

export default useInputValidator;
