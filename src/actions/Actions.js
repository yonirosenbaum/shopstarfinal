import * as actionTypes from "./Types";

export const addToCart = (productId, productQuantity) => {
  return {
    type: actionTypes.ADD_TO_CART,
    productId: productId,
    productQuantity: productQuantity,
  };
};

export const removeCartItem = (productId, count) => {
  return {
    type: actionTypes.REMOVE_CART_ITEM,
    productId: productId,
    productCount: count,
  };
};

export const clearCart = () => {
  return {
    type: actionTypes.CLEAR_CART,
  };
};

export const incrementCartProductQuantity = (value, productId) => {
  return {
    type: actionTypes.INCREMENT_CART_PRODUCT_QUANTITY,
    newCountValue: value,
    productId: productId,
  };
};

export const confirmOrder = (order, ownProps) => {
  return (dispatch) => {
    // send order object to an api end point of choice
    console.log(order);
    // todo
    //token to be used with stripe
    dispatch(confirmOrderSuccess());
    ownProps.history.push("/cart");
    setTimeout(() => {
      dispatch(resetOrderSuccess());
    }, 5000);
  };
};

export const removeProduct = () => {
  return {
    type: actionTypes.CLOSE_MAX_PRODUCT_MODAL,
  };
};

export const confirmOrderSuccess = () => {
  return {
    type: actionTypes.CONFIRM_ORDER_SUCCESS,
  };
};

export const resetOrderSuccess = () => {
  return {
    type: actionTypes.RESET_ORDER_SUCCESS,
  };
};

export const confirmOrderFailure = () => {
  // todo
  return {
    type: actionTypes.CONFIRM_ORDER_FAILURE,
  };
};

export const toggleSideBar = () => {
  return {
    type: actionTypes.TOGGLE_SIDE_BAR,
  };
};

export const setPromoCode = (promoCodeObject) => {
  return {
    type: actionTypes.SET_PROMO_CODE,
    promoCode: promoCodeObject,
  };
};

export const changeCurrency = (currencyName) => {
  // currency value can be fetched here from an external api and then passes to the store
  return {
    type: actionTypes.CHANGE_CURRENCY,
    currencyName: currencyName,
  };
};
