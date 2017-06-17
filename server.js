var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var passpost=require('passport')

var User= require('./app/model/user.js');
var Place = require('./app/model/place.js'); 


var authController= require ('./controllers/auth.js')
var placeController=require ('./controllers/place.js')
var mongoose = require('mongoose');
mongoose.connect('mongodb://Nicki:n800829@ds157971.mlab.com:57971/bac')


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8888; // set our porta

var router = express.Router();
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/places')
.post(authController.isAuthenticated,placeController.postPlaces)
.get(placeController.getPlaces)


router.route('/places/:place_id/reviews')
.post(placeController.postPlaces)
.get(placeController.retrieveReview)


router.route('/places/:place_id/product')
.post(placeController.postProduct)
.get(placeController.getProduct)
	
	
router.route('/topfiveplaces')
.get(placeController.gettopfiveplaces)


router.route('/latestplace')
.get(placeController.getlatestplace)


router.route('search/place/:place_query')
.get(placeController.getplace)


router.route('/login')
.post(function(req,res){
	User.find()
	.where('username').equals(req.body.username)
	.where('password').equals(req.body.password)
	.exec(function(err,user){
		if(err)
			res.send(err)
		res.json(user)
	})
})

router.route('/register')
.post(function(req,res){
	var user = new User();
	user.username=req.body.username;
	user.password=req.body.password;
	user.save(function(err){
		if(err)
			res.send(err);
		res.json({message:'User created'});
	});
})

app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);