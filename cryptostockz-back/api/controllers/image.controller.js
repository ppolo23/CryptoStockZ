const fs = require("fs");

const db = require("../models");
const config = require('../../config/config');

const Image = db.image;

const uploadFiles = async (req, res) => {

  try {

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    Image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(
        config.env.WEBAPP_STATIC_FILES_UPLOAD_PATH + req.file.filename
      ),
    }).then((image) => {
      fs.writeFileSync(
        config.env.WEBAPP_STATIC_FILES_TEMP_PATH + image.name,
        image.data
      );

      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadFiles,
};