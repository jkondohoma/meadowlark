/**
 * app/main file
 */

//  in Express, the order in which routes
//  and middleware are added is significant. If we put the 404 handler above the routes,
//  the home page and About page would stop working;

const express = require("express");
const expressHandlebars = require("express-handlebars");
const fortune = require('./lib/fortune');
const app = express();
const port = process.env.PORT || 3000;

// configure Handlebars view engine
app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");
/**
 * app.get is the method by which we’re adding routes. In the Express documentation,
you will see app.METHOD. This doesn’t mean that there’s literally a method called
METHOD; it’s just a placeholder for your (lowercased) HTTP verbs (get and post being
the most common). This method takes two parameters: a path and a function.

The path is what defines the route

it doesn’t care about the case or trailing slash, and it doesn’t consider
the querystring when performing the match
 */

//no longer have to specify the content type or status code: the view
// engine will return a content type of text/html and a status code of 200 by default.
app.get("/", (req, res) => res.render("home"));

//deliver the random fortune cookie:
app.get("/about", (req, res) => {
  res.render("about", { fortune: fortune.getFortune() });
});

app.use(express.static(__dirname + "/public"));
// custom 404 page
app.use((req, res) => {
  res.status(404);
  res.render("404");
});
// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500);
  res.render("500");
});
app.listen(port, () =>
  console.log(
    `Express started on http://localhost:${port}; ` +
      `press Ctrl-C to terminate.`
  )
);
