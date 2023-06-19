import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from "./actions";

const reducer = (state, action) => {
  //   console.log(state);

  if (action.type === CLEAR_CART) {
    return { ...state, cart: new Map() };
  }

  if (action.type === REMOVE) {
    const { id } = action.payload;
    const { cart } = state;

    const newCart = new Map(cart);
    newCart.delete(id);

    return { state, cart: newCart };
  }

  if (action.type === INCREASE) {
    const { id } = action.payload;
    const { cart } = state;
    const newCart = new Map(cart);

    const item = newCart.get(id);
    const newItem = { ...item, amount: item.amount + 1 };

    newCart.set(id, newItem);

    // console.log(item);

    return { state, cart: newCart };
    // return state;
  }

  if (action.type === DECREASE) {
    const { id } = action.payload;
    const { cart } = state;
    const newCart = new Map(cart);
    const item = newCart.get(id);

    if (item.amount === 1) {
      newCart.delete(id);
      return { ...state, cart: newCart };
    }

    const newItem = { ...item, amount: item.amount - 1 };
    newCart.set(id, newItem);

    // console.log(item);

    return { state, cart: newCart };
    // return state;
  }

  if (action.type === LOADING) {
    return { ...state, loading: true };
  }

  if (action.type === DISPLAY_ITEMS) {
    const { cart } = action.payload;

    const newCart = new Map(
      cart.map((item) => {
        return [item.id, item];
      })
    );

    return { ...state, cart: newCart, loading: false };
  }

  throw new Error(`No matching action type: ${action.type}`);
  //   return state;
};

export default reducer;
