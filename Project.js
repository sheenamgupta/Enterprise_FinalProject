const express = require('express');
const mongo = require('mongodb');
const app = express();
app.use(express.json());

/*-------------------------------------------------Instructor-------------------------------------------------*/

app.get('/api/instructors', (req,res)=> {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("student_info_db");
	  dbo.collection("instructor").find({}, { projection: { _id: 0,ins_id:1, fname: 1, lname: 1 ,phone:1,email:1,address:1,course_taken:1} }).toArray(function(err, result) {
		if (err) throw err;
		console.log(result);
		res.send(result);
		db.close();
	  });
	}); 
});


app.get('/api/instructors/:id', (req,res)=> {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("student_info_db");
	  var query = { ins_id: req.params.id };
	  dbo.collection("instructor").find((query), {}).toArray(function(err, result) {
		if (err) throw err;
		console.log(result);
		res.send(result);
		db.close();
	  });
	});
});

app.delete('/api/instructors/:id', (req,res)=> {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://127.0.0.1:27017/";

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	 
	  var dbo = db.db("student_info_db");
	  var myquery = { ins_id: req.params.id };	  
	  dbo.collection("instructor").deleteOne(myquery, function(err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
		db.close();
	});
});
});


app.put('/api/instructors/:P_id/:P_fname/:P_lname/:P_phone/:P_email/:P_address/:P_course', (req,res)=> {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://127.0.0.1:27017/";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("student_info_db");

		var P_fname = req.params.P_fname;
		var P_lname = req.params.P_lname;
		var P_phone = req.params.P_phone;
		var P_email = req.params.P_email;
		var P_address = req.params.P_address;
		var P_course = req.params.P_course;

		var myquery = { ins_id: req.params.P_id};

		var newvalues = { $set: {fname: P_fname,lname: P_lname,phone: P_phone,email: P_email,address: P_address,course_taken: P_course} };
		dbo.collection("instructor").updateOne(myquery, newvalues, function(err, res) {
		if (err) throw err;
		console.log("1 document updated");
		db.close();
     });
	 });
});

app.post('/api/instructors/:P_id/:P_fname/:P_lname/:P_phone/:P_email/:P_address/:P_course', (req,res)=> {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://127.0.0.1:27017/";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("student_info_db");

		var P_id = req.params.P_id;
		var P_fname = req.params.P_fname;
		var P_lname = req.params.P_lname;
		var P_phone = req.params.P_phone;
		var P_email = req.params.P_email;
		var P_address = req.params.P_address;
		var P_course = req.params.P_course;

		var newvalues = {ins_id:P_id,fname: P_fname,lname: P_lname,phone: P_phone,email: P_email,address: P_address,course_taken: P_course};
		dbo.collection("instructor").insertOne(newvalues, function(err, res) {
		if (err) throw err;
		console.log("1 document inserted");
		db.close();  
	});
});
});

/*-------------------------------------------------Course-------------------------------------------------*/

app.get('/api/courses', (req,res)=> {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("student_info_db");
	  dbo.collection("course").find({}, { projection: { _id: 0,c_id:1, c_name: 1, c_description: 1 ,program_code:1,instructed_by:1} }).toArray(function(err, result) {
		if (err) throw err;
		console.log(result);
		res.send(result);
		db.close();
	  });
	}); 
});


app.get('/api/courses/:id', (req,res)=> {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("student_info_db");
	  var query = { c_id: req.params.id };
	  dbo.collection("course").find((query), {}).toArray(function(err, result) {
		if (err) throw err;
		console.log(result);
		res.send(result);
		db.close();
	  });
	});
});


app.delete('/api/courses/:id', (req,res)=> {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://127.0.0.1:27017/";

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	 
	  var dbo = db.db("student_info_db");
	  var myquery = { c_id: req.params.id };	  
	  dbo.collection("course").deleteOne(myquery, function(err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
		db.close();
	});
});
});

app.put('/api/courses/:c_id/:c_name/:desc/:Pcode/:InsId', (req,res)=> {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://127.0.0.1:27017/";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("student_info_db");

		var c_name = req.params.c_name;
		var desc = req.params.desc;
		var Pcode = req.params.Pcode;
		var InsId = req.params.InsId;

		var myquery = { c_id: req.params.c_id};

		var newvalues = { $set: {c_name: c_name,c_description: desc,program_code: Pcode,instructed_by: InsId } };
		dbo.collection("course").updateOne(myquery, newvalues, function(err, res) {
		if (err) throw err;
		console.log("1 document updated");
		db.close();
     });
	 });
});

app.post('/api/courses/:c_id/:c_name/:desc/:Pcode/:InsId', (req,res)=> {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://127.0.0.1:27017/";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("student_info_db");

		var c_id = req.params.c_id;
		var c_name = req.params.c_name;
		var desc = req.params.desc;
		var Pcode = req.params.Pcode;
		var InsId = req.params.InsId;

		var newvalues = {c_id:c_id,c_name: c_name,c_description: desc,program_code: Pcode,instructed_by: InsId};
		dbo.collection("course").insertOne(newvalues, function(err, res) {
		if (err) throw err;
		console.log("1 document inserted");
		db.close();  
	});
});
});


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));