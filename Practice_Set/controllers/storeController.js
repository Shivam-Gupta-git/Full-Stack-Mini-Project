const Favourite = require("../models/modelsFavourites");
const Home = require("../models/modelsHome");

exports.getIndex = (req, res, next) => {
  res.render("store/index", {
    PageTitle: "airbnb Home",
    currentPage: "Home",
    isLoggedIn: req.isLoggedIn
  });
};
exports.getHomeslist = (req, res, next) => {
  Home.find().then((registrationHome) => {
    res.render("store/homeList", {
      registrationHome: registrationHome,
      PageTitle: "Homes List",
      currentPage: "Home List",
      isLoggedIn: req.isLoggedIn
    });
  });
};
exports.getbookings = (req, res, next) => {
  res.render("store/booking", {
    PageTitle: "My Bookings",
    currentPage: "bookings",
    isLoggedIn: req.isLoggedIn
  });
};
exports.getFavouriteList = (req, res, next) => {
  Favourite.find().then((favourites) => {
    favourites = favourites.map((fav) => fav.houseId.toString());
    Home.find().then((registrationHome) => {
      const favouriteHome = registrationHome.filter((home) =>
        favourites.includes(home._id.toString())
      );
      res.render("store/favourite-list", {
        favouriteHome: favouriteHome,
        PageTitle: "My Favourites",
        currentPage: "favourites",
        isLoggedIn: req.isLoggedIn
      });
    });
  });
};

// For Home Details...
exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/homelist");
    } else {
      // console.log('Home Details Found', home)
      res.render("store/home-details", {
        home: home,
        PageTitle: "Home Details",
        currentPage: "Home List",
        isLoggedIn: req.isLoggedIn
      });
    }
  });
};

// For Favourites...
exports.postAddToFavouriteList = (req, res, next) => {
  const homeId = req.body.id;
  Favourite.findOne({houseId: homeId}).then((fav)=>{
    if(fav){
      console.log('Allready existing in favourite list')
    }else{
      fav = new Favourite({houseId: homeId});
      fav.save().then((result =>{
        console.log('favourite added', result)
      }))
    }
    res.redirect("/favourites");
  }).catch(err =>{
    console.log("Erroe while be in Favourite ", err);
  })
};

// For Remove Favourite...
exports.postRemoveFavouriteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.findOneAndDelete({houseId: homeId})
    .then((result) => {
      console.log("Remove Favourite Element", result);
      res.redirect("/favourites");
    })
    .catch((err) => {
      console.log("error while be in remove favourite element", err);
      res.redirect("/favourites");
    });
};
