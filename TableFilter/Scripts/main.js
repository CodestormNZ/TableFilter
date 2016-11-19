require.config({
  baseUrl: "/Scripts/app",
  paths: {
    "jquery": "../lib/jquery-1.10.2",
    "jqueryValidate": "../lib/jquery.validate",
    "jqueryValidateUnobtrusive": "../lib/jquery.validate.unobtrusive",
    "bootstrap": "../lib/bootstrap",
    "respond": "../lib/respond",
    "knockout": "../lib/knockout-3.4.0",
    "knockout-mapping": "../lib/knockout.mapping-latest",
    "modernizr": "../lib/modernizr-2.6.2",
    "text": "../lib/text"
  },
  shim: {
    "jqueryValidate": ["jquery"],
    "jqueryValidateUnobtrusive": ["jquery", "jqueryValidate"],
    "knockout": ["jquery"],
    "knockout-mapping": ["knockout"],
    "respond": ["bootstrap"]
  }
})
require(['knockout', 'dataModel', 'components'], function (ko, dataModel) {
  ko.applyBindings(new dataModel());
});
