import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { productList } from "./data";
import { Link } from "react-router-dom";
import { DataContext } from "../data_router";

function formatCurrency(number) {
  const formattedNumber = number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formattedNumber.replace(/đ/g, "VNĐ");
}

function Shopping() {
  const { setData } = useContext(DataContext);
  const [dataProduct, setdataProduct] = useState(productList);

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const updateProductList = dataProduct.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setdataProduct(updateProductList);

    const updateCartItem = [...cartItems, product];
    setCartItems(updateCartItem);

    // if (cartItems.length === 0) {
    //   setTotalQuantity(totalQuantity + 1);
    // } else if (cartItems.find((item) => item.id === product.id)) {
    //   return setTotalQuantity(totalQuantity);
    // } else {
    //   return setTotalQuantity(totalQuantity + 1);
    // }
  };

  const handleClickNextPage = () => {
    setData(cartItems);
  };
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        position: "relative",
      }}
    >
      <div>
        {dataProduct.map((product) => (
          <div
            key={product.id}
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "20px",
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "8px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{
                height: "150px",
                width: "150px",
                borderRadius: "8px",
                margin: "20px",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                textAlign: "start",
              }}
            >
              <h2 style={{ color: "black" }}>{product.name}</h2>
              <h2 style={{ color: "black" }}>
                {"Price: "}
                {formatCurrency(product.price)}
              </h2>
              <h2 style={{ color: "black" }}>
                {"Quantity: "}
                {product.quantity}
              </h2>
            </div>
            {product.quantity !== 0 ? (
              <button
                style={{
                  justifyItems: "start",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  outline: "none",
                  backgroundColor: "transparent",
                  transition: "none",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "black";
                  e.currentTarget.style.border = "none";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "black";
                  e.currentTarget.style.border = "none";
                }}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  color="black"
                  size="2x"
                  style={{ marginLeft: "20px", cursor: "pointer" }}
                  onClick={() => addToCart(product)}
                />
              </button>
            ) : null}
          </div>
        ))}
      </div>

      <div style={{ position: "relative", display: "inline-block" }}>
        <Link to={{ pathname: "/cart" }} onClick={handleClickNextPage}>
          <FontAwesomeIcon
            color="white"
            icon={faShoppingCart}
            style={{ height: "35px", marginLeft: "70px" }}
          />
        </Link>
      </div>
    </div>
  );
}

export default Shopping;
