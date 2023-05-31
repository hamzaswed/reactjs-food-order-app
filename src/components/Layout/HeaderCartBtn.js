import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartBtn.module.css";
import HeaderCartBtnIcon from "../../assets/Icons/HeaderCartBtnIcon.js";
import cartContext from "../../store/cart-context";

const HeaderCartBtn = (props) => {
  const [cartBtnIsAnimated, setCartBtnIsAnimated] = useState(false);
  const cartCtx = useContext(cartContext);
  const { items } = cartCtx;

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  let cartBtnClasses = `${classes["button"]} ${
    cartBtnIsAnimated ? classes["bump"] : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    setCartBtnIsAnimated(true);

    const cartBtnAnimateTime = setTimeout(() => {
      setCartBtnIsAnimated(false);
    }, 300);

    return () => {
      clearTimeout(cartBtnAnimateTime);
    };
  }, [items]);

  return (
    <button className={cartBtnClasses} onClick={props.onOpenCart}>
      <span className={classes["icon"]}>
        <HeaderCartBtnIcon />
      </span>
      <sapn>Your Cart</sapn>
      <sapn className={classes["badge"]}>{numberOfCartItems}</sapn>
    </button>
  );
};

export default HeaderCartBtn;
