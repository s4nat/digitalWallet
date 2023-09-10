const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
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
  (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data.object;
        console.lo("STRIPE OBJECT:", checkoutSessionCompleted);

        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send({ Data: event.data.object });
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
