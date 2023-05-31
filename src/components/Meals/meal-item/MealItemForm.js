import React, { useRef, useState } from "react";

import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const [amountInputVal, setAmountInputVal] = useState(1);

  const changeMealAmountInputHandler = (event) => {
    setAmountInputVal(event.target.value);
  };

  const isError =
    +amountInputVal === 0 || +amountInputVal < 1 || +amountInputVal > 5;

  const submitMealInputHandler = (event) => {
    event.preventDefault();
    if (isError) {
      return;
    } else {
      props.onAddNewItemToCart(amountInputVal);
    }
  };

  return (
    <form className={classes["form"]} onSubmit={submitMealInputHandler}>
      <Input
        id={props.id}
        label="Amount"
        input={{
          type: "number",
          min: amountInputVal,
          max: "5",
          step: "1",
          defaultValue: amountInputVal,
        }}
        onChangeMealAmountInput={changeMealAmountInputHandler}
      />
      <button>+ add</button>
      {isError && (
        <p className={classes["error-meassage"]}>
          Plese enter valid amount (1 - 5)
        </p>
      )}
    </form>
  );
};

export default MealItemForm;
