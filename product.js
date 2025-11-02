import express from "express";
import fs from "fs";
import { findPackageJSON } from "module";
const app = express();
const PORT = 3000;
const server = express();


app.get("/",(req,res)=>{
    res.end("Welcome to product page ");
});

app.get("/home",(req,res)=>{
    res.end("hey from home page");
});

app.get("/product",(req, res)=> {
    fs.readFile("./product.json","utf-8",(err,data)=>{
if (err){
    res.status(404).send("file not found");
    return;
 }else{
    //       const products= JSON.parse(data);
    //   res.json(products);
    res.type("application/json").send(data);
        }
    });
});
app.get("/product/:id", (req, res) => {
  const productId = req.params.id; // Get ID from URL
  fs.readFile("./product.json", "utf-8", (err, data) => {
    if (err) {
      res.status(404).send("File not found");
      return;
    }

    const products = JSON.parse(data); // Parse JSON
    const product = products.find(p => p.id == productId); // Find product by ID

    if (product) {
      res.json(product); // Send product data
    } else {
      res.status(404).send("Product not found");
    }
  });
});

app.listen(PORT,()=>{
    console.log("server is running on 3000");
});