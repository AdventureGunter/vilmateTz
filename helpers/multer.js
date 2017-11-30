/**
 * Created by Stas on 30.11.2017.
 */
const multipart = require ('multer');
const multer = multipart().single('json');

module.exports.multipartParser = function (req, res, next) {
    multer(req, res, function (err) {
        if (err) {
            next({
                success: false,
                message: "Multer error",
                status: 500
            })
        }
        next()
    })
};