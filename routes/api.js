var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

router.get('/getModuleClass', function(req, res, next) {

    var db = req.app.settings.db;
    db.collection('moduleClass', function(err, classCollection) {
        if (err) {throw err;}
        
        classCollection.find().sort('_id', 'desc').toArray(function(err, classList) {
            if (err) {throw err};
            res.json(classList);
        });
    });
});

router.get('/getClassStudents/:id', function(req, res, next) {
    var classID = req.params.id;
    var class_id = new ObjectId(classID);
    var db = req.app.settings.db;

    db.collection('moduleClass', function(err, students) {
        if (err) {throw err;}

        students.find({_id: class_id}).toArray(function(err, classArr) {
            if (err) {throw err};

            var classArray = classArr[0].class_students;

            var currentStudent = 0;
            var student_id = classArray[currentStudent].studentNumber;

            var responseArray = new Array();

            db.collection('programYear', function(err, programColl) {
                if (err) {throw err;}

                function getStudent(sid) {
                    programColl.find({
                        "students.studentNumber": sid
                    }, {
                        students: {
                            $elemMatch: {
                                studentNumber: sid
                            }
                        }
                    }).toArray(function(err, studentsList) {
                        if (err) {throw err};

                        responseArray.push(studentsList);

                        if (currentStudent < classArray.length - 1) {
                            currentStudent++;
                            student_id = classArray[currentStudent].studentNumber;
                            getStudent(student_id);
                        } else {
                            console.log(responseArray);
                            res.json(responseArray);
                        }
                    });
                }
                getStudent(student_id);
            });
        });
    });
});

router.post('/takeRollCall', function(req, res, next) {
    var cmd = req.body.cmd;
    var classID = req.body.rollClassID;
    var class_id = new ObjectId(classID);
    var studentsObject = req.body.rollClassStudents;
    console.log(studentsObject);
    var db = req.app.settings.db;

    if (cmd == "roll") {
       
        db.collection('moduleClass', function(err, classCollection) {
            if (err) {throw err;}

            classCollection.find({_id: class_id}).sort('_id', 'desc').toArray(function(err, classArray) {
                    if (err) {throw err};

                    var class_day = classArray[0].class_day;
                    var class_year = classArray[0].class_year;
                    var class_startTime = classArray[0].class_startTime;
                    var class_duration = classArray[0].class_duration;
                    console.log(class_day, class_year, class_startTime, class_duration);

                    var currentTime = new Date(); //creating new date variable
                    var month = currentTime.getMonth() + 1; //getting the current month
                    var day = currentTime.getDate(); //getting the current day
                    var year = currentTime.getFullYear(); //getting the current year
                    var date_published = (day + "/" + month + "/" + year); //creating a daye string and storing it in the time variable
                    var current_date = date_published;

                    db.collection('rollCall', function(err, collection) {

                        var newRollCall = {
                            moduleClassID: class_id,
                            studentsPresent: studentsObject,
                            roll_call_year: class_year,
                            roll_call_day: class_day,
                            roll_call_date: current_date,
                            roll_call_start_time: class_startTime,
                            roll_call_duration: class_duration,
                        };

                        collection.insert(newRollCall, {
                            w: 1
                        }, function(err, result) {
                            if (err) throw err;

                            console.log("Roll Call Done: ", result);
                            res.send("Roll Call Done" + result);
                        });
                    });
                });
            });
    }
    else if (cmd == "late") {

            db.collection('rollCall', function(err, pagesCollection) {
                pagesCollection.update({
                    moduleClassID: class_id
                }, {
                    $set: {
                        studentsPresent: studentsObject
                           }
                }, function(err, result) {
                    if (err) throw err;
                            console.log("Roll Call Update Done: ", result);
                            res.send("updated");                
                        });
            });
    };
});

router.post('/createNewClass', function(req, res, next) {
    var classRollCall = req.body.newclass;
    var db = req.app.settings.db;

    var class_name = classRollCall[0].className;
    var class_year = classRollCall[0].classYear;
    var class_startTime = classRollCall[0].classStarTime;
    var class_duration = classRollCall[0].classDuration;
    var class_recurring = classRollCall[0].classRecurring;
    var class_programme = classRollCall[0].classProgram;
    var class_students = null;

    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var class_day = weekday[d.getDay()];
    console.log(class_day);

    var time = parseInt(class_startTime);
    console.log(time);
    var dur = class_duration;
    console.log(dur);

    var sum = time + dur;
    console.log(sum);

    var timestr = sum.toString();

    var strAdd = ":00";
    var class_endTime = timestr.concat(strAdd);
    console.log(class_endTime);

    db.collection('moduleClass', function(err, collection) {

        var newModuleClass = {
            class_name: class_name,
            class_year: class_year,
            class_day: class_day,
            class_startTime: class_startTime,
            class_endTime: class_endTime,
            class_duration: class_duration,
            class_recurring: class_recurring,
            class_programme: class_programme,
            class_students: class_students
        };

        collection.insert(newModuleClass, {
            w: 1
        }, function(err, result) {
            if (err) throw err;

            console.log("Module Class Added ", result);
            res.json(result);
        });
    });
});

router.post('/pickClassStudents', function(req, res, next) {

    var db = req.app.settings.db;
    var pickYear = req.body.yr;
    var pickProg = req.body.prg;

    var studentsResponse = new Array();

    db.collection('programYear', function(err, classCollection) {
        if (err) {throw err;}

        for (var i = 0; i < pickProg.length; i++) {
            pickProg[i]

            classCollection.find({
                $and: [{
                    year: pickYear
                }, {
                    name: pickProg[i]
                }]
            }).sort('_id', 'desc').toArray(function(err, studentsList) {

                if (err) {
                    throw err
                };
                studentsResponse.push(studentsList);
                if (pickProg.length === studentsResponse.length) {

                    res.json(studentsResponse);
                    console.log(studentsResponse);
                }
            });
        }
    });
});

router.post('/saveClassStudents', function(req, res, next) {
    var db = req.app.settings.db;
    var ID = req.body.classID;
    var students = req.body.studentsObject;
    var classID = new ObjectId(ID); 

    db.collection('moduleClass', function(err, pagesCollection) {

        pagesCollection.update({
            _id: classID
        }, {
            $set: {
                class_students: students
            }
        }, function(err, result) {
            if (err) throw err;

            res.json(result);
            console.log(result);
        });
    });
});

router.post('/deleteClass', function(req, res, next) {
    var db = req.app.settings.db;
    var ID = req.body.classID;
    var classID = new ObjectId(ID); //id of the current item

   db.collection('moduleClass', function(err, collection) {
      collection.remove({_id: classID}, {w:1}, function (err, result) {
        if (err) throw err;
         res.json(result);
         console.log(result);
      });
    });
});

router.post('/addStudent', function(req, res, next) {
    var studentObject = req.body.newStudent;
    var db = req.app.settings.db;

    var program = studentObject.prog;
    var YR = studentObject.yr;
    var yeaR = parseInt(YR);
    console.log(yeaR);

    var lastname = studentObject.lastname;
    var firstname = studentObject.firstname;
    var studentNumber = studentObject.studentNumber;
    
    var obj = {lastname:lastname, firstname:firstname, studentNumber:studentNumber}
    //student object that will be inserted into the student array of student objects in programYear collection
  
     db.collection('programYear', function(err, progYearColl) {
     if (err) {throw err;}

        progYearColl.find( { $and: [ { year: yeaR}, { name: program } ] } ).toArray(function(err, collNames) {
        if (err) {throw err};
            console.log(collNames[0]._id);

            var ID = new ObjectId(collNames[0]._id);

            db.collection('programYear', function(err, pagesCollection) {
                pagesCollection.update( { _id: ID },{ $addToSet: { students: obj } }, function(err, result) {
                    if (err) throw err;
                           console.log(result);
                           res.send("studentadded");      
                });
            });
        });
    });
});



module.exports = router;