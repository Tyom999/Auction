const express = require('express');
const router = express.Router();
const productController = require('../Controller/productController')



router.post('/add', productController.add);
router.get('/getProducts',productController.getAllProducts);
router.get('/getCompletedProducts',productController.getCompletedProducts);
router.get('/getUnfinishedProducts',productController.getUnfinishedProducts);
router.get('/getOneProduct/:id',productController.getOneProduct);
router.put('/sellProduct/:id',productController.sellProduct);

module.exports = router;
