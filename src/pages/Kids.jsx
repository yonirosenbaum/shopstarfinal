import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addToCart } from "../actions/Actions";
import Product from "../components/Product";
import InnerLayout from "../Layouts/InnerLayout";
import CartIsEmpty from "../components/CartIsEmpty";

class Children extends Component {
  render() {
    let renderList = <CartIsEmpty />;

    if (this.props.products.length > 0) {
      renderList = this.props.products.map((product) => {
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
            currency={this.props.currencyType}
            addToCart={() => this.props.addProductToCart(product.id)}
          />
        );
      });
    }
    return <InnerLayout>{renderList}</InnerLayout>;
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.filter(
      (product) => product.category === "kids"
    ),
    currencyType: state.usedCurrency,
  };
};

const mapDispatchToProps = (dispatch) => {
  //addProductToCartProp
  return {
    addProductToCart: (productId, productQuantity) => dispatch(addToCart(productId)),
  };
};

Children.propTypes = {
  products: PropTypes.array.isRequired,
  currencyType: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Children);
