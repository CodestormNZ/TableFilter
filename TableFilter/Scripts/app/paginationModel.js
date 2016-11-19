define("paginationModel", ['knockout'], function (ko) {
  return function paginationModel(data) {
    var self = this;
    self.size = ko.observable(250);
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
  };
});
