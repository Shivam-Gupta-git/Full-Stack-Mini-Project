const Books = require('../models/home-model')
const Reviews = require('../models/review-models')
exports.getAddBooks = (req, res, next) => {
  res.render('host/add-books',{
    PageTitle: 'Add Books',
    currentPage: 'Add Books',
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user
  })
}

exports.postAddedBooks = (req, res, next) => {
  // console.log(req.body)
  const {BookName, BookImageUrl, BookCategory, CurrentPrice, OriginalPrice, Discount, BookAuther, BookSeller, BookHighlights, BookDescription, BookBinding, Bookdate, Publisher, Edition, NumberOfPages, BookLanguage} = req.body

  // if(!req.file){
  //   return res.status(422).send('No Image Provided') 
  // }
  // const picture = req.file.path;
  const picture = req.file ? req.file.path : ''
  // console.log(picture)
  const bookItems = new Books({
    BookName,
    BookImageUrl,
    picture,
    BookCategory, 
    CurrentPrice, 
    OriginalPrice, 
    Discount, 
    BookAuther, 
    BookSeller, 
    BookHighlights, 
    BookDescription, 
    BookBinding, 
    Bookdate, 
    Publisher, 
    Edition, 
    NumberOfPages, 
    BookLanguage
  })


  bookItems.save().then(()=>{
    console.log('Book saved sucessfully')
  })
  // console.log(bookItems)
  res.redirect('/host/host-book-list')
}
exports.getHostBookList = (req, res, next) =>{
  Books.find().then((hostBookList) => {
    res.render('host/host-booklist',{
      PageTitle: 'Host Book List',
      currentPage: 'Host Book List',
      hostBookList: hostBookList,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user
    })
  })
}
exports.getHostBookDetails = (req, res, next) =>{
  const bookId = req.params.bookId
  Books.findById(bookId).then((hostDetailBooks) =>{
  Reviews.find({bookId: bookId}).then((reviews) => {
    res.render('host/host-bookdetails',{
      PageTitle: 'Host Book Details',
      currentPage: 'Host Book List',
      hostDetailBooks: hostDetailBooks,
      reviews: reviews,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user
    })
  })
  })
}

exports.getHostEditDetails = (req, res, next) =>{
  const hostDetailBooksId = req.params.hostDetailBooksId
  const editing = req.query.editing === 'true'
  Books.findById(hostDetailBooksId).then((bookItems) => {
    res.render('host/add-books',{
      PageTitle: 'Host Edit Details',
      currentPage: 'Host Book List',
      bookItems: bookItems,
      editing: editing,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user
    })
  })
}

exports.postHostEditedDetails = (req, res, next) => {
  const { id, BookName, BookImageUrl, BookCategory, OriginalPrice, CurrentPrice, Discount, BookAuther, BookSeller, BookHighlights, BookDescription, BookBinding, Bookdate, Publisher, Edition, NumberOfPages, BookLanguage } = req.body

    Books.findById(id).then((bookItems) => {
      if(!bookItems){
        // console.log('Book not found')
        res.redirect('host-book-list');
      }
      bookItems.BookName = BookName;
      bookItems.BookImageUrl = BookImageUrl;
      bookItems.BookCategory = BookCategory;
      bookItems.OriginalPrice = OriginalPrice;
      bookItems.CurrentPrice = CurrentPrice;
      bookItems.Discount = Discount;
      bookItems.BookAuther = BookAuther;
      bookItems.BookSeller = BookSeller;
      bookItems.BookHighlights = BookHighlights;
      bookItems.BookDescription = BookDescription;
      bookItems.BookBinding = BookBinding;
      bookItems.Bookdate = Bookdate;
      bookItems.Publisher = Publisher;
      bookItems.Edition = Edition;
      bookItems.NumberOfPages = NumberOfPages;
      bookItems.BookLanguage = BookLanguage;

    bookItems.save().then((result => {
      console.log('Book Details Update sucessfully', result)
    })).catch(err => {
      console.log('err while details updating', err)
    })
    res.redirect('/host/book-details/' + id)
  }).catch(err =>{
    console.log('err while finding books', err)
  })
}

exports.postDeleteBookDetails = (req, res, next) => {
  const hostDetailBooksId = req.params.hostDetailBooksId
  Books.findByIdAndDelete(hostDetailBooksId).then(()=>{
    res.redirect('/host/host-book-list')
  }).catch(err => {
    console.log('erroe while deleting book', err)
  })
}

exports.postDeleteBookReview = (req, res, next) => {
  const reviewId = req.params.reviewId
  const {id} = req.body
  Reviews.findByIdAndDelete(reviewId).then(()=>{
    res.redirect('/host/book-details/' + id )
  }).catch(err => {
    console.log('err while deleting reviews', err)
  })
}
