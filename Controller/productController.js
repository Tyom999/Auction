const Products = require('../models/Products');
const socket = require('../Socket/socketService');
const jwt = require('jsonwebtoken');
const config = require('../config/keys');

module.exports = {
    add: async(req, res) => {
       try{
           const newProduct = await Products.create({
               mark: req.body.mark,
               model: req.body.model,
               description: req.body.description,
               date: req.body.date,
               startBid: req.body.startBid,
               liveUsers: [req.body.userId],
               activeUser: req.body.userId,
               isDone: false
           });

           res.status(201).json(newProduct._doc)
       } catch(e) {
           res.status(500).json({
               err: e
           })
       }
    },
    getAllProducts: async (req, res) => {
        try {
            let products = await Products.find({});
                res.status(201).json(products)

        }catch (e) {
            res.status(409).json({
                err: e
            })
        }
    },
    getOneProduct: async (req, res) => {
        try {
            let product = await Products.findOne({_id: req.params.id})
            res.status(201).json(product);
        } catch (e) {
           res.status(409).json({
               msg: 'Could not find product'
           })
        }        
    },
    getCompletedProducts: async (req, res) => {
        try{
            let products = await Products.find({});
            let filteredProducts = [];
            products.forEach(product => {
                if (product.isDone === true) {
                    filteredProducts.push(product);
                }
            });
            res.status(201).json(filteredProducts);
        } catch (e){
            res.status(409).json({
                err: e
            })
        }
    },
    getUnfinishedProducts: async (req, res) => {
        try{
            let products = await Products.find({});
            let filteredProducts = [];
            products.forEach(product => {
                if (product.isDone !== true) {
                    filteredProducts.push(product);
                }
            });
            res.status(201).json(filteredProducts);
        } catch (e){
            res.status(409).json({
                err: e
            })
        }
    },
    sellProduct: async (req, res) => {
        try {
            await Products.updateOne({_id: req.params.id}, {
                    mark: req.body.mark,
                    model: req.body.model,
                    description: req.body.description,
                    date: req.body.date,
                    startBid: req.body.startBid,
                    isDone: true
            },
                () => {
                res.status(201).json({
                    msg: "Updated successfully"
                });
                });
        } catch (e) {
            res.status(500).json({
                err: e
            });
        }
    }
}
