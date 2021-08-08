const mailgun = require('mailgun-js');
const { body } = require('express-validator');

const EMAIL = process.env.MAILGUN_EMAIL;
const API_KEY = process.env.MAILGUN_API_KEY;
const PUBLIC_API_KEY = process.env.MAILGUN_PUBLIC_API_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;

const mg = mailgun({
  apiKey: API_KEY,
  publicApiKey: PUBLIC_API_KEY,
  domain: DOMAIN,
});

function validate(method) {
  switch (method) {
    case 'sendContactUs':
      return [
        body('name')
          .exists()
          .bail()
          .notEmpty()
          .bail()
          .isString()
          .bail()
          .trim()
          .isLength({ max: 30 }),
        body('email')
          .exists()
          .bail()
          .notEmpty()
          .bail()
          .isString()
          .bail()
          .trim()
          .isEmail(),
        body('message')
          .exists()
          .bail()
          .notEmpty()
          .bail()
          .isString()
          .bail()
          .trim()
          .isLength({ max: 200 }),
      ];
    default:
      return [];
  }
}

async function sendContactUs(req, res, next) {
  try {
    const data = {
      from: req.body.email,
      to: EMAIL,
      subject: `Palms and Dates - Contact Us - ${req.body.name}`,
      text: req.body.message,
    };

    await mg.messages().send(data);

    return res
      .status(201)
      .json({ message: 'Email successful sent.', data: {} });
  } catch (err) {
    next(err);
  }
}

const mailController = { validate, sendContactUs, subscribe };

module.exports = mailController;
