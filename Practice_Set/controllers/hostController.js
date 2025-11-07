const Home = require("../models/modelsHome");

exports.getAddHomes = (req, res, next) => {
  res.render("host/addHomes", {
    PageTitle: "Add Home to airbnb",
    currentPage: "Add Home",
    editing: false,
    isLoggedIn: req.isLoggedIn
  });
};
exports.postAddedHomes = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl, description } =
    req.body;
  const home = new Home({
    houseName,
    price,
    location,
    rating,
    photoUrl,
    description,
  });
  home.save().then(() => {
    console.log("Home Saved Sucessfully");
  });

  res.render("host/addedHomes", {
    PageTitle: "Home Added Successfully",
    currentPage: "Home Added",
    isLoggedIn: req.isLoggedIn
  });
};

exports.getHostHomesList = (req, res, next) => {
  Home.find().then((registrationHome) => {
    res.render("host/host-home-list", {
      registrationHome: registrationHome,
      PageTitle: "Host Home List",
      currentPage: "Host Home List",
      isLoggedIn: req.isLoggedIn
    });
  });
};
exports.getEditHomes = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId).then((home) => {
    if (!home) {
      return res.redirect("host/host-home-list");
    }
    res.render("host/addHomes", {
      PageTitle: "Edit Your Home",
      currentPage: "Host Home List",
      editing: editing,
      home: home,
      isLoggedIn: req.isLoggedIn
    });
  });
};
exports.postEditHomes = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl, description } =
    req.body;
  Home.findById(id).then((home => {
    home.houseName = houseName;
    home.price = price;
    home.location = location;
    home.rating = rating;
    home.photoUrl = photoUrl;
    home.description = description;

    home.save().then((result =>{
      console.log('Home Updated', result)
    })).catch(err => {
      console.log('error while updating', err)
    })
    res.redirect("/host-home-list");
  })).catch(err =>{
    console.log('error while finding home', err)
  })
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log(homeId);
  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect("/host-home-list");
    })
    .catch((error) => {
      console.log("error while deleting", error);
    });
};


