const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync = require('../utils/wrapAsync.js');
const {validateReview,isReviewAuthor} = require("../middlewares/review_middleware.js");
const {isLoggedIn} = require("../middlewares/listing_middleware.js");

const reviewsController = require('../controller/reviews.js');

//Review Post route to store in DB also in relation with listing Model
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewsController.createReview))

//Review Delete & Listing Review also delete
router.delete("/:reviewId",isReviewAuthor,isLoggedIn,wrapAsync(reviewsController.deleteReview))

module.exports = router