var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var openingTimes = new Schema({
    day: String,
    time: String, 
    closed: Boolean, 
 });
 
 var reviewSchema= new Schema ({
     user: {type: String},
     review_date :{ type: Date, default :Date.now}, 
     message: String,
     vote: {type: Number, default:0, min: 0, max: 5 }, 
 })

 var priceSchema=new Schema({
 	price:Number,
 	discountedPrice:Number,
 	isDiscount:{type:Boolean,default:false}
 })


 var productSchema =new Schema({
 	name:String,
 	description:String,
 	image_url:String,
 	reviews:[reviewSchema],
 	price:priceSchema,
 	avgRating:Number	
	
 })
 
var placeSchema = new Schema ({ 
    name : String,
    address : String, 
    coordinates: [Number],
    facilities: [String],
    avgRating: {type:Number, default:0},
    rating: [reviewSchema],
    openingHour: [openingTimes],
	reviews:[reviewSchema],
	products:[productSchema]

});

module.exports = mongoose.model('Place',placeSchema);