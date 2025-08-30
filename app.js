const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const categoryRoutes = require("./routes/category-route");

const brandRoutes = require("./routes/brand-route");

const productRoutes = require("./routes/product-route");

const customerRoutes = require("./routes/customer-route");

const authRoutes = require("./routes/auth-route");

const { verifyToken ,isAdmin} = require("./middleware/auth-middleware");

const app = express();
const port = 3000;


app.use( express.json());

app.use(cors());

app.get("/",(req , res )=>{
    res.send('response return');
})

app.use("/category", verifyToken, categoryRoutes);
app.use("/brand", verifyToken, brandRoutes);
app.use("/product",verifyToken ,isAdmin, productRoutes);
app.use("/customer",verifyToken, customerRoutes);
app.use("/auth", authRoutes);

async function connectDb() {
    await mongoose.connect("mongodb://localhost:27017" ,{
    dbName : "Texie-store-db"
    });
    console.log('mongoDb connected');
    
}
connectDb().catch((err)=>{
    console.log(err);
})
app.listen(port , ()=>{
    console.log('backend is running on port =' ,port);
})
