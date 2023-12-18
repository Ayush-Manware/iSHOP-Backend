const express = require("express");
require("./database/config");
const User = require("./database/user");
const cors = require("cors");
const { Data } = require("./data");
const cartSchema = require("./database/cartSchema");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Home");
});

app.post("/signup", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject()
  delete result.password
  res.send(result);
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "No user found" });
    }
  } else {
    res.send({ result: "No user found" });
  }
});

 
app.post('/addProduct', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await cartSchema.findOne({ userId });

    if (!cart) {
      // If the user doesn't have a cart, create a new one
      cart = new cartSchema({ userId, products: [] });
    }

    // Check if the product is already in the cart
    const existingProduct = cart.products.find((p) => p.productId.equals(productId));

    if (existingProduct) {
      // If the product is already in the cart, update the quantity
      existingProduct.quantity += quantity || 1;
    } else {
      // If the product is not in the cart, add it
      cart.products.push({ productId, quantity: quantity || 1 });
    }

    // Save the cart
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get("/all",(req, res)=>{
  res.send(Data)
})

app.listen(2100, () => {
  console.log("Server Started");
});
