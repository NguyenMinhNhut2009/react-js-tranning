import Shopping from "../product/index.jsx";
import Cart from "../cart/index.jsx";

const publicRouter = [
  { path: "/", component: Shopping },
  { path: "/cart", component: Cart },
];
export { publicRouter };
