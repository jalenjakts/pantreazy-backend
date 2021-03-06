const axios = require("axios");
const { recipe_api_key } = require("../config");
const baseurl = "https://world.openfoodfacts.org/api/v0/product/"
const OpenFoodFactsFields = "?fields=_id,product_name,food_groups,food_groups_tags,image_front_small_url"
const recipeurl = "https://api.spoonacular.com/recipes/findByIngredients?ingredients="
const recipeFields = "&number=5&apiKey=" + recipe_api_key

module.exports = {
  getFoodByBarcode,
  addPantryItem,
  updatePantryItem,
  getPantryItems,
  deletePantryItem,
  getRecipes

}



//implemented this with async in order to adapt to whether the api call returns the correct response or not.
async function getFoodByBarcode(barcode) {
  
  try{
    const food = await axios.get(baseurl + barcode + ".json" + OpenFoodFactsFields);
    
    return food.data;
    
  }
  catch(err){
    return err;
  }
}

async function addPantryItem(params, userId){
  const food = await getFoodByBarcode(params.barcode);
  //throw error if barcode wrong
  if(food.status_verbose == "product not found"){
    throw "product not found";
  }

  //throw error if food is already registered under the account
  else if (await db.Pantry.findOne({where: {accountId: userId} && {foodId: params.barcode}}) != null) {
    throw "The pantry item " + food.product.product_name +  " is already registered under this account";
  }

  else{
    //creates PantryItem
    const newFood = await db.Pantry.create({
      foodId:  food.product._id,
      product_name: food.product.product_name,
      food_group: food.product.food_groups,
      food_group_tags: food.product.food_groups_tags,
      image: food.product.image_front_small_url,
      quantity: params.quantity,
      accountId: userId
    });
    
    return newFood;
  }
}

async function updatePantryItem(params, userId){
  //finds pantry item
  const pantryItem = await db.Pantry.findOne({where: {accountId: userId} && {foodId: params.barcode}});
  
  //if no pantry item is not found, throw error
  if(pantryItem == null){ throw "pantry item not found" }

  //edits and saves pantry item
  pantryItem.quantity = params.quantity;
  await pantryItem.update({ quantity: params.quantity })
}

async function deletePantryItem(params, userId){
  //finds pantry item
  const pantryItem = await db.Pantry.findOne({where: {accountId: userId} && {foodId: params.barcode}});
  
  //if no pantry item is not found, throw error
  if(pantryItem == null){ throw "pantry item not found" }

  await pantryItem.destroy();
}

async function getPantryItems(userId){
  // find array of all pantry items user has.
  //const pantry = await db.Pantry.findAll({where: {accountId: params.id}} && {attributes: ['foodid', 'quantity', 'product_name', 'image', 'food_group', ['accountId', 'id']]} )
  const pantry = await db.Pantry.findAll({where: {accountId: userId}});
  //if no pantry item is not found, throw error (not working atm?)
  if(pantry == null){ throw "pantry not found" }
  
  return pantry;
}

async function getRecipes(userId){

  //grabs all items in user's pantry
  const pantry = await getPantryItems(userId);
  if(!pantry || pantry == "pantry not found"){
    throw "pantry not found"
  }
  var allProducts = "";

  //makes a list of all pantry items by name
  for(var i = 0; i < pantry.length; i++){
    allProducts = allProducts.concat(",+",pantry[i].dataValues.product_name);
  }

  //grabs recipes based on product names
  const recipes = await axios.get(recipeurl + allProducts + recipeFields);
  
  //creates empty json object and inserts necessary data into the object.
  // var recipeData = {}; 
  // recipeData[recipes] = [];
  // var data;
  // for(var i = 0; i < recipes.length; i++){
    
  //   recipeData[recipes]
  // }
  return recipes.data;

}