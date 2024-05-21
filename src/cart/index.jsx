import { useContext } from "react";
import { DataContext } from "../data_router";

function formatCurrency(number) {
  const formattedNumber = number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  // Thay thế ký hiệu "đ" thành "VNĐ"
  return formattedNumber.replace("đ", "VNĐ");
}

function Cart() {
  const { data } = useContext(DataContext);

  const groupedProducts = data.reduce((acc, product) => {
    if (acc[product.id]) {
      acc[product.id].quantity += product.quantity;
      acc[product.id].count += 1;
    } else {
      acc[product.id] = { ...product, count: 1 };
    }
    return acc;
  }, {});

  const mergedProducts = Object.values(groupedProducts);

  const totalAmount = mergedProducts.reduce((total, product) => {
    return total + product.count * product.price;
  }, 0);
  console.log(totalAmount);
  return (
    <div>
      {mergedProducts.map((product) => (
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
              {"The number of products: "}
              {product.count}
            </h2>
          </div>
        </div>
      ))}
      <div
        style={{
          width: "700px",
          height: "50px",
          backgroundColor: "blue",
          borderRadius: "16px",
          justifyItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <span>
          {"Total: "}
          {formatCurrency(totalAmount)}
        </span>
      </div>
    </div>
  );
}

export default Cart;
