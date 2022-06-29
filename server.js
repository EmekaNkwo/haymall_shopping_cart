const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const cors = require("cors");
const express = require("express");

const app = express();

const stripe = require("stripe")(stripeSecretKey);
const { v4: uuid } = require("uuid");

require("dotenv").config();

app.use(express.json());
app.use(cors());

//routes

app.get("/", (req, res) => {
  res.send("Testing Payment Gateway");
});

app.post("/payment", (req, res) => {
  console.log(req.body);
  const { product, token } = req.body;
  console.log("Product", product);
  console.log("Price", product.price);

  //ensures a user is not charged twice
  const idempotencyKey = uuid();

  console.log(token);

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchased the ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address,
            },
          },
        },
        { idempotencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

app.listen(5000, () => console.log("Server running on 5000"));
