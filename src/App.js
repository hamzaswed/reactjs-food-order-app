import { useState } from "react";
import Healder from "./components/Layout/Healder";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsOpen, setCartIsOpen] = useState(false);

  const openCartHnadler = () => {
    setCartIsOpen(true);
  };

  const closeCartHandler = () => {
    setCartIsOpen(false);
  };
  return (
    <CartProvider>
      {cartIsOpen && <Cart onCloseCart={closeCartHandler} />}
      <Healder onOpenCart={openCartHnadler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
