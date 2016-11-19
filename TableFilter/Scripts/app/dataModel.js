define("dataModel", ['knockout', 'knockoutMapping', 'filterModel', 'paginationModel'], function (ko, koMapping, filterModel, paginationModel) {
  return function dataModel() {
    var self = this;
    self.dataArray = ko.observableArray([]);

    self.filter = new filterModel(self.dataArray);
    self.pager = new paginationModel(self.filter.filteredData);

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