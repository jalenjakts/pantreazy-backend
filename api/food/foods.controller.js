const express = require('express');
const router = express.Router();
const foodService = require('api/food/food.service');


// routes
//note: all routes begin with /accounts. 
//EX: https://url.com/accounts/authenticate
router.get('/:barcode', getFood); 



//This grabs item from OpenFoodFacts db
//
async function getFood(req, res, next){
    const food = await foodService.getFoodByBarcode(req.params.barcode);
    
    res.send(food)
    next
        
}
module.exports = router;

