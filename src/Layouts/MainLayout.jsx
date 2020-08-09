import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "../components/Wrappers/Main";
import ContactWrapper from "../components/Wrappers/ContactWrapper";
import ContentWrapper from "../components/Wrappers/ContentWrapper";
import MainMenu from "../components/Menus/MainMenu";
import Contact from "../components/Menus/Contact";
import Footer from "../components/Footer";
import Modal from "../components/Modal/Modal";
import PropTypes from "prop-types";

class MainLayout extends Component {
  render() {
    return (
      <React.Fragment>
        <Main>
          <ContactWrapper
            showSideBar={this.props.showSideBar}
            toggleSideMenu={this.props.toggleSideBar}
          >
            <Contact
              cartItemNumber={this.props.storeCartCount}
              showBackDrop={this.props.showSideBar}
            />
          </ContactWrapper>
          <ContentWrapper>
            <header>
              <MainMenu
                cartItemNumber={this.props.storeCartCount}
                toggleSideBar={this.props.toggleSideBar}
              />
            </header>
            <main>
              {this.props.children}
              {this.props.showModal ? (
                <Modal
                  showModal={this.props.showModal}
                  closeModalClick={this.props.closeModalProp}
                >
                  {this.props.modalMessage}
                </Modal>
              ) : null}
            </main>
            <footer>
              <Footer />
            </footer>
          </ContentWrapper>
        </Main>
      </React.Fragment>
    );
  }
}

MainLayout.propTpes = {
  storeCartCount: PropTypes.number.isRequired,
  showModal: PropTypes.bool,
  closeModalClick: PropTypes.func,
  modalMessage: PropTypes.string,
  showSideBar: PropTypes.bool,
  toggleSideBar: PropTypes.func.isRequired,
};

export default MainLayout;
