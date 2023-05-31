import React from "react";
import classes from "./Checkout.module.css";
import CheckoutInput from "../UI/CheckoutInput";
import useInputValidator from "../../hooks/input-validator";

const Checkout = (props) => {
  const {
    value: nameInputValue,
    inValidInputValue: inValidNameInputValue,
    enteredValueisInValid: nameInputValueIsInValid,
    changeInputHandler: changeNameInputHandler,
    blurInputHandler: blurNameInputHandler,
    resetValue: resetNameInputValue,
  } = useInputValidator();

  const {
    value: streetInputValue,
    inValidInputValue: inValidStreetInputValue,
    enteredValueisInValid: streetInputValueIsInValid,
    changeInputHandler: changeStreetInputHandler,
    blurInputHandler: blurStreetInputHandler,
    resetValue: resetStreetInputValue,
  } = useInputValidator();

  const {
    value: postalCodeInputValue,
    inValidInputValue: inValidPostalCodeInputValue,
    enteredValueisInValid: postalCodeInputValueIsInValid,
    changeInputHandler: changePostalCodeInputHandler,
    blurInputHandler: blurPostalCodeInputHandler,
    resetValue: resetPostalCodeInputValue,
  } = useInputValidator();

  const {
    value: cityInputValue,
    inValidInputValue: inValidCityInputValue,
    enteredValueisInValid: cityInputValueIsInValid,
    changeInputHandler: changeCityInputHandler,
    blurInputHandler: blurCityInputHandler,
    resetValue: resetCityInputValue,
  } = useInputValidator();

  // check if the form is valid to submit
  let checkoutFormIsInValid = true;

  if (
    !inValidNameInputValue &&
    !inValidStreetInputValue &&
    !inValidPostalCodeInputValue &&
    !inValidCityInputValue
  ) {
    checkoutFormIsInValid = false;
  }

  const checkoutFormHandler = (event) => {
    event.preventDefault();

    if (checkoutFormIsInValid) {
      return;
    }

    resetNameInputValue();
    resetStreetInputValue();
    resetPostalCodeInputValue();
    resetCityInputValue();

    props.onConfirm({
      name: nameInputValue,
      street: streetInputValue,
      postalCode: postalCodeInputValue,
      city: cityInputValue,
    });
  };

  const inputClasses = (inputValueIsInValid) => {
    return inputValueIsInValid
      ? `${classes.control} ${classes.invalid}`
      : `${classes.control}`;
  };

  return (
    <form className={classes.form} onSubmit={checkoutFormHandler}>
      <div className={inputClasses(nameInputValueIsInValid)}>
        <CheckoutInput
          inputText="Your Name"
          input={{ id: "name", type: "text", value: nameInputValue }}
          onChange={changeNameInputHandler}
          onBlur={blurNameInputHandler}
        />
      </div>
      <div className={inputClasses(streetInputValueIsInValid)}>
        <CheckoutInput
          inputText="Street"
          input={{ id: "street", type: "text", value: streetInputValue }}
          onChange={changeStreetInputHandler}
          onBlur={blurStreetInputHandler}
        />
      </div>
      <div className={inputClasses(postalCodeInputValueIsInValid)}>
        <CheckoutInput
          inputText="Postal Code"
          input={{
            id: "postal-code",
            type: "text",
            value: postalCodeInputValue,
          }}
          onChange={changePostalCodeInputHandler}
          onBlur={blurPostalCodeInputHandler}
        />
      </div>
      <div className={inputClasses(cityInputValueIsInValid)}>
        <CheckoutInput
          inputText="City"
          input={{ id: "city", type: "text", value: cityInputValue }}
          onChange={changeCityInputHandler}
          onBlur={blurCityInputHandler}
        />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button
          type="submit"
          disabled={checkoutFormIsInValid}
          className={classes.submit}
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
