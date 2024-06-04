"use strict";

var autoWidth = function autoWidth(worksheet) {
  var excludedIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var minimalWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
  worksheet.columns.forEach(function (column, index) {
    if (excludedIndex.includes(index)) {
      column.width = minimalWidth + 10;
    } else {
      var maxColumnLength = 0;
      column.eachCell({
        includeEmpty: true
      }, function (cell) {
        maxColumnLength = Math.max(maxColumnLength, minimalWidth, cell.value ? cell.value.toString().length : 0);
      });
      column.width = maxColumnLength + 10;
    }
  });
};
module.exports = {
  autoWidth: autoWidth
};