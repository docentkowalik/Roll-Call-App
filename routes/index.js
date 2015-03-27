var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var db = req.app.settings.db;

//Once the '/' url is opened programYear collection is created and documents are automatically added to mongoDB database. If the collections already 
//exist the new collections are not being added.
//The following functions read json file for each program year, parse it and then insert into mongoBD
db.collectionNames('programYear', function(err, names) {
    console.log('Exists: ', names.length > 0);

    if (names.length > 0 == false) { //checking if the collections length is greated than 0 

            fs.readFile('public/data/CMMYR1.json', CMMYR1)
            function CMMYR1(err, data1) {
                var obj1;
                if (err) throw err
                obj1 = JSON.parse(data1)
                console.log(obj1);

                var db = req.app.settings.db;
                    db.collection('programYear', function(err, collection) {
                        collection.insert(obj1, {
                            w: 1
                        },  function(err, result) {
                            if (err) throw err;
                            console.log(result);
                        });
                    });
            }

            fs.readFile('public/data/CMMYR2.json', CMMYR2)
            function CMMYR2(err, data2) {
                var obj2;
                if (err) throw err
                obj2 = JSON.parse(data2)
                console.log(obj2);
                
                var db = req.app.settings.db;
                    db.collection('programYear', function(err, collection) {
                        collection.insert(obj2, {
                            w: 1
                        },  function(err, result) {
                            if (err) throw err;
                            console.log(result);
                        });
                    });
            }

            fs.readFile('public/data/CMMYR3.json', CMMYR3)
            function CMMYR3(err, data3) {
                var obj3;
                if (err) throw err
                obj3 = JSON.parse(data3)
                console.log(obj3);
                
                var db = req.app.settings.db;
                    db.collection('programYear', function(err, collection) {
                        collection.insert(obj3, {
                            w: 1
                        },  function(err, result) {
                            if (err) throw err;
                            console.log(result);
                        });
                    });
            }

            fs.readFile('public/data/CMMYR4.json', CMMYR4)
            function CMMYR4(err, data4) {
                var obj4;
                if (err) throw err
                obj4 = JSON.parse(data4)
                console.log(obj4);
                
                var db = req.app.settings.db;
                    db.collection('programYear', function(err, collection) {
                        collection.insert(obj4, {
                            w: 1
                        },  function(err, result) {
                            if (err) throw err;
                            console.log(result);
                        });
                    });
            }

            fs.readFile('public/data/DAPYR1.json', DAPYR1)
            function DAPYR1(err, data5) {
                var obj5;
                if (err) throw err
                obj5 = JSON.parse(data5)
                console.log(obj5);
                
                var db = req.app.settings.db;
                    db.collection('programYear', function(err, collection) {
                        collection.insert(obj5, {
                            w: 1
                        },  function(err, result) {
                            if (err) throw err;
                            console.log(result);
                        });
                    });
            }

            fs.readFile('public/data/DAPYR2.json', DAPYR2)
            function DAPYR2(err, data6) {
                var obj6;
                if (err) throw err
                obj6 = JSON.parse(data6)
                console.log(obj6);
                
                var db = req.app.settings.db;
                    db.collection('programYear', function(err, collection) {
                        collection.insert(obj6, {
                            w: 1
                        },  function(err, result) {
                            if (err) throw err;
                            console.log(result);
                        });
                    });
            }

            fs.readFile('public/data/DAPYR3.json', DAPYR3)
            function DAPYR3(err, data7) {
                var obj7;
                if (err) throw err
                obj7 = JSON.parse(data7)
                console.log(obj7);
                
                var db = req.app.settings.db;
                    db.collection('programYear', function(err, collection) {
                        collection.insert(obj7, {
                            w: 1
                        },  function(err, result) {
                            if (err) throw err;
                            console.log(result);
                        });
                    });
            }

            fs.readFile('public/data/DAPYR4.json', DAPYR4)
            function DAPYR4(err, data8) {
                var obj8;
                if (err) throw err
                obj8 = JSON.parse(data8)
                console.log(obj8);
                
                var db = req.app.settings.db;
                    db.collection('programYear', function(err, collection) {
                        collection.insert(obj8, {
                            w: 1
                        },  function(err, result) {
                            if (err) throw err;
                            console.log(result);
                        });
                    });
            }
        }
        else{
            console.log("Collection programYear already exists");
        }
});
  res.render('index', { title: 'Express' });
});

module.exports = router;
