const express = require("express");
const multer = require("multer");
var docxtoPDF = require("docx-pdf");
const path = require("path");
const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uplodes");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/convertFile", upload.single("file"), (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file Uploded" });
    }

    //? out put path

    let outputpath = path.join(
      __dirname,
      "file",
      `${req.file.originalname}.pdf`
    );
    docxtoPDF(req.file.path, outputpath, function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({
            message:"Error during Converting"
        });
      }
      res.download(outputpath,()=>{
        console.log("file is downlode");
      })
      console.log("result" + result);
    });
  } catch (error) {}
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
