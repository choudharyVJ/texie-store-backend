const express = require("express");
const {
  getNewProducts,
  getProductForListing,
} = require("../handlers/product-handler");
const { getFeaturedProducts , getProduct } = require("../handlers/product-handler");
const { getCategory, getCategoryById } = require("../handlers/category-handler");
const { getBrands } = require("../handlers/brand-handler");

const router = express.Router();

router.get("/new-products", async (req, res) => {
  let products = await getNewProducts();
  res.send(products);
});

router.get("/featured-products", async (req, res) => {
  let products = await getFeaturedProducts();
  res.send(products);
});

router.get("/categories", async (req, res) => {
  let categories = await getCategory();
  res.send(categories);
});

router.get("/brands", async (req, res) => {
    let brands = await getBrands();
    res.send(brands);
  });

router.get("/products", async (req, res) => {
  const { searchTerm, categoryId, brandId, sortBy, sortOrder , page , pageSize } = req.query;
  let products = await getProductForListing(
    searchTerm,
    categoryId,
    brandId,
    page,
    pageSize,
    sortBy,
    sortOrder
  );
  res.send(products);
});

router.get("/product/:id",async (req,res)=>{
    const id = req.params['id'];
    let product = await getProduct(id);
    res.send(product);
});

router.get("/category/:id",async (req,res)=>{
    const id = req.params['id'];
    let categoryId = await getCategoryById(id);
    res.send(categoryId);
});

module.exports = router;
