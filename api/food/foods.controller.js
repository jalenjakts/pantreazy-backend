const express = require('express');
const router = express.Router();
const axios = require("axios");
const Joi = require('joi');
const validateRequest = require('api/_middleware/validate-request');
const authorize = require('api/_middleware/authorize')
const Role = require('api/_helpers/role');
const foodService = require('api/food/food.service');
const { default: next } = require('next');

// routes
//note: all routes begin with /accounts. 
//EX: https://url.com/accounts/authenticate
router.get('/:barcode', getFood); 



//This grabs item from OpenFoodFacts db

function getFood(req, res, next){
    const food = foodService.getFoodByBarcode(req.params.barcode)
    
    res.send(food)
    next
        
}
module.exports = router;
// function getFood(req, res, next) {
//     food.getFoodByBarcode()
//         .then(accounts => res.json(accounts))
//         .catch(next);
// }
