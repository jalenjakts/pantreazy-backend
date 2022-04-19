const axios = require("axios");
const baseurl = "https://world.openfoodfacts.org/api/v0/product/"

module.exports = {
  getFoodByBarcode
}



//implemented this with async in order to adapt to whether the api call returns the correct response or not.
async function getFoodByBarcode(barcode) {
  
  try{
    const food = await axios.get(baseurl + barcode + ".json");
    return food.data.product;
  }
  catch(err){
    return err;
  }
}
