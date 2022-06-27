const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

const express = require("express");

const app = express();
const fs = require("fs");
const stripe = require("stripe")(stripeSecretKey);

require("dotenv").config();

app.use(express.json());

//routes
app.get("/store", function (req, res) {
  fs.readFile("items.json", (error, data) => {
    if (error) {
      res.status(500).end();
    } else {
      res.render("./client/app.js", {
        stripePublicKey: stripePublicKey,
        items: JSON.parse(data),
      });
    }
  });
});

app.post("/purchase", (req, res) => {
  fs.readFile("items.json", (error, data) => {
    if (error) {
      res.status(500).end();
    } else {
      const itemsJson = JSON.parse(data);
      const itemsArray = itemsJson.music.concat(itemsJson.merch);
      let total = 0;
      req.body.items.forEach(function (item) {
        const itemJson = itemsArray.find((i) => {
          return i.id == item.id;
        });
        total = total + itemJson.price * item.quantity;
      });

      stripe.charges
        .create({
          amount: total,
          source: req.body.stripeTokenId,
          currency: "usd",
        })
        .then(() => {
          console.log("Charge Successful");
          res.json({ message: "Successfully purchased items" });
        })
        .catch(() => {
          console.log("Charge Fail");
          res.status(500).end();
        });
    }
  });
});
