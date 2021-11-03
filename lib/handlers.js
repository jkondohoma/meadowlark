/**
 * To make our app more testable, we’re going to extract the actual route handlers to
their own library
 */

const fortune = require("./fortune");
exports.home = (rer, res) => res.render("home");

exports.about = (req, res) =>
  res.render("about", { fortune: fortune.getFortune() });

exports.notFound = (req, res) => res.render("404");

exports.serverError = (err, req, res, next) => res.render("500");
