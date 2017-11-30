/**
 * Created by Stas on 27.07.2017.
 */
module.exports.validateParamsId = function (req, res, next) {
    req.sanitizeParams('id').trim();

    req.checkParams('id')
        .len(24, 24).withMessage('invalid ID')
        .notEmpty().withMessage('ID is required');

    return req.getValidationResult()
        .then(function(result) {
            if (!result.isEmpty()) {
                next({
                    message: 'Validation error',
                    result: false,
                    errors: result.array(),
                    status: 400
                });
            }
            next();
        });
};