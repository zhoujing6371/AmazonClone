const router = require('express').Router();
const Product = require('../models/product');

const aws = require('aws-sdk'); // communicating with our service
const multer = require('multer');// library to upload images
const multerS3 = require('multer-s3');// library to upload images directly to the amazon s3

//change the key to your own aws s3 key
const s3 = new aws.S3({ accessKeyId: "AKIAI366ZEKDUT5DU2DQ", secretAccessKey: "Xpb552k6dr+htqBGX4dsFrIcJc9rf7HsD01S0t/v" });

const faker = require('faker');

const checkJWT = require('../middlewares/check-jwt');

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'amazonclonewebapplication2',
    metadata: function (req, file, cb) {// mata data is the information relates to the file
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) { // key is the name of the uploaded file
      cb(null, Date.now().toString());
    }
  })
});


router.route('/products')
  .get(checkJWT, (req, res, next) => {
    Product.find({ owner: req.decoded.user._id })
    //   .populate('owner')
    //   .populate('category')
      .exec((err, products) => {
        if (products) {
          res.json({
            success: true,
            message: "Products",
            products: products
          });
        }
      });
  })
  //upload one pic
  .post([checkJWT, upload.single('product_picture')], (req, res, next) => {
    console.log(upload);
    console.log(req.file);
    // new product
    let product = new Product();
    product.owner = req.decoded.user._id;
    product.category = req.body.categoryId;
    product.title = req.body.title;
    product.price = req.body.price;
    product.description = req.body.description;
    product.image = req.file.location;
    product.save();
    res.json({
      success: true,
      message: 'Successfully Added the product'
    });
  });

/* Just for testing */
router.get('/faker/test',(req, res, next) => {
  for (i = 0; i < 20; i++) {
    let product = new Product();
    product.category = "5c5b6d317c80e741ccb02688";
    product.owner = "5c5d06a89dd46d4260bbd5f9";
    product.image = faker.image.cats;
    product.title = faker.commerce.productName();
    product.description = faker.lorem.words();
    product.price = faker.commerce.price();
    product.save();
  }

  res.json({
    message: "Successfully added 20 pictures"
  });

});



module.exports = router;
