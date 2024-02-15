const express = require('express');
const router = express.Router();
const Product = require('../models/product')


// Mart means all products
// Shop means specific user products


// Mart pages
// Mart Products - All Products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length > 0) {
      res.status(200).send({
        response: true,
        data: products
      })
    } else {
      res.status(200).send({
        message: "Mart hasn't products",
        response: false,
        data: []
      })
    }
  } catch (error) {
    res.status(400).send(err)
  }
})

// Search Mart products by name, brand, category
router.get('/search/:key', async (req, res) => {
  console.log(req.params)
  try {
    const searchedProduct = await Product.find({
      "$or": [
        { name: { $regex: req.params.key } },
        { brand: { $regex: req.params.key } },
        { category: { $regex: req.params.key } }
      ]
    });
    if (searchedProduct) {
      res.status(200).send({
        // message: "Successfully Product deleted",
        response: true,
        data: searchedProduct
      })
    } else {
      console.log(searchedProduct)
      res.status(400).send({
        message: "Product not found",
        response: false
      })
    }
  } catch (error) {
    res.status(400).send(err)
  }
})


// User dashboard
// Shop Products - Owner All Products
router.post('/userProducts', async (req, res) => {
  try {
    const products = await Product.find(req.body);
    if (products.length > 0) {
      res.status(200).send({
        // message: "New Product added to Mart",
        response: true,
        data: products
      })
    } else {
      res.status(200).send({
        message: "Your mart is empty",
        response: null
      })
    }
  } catch (error) {
    res.status(400).send(err)
  }
})


// new product
// Post one product of the user by id
router.post('/addProduct', async (req, res) => {
  try {
    const addProduct = new Product(req.body);
    const result = await addProduct.save();

    res.status(201).send({
      message: "New Product added to Shop",
      response: true,
      data: result
    })
  } catch (error) {
    res.status(400).send(err)
  }
})

// Get one product of the user by id
router.get('/product/:id', async (req, res) => {
  try {
    const oneProduct = await Product.findById({ _id: req.params.id });
    if (oneProduct) {
      res.status(200).send({
        // message: "New Product added to Mart",
        response: true,
        data: oneProduct
      })
    } else {
      res.status(200).send({
        message: "Product not found in Mart",
        response: null
      })
    }
  } catch (error) {
    res.status(400).send(err)
  }
})

// Update one product of the user by id
router.put('/product/:id', async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    });
    if (updateProduct) {
      res.status(200).send({
        message: "Successfully Product updated",
        response: true,
        data: updateProduct
      })
    } else {
      res.status(200).send({
        message: "Product not found in Mart",
        response: null
      })
    }
  } catch (error) {
    res.status(400).send(err)
  }
})

// Delete one product of the user by id
router.delete('/product/:id', async (req, res) => {
  try {
    // const _id = req.params.id;
    // console.log(req.params)
    const deleteProduct = await Product.deleteOne({ _id: req.params.id });
    if (deleteProduct) {
      res.status(200).send({
        message: "Successfully Product deleted",
        response: true,
        data: deleteProduct
      })
    } else {
      console.log(deleteProduct)
      res.status(400).send({
        message: "Product not found",
        response: false
      })
    }
  } catch (error) {
    res.status(400).send(err)
  }
})


// Search product of the user by name, brand, price, category
router.get('/search/:userId/:key', async (req, res) => {
  console.log(req.params)
  try {
    const searchedProduct = await Product.find({
      userId: req.params.userId,
      "$or": [
        { name: { $regex: req.params.key } },
        { brand: { $regex: req.params.key } },
        { category: { $regex: req.params.key } }
      ]
    });
    if (searchedProduct) {
      res.status(200).send({
        // message: "Successfully Product deleted",
        response: true,
        data: searchedProduct
      })
    } else {
      console.log(searchedProduct)
      res.status(400).send({
        message: "Product not found",
        response: false
      })
    }
  } catch (error) {
    res.status(400).send(err)
  }
})

module.exports = router