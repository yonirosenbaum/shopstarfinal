import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addToCart } from "../actions/Actions";
import Product from "../components/Product";
import InnerLayout from "../Layouts/InnerLayout";
import CartIsEmpty from "../components/CartIsEmpty";

class Index extends Component {
  render() {
    let products = <CartIsEmpty/>;

    if (this.props.productsProps) {
      products = this.props.productsProps.map((product) => {
        return (
          <Product
            key={product.id}
            productName={product.name}
            productPrice={product.price}
            productDiscountPrice={product.discount_price}
            productSale={product.sale}
            productImage={product.img}
            productCategory={product.category}
            productQuantity={product.quantity}
            currency={this.props.usedCurrencyProp}
            addToCart={() =>
              this.props.addProductToCart(product.id, product.quantity)
            }
          />
        );
      });
    }
    return <InnerLayout>{products}</InnerLayout>;
  }
}

const mapStateToProps = (state) => {
  return {
    productsProps: state.products,
    usedCurrencyProp: state.usedCurrency,
  };
};

const mapDispatchToProps = (dispatch) => {
  //addProductToCartProp
  return {
    addProductToCart: (productId, productQuantity) =>
      dispatch(addToCart(productId, productQuantity)),
  };
};

Index.propTypes = {
  productsProps: PropTypes.array.isRequired,
  usedCurrencyProp: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
