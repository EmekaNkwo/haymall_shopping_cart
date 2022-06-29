import { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import "./App.css";

function App() {
  const [product, setProduct] = useState({
    name: "Clothe",
    price: 10,
    prodcutBy: "Me",
  });

  const makePayment = async (token) => {
    console.log(token);
    const body = {
      token,
      product,
    };
    console.log(body);
    const headers = { "Content-Type": "application/json" };

    return axios
      .post(`http://localhost:5000/payment`, body, headers)
      .then((response) => {
        console.log("Response: ", response);
        const { status } = response;
        console.log("STATUS: ", status);
      })
      .catch((error) => console.log("Error: ", error));
  };

  return (
    <div className="app text">
      <div className="app-body">
        <StripeCheckout
          stripeKey="pk_test_51LFPtwCAwegCSXTZnQrkcFhPSnocyBThgs1qXn10wdy4BPBc824WpZSFjKccPTt18rjKe7UNMK32RjAgWHpD6xD600DxH4frFM"
          token={makePayment}
          name={`Buy ${product.name}`}
          amount={product.price * 100}
        >
          <button className="btn-large blue">
            Buy Clothe for ${product.price}
          </button>
        </StripeCheckout>
      </div>
    </div>
  );
}

export default App;
