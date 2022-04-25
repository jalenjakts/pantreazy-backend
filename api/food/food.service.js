const axios = require("axios");
const baseurl = "https://world.openfoodfacts.org/api/v0/product/"
const OpenFoodFactsFields = "?fields=_id,product_name,food_groups,food_groups_tags,image_front_small_url"

module.exports = {
  getFoodByBarcode,
  addPantryItem
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

async function addPantryItem(params){
  const food = await getFoodByBarcode(params.barcode);
  //throw error if barcode wrong
  console.log(await db.Pantry.findOne({where: {accountId: params.id} && {foodId: params.barcode}}))
  if(food.status_verbose == "product not found"){
    throw "product not found";
  }

  //throw error if food is already registered under the account
  else if (await db.Pantry.findOne({where: {accountId: params.id} && {foodId: params.barcode}}) != null) {
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
      accountId: params.id
    });
    
  }
}
