const express = require('express');
const router = express.Router();
const foodService = require('api/food/food.service');


// routes
//note: all routes begin with /accounts. 
//EX: https://url.com/accounts/authenticate
router.get('/:barcode', getFood); 
// router.get('/getPantry')
// router.post('/addPantryItem',foodSchema, addPantryItem)
// router.delete('/deletePantryItem')
// router.put('/updatePantryItem',pantrySchema)


//This grabs item from OpenFoodFacts db
//
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
        }
        )
    }
    next
        
}
// function addPantryItem(req, res, next){
//     const food = foodService.getFoodByBarcode(req.params.barcode);
//     res.json({
//         message: "Successfully added: "+ food.product_name
//     })
// }

// function pantrySchema(req, res, next) {
//     const schema = Joi.object({
//         barcode: Joi.string().required(),
//         quantity: Joi.number().required()
//     });
//     validateRequest(req, next, schema);
// }

// function foodSchema(req, res, next) {
//     const schema = Joi.object({
//         barcode: Joi.string().required(),
//     });
//     validateRequest(req, next, schema);
// }
module.exports = router;

