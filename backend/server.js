const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const Transaction = db.Transaction;
const User = db.User;
const sequelize = db.sequelize;
const axios = require("axios");
const Op = db.Sequelize.Op;
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_mw9XzBoP4TguFKnrKW4ilf5VSGyVFZXf";

const app = express();

var corsOptions = {
  origin: "https://digital-wallet-frontend-six.vercel.app",
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Brown Munde Digital Wallet." });
});
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    let event = request.body;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const checkoutsessionobject = event.data.object;
        const user = await User.findOne({
          where: {
            email: checkoutsessionobject.customer_email,
          },
        });
        if (user) {
          const url =
            "https://digital-wallet-plum.vercel.app/digiwallet/user/updatebalance";
          const dataUser = {
            email: user.email,
            amount: checkoutsessionobject.amount_total / 100,
          };
          const headers = {
            Authorization: process.env.API_KEY,
          };
          axios
            .post(url, dataUser, { headers })
            .then((response) => {
              console.log(
                `POST request to update balance of user:${user.email} successful:`,
                response.data
              );
            })
            .catch((error) => {
              console.error(
                `Error making POST request to update balance of user:${user.email} :`,
                error
              );
              status_val = 0;
            });
          // Create a Transaction
          const new_transaction = {
            to_email: user.email,
            from_email: 0,
            from_name: "Stripe",
            to_name: user.name,
            amount: checkoutsessionobject.amount_total / 100,
            status: 1,
          };
          // Save Transaction in the database (Managed Transaction)
          try {
            const result = await sequelize.transaction(async (t) => {
              const createdTransaction = await Transaction.create(
                new_transaction,
                {
                  transaction: t,
                }
              );
              return createdTransaction;
            });
            if (status_val != 1) {
              res.status(250).json({
                message: "Transaction Logged successfully but failed",
                Transaction: result,
              });
            } else {
              res.status(201).json({
                message: "Transaction created successfully",
                Transaction: result,
              });
            }
          } catch (error) {
            console.error("Error creating Transaction:", error);
            res.status(500).json({ error: "Internal Server Error" });
          }
        }
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);
// Checking for connection
try {
  db.sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

//Syncing the database
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced successfully");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });
require("./routes/user.routes")(app);
require("./routes/transaction.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
