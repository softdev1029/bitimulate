const Joi = require("joi");
const User = require("db/models/User");
const { optionsPerCurrency } = require("lib/variables");
const CONST = require("../variables");

exports.checkEmail = async ctx => {
  const { email } = ctx.params;
  if (!email) {
    ctx.status = CONST.ERR_BAD_REQUEST;
    return;
  }
  try {
    const result = await User.findByEmail(email);
    console.log(result);
    ctx.body = {
      exists: !!result
    };
  } catch (e) {
    ctx.throw(e, CONST.ERR_INTERNAL_ERR);
  }
  return;
};
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
      .min(CONST.PASS_MIN)
      .max(CONST.PASS_MAX),
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

exports.localLogin = async ctx => {
  const { body } = ctx.request;

  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(CONST.PASS_MIN)
      .max(CONST.PASS_MAX)
  });

  const result = Joi.validate(body, schema);
  if (result.error) {
    ctx.error = CONST.ERR_BAD_REQUEST;
    ctx.body = {
      reason: result.error
    };
    return;
  }

  try {
    const { email, password } = body;
    const user = await User.findByEmail(email);

    if (!user) {
      ctx.error = CONST.ERR_FORBIDDEN;
      ctx.body = {
        reason: "email not exist"
      };
      return;
    }

    const validated = user.validatePassword(password);
    if (!validated) {
      ctx.error = CONST.ERR_FORBIDDEN;
      ctx.body = {
        reason: "password not valid"
      };
      return;
    }

    const accessToken = await user.generateToken();

    ctx.cookies.set("access_token", accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    });

    const { displayName, _id, metaInfo } = user;

    ctx.body = {
      _id,
      displayName
      // metaInfo
    };
    return;
  } catch (e) {
    ctx.throw(e, CONST.ERR_INTERNAL_ERR);
  }
};
