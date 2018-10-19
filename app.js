const express = require("express");
const multer = require("multer");
const fs = require("fs");

const publicPath = "public/";
const uploadPath = './public/uploads/';
const cssLink = `<link rel="stylesheet" type="text/css" media="screen" href="style.css" />`
const port = 3000;

const app = express();
app.use(express.static(publicPath));
const upload = multer({ dest: uploadPath });

// app.use(express.static("app.js"))
// app.all("/", function(req, res) {
//     req.render("getPug.pug")
// })

app.set("view engine", "pug");

const uploadedFiles = [];

function displayImages (imageNames) {
    let outputString = "";
    for (let i = 0; i < imageNames.length; i++) {
        const name = imageNames[i];
        console.log(name);
        outputString += `${cssLink} <img src="uploads/${name}" id="images" />`;
    }
    return outputString;
}

app.get("/", function (req, res) {
    fs.readdir(uploadPath, function(err, items) {
        console.log(items);
        res.render("getPug", {items});
    });
})

app.post("/uploads", upload.single("myFile"), function (req, res) {
    // request.file is the `myFile` file
    // request.body will hold the text fields, if there were any
    let newImage = "uploads/" + req.file.filename
    console.log("Uploaded: " + newImage);
    uploadedFiles.push(newImage);
    res.render("postPug", {newImage});
});

app.listen(port, console.log("Listening on port " + port));