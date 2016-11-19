


ko.components.register('component-tablerow', {
  template: '<tr><td data-bind="text: row.Name"></td><td data-bind="text: row.Active"></td><td data-bind="text: row.Status"></td></tr>'
});
ko.components.register('component-pagination', {
  template: { require: 'text!/ko.Templates/paginationTemplate.html' }
});

/*
ko.components.register('pagination', {
  viewModel: { require: 'ko.Models/paginationModel' },
  template: { require: 'text!ko.Templates/paginationTemplate.html' }
});
*/





var dm = new DataModel();
ko.applyBindings(dm);

dm.loadData();
