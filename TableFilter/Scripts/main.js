require.config({
  baseUrl: "/Scripts/app",
  paths: {
    jquery: "../lib/jquery-1.10.2",
    jqueryValidate: "../lib/jquery.validate",
    jqueryValidateUnobtrusive: "../lib/jquery.validate.unobtrusive",
    bootstrap: "../lib/bootstrap",
    respond: "../lib/respond",
    knockout: "../lib/knockout-3.4.0",
    knockoutMapping: "../lib/knockout.mapping-latest",
    modernizr: "../lib/modernizr-2.6.2"
  },
  shim: {
    jqueryValidate: ["jquery"],
    jqueryValidateUnobtrusive: ["jquery", "jqueryValidate"],
    knockout: ["jquery"],
    knockoutMapping: ["knockout"],
    respond: ["bootstrap"]
  }
})
require(['knockout', 'viewModel', 'domReady!'], function (ko, viewModel) {
  ko.applyBindings(new viewModel());
});
