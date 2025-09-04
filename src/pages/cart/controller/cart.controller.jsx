import { CartView } from "../view/cart.view";
import axios from "axios";
import { useState } from "react";

export function CartController() {

  const [produtos, setProdutos] = useState([]);

  axios.get("http://localhost:3000/produtos")
    .then((response) => {
      setProdutos(response.data);
    })
    .catch((error) => {
      console.error("Error fetching cart data:", error);
    });

  return <CartView produtos={produtos} />;
}
