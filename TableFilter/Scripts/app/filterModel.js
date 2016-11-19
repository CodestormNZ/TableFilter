define("filterModel", ['knockout'], function (ko) {
  return function filterModel(data) {
    var self = this;
    self.sort_Name = ko.observable(false);
    self.filterName = ko.observable('');
    self.filterActive = ko.observable('none');
    self.filterStatus = ko.observable('none');
    self.filterStatusMax = 3;
    self.filteredData = ko.pureComputed(function () {
      return ko.utils.arrayFilter(data(), function (item) {
        return (
          (self.filterName().length == 0 || item.Name().toLowerCase().indexOf(self.filterName().toLowerCase()) > -1)
            &&
          (self.filterActive() == 'none' || item.Active() == self.filterActive())
            &&
          (self.filterStatus() == 'none' || item.Status() == self.filterStatus())
        )
      }).sort(
        function (a, b) {
          if (self.sort_Name() === false) {
            var x = a.Name().toLowerCase(), y = b.Name().toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
          } else {
            var x = b.Name().toLowerCase(), y = a.Name().toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
          }
        });
    });

    self.count = ko.pureComputed(function () {
      return self.filteredData().length;
    });
    self.total = ko.pureComputed(function () {
      return data().length;
    });
    self.sortName = function () {
      if (self.sort_Name() == true) {
        self.sort_Name(false);
      } else {
        self.sort_Name(true);
      }
    }
    self.toggleActive = function () {
      if (self.filterActive() == 'none') {
        self.filterActive(true);
      } else if (self.filterActive() == true) {
        self.filterActive(false);
      } else {
        self.filterActive('none');
      }
    }
    self.toggleStatus = function () {
      if (self.filterStatus() == self.filterStatusMax) {
        self.filterStatus('none');
      } else if (self.filterStatus() == 'none') {
        self.filterStatus(0)
      } else {
        self.filterStatus(self.filterStatus() + 1);
      }
    }
  };
});
