const Review = require('../models/review.js')
const ExpressError = require('../utils/expressError.js');
const {reviewSchema} = require('../schema.js');

module.exports.validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);

    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

module.exports.isReviewAuthor = async (req,res,next)=>{
    let {id , reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error","You don't have Permission to Delete");
        return res.redirect(`/listings/${id}`);
    }
    next();
}