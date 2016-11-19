require(['components/pagination', 'components/filter'], function () { });

define("dataModel", ['knockout', 'knockout-mapping', 'filterModel', 'paginationModel'], function (ko, koMapping, filterModel, paginationModel) {
  ko.components.register('data-row', {
    template: '<tr><td data-bind="text: row.Name"></td><td data-bind="text: row.Active"></td><td data-bind="text: row.Status"></td></tr>'
  });
  return function dataModel() {
    var self = this;
    self.dataArray = ko.observableArray([]);

    self.filter = new filterModel(self.dataArray);
    self.pager = new paginationModel(self.filter.filteredData);
    self.viewArray = ko.computed(function () { return self.pager.pagedData()});

    self.loadData = function () {
      $.getJSON("/Home/DataAjaxLoader/", function (d) {
        koMapping.fromJS(d, { dataMapping }, self);
      })
    }

    var Data = function (d) {
      var self = this;
      if (d != null) {
        self.Name = ko.observable(d.Name);
        self.Active = ko.observable(d.Active);
        self.Status = ko.observable(d.Status);
      }
    }
    var dataMapping = {
      create: function (options) {
        return new Data(options.data);
      }
    };
    self.loadData();
  };
});