define("components", ['knockout'], function (ko) {
  ko.components.register('pagination', {
    template: { require: 'text!components/templates/pagination.html' }
  });
});
