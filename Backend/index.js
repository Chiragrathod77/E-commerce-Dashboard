const express = require('express');
const app = express();
const cors = require('cors');
const Users = require('./Database/User')
const Product = require('./Database/Product')
require('./Database/config');
app.use(express.json())
app.use(cors()) //this is handle for error handlig for api intigration time
const JWT = require('jsonwebtoken');
const jwtKey = 'e-commerce-dashboard';


// create middleware for varifying the jwt token
function varifyToken(req, resp, next){
    
    let token = req.headers['authorization'];
    console.log("middleware called",token)
    if(token){
      token = token.split(' ')[1];
        JWT.verify(token,jwtKey,(err,success)=>{
            if(err){
                resp.status(401).send({result : 'please provide valid token'})
            }
            else{
                next();
            }
        })
    }
    else{
        resp.status(403).send({result:"please add token with Header"})
    }
}



//  This is  get Api
app.get('/', varifyToken, async (req, resp) => {
    let result = await Users.find();
    resp.send(result);
});

// show data in browser
app.get('/product', varifyToken,async (req, resp) => {
    let result = await Product.find();
    if (Product.length > 0) {
        resp.send(result);
    }
    else {
        resp.send({ result: "No Products Found" });
    }
});

// This api is intigrate on react JS
app.post('/register', async (req, resp) => {
    let user = new Users(req.body);
    let result = await user.save();
    // this is used for not show password in fetch time or show time
    result = result.toObject();
    delete result.password;
    // create JWT token then user signup and login
    JWT.sign({ result }, jwtKey, { expiresIn: '2h' }, (error, token) => {
        if (error) {
            resp.send('something went wrong!');
        }
        else {
            resp.send({ result, auth: token });
        }

    })
})

// all are login condition for safety reseon

// .select("-password") it is used for display password in client side
app.post('/login', async (req, resp) => {  //this is login api route
    if (req.body.password && req.body.email) {   //it is checked for both params is correctly send
        let user = await Users.findOne(req.body).select("-password");
        // this if is used for user in pass same value then show all data without show not found user data
        if (user) {
            JWT.sign({ user }, jwtKey, { expiresIn: '2h' }, (err, token) => {
                if (err) {
                    resp.send('Something wents Wrong!');
                }
                else {
                    resp.send({ user, auth: token });
                }

            });
        }
        else {
            resp.send({ result: 'user  Not found' })
        }
    }
    else {
        resp.send({ result: 'user Not found' })
    }
});

//  Prodct insert api 
app.post('/add_product',varifyToken, async (req, resp) => {
    let data = new Product(req.body);
    let result = await data.save();
    resp.send(result);
})

// product list in delete record using pu api 
app.delete('/delete/:id', varifyToken, async (req, resp) => {
    let result = await Product.deleteOne({
        _id: req.params.id
    });
    resp.send({ result: "data is deleted" })
})

// get data using id for update the data 
app.get('/product/:id',  varifyToken,async (req, resp) => {
    const result = await Product.findOne({ _id: req.params.id })
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: "No record Found" })
    }
})


// update api create http://localhost:8080/update/
app.put('/update/:id', varifyToken,async (req, resp) => {
    let result = await Product.updateMany(
        { _id: req.params.id },
        {
            $set: req.body
        }

    );
    resp.send(result);
})


// make searcch api http://localhost:8080/search/key
app.get('/search/:key', varifyToken, async (req, resp) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { company: { $regex: req.params.key } }
        ]
    });
    resp.send(result);
});

app.listen(8080);