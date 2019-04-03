const Joi = require("joi");
const User = require("db/models/User");
const { optionsPerCurrency } = require("lib/variables");

exports.localRegister = async ctx => {
  const { body } = ctx.request;

  const schema = Joi.object({
    displayName: Joi.string()
      .regex(/^[a-zA-Z0-9ㄱ-힣]{3,12}$/)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .max(30),
    initialMoney: Joi.object({
      currency: Joi.string()
        .allow("BTC", "USD", "BTC")
        .required(),
      index: Joi.number()
        .min(0)
        .max(2)
        .required()
    }).required()
  });

  const result = Joi.validate(body, schema);

  // Schema Error
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { displayName, email, password } = body;

  try {
    // check email / displayName existancy
    const exists = await User.findExistancy({
      displayName,
      email
    });

    if (exists) {
      ctx.status = 409;
      const key = exists.email === email ? "email" : "displayName";
      ctx.body = {
        key
      };
      return;
    }

    const { currency, index } = body.initialMoney;

    const value =
      optionsPerCurrency[currency].initialValue * Math.pow(10, index);
    const initial = {
      currency,
      value
    };

    // creates user account
    const user = await User.localRegister({
      displayName,
      email,
      password,
      initial
    });

    ctx.body = {
      displayName,
      _id: user._id
      // metaInfo: user.metaInfo
    };

    const accessToken = await user.generateToken();

    // configure accessToken to httpOnly cookie
    ctx.cookies.set("access_token", accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    });
  } catch (e) {
    ctx.throw(e, 500);
  }
};
