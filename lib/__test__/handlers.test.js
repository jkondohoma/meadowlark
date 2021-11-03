const handlers = require("../handlers"); //import the code we’re trying to test

//we want to make sure that the home page gets rendered.
test("home page renders", () => {
  //To invoke our render, we need request and response objects
  const req = {}; //that we don’t need anything at all
  // from the request object in this case (so we just use an empty object)
  const res = { render: jest.fn() }; //only thing we need from the response object is a render method
  //   Note how we construct
  //   the render function: we just call a Jest method called jest.fn(). This creates a generic
  //   mock function that keeps track of how it’s called.

  handlers.home(req, res);
  expect(res.render.mock.calls[0][0]).toBe("home");
});

/*tests for our other routes*/


//The “about” render
// function gets called with a fortune, so we’ve added an expectation that it will get a
// fortune that is a string that contains at least one character.
test("about page renders with fortune", () => {
  const req = {};
  const res = { render: jest.fn() };

  handlers.about(req, res);

  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe("about");
  expect(res.render.mock.calls[0][1]).toEqual(
    expect.objectContaining({
      fortune: expect.stringMatching(/\W/),
    })

  );
});
test("404 handler renders", () => {
  const req = {};
  const res = { render: jest.fn() };
  handlers.notFound(req, res);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe("404");
});

//the server error handler takes four arguments, not two, so we have to
// provide additional mocks.
test("500 handler renders", () => {
  const err = new Error("some error");
  const req = {};
  const res = { render: jest.fn() };
  const next = jest.fn();
  handlers.serverError(err, req, res, next);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe("500");
});
