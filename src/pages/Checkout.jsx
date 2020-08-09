import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { confirmOrder, setPromoCode } from "../actions/Actions";
import CartProducts from "../components/Checkout/CartProducts";
import DiscountForm from "../components/Checkout/DiscountForm";
import DiscountValue from "../components/Checkout/DiscountValue";
import CartTotals from "../components/Checkout/CartTotals";
import CustomerForm from "../components/Checkout/Forms/CustomerForm";
import Shipping from "../components/Checkout/Forms/Shipping";
import Payments from "../components/Checkout/Forms/Payments/Payments";
import Warning from "../components/Warning/Warning";
import PropTypes from "prop-types";
import form from "../Utility/form";
import { CardElement, injectStripe } from "react-stripe-elements";

class Checkout extends Component {
  state = {
    promoCode: "",
    showAlert: false,
    alertType: "",
    alertMessage: "",
    paymentMethod: "creditCard",
    shippingPrice: 9.95,
    usedDeliveryOption: 1,
    makeOrder: false,
    correctCardInfo: false,
    customerInfo: {
      firstName: {
        value: "",
        valid: false,
        touched: false,
        errorsMsg: "",
      },
      secondName: {
        value: "",
        valid: false,
        touched: false,
        errorsMsg: "",
      },
      email: {
        value: "",
        valid: false,
        touched: false,
        errorsMsg: "",
      },
    },
  };

  customerInfoChangeHandler = (event, identifier) => {
    // use deep cloning to be able to get the values of nested objects
    const customerInfo = { ...this.state.customerInfo };
    const customerInfoField = { ...customerInfo[identifier] };
    customerInfoField.value = event.target.value;
    const validationResults = form(
      identifier,
      customerInfoField.value
    );
    customerInfoField.valid = validationResults.isValid;
    customerInfoField.errorsMsg = validationResults.errorsMsg;
    customerInfoField.touched = true;
    customerInfo[identifier] = customerInfoField;

    let makeOrder = true;
    for (let identifier in customerInfo) {
      makeOrder = customerInfo[identifier].valid && makeOrder;
    }
    this.setState({ customerInfo: customerInfo, makeOrder: makeOrder });
  };

  promoCodeChangeHandler = (event) => {
    this.setState({ promoCode: event.target.value });
  };

  paymentOptionChangeHandler = (event) => {
    if (event.target.value === "creditCard") {
      this.setState({ correctCardInfo: false });
    } else {
      this.setState({ correctCardInfo: true });
    }
    this.setState({ paymentMethod: event.target.value });
  };

  confirmOrderHandler = (event) => {
    event.preventDefault();
    let order = {};
    order["cart"] = this.props.cartProducts;
    order["user"] = {
      firstName: this.state.customerInfo.firstName.value,
      secondName: this.state.customerInfo.secondName.value,
      email: this.state.customerInfo.email.value,
    };
    order["usedPromoCode"] = this.state.promoCode;
    order["currency"] = this.props.usedCurrency;
    order["paymentMethod"] = this.state.paymentMethod;
    order["deliveryOption"] = this.state.usedDeliveryOption;

    // todo
    // create stripe token for payments
    this.props.confirmOrder(order);
  };

  setPromoCode = (event) => {
    event.preventDefault();
    // check promo code in state
    let getPromoCode = this.props.promoCode.filter(
      (codeName) => codeName.code === this.state.promoCode
    );

    if (getPromoCode.length > 0) {
      this.props.setPromoCode(getPromoCode[0]);
      this.setState({
        showAlert: true,
        alertType: "alert-success",
        alertMessage: `The promo code you entered has given you a ${
          getPromoCode[0].percentage
        }% discount on the total price.`,
      });
    } else {
      this.setState({
        showAlert: true,
        alertType: "alert alert-danger",
        alertMessage: "The Promo code you entered does not have discounts",
      });
    }
  };

  closeAlertHandler = () => {
    this.setState({
      showAlert: !this.state.showAlert,
      alertType: "",
      alertMessage: "",
    });
  };

  deliveryOptionChangeHandler = (event) => {
    //get used delivery option from the state
    let deliveryOption = this.props.deliveryOptions.find(
      (option) => option.id === parseInt(event.target.value)
    );
    if (deliveryOption) {
      this.setState({
        usedDeliveryOption: parseInt(event.target.value),
        shippingPrice: deliveryOption.cost,
      });
    }
  };

  creditCardHandler = (element) => {
    if (element.complete) {
      this.setState({ correctCardInfo: true });
    }
  };
  renderDiscount = () =>{
  
  
    return(
      <div>
        <div style={{fontSize: '1.1rem', background: '#66c402', color: 'white', padding: 8, paddingTop: '4px', paddingRight: '4px', zIndex: 999, borderBottom: '1px solid #66c402', fontWeight: 700, width: '100%'}}>Promotion<span className="discount-close" style={{float: 'right', color: 'white', padding: 2, paddingLeft: 6, paddingRight: 6, borderRadius: 5, fontWeight: 700, cursor: 'pointer'}} onClick={(e)=>{
          document.querySelector('.discount-modal').style.display = 'none'
        }}>X</span></div>
        <div style={{fontWeight: 500, padding: 12}}>Get 10% off with the promocode: <span style={{fontWeight: 700}}>SHOPSTAR</span></div>
      </div>
    )
  }

  render() {
    let productsPrices = [];
    let chosenPaymentMethod = null;
    let currencyKeys = Object.keys(this.props.usedCurrency);
    let currencyValue = this.props.usedCurrency[currencyKeys[0]];

    const cartProducts = this.props.cartProducts.map(
      (cartProduct, index) => {
        // fetch product information from source based on id
        let productFromStore = this.props.products.find(
          (product) => product.id === cartProduct.id
        );
        productsPrices.push({
          price:
            productFromStore.quantity > 0
              ? (productFromStore.price * currencyValue)
              : 0,
          count: cartProduct.count,
        });
        return (
          <CartProducts
            key={index}
            checkoutProductName={productFromStore.name}
            checkoutProductCategory={productFromStore.category}
            checkoutProductPrice={Math.round(
              productFromStore.price * currencyValue
            )}
            checkoutProductImage={productFromStore.img}
            checkoutCartCount={cartProduct.count}
            currency={this.props.usedCurrency}
          />
        );
      }
    );

    let shippingPrice = this.state.shippingPrice
      ? (this.state.shippingPrice * currencyValue)
      : 0;
    let productTotals = productsPrices.reduce(
      (acc, el) => acc + el.price * el.count,
      0
    );
    let gstPercentage = this.props.gst > 0 ? this.props.gst/ 100 : 0;
    let gst = productTotals > 0 ? (productTotals * gstPercentage) : 0;
    let percentageDiscount = this.props.usedPromoCode
      ? this.props.usedPromoCode.percentage / 100
      : 0;
    let discountAmount = productTotals * percentageDiscount;
    let shoppingTotal =
      productTotals > 0
        ? productTotals + gst + shippingPrice - discountAmount
        : 0;

    if (this.state.paymentMethod === "creditCard") {
      chosenPaymentMethod = (
        <React.Fragment>
        <div className={"ml-4 p-3 shop-card-field"}>
          <CardElement
          hidePostalCode={true}
            onChange={(element) => this.creditCardHandler(element)}
          />
        </div>
        <div className="cardWarning" style={{letterSpacing: '1px', textShadow: '0px 1px 0px red, 1px 0px 0px red, 1px 1px 0px red', fontWeight: 900, color: 'rgb(200,80,80)', opacity: '0.8', marginTop: '8px', textAlign: 'center'}}>The following dummy card number will work: <span className="card-number" style={{fontWeight: 600, fontStyle: 'italic'}}>4242 4242 4242 4242</span></div>
        </React.Fragment>
      );
    } else if (this.state.paymentMethod === "onDelivery") {
      chosenPaymentMethod = (
        <div className={"ml-4 p-3"}>
          You will pay when the product is delivered to you.
        </div>
      );
    }

    return (
      <div className="container py-4">
        {this.props.cartTotal <= 0 ? <Redirect to="/cart" /> : null}

        {this.state.showAlert ? (
          <Warning
            alertType={this.state.alertType}
            closeAlert={this.closeAlertHandler}
          >
            {this.state.alertMessage}
          </Warning>
        ) : null}

        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Order Review</span>
              <span className="badge badge-secondary badge-pill">
                {this.props.cartTotal}
              </span>
            </h4>

            <ul className="list-group mb-3">
              {/* items in cart */}
              {cartProducts}

              {/* used promo codes */}
              {this.props.usedPromoCode ? (
                <DiscountValue
                  currency={this.props.usedCurrency}
                  usedPromoCode={this.props.usedPromoCode}
                  discountAmount={discountAmount}
                />
              ) : null}

              {/* checkout totals */}
              <CartTotals
                productTotals={productTotals.toFixed(2)}
                gst={gst.toFixed(2)}
                shippingPrice={shippingPrice.toFixed(2)}
                shoppingTotal={shoppingTotal.toFixed(2)}
                currency={this.props.usedCurrency}
              />
            </ul>

            {/*promo code form */}
            <DiscountForm
              setPromoCode={this.setPromoCode}
              promoCodeChangeHandler={(event) =>
                this.promoCodeChangeHandler(event)
              }
              promoCode={this.state.promoCode}
            />
            <div className="discount-modal">{this.renderDiscount()}</div>
          </div>
          <div className="col-md-8 order-md-1 ">
            <h4 className="mb-3">Billing Information</h4>
            <form className="shop-form shop-bg-white p-3" noValidate>
              {/* customer details form fields */}
              <CustomerForm
                customerInfo={this.state.customerInfo}
                inputChanged={(event, identifier) =>
                  this.customerInfoChangeHandler(event, identifier)
                }
              />
              {/* delivery options selection fields */}
              <h4 className="">Delivery Options</h4>
              <Shipping
                currency={this.props.usedCurrency}
                deliveryOptions={this.props.deliveryOptions}
                usedDeliveryOption={this.state.usedDeliveryOption}
                deliveryOptionChanged={this.deliveryOptionChangeHandler}
              />

              <h4 className="mb-3">Payment Method</h4>
              {/* payment option selection field */}
              <Payments
                paymentMethod={this.state.paymentMethod}
                paymentOptionChanged={this.paymentOptionChangeHandler}
              />
              {/* payment section */}
              <div>{chosenPaymentMethod}</div>

              <hr className="mb-4" />
              <div id="checkout__confirmOrderWrapper" style={{zIndex: '999', background: 'red'}} onMouseEnter={(e)=>{
                if(document.querySelector('#checkout__confirmOrder').disabled == true){
                document.querySelector('#checkout__confirmOrderWarning').style.display='block'
                setTimeout(function(){
                  document.querySelector('#checkout__confirmOrderWarning').style.display='none'
                }, 5000)
              }}}>
              <button
                disabled={!(this.state.makeOrder && this.state.correctCardInfo)}
                id="checkout__confirmOrder"
                className="btn shop-btn-secondary btn-lg btn-block"
                onClick={(event) => {this.confirmOrderHandler(event)}}
              >
                Confirm Order
              </button>
              </div>
            </form>
            <div id="checkout__confirmOrderWarning" style={{border: '1px solid red', background: 'lightgrey', padding: 5, display: 'none', fontWeight: 900, color: 'red'}}>Please enter all billing information and payment methods correctly</div>
          </div>
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  products: PropTypes.array.isRequired,
  cartProducts: PropTypes.array.isRequired,
  cartTotal: PropTypes.number.isRequired,
  promoCode: PropTypes.array,
  usedPromoCode: PropTypes.object,
  deliveryOptions: PropTypes.array.isRequired,
  usedCurrency: PropTypes.object.isRequired,
  gst: PropTypes.number,
};

Checkout.defaultProps = {
  shippingPrice: 0,
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
    cartProducts: state.cart,
    cartTotal: state.cartTotal,
    gst: state.gst,
    promoCode: state.promoCode,
    usedPromoCode: state.usedPromoCode,
    deliveryOptions: state.deliveryOptions,
    usedCurrency: state.usedCurrency,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  //confirmOrderProp
  //setPromoCodeProp
  return {
    confirmOrder: (order) => dispatch(confirmOrder(order, ownProps)),
    setPromoCode: (promoCode, percentage) =>
      dispatch(setPromoCode(promoCode, percentage)),
  };
};

// inject stripe prop into the component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectStripe(Checkout));
