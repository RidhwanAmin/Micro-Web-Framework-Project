const express = require('express')
const multer  = require('multer')
const port = 3000;
const app = express()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'  || file.mimetype === 'image/png' ){
        cb(null, true);
    }
    else{
        cb("error", false);
    }
};


const upload = multer({ storage: storage, fileFilter: fileFilter
 })

/*
app.use('/a',express.static('/b'));
Above line would serve all files/folders inside of the 'b' directory
And make them accessible through http://localhost:3000/a.
*/
app.set("view engine", "ejs")
app.get("/", (req, res) => {
    res.render("upload");
});

app.use('/uploads',express.static('uploads'));
app.use('/upload', express.static('upload'));

app.post('/upload', upload.single('profile-file'), function (req, res, next) {
  // req.file is the `profile-file` file
  // req.body will hold the text fields, if there were any
  console.log(req.file);
  var response = "http://localhost:3000/" + req.file.path;
  return res.json({response});
})

   
app.listen(port,() => console.log(`Server running on port ${port}!`))

