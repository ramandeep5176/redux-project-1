//
// imports
import { act } from "@testing-library/react";
import { INCREASE, DECREASE, CLEAR_CART, REMOVE, GET_TOTALS } from "./actions";
// imports

function reducer(state, action) {
  //   switch (action.type) {
  //     case CLEAR_CART:
  //       return { ...state, cart: [] };
  //     default:
  //       return state;
  //   }

  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  // decrease

  if (action.type === DECREASE) {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload.id) {
        cartItem = { ...cartItem, amount: cartItem.amount - 1 };
      }
      return cartItem;
    });

    return { ...state, cart: tempCart };
  }

  //   increase
  if (action.type === INCREASE) {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload.id) {
        cartItem = { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });
    return {
      ...state,
      cart: tempCart,
    };
  }

  //   remove
  if (action.type === REMOVE) {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload.id),
    };
  }

  //
  if (action.type === GET_TOTALS) {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { amount, price } = cartItem;
        const itemTotal = price * amount;

        cartTotal.total += itemTotal;
        cartTotal.amount += amount;

        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));
    return {
      ...state,
      total,
      amount,
    };
  }

  return state;
}

export default reducer;