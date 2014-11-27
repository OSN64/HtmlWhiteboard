/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.http.html
 */

 module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Express middleware to use for every Sails request. To add custom          *
  * middleware to the mix, add a function to the middleware config object and *
  * add its key to the "order" array. The $custom key is reserved for         *
  * backwards-compatibility with Sails v0.9.x apps that use the               *
  * `customMiddleware` config option.                                         *
  *                                                                           *
  ****************************************************************************/

  middleware: {

  /***************************************************************************
  *                                                                          *
  * The order in which middleware should be run for HTTP request. (the Sails *
  * router is invoked by the "router" middleware below.)                     *
  *                                                                          *
  ***************************************************************************/
  theme: function (req,res,next) {

        req._theme = {};
        Theme.find({}, function(err, themes) {
          if(err){
            console.log("DB Error")
          }
          if(_.isEmpty(themes)){
            console.log("No themes in db")
          }else {
          console.log(Theme)

          req.theme = theme;
          }
        });

//     // req._passport.instance = passport;

//     // if (req.session && req.session[passport._key]) {
//     //   // load data from existing session
//     //   req._passport.session = req.session[passport._key];
//     // } else if (req.session) {
//     //   // initialize new session
//     //   req.session[passport._key] = {};
//     //   req._passport.session = req.session[passport._key];
//     // } else {
//     //   // no session is available
//     //   req._passport.session = {};
//     // }
  // console.log("1")
   next();
  },

   order: [
   'startRequestTimer',
   'cookieParser',
   'session',
   'myRequestLogger',
   'bodyParser',
   'handleBodyParserError',
   'compress',
   'methodOverride',
   'poweredBy',
   '$custom',
   'router',
   'theme',
   'www',
   'favicon',
   '404',
   '500'
   ],

  /****************************************************************************
  *                                                                           *
  * Example custom middleware; logs each request to the console.              *
  *                                                                           *
  ****************************************************************************/

    // myRequestLogger: function (req, res, next) {
    //     console.log("Requested :: ", req.method, req.url);
    //     return next();
    // }


  /***************************************************************************
  *                                                                          *
  * The body parser that will handle incoming multipart HTTP requests. By    *
  * default as of v0.10, Sails uses                                          *
  * [skipper](http://github.com/balderdashy/skipper). See                    *
  * http://www.senchalabs.org/connect/multipart.html for other options.      *
  *                                                                          *
  ***************************************************************************/

    // bodyParser: require('skipper')

  },

  /***************************************************************************
  *                                                                          *
  * The number of seconds to cache flat files on disk being served by        *
  * Express static middleware (by default, these files are in `.tmp/public`) *
  *                                                                          *
  * The HTTP static cache is only active in a 'production' environment,      *
  * since that's the only time Express will cache flat-files.                *
  *                                                                          *
  ***************************************************************************/

  // cache: 31557600000
};
