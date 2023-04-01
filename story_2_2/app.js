const express = require('express')
const multer  = require('multer')
const port = 3000;
const app = express()
const sharp = require('sharp');

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




//Upload route and sharp configure
app.post('/upload', upload.single('profile-file'), async (req, res, next) => {

  const image = await sharp(req.file.path);
  const metadata = await image.metadata();

  if ((metadata.width < 128) && (metadata.height < 128)) {
    return res.status(201).json({
      message: 'No thumbnails', 
  });
  }
  else{
    try {
            image.resize( {
              width: 32,
              fit: sharp.fit.contain}).toFile('uploads/' + 'thumbnails-' + req.file.originalname, (err, resizeImage) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(resizeImage);
                }})
            image.resize({
              width: 64,
              fit: sharp.fit.contain}).toFile('uploads/' + 'thumbnails_2-' + req.file.originalname, (err, resizeImage) => {
              if (err) {
                  console.log(err);
              } else {
                  console.log(resizeImage);
              }})
  

        return res.status(201).json({
            message: 'Thumbnails uploded successfully', 
        });
    } catch (error) {
        console.error(error);
    }}
  });
   
app.listen(port,() => console.log(`Server running on port ${port}!`))

// // This code creates a POST endpoint at /upload that accepts an image file with the field name image. 
// The endpoint first checks the dimensions of the uploaded image using the sharp library's metadata() method. 
// If the dimensions are smaller than 128px by 128px, the original image is returned. Otherwise, two thumbnails are generated using the resize() 
// method and returned as base64-encoded strings in a JSON response.

// // Note that this implementation uses base64 encoding to send the image data in the response.
//  Alternatively, you can save the thumbnails to disk or to a database and return their URLs in the response.

