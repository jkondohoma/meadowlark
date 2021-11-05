# Meadowlark Travel Agency

a fictional website for Meadowlark Travel, a company offering services for people visiting the great state of
Oregon. The Meadowlark Travel website will expose an API in addition to serving a functional website.

Example from Web Development with Node and Express Leveraging the JavaScript Stack, by Ethan Brown -O'Reilly Media (2019)

To run app on local server

- run 'npm install' for dependecies
- run app using 'node meadowlark.js'

## Version 1: Chapter 3

- Initial set up of website including logo

## Version 1.1: Chapter 4

- Tidying up
- modularize fortune cookie functionality

## Version 1.1.1 Chapter 5

* Unit testing: test specific functions 
    * It can get tedious to constantly be rerunning your tests every time you make a change to your code. Fortunately, most test frameworks  have a “watch” mode that constantly monitors your code and tests  for changes and reruns them automatically. To run your tests in  watch mode, type 'npm test -- --watch' (the extra double-dash is necessary to let npm know to pass the --watch argument to Jest).

      * Jest helpfully provides some automated code coverage analysis. 
      * To see how much of your code is tested, run the following: 'npm test -- --coverage'

- integration testing: test interaction/functionality

- Linting
  - like having a second set of eyes: it will spot things that will slide right past our human brains.
    - will be using ESLint
    - 'npm run lint'

## Version 1.1.2 Chapter 6

- Express route to display request headers sent by browser sent to server
- Disable response headers from sending server information

## Version 1.1.3 Chapter 7

- templating with handlerbars
- A view usually represents an individual page on your website
- layout is a special kind of
  view—essentially, a template for templates. Layouts are essential because most (if not
  all) of the pages on your site will have an almost identical layout
- weather middleware

## Version 1.2 Chapter 8

- form handling with express
- add a form to Meadowlark Travel that lets the user sign up for a mailing list
- newsletter archive added
- vacation photo contest file upload


## Version 1.2.1 Chapter 9

- cookies & sessions

## Version 1.2.2 Chapter 10

- middleware
  * middleware is a way to encapsulate functionality—specifically, functionality that operates on an HTTP request to your application.
  * Middleware is executed in what’s known as a pipeline. You can imagine a physical pipe, carrying water. The water gets pumped in at one end, and then there are gauges and valves before the water gets where it’s going. The important part about this analogy is that order matters; if you put a pressure gauge before a valve, it has a different effect than if you put the pressure gauge after the valve. Similarly, if you have a valve that injects something into the water, everything “downstream” from that valve will contain the added ingredient. In an Express app, you insert middleware into the pipeline by calling app.use.


