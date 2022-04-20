const Schemes = require('./scheme-model');
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const actual_id = req.params.id;
    const scheme = await Schemes.findById(req.params.id);
    if (!scheme) {
      res.status(404).json({
        message: `scheme with scheme_id ${actual_id} not found`
      })
    } else {
      next();
    }
  } catch (err) {
    next(err)
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const error = { status: 400 };
  const {scheme_name} = req.body;
  if (!scheme_name || scheme_name === "" || typeof scheme_name !== 'string') {
    error.message = "invalid scheme_name"
  }
  if (error.message) {
    next(error)
  } else {
    next();
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const error = { status: 400 };
  const {instructions, step_number} = req.body;
  if (!instructions || instructions === "" || typeof instructions !== 'string') {
    error.message = "invalid step";
  } else if (typeof step_number !== 'number' || step_number < 1) {
    error.message = "invalid step";
  }
  if (error.message) {
    next(error)
  } else {
    next();
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
