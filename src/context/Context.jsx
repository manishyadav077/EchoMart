import { createContext, useContext, useReducer } from "react";
import { faker } from "@faker-js/faker";
import { cartReducer, productReducer } from "./Reducers";

const staticImage = [
  "https://nobero.com/cdn/shop/files/black_e4d19185-c19d-4e7c-a14a-8d2a29c7bad3.jpg?v=1711976456",
  "https://assets.ajio.com/medias/sys_master/root/20230906/1gnc/64f8f432afa4cf41f5cb11cf/-473Wx593H-469555920-blackwhite-MODEL.jpg",
  "https://assets.ajio.com/medias/sys_master/root/20230906/pU1k/64f86ccfafa4cf41f5bf0a62/-1117Wx1400H-461194232-white-MODEL8.jpg",
  "https://files.cdn.printful.com/o/upload/bfl-image/52/10412_l_camping%20graphics%20by%20BOSS.jpg",
  "https://a.storyblok.com/f/165154/1280x720/621f0ef91a/6_t-shirts-for-special-occasions.jpg",
  "https://m.media-amazon.com/images/I/61VNgWdG46L._AC_UY1000_.jpg"
];


const Cart = createContext();
faker.seed(99);

const Context = ({ children }) => {
  const products = [...Array(20)].map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: staticImage[Math.floor(Math.random() * staticImage.length)],
    inStock: faker.helpers.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
  }));

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  console.log(productState);

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
