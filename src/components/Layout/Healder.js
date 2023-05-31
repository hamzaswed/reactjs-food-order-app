import React, { Fragment } from "react";
import sliderImage from "../../assets/Images/meals.jpg";
import classes from "./Healder.module.css";
import HeaderCartBtn from "./HeaderCartBtn";

const Healder = (props) => {
  return (
    <Fragment>
      <header className={classes["header"]}>
        <h1>React Meals</h1>
        <HeaderCartBtn onOpenCart={props.onOpenCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={sliderImage} alt="a table of deslicious food" />
      </div>
    </Fragment>
  );
};

export default Healder;
