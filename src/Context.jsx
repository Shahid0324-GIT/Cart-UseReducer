import { useContext, createContext, useReducer, useEffect } from "react";
import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from "./actions";
import reducer from "./reducer";
import { getTotal } from "./utils";

import data from "./data";

const url = "https://www.course-api.com/react-useReducer-cart-project";

const AppContext = createContext();

const mapArray = new Map();

// console.log(mapArray);

const initialState = {
  loading: false,
  cart: mapArray,
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { totalAmount, totalCost } = getTotal(state.cart);

  const clearCart = () => {
    dispatch({
      type: CLEAR_CART,
    });
  };

  const removeItem = (id) => {
    dispatch({
      payload: { id },
      type: REMOVE,
    });

    // console.log(id);
  };

  const increaseQuantity = (id) => {
    dispatch({
      payload: { id },
      type: INCREASE,
    });
  };

  const decreaseQuantity = (id) => {
    dispatch({
      payload: { id },
      type: DECREASE,
    });
  };

  const fetchData = async () => {
    dispatch({
      type: LOADING,
    });

    const response = await fetch(url);
    const cart = await response.json();

    dispatch({
      type: DISPLAY_ITEMS,
      payload: { cart },
    });

    // console.log(cart);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        totalAmount,
        totalCost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
