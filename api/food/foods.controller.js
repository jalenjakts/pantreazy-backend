const express = require('express');
const router = express.Router();
const foodService = require('api/food/food.service');
const validateRequest = require('api/_middleware/validate-request');


// routes
//note: all routes begin with /foods. 
//EX: https://url.com/foods/:barcode
router.get('/:barcode', getFood); 
router.get('/getPantry')
router.post('/addPantryItem', addPantryItem)
router.delete('/deletePantryItem')
router.put('/updatePantryItem')


//This grabs item from OpenFoodFacts db
async function getFood(req, res, next){
    const food = await foodService.getFoodByBarcode(req.params.barcode);
    if(food.status_verbose = "product found"){
        res.json({
            barcode:  food.product._id,
            product_name: food.product.product_name,
            food_group: food.product.food_groups,
            food_group_tags: food.product.food_groups_tags,
            image: food.product.image_front_small_url    
        })
    }
    else{
        res.status(404).json({
            message: "Product Not Found"
        })
    }
    next    
}

// function pantrySchema(req, res, next) {
//     const schema = Joi.object({
//         barcode: Joi.number().required(),
//         quantity: Joi.number().required(),
//         accountId: Joi.number().required()
//     });
//     validateRequest(req, next, schema);
// }

// async function addPantryItem(req, res, next){
//     console.log(food);
//     const food = await foodService.addPantryItem(req.params.barcode, req.params.id);
//     res.json({
//         message: "Successfully added item "+ food.product_name  
//     })
//     next
// }

function addPantryItem(req, res, next) {
    foodService.addPantryItem(req.body)
        .then(() => res.json({ message: 'Pantry item added successfully' }))
        .catch(next);
}


// function foodSchema(req, res, next) {
//     const schema = Joi.object({
//         barcode: Joi.number().required(),
//     });
//     validateRequest(req, next, schema);
// }
module.exports = router;

