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
    
    res.json({
        barcode:  food._id,
        product_name: food.product_name,
        food_group: food.food_groups,
        food_group_tags: food.food_groups_tags,
        image: food.image_front_small_url    
    })
    next
        
}
module.exports = router;

