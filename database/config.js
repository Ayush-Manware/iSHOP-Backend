const mongoose = require("mongoose")
const connectionURL = "mongodb+srv://eCommerceUsername:ecommerceusername@ecommercecluster0.aknhpuh.mongodb.net/eCommerceDatabase?retryWrites=true&w=majority"

mongoose.connect(connectionURL)