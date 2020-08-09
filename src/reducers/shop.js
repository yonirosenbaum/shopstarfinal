import * as actionTypes from "../actions/Types";

const initialState = {
  cart: [],
  gst: 10, //vat in percentage
  cartTotal: 0,
  orderSuccess: false,
  promoCode: [
    {
        code: 'SHOPSTAR',
        percentage: 10
    },
    {
        code: 'SPECIAL',
        percentage: 5
    }
],
  usedPromoCode: null,
  deliveryOptions: [
    {
      id: 1,
      name: "mail",
      duration: "4-5 days",
      cost: 0,
    },
    {
      id: 2,
      name: "express",
      duration: "1-2 days",
      cost: 6.95,
    },
  ],
  productMaxShowModal: false,
  modalMessage: null,
  showSideNavigation: false,
  // used currency should load with the default currency name and rate
  usedCurrency: { AUD: 1, symbol: "$" },
  // exchange rates can be got from any api source
  exchangeRates: {
    base: "AUD",
    date: "2019-01-29",
    rates: {
      AUD: 1,
      NZD: 1.07,
      USD: 0.7,
      GBP: 0.55,
      EUR: 0.61,
    },
  },
  // overkill but doing it for fun
  currencySymbols: {
    AUD: "$",
    NZD: "$",
    USD: "$",
    GBP: "£",
    EUR: "€",
  },
  products: [
    {
      id: 1,
      name: "Desreaux 'The 1899 Collection' Deluxe Timepiece",
      price: 117,
      discount_price: 239,
      category: "men",
      subcategory: "",
      sale: true,
      article: "watch",
      quantity: 11,
      img: "timepiece.png",
    },
    {
      id: 2,
      name: "Maseuse Handbag",
      price: 79,
      discount_price: 160,
      category: "women",
      subcategory: "",
      sale: false,
      article: "handbag",
      quantity: 19,
      img: "handbag.png",
    },
    {
      id: 3,
      name: "Plaid Shirt",
      price: 43,
      discount_price: 89,
      category: "kids",
      subcategory: "boys",
      sale: true,
      article: "boxer",
      quantity: 13,
      img: "plaid-shirt.png",
    },
    {
      id: 4,
      name: "Badani Jeans",
      price: 53,
      discount_price: 79,
      category: "men",
      subcategory: "",
      sale: false,
      article: "belt",
      quantity: 4,
      img: "jeans.jpg",
    },
    {
      id: 5,
      name: "Stricatti Sundress",
      price: 109,
      discount_price: 144,
      category: "women",
      subcategory: "",
      sale: true,
      article: "dress",
      quantity: 5,
      img: "sundress.png",
    },
    {
      id: 6,
      name: "Hera's Summer Playhat",
      price: 59,
      discount_price: 79,
      category: "kids",
      subcategory: "girls",
      sale: true,
      article: "dress",
      quantity: 7,
      img: "summer-hat.png",
    },
    {
      id: 7,
      name: "Semi-ply Leather Formal Dinner Shoes",
      price: 89,
      discount_price: 129,
      category: "men",
      subcategory: "",
      sale: false,
      article: "shoes",
      quantity: 0,
      img: "leather-shoes.png",
    },
    {
      id: 8,
      name: "Rose Blue Shimmer Dress",
      price: 74,
      discount_price: 119,
      category: "women",
      subcategory: "",
      sale: true,
      article: "dress",
      quantity: 10,
      img: "rose-blue-shimmer-dress.png",
    },
    {
      id: 9,
      name: "Snow-Pink Winter Jacket",
      price: 74,
      discount_price: 107,
      category: "kids",
      subcategory: "girls",
      sale: false,
      article: "dress",
      quantity: 9,
      img: "pink-jacket.png",
    },
    {
      id: 10,
      name: "Outrigger Hiking Jacket",
      price: 147,
      discount_price: 229,
      category: "men",
      subcategory: "",
      sale: false,
      article: "shoes",
      quantity: 13,
      img: "hiking-jacket.png",
    },
    {
      id: 11,
      name: "Stircatto High-Lift Heels",
      price: 117,
      discount_price: 189,
      category: "women",
      subcategory: "",
      sale: false,
      article: "dress",
      quantity: 7,
      img: "Heels.png",
    },
    {
      id: 12,
      name: "Floral Silk Light Skirt",
      price: 67,
      discount_price: 149,
      category: "kids",
      subcategory: "girls",
      sale: true,
      article: "dress",
      quantity: 4,
      img: "the-floral-silk-skirt.png",
    },
    {
      id: 13,
      name: "Blue Suit",
      price: 149,
      discount_price: 249,
      category: "men",
      subcategory: "",
      sale: true,
      article: "suit",
      quantity: 16,
      img: "blue-suit.png",
    },
    {
      id: 14,
      name: "White Jade-Studded Wrist Piece",
      price: 237,
      discount_price: 349,
      category: "women",
      subcategory: "",
      sale: true,
      article: "sandals",
      quantity: 6,
      img: "quartz-studded-wrist-piece.png",
    },
    {
      id: 15,
      name: "Boys Blue Daytime Poncho",
      price: 27,
      discount_price: 49,
      category: "kids",
      subcategory: "boys",
      sale: false,
      article: "dress",
      quantity: 14,
      img: "blue-poncho.png",
    },
    {
      id: 16,
      name: "Snow Boots",
      price: 119,
      discount_price: 179,
      category: "women",
      subcategory: "",
      sale: true,
      article: "suit",
      quantity: 8,
      img: "snow-boots.png",
    },
    {
      id: 17,
      name: "Navy Buttoned Suit-Vest",
      price: 67,
      discount_price: 99,
      category: "men",
      subcategory: "",
      sale: true,
      article: "watch",
      quantity: 9,
      img: "navy-suit-vest.png",
    },
    {
      id: 18,
      name: "Leopard Printed Swede Sneakers",
      price: 109,
      discount_price: 139,
      category: "kids",
      subcategory: "boys",
      sale: true,
      article: "dress",
      quantity: 0,
      img: "leopard-shoes.png",
    },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      let cartDetails = state.cart;
      let totalCart = state.cartTotal;
      let showProductOutOfStockMessage = state.productMaxShowModal;
      let outOfStockMessage = null;

      if (state.productQuantity <= 0) {
        showProductOutOfStockMessage = !state.productMaxShowModal;
        outOfStockMessage = "Sorry! This product is out of stock";
      } else {
        let checkProductInCart = state.cart.find(
          (product) => product.id === action.productId
        );
        if (checkProductInCart) {
          if (checkProductInCart.count < action.productQuantity) {
            cartDetails = state.cart.map((product) =>
              product.id === action.productId
                ? { ...product, count: product.count + 1 }
                : product
            );
            totalCart = state.cartTotal + 1;
          } else {
            showProductOutOfStockMessage = !state.productMaxShowModal;
            outOfStockMessage = "Sorry! Your product order cannot exceed our stock.";
          }
        } else {
          cartDetails = state.cart.concat({ id: action.productId, count: 1 });
          totalCart = state.cartTotal + 1;
        }
      }

      return {
        ...state,
        cartTotal: totalCart,
        cart: cartDetails,
        productMaxShowModal: showProductOutOfStockMessage,
        modalMessage: outOfStockMessage,
      };

    case actionTypes.REMOVE_CART_ITEM:
      cartDetails = state.cart.filter((product) => product.id !== action.productId);
      return {
        ...state,
        cart: cartDetails,
        cartTotal: state.cartTotal - action.productCount,
      };

    case actionTypes.CLEAR_CART:
      return {
        ...state,
        cartTotal: 0,
        cart: [],
      };

    case actionTypes.INCREMENT_CART_PRODUCT_QUANTITY:
      let product = state.cart.find(
        (product) => product.id === action.productId
      );
      let cartTotal = state.cartTotal;
      cartDetails = state.cart;
      if (product) {
        cartTotal = state.cartTotal - (product.count - action.newCountValue);
        cartDetails = state.cart.map((product) =>
          product.id === action.productId
            ? { ...product, count: action.newCountValue }
            : product
        );
      }

      return {
        ...state,
        cart: cartDetails,
        cartTotal: cartTotal,
      };

    case actionTypes.CONFIRM_ORDER_SUCCESS:
      return {
        ...state,
        cart: [],
        cartTotal: 0,
        orderSuccess: true,
      };

    case actionTypes.RESET_ORDER_SUCCESS:
      return {
        ...state,
        orderSuccess: false,
      };

    case actionTypes.CONFIRM_ORDER_FAILURE:
      return {
        ...state,
      };

    case actionTypes.CLOSE_MAX_PRODUCT_MODAL:
      return {
        ...state,
        productMaxShowModal: !state.productMaxShowModal,
      };

    case actionTypes.TOGGLE_SIDE_BAR:
      return {
        ...state,
        showSideNavigation: !state.showSideNavigation,
      };

    case actionTypes.SET_PROMO_CODE:
      return {
        ...state,
        usedPromoCode: action.promoCode,
      };

    case actionTypes.CHANGE_CURRENCY: {
      let currencyName = null;
      let currencyValue = null;
      let currencyObj = {};

      let currencyNameSearch = Object.keys(state.exchangeRates.rates).filter(
        (rate) => action.currencyName === rate
      );
      if (currencyNameSearch) {
        currencyName = action.currencyName;
        currencyValue = state.exchangeRates.rates[currencyName];

        currencyObj[currencyName] = currencyValue;
        currencyObj["symbol"] = state.currencySymbols[currencyName];
      }

      return {
        ...state,
        // just in case the currency is not found
        usedCurrency: currencyNameSearch
          ? currencyObj
          : this.state.usedCurrency,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
