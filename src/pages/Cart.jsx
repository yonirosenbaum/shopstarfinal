import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeCartItem,
  clearCart,
  incrementCartProductQuantity,
} from "../actions/Actions";
import CartList from "../components/Cart/CartList";
import CartTotals from "../components/Cart/CartTotals";
import Success from "../components/Success";
import PropTypes from "prop-types";

class Cart extends Component {
  productCountHandler = (field_value, product_id) => {
    this.props.incrementCartProductQuantity(field_value, product_id);
  };

  render() {
    let cartContent = null;
    let currencyKeys = Object.keys(this.props.currencyType);
    let currencyValue = this.props.currencyType[currencyKeys[0]];

    if (this.props.cartNetTotal > 0) {
      let cartPriceCountArray = [];
      let cartProducts = this.props.cartProducts.map((productInCart) => {
        // fetch product information from source based on id
        // product information can also be stored in state
        let productFromStore = this.props.product.find(
          (product) => product.id === productInCart.id
        );
        cartPriceCountArray.push({
          price:
            productFromStore.quantity > 0
              ? Math.round(productFromStore.price * currencyValue)
              : 0,
          count: productInCart.count,
        });
        return (
          <CartList
            key={productInCart.id}
            productName={productFromStore.name}
            productCategory={productFromStore.category}
            productPhoto={productFromStore.img}
            productPrice={Math.round(productFromStore.price * currencyValue)}
            productCount={productInCart.count}
            productQuantity={productFromStore.quantity}
            updateProductCount={(event) =>
              this.productCountHandler(event.target.value, productInCart.id)
            }
            removeCartProduct={() =>
              this.props.removeProductFromCart(
                productInCart.id,
                productInCart.count
              )
            }
            currency={this.props.currencyType}
          />
        );
      });

      let cartTotals = (
        <CartTotals
          subtotal={cartPriceCountArray.reduce(
            (acc, el) => acc + el.price * el.count,
            0
          )}
          gst={this.props.gst}
          clearCart={() => this.props.clearProductsFromCart()}
          currency={this.props.currencyType}
        />
      );

      cartContent = (
        <React.Fragment>
          {cartProducts}
          {cartTotals}
        </React.Fragment>
      );
    } else if (this.props.cartNetTotal === 0 && this.props.orderSuccess) {
      cartContent = <Success />;
    } else {
      cartContent = (
        <h5 className={"shop-empty-cart"}>
          Your cart is empty. <Link to={"/"}>Please fill it up.</Link>
        </h5>
      );
    }

    return (
      <div className="container shop-container py-4">
        <div className={"p-4 shop-div"}>{cartContent}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.products,
    cartNetTotal: state.cartTotal,
    cartProducts: state.cart,
    gst: state.gst,
    orderSuccess: state.orderSuccess,
    currencyType: state.usedCurrency,
  };
};

const mapDispatchToProps = (dispatch) => {
  //removeProductFromCartProp
  //clearProductsFromCartProp
  //updateCartProductCountProp
  return {
    removeProductFromCart: (productId, count) =>
      dispatch(removeCartItem(productId, count)),
    clearProductsFromCart: () => dispatch(clearCart()),
    incrementCartProductQuantity: (value, productId) =>
      dispatch(incrementCartProductQuantity(Number(value), productId)),
  };
};

Cart.propTypes = {
  cartNetTotal: PropTypes.number.isRequired,
  cartProducts: PropTypes.array.isRequired,
  product: PropTypes.array.isRequired,
  orderSuccess: PropTypes.bool.isRequired,
  gst: PropTypes.number,
  currencyType: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
