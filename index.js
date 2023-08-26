var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

require("dotenv").config();

var app = express();

var multer = require("multer");
var upload = multer();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single('upfile'), function(req, res) {
  const name = req.file.originalname;
  const type = req.file.mimetype;
  const { size } = req.file
  res.json({name, type, size})
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
