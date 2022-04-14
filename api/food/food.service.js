const axios = require("axios");
const baseurl = "https://world.openfoodfacts.org/api/v0/product/"

module.exports = {
  getFoodByBarcode
}



//implemented this with async in order to adapt to whether the api call returns the correct response or not. 
//If it returns with an incorrect response, the function should just move on to return nothing (and the error should display)
async function getFoodByBarcode(barcode) {
  //edit this to be more readable later with params in the options section of the axios.get method
  //const food = await axios.get('https://api.edamam.com/api/food-database/v2/parser?app_id=88ce8058&app_key=8b2fe98fbb3f01582017e134fa2e12a5&upc=' + barcode);
  try{
    const food = await axios.get(baseurl + barcode);
    console.log("hi")
    return food;
  }
  catch(err){
    console.log(err)
    return err;
  }
}
