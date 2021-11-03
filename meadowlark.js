/**
 * app/main file
 */

//  in Express, the order in which routes
//  and middleware are added is significant. If we put the 404 handler above the routes,
//  the home page and About page would stop working;

const express = require("express");
const expressHandlebars = require("express-handlebars");
const bodyParser = require("body-parser");

const handlers = require("./lib/handlers");
const weatherMiddlware = require("./lib/middleware/weather");

const app = express();

// configure Handlebars view engine
app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main",
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      },
    },
  })
);
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* eslint-disable no-undef */
const port = process.env.PORT || 3000;
/* eslint-enable no-undef */

/**
 * app.get is the method by which we’re adding routes. In the Express documentation,
you will see app.METHOD. This doesn’t mean that there’s literally a method called
METHOD; it’s just a placeholder for your (lowercased) HTTP verbs (get and post being
the most common). This method takes two parameters: a path and a function.

The path is what defines the route

it doesn’t care about the case or trailing slash, and it doesn’t consider
the querystring when performing the match
 */

/* eslint-disable no-undef */
app.use(express.static(__dirname + "/public"));
/* eslint-enable no-undef */

app.use(weatherMiddlware);

//no longer have to specify the content type or status code: the view
// engine will return a content type of text/html and a status code of 200 by default.
app.get("/", handlers.home);

//deliver the random fortune cookie:
app.get("/about", handlers.about);

// handlers for browser-based form submission
app.get('/newsletter-signup', handlers.newsletterSignup)
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)

// handlers for fetch/JSON form submission
app.get('/newsletter', handlers.newsletter)
app.post('/api/newsletter-signup', handlers.api.newsletterSignup)

// custom 404 page
app.use(handlers.notFound);

// custom 500 page
app.use(handlers.serverError);

//modify our application so that it can be required as a module
//if you run a JavaScript file directly with node, require.main will equal
// the global module; otherwise, it’s being imported from another module.

if (require.main === module) {
  app.listen(port, () => {
    console.log(
      `Express started on http://localhost:${port}` +
        "; press Ctrl-C to terminate."
    );
  });
} else {
  module.exports = app;
}
