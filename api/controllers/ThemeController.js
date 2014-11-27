/**
 * ThemeController
 *
 * @description :: Server-side logic for managing themes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index : function (req,res){
    var params = req.params.all();

    Theme.find({}, function(err, themes) {
      if (err) {
        console.log(err)
      }
      return res.view({
        title:"Theme",
        themes:themes
      });
    });
  },
  // create: function (req,res){
  //   console.log("create")
  // },
};

