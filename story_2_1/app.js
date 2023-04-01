const express = require('express')
const multer  = require('multer')
const port = 3000;
const app = express()
const fs = require('fs');
const archiver = require('archiver');

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



app.post('/upload',upload.array('file', 12), function (req, res, next) {
  // req.file is the `profile-file` file
  // req.body will hold the text fields, if there werex any
  var response = new Array();; 

  for(var i=0;i<req.files.length;i++){
    response.push("http://localhost:3000/" + req.files[i].path)
  }

  // Create zip archive
  const archive = archiver('zip', { zlib: { level: 9 }});
  const output = fs.createWriteStream(__dirname + 'images.zip');

  archive.pipe(output);

  // Add files to archive
  req.files.forEach(function (file) {
    archive.append(fs.createReadStream(file.path), { name: file.originalname });
  });

  // Finalize archive
  archive.finalize();

  // Send response
  res.send('Images uploaded and saved as zip file.');

  // return res.json({response});
})

   
app.listen(port,() => console.log(`Server running on port ${port}!`))

