# YelpCamp
 
## Description:
Web Application for lodging, primarily homestays for vacation
rentals, and tourism activities. Improved user experience by security authentication and authorization.

### Setup MongoDB
If built locally and run with mongoDB Atlas, you need to have mongoDB Atlas account and paste your URI in .env file: 
```
MONGO_URI = "Your MONGODB ATLAS URI HERE"
```
### Setup Google
you need to have Google Developer Account and paste your ClientId and ClientSecret in .env file: 
```
GOOGLE_CLIENT_ID = "Your GOOGLE CLIENT ID HERE"
GOOGLE_CLIENT_SECRET = "Your GOOGLE CLIENT SECRET HERE"
```

### NPM Install
```
npm install  
node app.js || nodemon app.js
```

### Library Used
- express
- ejs
- body-parser
- express-sanitizer
- dotenv
- mongoose
- method-override
- connect-flash
- passport
- passport-local
- passport-local-mongoose
- passport-google-oauth20
- express-session

## Additional Feature
Apart from passport-local Authorization with Google is also supported. 