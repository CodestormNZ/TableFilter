
var paginationModel = function (data) {
  var self = this;
  self.size = ko.observable(100);
  self.cur = ko.observable(0);

  self.max = ko.pureComputed(function () {
    var max = Math.ceil(data().length / self.size()) - 1;
    if (self.cur() > max) {
      self.cur(max);
    }
    if (self.cur() < 0) {
      self.cur(0);
    }
    return max;
  });
  self.pages = ko.pureComputed(function () {
    var pages = [];
    for (i = 0; i <= self.max() ; i++) {
      pages.push({ num: (i + 1) });
    }
    return pages;
  });
  self.prev = function () {
    if (self.cur() > 0) {
      self.cur(self.cur() - 1);
    }
  };
  self.next = function () {
    if (self.cur() < self.max()) {
      self.cur(self.cur() + 1);
    }
  };
  self.moveTo = function (cur) {
    self.cur(cur);
  };
  self.pagedData = ko.pureComputed(function () {
    var size = self.size();
    var start = self.cur() * size;
    return data().slice(start, start + size);
  });
}

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

var filterModel = function (data) {
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
}


function DataModel () {
  var self = this;
  self.dataArray = ko.observableArray([]);

  self.filter = new filterModel(self.dataArray);
  self.pager = new paginationModel(self.filter.filteredData);

  self.loadData = function () {
    $.getJSON("/Home/DataAjaxLoader/", function (d) {
      ko.mapping.fromJS(d, { dataMapping }, self);
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
}

var dm = new DataModel();
ko.applyBindings(dm);

dm.loadData();
