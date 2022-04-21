const axios = require("axios");
const baseurl = "https://world.openfoodfacts.org/api/v0/product/"
const OpenFoodFactsFields = "?fields=_id,product_name,food_groups,food_groups_tags,image_front_small_url"

module.exports = {
  getFoodByBarcode
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
