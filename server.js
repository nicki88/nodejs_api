var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var Place = require('./app/model/place.js'); 
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
.post(function(req, res) {
    var place = new Place();
    place.name = req.body.name;
    place.address = req.body.address; 
    place.coordinates = [req.body.latitude, req.body.longtitude]
    place.facilities = [req.body.facilities]
    place.avgRating = req.body.avgRating;
	
    //review
    var review = {
        user: req.body.reviewer, 
        message: req.body.message ,
        vote: req.body.vote,  
    }
	place.rating=review
    //opening time
    var openingTime ={
        day: req.body.day,
        time: req.body.time,
        //complete logic close 
        close: req.body.closed,
    }
    place.openingHour = [openingTime]; 
    place.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'Place created!' });
    });
})
.get(function(req, res) {
    Place.find(function(err, places) {
        if (err)
            res.send(err);
        res.json(places);
    });
});
router.route('/places/:place_id')
.get(function(req, res) {
    Place.findById(req.params.place_id, function(err, place) {
        if (err)
            res.send(err);
        res.json(place);
    });
})
.post(function(req, res) {
    Place.findById(req.params.place_id, function(err, place) {
        if (err)
            res.send(err);
        place.name = req.body.name;
        place.description = req.body.description;
        place.country = req.body.country;
// save the place
place.save(function(err) {
    if (err)
        res.send(err);
    res.json({ message: 'Place updated!' });
});
});
})
.delete(function(req, res) {
    Place.remove({
        _id: req.params.place_id
    }, function(err, place) {
        if (err)
            res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
});

router.route('/places/:place_id/reviews')
.post(function(req,res){
	Place.findById(req.params.place_id,function(err,place){
		if(err)
			res.send(err)
			var newReview={
				user:req.body.author,
				rating:req.body.rating,
				reviewText:req.body.reviewText
			}
			
			var totalRating= place.avgRating* place.rating.length
			
			place.avgRating=(parseInt(totalRating)+ parseInt(newReview.rating))/(place.rating.length+1)
			
			place.rating.push(newReview)
			place.save(function(err){
				if(err)
					res.send(err);
			res.json({message:'Review added!'});
			})
	})
})
.get(function(req,res){
	Place.findById(req.params.place_id,function(err,place){
		if (err)
			res.send(err)
			
			res.json(place.rating)
})
})
app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);