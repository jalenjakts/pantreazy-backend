require('dotenv').config();
const config = {
    "database": {
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "user": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE
    },
    "secret": process.env.SECRET,
    "emailFrom": process.env.EMAIL,

    
    "smtpOptions": {
        "host": "smtp.gmail.com",
        "port": 587,
        "secure": false,
        "auth": {
            "user": process.env.EMAIL,
            "pass": process.env.EMAIL_PASS
        }
    },

    
    "recipe_api_key": process.env.RECIPE_API_KEY,
    "recipe_api_id": process.env.RECIPE_API_ID,
    
    "EdamamFood": {
        "api_id": "88ce8058",
        "api_key": "8b2fe98fbb3f01582017e134fa2e12a5"

    }
};
module.exports = config;