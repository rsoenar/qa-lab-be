const autoWidth = (worksheet, excludedIndex = [], minimalWidth = 5) => {
	worksheet.columns.forEach((column, index) => {
		if (excludedIndex.includes(index)) {
			column.width = minimalWidth + 10;
		} else {
			let maxColumnLength = 0;
			column.eachCell({ includeEmpty: true }, (cell) => {
				maxColumnLength = Math.max(
					maxColumnLength,
					minimalWidth,
					cell.value ? cell.value.toString().length : 0
				);
			});
			column.width = maxColumnLength + 10;
		}
	});
};

module.exports = { autoWidth };
