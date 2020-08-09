import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { removeProduct, toggleSideBar } from "./actions/Actions";
import MainLayout from "./Layouts/MainLayout";
import Main from "./pages/Index";
import Mens from "./pages/Mens";
import Womens from "./pages/Womens";
import Kids from "./pages/Kids";
import Sales from "./pages/Sale";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import "./App.css";

class App extends Component {
  render() {
    return (
      <section className="App">
        <MainLayout
          storeCartCount={this.props.storeCartItemsCount}
          showModal={this.props.showModalProp}
          closeModalProp={this.props.removeProduct}
          modalMessage={this.props.modalMessageProp}
          showSideBar={this.props.showSideNavigationProp}
          toggleSideBar={this.props.toggleSideBar}
        >
          <Switch>
            <Route path={"/"} exact component={Main} />
            <Route path={"/mens"} component={Mens} />
            <Route path={"/womens"} component={Womens} />
            <Route path={"/kids"} component={Kids} />
            <Route path={"/sale"} component={Sales} />
            <Route path={"/cart"} component={Cart} />
            <Route path={"/checkout"} component={Checkout} />
            {/*always redirect to index*/}
            <Redirect to={"/"} />
          </Switch>
        </MainLayout>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    storeCartItemsCount: state.cartTotal,
    showModalProp: state.productMaxShowModal,
    modalMessageProp: state.modalMessage,
    showSideNavigationProp: state.showSideNavigation,
  };
};

const mapDispatchToProps = (dispatch) => {
  //closeMaxProductModal
  //toogleSidebar
  return {
    removeProduct: () => dispatch(removeProduct()),
    toggleSideBar: () => dispatch(toggleSideBar()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
