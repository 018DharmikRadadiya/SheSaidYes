const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const {isLoggedIn,isOwner,validateListing} = require("../middlewares/listing_middleware.js");

const listingsController = require("../controller/listings.js");

const multer = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({storage});

//Terms Page
router.get("/terms",wrapAsync(listingsController.renderTermsPage));

//privacy Page
router.get("/privacy",wrapAsync(listingsController.renderPrivacyPage))

//View All Listings
router.get("/",wrapAsync(listingsController.viewAllListings));

//create new Listings
router.get("/new",isLoggedIn,wrapAsync(listingsController.renderNewListingForm));

router.post("/",isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingsController.createNewListings));

//View/show Indvidual Listings
router.get("/:id",wrapAsync(listingsController.showIndividualListings));

//Edit/update Listing
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingsController.renderEditListingForm));

router.put("/:id",isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingsController.editListings));

//Delete
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingsController.deleteListings));

module.exports = router;    