const express = require('express');
import db from './models';
const dotenv = require('dotenv');
import * as bodyparser from 'body-parser';
dotenv.config({path: '.env-local'});

const PORT = process.env.PORT || '3001';
import { Router } from './router';
const app = express();


 app.use(bodyparser.urlencoded({
  extended: true
}
));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(function (req:any, res:any, next:any) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, request-source");
  next();
});

 
 const router = new Router(app);

//Associating the routers to application
router.associate();

/**Start listening */
app.listen(PORT, () => {
    console.log(`Listening for requests on port ${PORT}`)
})