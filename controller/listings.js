const Listing = require("../models/listing");

module.exports.viewAllListings = async(req,res)=>{
    const Alldata = await Listing.find({});
    res.render("listings/viewAll.ejs",{Alldata});
}

module.exports.renderNewListingForm = async (req,res)=>{
    res.render("listings/new.ejs")
} 

module.exports.createNewListings = async (req,res,next)=>{
    let url = req.file.path;
    let fileName = req.file.filename;
    const newListing = new Listing(req.body.listing);  
    newListing.owner = req.user._id;
    newListing.image = {url,fileName};
    await newListing.save();
    req.flash("success","Listing Added Successfully");
    res.redirect("/listings");
}

module.exports.showIndividualListings = async(req,res)=>{
    let {id} = req.params;
    const IdvData = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate('owner');
    if(!IdvData){
        req.flash("error","Listing does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/viewIdv.ejs",{IdvData});
}

module.exports.renderEditListingForm = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
}

module.exports.editListings = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let fileName = req.file.filename;
        listing.image = {url,fileName};
        await listing.save();
    }
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListings = async(req,res)=>{
    let {id} = req.params; 
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Delete!");
    res.redirect("/listings");
}

//Privacy And Terms Page

module.exports.renderTermsPage = async(req,res)=>{
    res.render("listings/terms.ejs");
}

module.exports.renderPrivacyPage = async(req,res)=>{
    res.render("listings/privacy.ejs");
}