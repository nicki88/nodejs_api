var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Place = require('../app/model/place.js')
exports.postPlaces =function(req, res) {
    var place = new Place();
    place.name = req.body.name;
    place.address = req.body.address;
    place.coordinates = [req.body.latitude, req.body.longitude];
    place.facilities = [req.body.facilities];
    place.avgRating = req.body.avgRating;
    place.rating = req.body.rating;
    place.products = req.body.products;
    //review
    var review = {
        user: req.body.reviewer, 
        message: req.body.message ,
        vote: req.body.vote, 
    }
    //opening time
	var openingTime = {
    opening: req.body.opening,
        closed: false,
           days: req.body.days
    }
    place.openingHour = [openingTime]; 
    place.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'Place created!' });
    });
}
exports.getPlaces = function(req, res) {
    Place.find(function(err, place) {
        if (err)
            res.send(err);
        res.json(place);
    });
}
exports.deletePlaces = function(req, res) {
    Place.remove({
        _id: req.params.place_id
    }, function(err, place) {
        if (err)
            res.send(err);
        res.json({ message: 'Successfully deleted' });
    })
}
	
	
	exports.postReview=	function(req,res){
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
		}
	exports.retrieveReview=function(req,res){
		Place.findById(req.params.place_id,function(err,place){
			if (err)
				res.send(err)
			
				res.json(place.rating)
	})
	}

	exports.postProduct=function(req,res){
		Place.findById(req.params.place_id,function(err,place){
			if(err)
				res.send(err)
				var newProduct={
					name:req.body.name,
					description:req.body.ingredient,
					image_url:req.body.url,
					reviews:req.body.reviews,
					avgRating:req.body.rating,
					price:req.body.price,
				
				}
			    place.products.push(newProduct)
				place.save(function(err){
					if(err)
						res.send(err);
				res.json({message:'Product added!'});
				})
		})
	}


	exports.getProduct=function(req,res){
		Place.findById(req.params.place_id,function(err,place){
			if (err)
				res.send(err)
			
				res.json(place.product)
	})
	}


	exports.getProduct=function(req,res){
		Place.find()
	.limit(3)
	.sort({avgRating:'-1'})
	.exec(function(err,places){
		if (err)
			res.send(err);
		res.json(places);
	})
	}

	exports.gettopfiveplaces=function(req,res){
		Place.find()
	.limit(3)
	.sort({avgRating:'-1'})
	.exec(function(err,places){
		if (err)
			res.send(err);
		res.json(places);
	})
	}


	exports.getlatestplace=function(req,res){
		Place.find()
		.limit(1)
		.sort({dateAdded:'1'})
		.exec(function(err,place){
			if(err)
				res.send(err)
				res.json(place)
		})
	}


	exports.getplace=function(req,res){
	place.find({
		"name": /a/
		})
		.exec(function(err,place){
			if(err)
				res.send(err)
				res.json(places)
		})
	
	}