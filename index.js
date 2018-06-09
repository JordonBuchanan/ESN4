//Dependency Requires
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require("connect-flash");
const cloudinary = require('cloudinary');
const multer = require('multer');

//Route Requires
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//Body-Parser config
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Cloudinary Config
var storage = multer.diskStorage({
    filename: function(req, file, callback) {
      callback(null, Date.now() + file.originalname);
    }
  });
  var imageFilter = function (req, file, cb) {
      // accept image files only
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
          return cb(new Error('Only image files are allowed!'), false);
      }
      cb(null, true);
  };
  var upload = multer({ storage: storage, fileFilter: imageFilter})
  
  cloudinary.config({ 
    cloud_name: 'dumxfw6s6', 
    api_key: 772524293964862, 
    api_secret: 'Jg_RcHyalHfmPq1zFhH74UvNMSQ'
  });
  

//Flash Config
app.use(flash());
app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
 });

//DB Config
const db = require('./config/keys').mongoURI;
mongoose
    .connect(db)
    .catch(err => console.log(err))
    .then(() => console.log('MongoDB connected'));
    

//Passport Middleware
app.use(passport.initialize());
//Passport Config
require('./config/passport')(passport);

//Use Routes
app.use('/api/users', users);
app.use('/api/users', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));