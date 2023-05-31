import React, { useContext, useState } from "react";
import cartContext from "../../store/cart-context";
import Modal from "../UI/Modal";

import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isSendingOrder, setSendingOrder] = useState(false);
  const [isDidSendOrder, setDidSendOrder] = useState(false);

  const cartCtx = useContext(cartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const removeCartItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const addCartItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderBtnHandler = () => {
    setIsCheckout(true);
  };

  const checkoutConfirmHandler = async (userInfo) => {
    setSendingOrder(true);
    try {
      const request = await fetch(
        "https://food-project-54437-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userInfo,
            orderedItems: cartCtx.items,
            totalAmount: cartCtx.totalAmount,
          }),
        }
      );

      if (!request.ok) {
        throw new Error("Some thing went wrong");
      }

      setSendingOrder(false);

      setDidSendOrder(true);

      cartCtx.clearItems();
    } catch (error) {
      setIsError(error.message);
    }
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((cartItem) => {
        return (
          <CartItem
            key={cartItem.id}
            name={cartItem.name}
            amount={cartItem.amount}
            price={cartItem.price}
            onRemove={removeCartItemHandler.bind(null, cartItem.id)}
            onAdd={addCartItemHandler.bind(null, cartItem)}
          />
        );
      })}
    </ul>
  );

  const cartActionBtns = (
    <div className={classes["actions"]}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes["button"]} onClick={orderBtnHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartCloseBtn = (
    <div className={classes["actions"]}>
      <button className={classes["button"]} onClick={props.onCloseCart}>
        Close
      </button>
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes["total"]}>
        <span>Total Amoutn</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onConfirm={checkoutConfirmHandler}
          onCancel={props.onCloseCart}
        />
      )}
      {!isCheckout && cartActionBtns}
    </React.Fragment>
  );

  const sendingOrderMessage = (
    <p style={{ fontWeight: "bold" }}>Sending order data....</p>
  );

  const orderDidSendMessage = (
    <React.Fragment>
      <p style={{ fontWeight: "bold" }}>Your order has successfully send!</p>
      {cartCloseBtn}
    </React.Fragment>
  );

  const errorMessage = (
    <React.Fragment>
      <p style={{ fontWeight: "bold" }}>{isError}... please try again later</p>
      {cartCloseBtn}
    </React.Fragment>
  );
  return (
    <Modal onCloseCart={props.onCloseCart}>
      {!isError && !isSendingOrder && !isDidSendOrder && cartModalContent}
      {!isError && !isSendingOrder && isSendingOrder && sendingOrderMessage}
      {!isError && !isSendingOrder && isDidSendOrder && orderDidSendMessage}
      {isError && <p>{errorMessage}</p>}
    </Modal>
  );
};

export default Cart;
