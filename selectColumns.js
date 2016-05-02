$(document).ready(function() {

	var myDataRef = new Firebase('https://blinding-inferno-865.firebaseio.com/');

	// Generate label text for checkboxes
	function generateCheckboxLabelText(type) {
		var text;
		if (type == "categories") {
			text = ["Erasers", "Notebooks", "Pencils", "Tapes"];
		} else if (type == "columns") {
			text = ["Name", "SKU", "Brand", "Vendor", "In Stock", "Unit Price", "Vendor Price"];
		}
		return text;
	}

	// Generate checkbox elements
	function makeCategorySelectionCheckboxes(type) {
		var labelText = generateCheckboxLabelText(type);
		
		var selectionDiv = $("<div>", {
			"class": "col-md-10",
			"id": type + "-selection",
		});

		for (var i=0; i<labelText.length; i++) {
			var newElt = $("<label>", {
				"class": "checkbox-inline col-md-3",
				"text": labelText[i],
				"for": labelText[i],
				"margin-top": "10px",
			});

			var newCheckbox = $("<input>", {
				"class": "checkbox " + type,
				"type": "checkbox",
				"id": labelText[i],
				"name": labelText[i],
			});

			newElt.prepend(newCheckbox);
			selectionDiv.append(newElt);
		}

		$("#"+type+"-div").append(selectionDiv);
	}

	makeCategorySelectionCheckboxes("categories");
	makeCategorySelectionCheckboxes("columns");
	
	// Select all button functionality
	$(".checkAll").click(function(e) {
		var checkType = $(this).prop("id");
		var elts = document.getElementsByClassName(checkType);
		for (var i=0; i<elts.length; i++) {
			$($(elts[i])).prop("checked", $(this).prop("checked"));
		}
	});	
});

// On form submission, collect submit 
function submitForm() {
	var columns = [];
	var categories = [];

	var column_values = document.getElementsByClassName("columns");
	var category_values = document.getElementsByClassName("categories");
	
	for (var i=0; i<column_values.length; i++) {
		if (column_values[i].checked)
			columns.push(column_values[i].name);
	}

	for (var i=0; i<category_values.length; i++) {
		if (category_values[i].checked)
			categories.push(category_values[i].name);
	}
	console.log(columns);
	console.log(categories);

	var parameters = "columns=" + columns + "&" + "category=" + categories;
	window.location.href = "viewInventory.html?" + parameters;
	return false;
}