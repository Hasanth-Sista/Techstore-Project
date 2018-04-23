const http = require('http');

const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require("body-parser");

var cors = require('cors');
//var jsonParser = bodyParser.json();
//app.use(jsonParser);


app.use(bodyParser.urlencoded({
    limit: 1024 * 1024 * 20,
    extended: true,
    parameterLimit: 50000
}));

app.use(bodyParser.json({
    limit: 1024 * 1024 * 20
}));


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/');

const requestHandler = (request, response) => {
    //console.log(request.url)
};

var output = {};

const server = http.createServer(requestHandler);

app.use(cors());

app.get('/', function (req, res) {
    res.sendFile('C:/Users/sista/Desktop/Project/signin.js'); // change the path to your index.html
});


app.get('/display/:str', (request, response) => {

    var pattern = new RegExp('.*' + request.params.str + '.*', 'gi');
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("techstore");
        dbo.collection("product").find({
            '$or': [{
                'product_type': pattern
            }, {
                'product_name': pattern
            }]
        }).toArray(function (err, result) {
            output = result;
            db.close();
            //console.log(result);
            response.json({
                output
            });
        });
    });

});


app.post('/signup', (request, response) => {
    //
    console.log(request.body.username);
    console.log(request.body.email);

    var pattern = new RegExp(request.body.username);

    var pattern1 = new RegExp(request.body.email);

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("techstore");
        dbo.collection("user_details").findOne({
            '$or': [{
                'user_name': request.body.username
                }, {
                'email': request.body.email
                }]
        }, function (err, result) {
            if (err) throw err;
            output = result;

            if (output != null) {
                output = {};
                output = {
                    'message': "User already exists"
                };
                response.json({
                    output
                });
            } else {
                output = {};
                dbo.collection("user_details").find().sort({
                    'user_id': -1
                }).toArray(function (err, result) {
                    output = result;
                    output = Number(output[0].user_id);
                    output = output + 1;

                    var crypto = require('crypto');
                    var algorithm = 'aes-256-ctr';
                    var password = 'd6F3Efeq';


                    var cipher = crypto.createCipher(algorithm, password);
                    var crypted = cipher.update(request.body.password, 'utf8', 'hex');
                    crypted += cipher.final('hex');
                    //console.log(crypted);


                    var myobj = {
                        'user_id': output,
                        'user_name': request.body.username,
                        'password': crypted,
                        'First Name': request.body.firstname,
                        'Last Name': request.body.last,
                        'email': request.body.email,
                        'phone': request.body.phone,
                        'address': request.body.address,
                        'city': request.body.city,
                        'state': request.body.state,
                        'zip': request.body.zip,
                        'role': request.body.role
                    };
                    dbo.collection("user_details").insertOne(myobj, function (err, res) {
                        if (err) throw err;
                        //console.log("1 document inserted");
                        output = {};
                        output = {
                            'message': "User added successfully"
                        };
                        response.json({
                            output
                        });
                        db.close();
                    });
                });

            };
        });
    });

});



app.post('/login', (request, response) => {


    var email = new RegExp(request.body.email);
    var pass = request.body.password;
    //console.log(pass);

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("techstore");
        dbo.collection("user_details").findOne({
            'email': email
        }, function (err, result) {
            if (err) throw err;

            if (result == null) {
                response.json({
                    'message': "Email incorrect"
                });
                db.close();
            } else {
                var crypto = require('crypto');
                var algorithm = 'aes-256-ctr';
                var password = 'd6F3Efeq';

                var decipher = crypto.createDecipher(algorithm, password);
                var dec = decipher.update(result.password, 'hex', 'utf8');
                dec += decipher.final('utf8');

                output = result;
                if (dec == pass) {
                    response.json({
                        output
                    });
                } else {
                    response.json({
                        'message': "Password incorrect"
                    })
                }
                db.close();
            }
        });
    });

});



app.post('/getCartDetailsOfUser', (request, response) => {
    output = {};
    //console.log("Hi getCartDetails of User");
    //console.log(request.body.email);
    //console.log("yi");
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("techstore");
        dbo.collection("user_cart").find({
            'user.email': request.body.email
        }).toArray(function (err, result) {
            if (err) throw err;
            //console.log(result);
            output = result;
            response.json({
                output
            })
            db.close();
        });
    });
});


app.post('/postCart', (request, response) => {
    output = {};
    //console.log("Hi");
    //console.log(request.body.user);
    //console.log(request.body.cart)
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("techstore");
        var myobj = {
            'user': request.body.user,
            'cart': request.body.cart
        };
        dbo.collection("user_cart").findOne({
            'user.email': request.body.user.email
        }, function (err, result) {
            if (err) throw err;
            if (result == null) {

                dbo.collection("user_cart").insertOne(myobj, function (err, res) {
                    if (err) throw err;
                    db.close();
                });
            } else {

                var myquery = {
                    'user.email': request.body.user.email
                };
                var newvalues = {
                    $set: {
                        'cart': request.body.cart
                    }
                };
                dbo.collection("user_cart").updateOne(myquery, newvalues, function (err, res) {
                    if (err) throw err;
                    console.log("1 document updated");
                    db.close();
                });
            }

        });

    });
});


app.post('/addCheckedOutCart', (request, response) => {
    output = {};

    MongoClient.connect(url, function (err, db) {

        var dbo = db.db("techstore");
        var myobj = {
            'user': request.body.user,
            'cart': request.body.cart
        };
        dbo.collection("checkedout_cart").insertOne(myobj, function (err, res) {
            if (err) throw err;
            db.close();
        });
    });

});

app.post('/checkOutCart', (request, response) => {
    output = {};

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("techstore");
        var quan = request.body.quantity;
        dbo.collection("product_quantity").findOne({
            'product_id': request.body.product_id
        }, function (err, result) {
            if (err) throw err;
            var remain = result.product_quantity - quan;

            var myquery = {
                'product_id': request.body.product_id
            };
            var newvalues = {
                $set: {
                    'product_quantity': remain
                }
            };
            dbo.collection("product_quantity").updateOne(myquery, newvalues, function (err, res) {
                if (err) throw err;
            });

        });

    });

});


app.post('/checkCart', (request, response) => {
    output = {};
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("techstore");
        var quan = request.body.quantity;
        dbo.collection("product_quantity").findOne({
            'product_id': request.body.product_id
        }, function (err, result) {
            if (err) throw err;
            var remain = result.product_quantity - quan;
            if (remain >= 0) {
                response.json({
                    "message": "success"
                })
            } else {
                response.json({
                    "message": "Choose less quantity as stock isnt available for product " + request.body.product_id
                })
            }
            db.close();
        });

    });
});


app.get('/all', (request, response) => {
    output = {};
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("techstore");
        dbo.collection("product").find({}).toArray(function (err, result) {
            output = result;
            db.close();
            response.json({
                output
            });
        });
    });

});

app.get('/allQuan', (request, response) => {
    output = {};
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("techstore");
        dbo.collection("product_quantity").find({}).toArray(function (err, result) {
            output = result;
            db.close();
            response.json({
                output
            });
        });
    });

});

app.get('/delete/:str', (request, response) => {
    output = {};
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("techstore");
        var myquery = {
            'product_id': parseInt(request.params.str)
        };

        var newvalues = {
            $set: {
                flag: false
            }
        };

        dbo.collection("product").updateOne(myquery, newvalues, function (err, obj) {
            db.close();
            response.json({
                output
            });
        });
    });

});


app.post('/update', (request, response) => {
    output = {};
    var myobj = request.body;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("techstore");
        var myquery = {
            'product_id': parseInt(request.body.product_id)
        };
        dbo.collection("product").deleteOne(myquery, function (err, obj) {

            dbo.collection("product").insertOne(myobj, function (err, res) {
                if (err) throw err;
                db.close();
            });
        });
    });

});

app.post('/updateQuan', (request, response) => {
    output = {};
    var myobj = {
        'product_id': parseInt(request.body.product_id),
        'product_quantity': parseInt(request.body.product_quantity)
    }

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("techstore");
        var myquery = {
            'product_id': parseInt(request.body.product_id)
        };
        dbo.collection("product_quantity").deleteOne(myquery, function (err, obj) {

            dbo.collection("product_quantity").insertOne(myobj, function (err, res) {
                if (err) throw err;
                db.close();
            });
        });
    });

});



app.post('/addProd', (request, response) => {
    output = {};

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("techstore");
        dbo.collection("product").findOne({
            'product_id': request.body.product_id
        }, function (err, result) {
            if (err) throw err;
            output = result;

            if (output != null) {
                output = {};
                output = {
                    'message': "Product already exists"
                };
                response.json({
                    output
                });
            } else {
                output = {};
                var myobj = {
                    'product_id': parseInt(request.body.product_id),
                    'product_name': request.body.product_name,
                    'product_type': request.body.product_type,
                    'product_desc': request.body.product_desc,
                    'product_img': request.body.product_img,
                    'product_price': parseInt(request.body.product_price),
                    'product_specs': request.body.product_specs,
                    'flag': true
                };
                dbo.collection("product").insertOne(myobj, function (err, res) {
                    if (err) throw err;
                    //console.log("1 document inserted");
                    output = {};
                    output = {
                        'message': "Product added successfully"
                    };
                    response.json({
                        output
                    });
                    db.close();
                });


            };
        });
    });

});


app.post('/addProdQuan', (request, response) => {
    output = {};

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("techstore");
        dbo.collection("product_quantity").findOne({
            'product_id': parseInt(request.body.product_id)
        }, function (err, result) {
            if (err) throw err;
            output = result;

            if (output != null) {

                var myquery = {
                    'product_id': parseInt(request.body.product_id)
                };

                var newvalues = {
                    $set: {
                        'product_quantity': parseInt(request.body.product_quantity)
                    }
                };

                dbo.collection("product_quantity").updateOne(myquery, newvalues, function (err, obj) {
                    db.close();
                    response.json({
                        output
                    });
                });


            } else {
                output = {};
                var myobj = {
                    'product_id': parseInt(request.body.product_id),
                    'product_quantity': parseInt(request.body.product_quantity),

                };
                dbo.collection("product_quantity").insertOne(myobj, function (err, res) {
                    if (err) throw err;
                    output = {};
                    output = {
                        'message': "Product Quantity added successfully"
                    };
                    response.json({
                        output
                    });
                    db.close();
                });


            };
        });
    });

});




app.get('/orderHistory/:str', (request, response) => {
    output = {};
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("techstore");

        dbo.collection("checkedout_cart").find({'user.email':request.params.str}).toArray(function (err, result) {
            output = result;
            db.close();
            response.json({
                output
            });
        });
    });

});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
});
