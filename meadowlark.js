/**
 * app/main file
 */

//  in Express, the order in which routes
//  and middleware are added is significant. If we put the 404 handler above the routes,
//  the home page and About page would stop working;

const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')


const credentials = require('./credentials')
const handlers = require('./lib/handlers')
const weatherMiddlware = require('./lib/middleware/weather')
const flashMiddleware = require('./lib/middleware/flash')

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
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cookieParser(credentials.cookieSecret))
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: credentials.cookieSecret,
}))

/* eslint-disable no-undef */
const port = process.env.PORT || 3000;
/* eslint-enable no-undef */

/* eslint-disable no-undef */
app.use(express.static(__dirname + "/public"));
/* eslint-enable no-undef */

app.use(weatherMiddlware);
app.use(flashMiddleware);

//no longer have to specify the content type or status code: the view
// engine will return a content type of text/html and a status code of 200 by default.
app.get("/", handlers.home);

//deliver the random fortune cookie:
app.get("/about", handlers.about);

// handlers for browser-based form submission
app.get("/newsletter-signup", handlers.newsletterSignup);
app.post("/newsletter-signup/process", handlers.newsletterSignupProcess);
app.get("/newsletter-signup/thank-you", handlers.newsletterSignupThankYou);
app.get("/newsletter-archive", handlers.newsletterArchive);
// handlers for fetch/JSON form submission
app.get("/newsletter", handlers.newsletter);
app.post("/api/newsletter-signup", handlers.api.newsletterSignup);

// vacation photo contest
app.get('/contest/vacation-photo', handlers.vacationPhotoContest)
app.get('/contest/vacation-photo-ajax', handlers.vacationPhotoContestAjax)
app.post('/contest/vacation-photo/:year/:month', (req, res) => {
  const form = new multiparty.Form()
  form.parse(req, (err, fields, files) => {
    if(err) return handlers.vacationPhotoContestProcessError(req, res, err.message)
    console.log('got fields: ', fields)
    console.log('and files: ', files)
    handlers.vacationPhotoContestProcess(req, res, fields, files)
  })
})
app.get('/contest/vacation-photo-thank-you', handlers.vacationPhotoContestProcessThankYou)
app.post('/api/vacation-photo-contest/:year/:month', (req, res) => {
  const form = new multiparty.Form()
  form.parse(req, (err, fields, files) => {
    if(err) return handlers.api.vacationPhotoContestError(req, res, err.message)
    handlers.api.vacationPhotoContest(req, res, fields, files)
  })
})


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
