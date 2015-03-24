System.register(["aurelia-router"], function (_export) {
  var Redirect, _createClass, _classCallCheck, SIMULATE_LATENCY, user, User, AuthenticationService, AuthorizeStep;

  function returnData(fn) {
    if (SIMULATE_LATENCY) {
      return new Promise(function (resolve) {
        return setTimeout(function () {
          return resolve();
        }, 500);
      }).then(function () {
        return new Promise(fn);
      });
    } else {
      return new Promise(fn);
    }
  }

  return {
    setters: [function (_aureliaRouter) {
      Redirect = _aureliaRouter.Redirect;
    }],
    execute: function () {
      "use strict";

      _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      SIMULATE_LATENCY = true;
      user = null;

      User = function User(name) {
        _classCallCheck(this, User);

        this.name = name;
      };

      AuthenticationService = _export("AuthenticationService", (function () {
        function AuthenticationService() {
          _classCallCheck(this, AuthenticationService);
        }

        _createClass(AuthenticationService, {
          user: {
            get: function () {
              return user;
            }
          },
          checkLogin: {
            value: function checkLogin() {
              // If ther is no local user, then there is no point in running
              // a request to the server.
              if (user === null) {
                return Promise.resolve(null);
              } // In a real world environment, where a user is signed in to a
              // server, using cookies or something similar, that login might
              // expire, without the client beeing notified.
              // This here is to simulate a request to the server,
              // to ensure we're still logged in.
              return returnData(function (resolve) {
                return resolve(true);
              }).then(function (status) {
                // true here could indicate we're still logged in,
                // whereas false would be not logged in.
                if (status === false) {
                  // if the login has expired on the server, delete the
                  // one on the client as well.
                  user = null;
                }

                // Return the user as a convenience, so we can just
                // use the value without having to reacquire it from
                // the service.
                return user;
              });
            }
          },
          hasGroups: {
            value: function hasGroups(username, groups) {
              // Check if user has admin rights.
              return returnData(function (resolve) {
                return resolve(true);
              });
            }
          },
          login: {
            value: function login(username, password) {
              // this is a demo, accept anyone with a password of "test"
              // in reality, there would also be more checks to prevent
              // sending off multiple login requests at once
              if (password === "test") {
                return returnData(function (resolve) {
                  user = new User(username);
                  resolve(true);
                });
              } else {
                return returnData(function (resolve) {
                  return resolve(false);
                });
              }
            }
          },
          logout: {
            value: function logout() {
              if (user === null) {
                // If there is no user, return success.
                return Promise.resolve(true);
              }

              return returnData(function (resolve) {
                user = null;
                resolve(true);
              });
            }
          }
        });

        return AuthenticationService;
      })());
      AuthorizeStep = _export("AuthorizeStep", (function () {
        function AuthorizeStep(authenticationService) {
          _classCallCheck(this, AuthorizeStep);

          this.auth = authenticationService;
        }

        _createClass(AuthorizeStep, {
          run: {
            value: function run(routingContext, next) {
              var _this = this;

              // Check for the routes "auth" key.
              var authRoutes = routingContext.nextInstructions.filter(function (i) {
                return i.config.auth;
              });
              if (authRoutes.length === 0) {
                return next();
              } // If any of the auth-keys are a string,
              // treat this as a group name.
              var groups = authRoutes.map(function (r) {
                return r.config.auth;
              }).filter(function (a) {
                return typeof a === "string";
              });

              // Check that the user is logged in.
              return this.auth.checkLogin().then(function (user) {
                if (user === null) return false;

                if (groups.length === 0) return true;

                return _this.auth.hasGroups(user.name, groups);
              }).then(function (authorized) {
                if (authorized) return next();

                return next.cancel(new Redirect("/login"));
              });
            }
          }
        }, {
          inject: {
            value: function inject() {
              return [AuthenticationService];
            }
          }
        });

        return AuthorizeStep;
      })());
    }
  };
});
/**
 * Created by Mauricio on 24/03/15.
 */
//# sourceMappingURL=data:application/json;base64,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