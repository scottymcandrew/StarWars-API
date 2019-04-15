function getData(url, cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

function getTableHeaders(obj) {
    var tableHeaders = [];

    // Global Object method to extract the keys
    Object.keys(obj).forEach(function (key) {
        tableHeaders.push(`<td>${key}</td>`);
    });
    // Variable referenced with dollar and curly brackets since we're using a template literal (backticks)
    return `<tr>${tableHeaders}</tr>`;
}

function generatePaginationButtons (next, prev) {
    if (next && prev) {
        return `<button onclick=writeToDocument('${prev}')>Previous</button>
                <button onclick=writeToDocument('${next}')>Next</button`;
    } else if (next && !prev) {
        return `<button onclick=writeToDocument('${next}')>Next</button`;
    } else if (!next && prev) {
        return `<button onclick=writeToDocument('${prev}')>Previous</button>`;
    }
}

function writeToDocument(url) {
    var el = document.getElementById("data");
    var tableRows = [];
    
    // Clear results each run so subsequent values are not written continuously to the page
    el.innerHTML = "";
    getData(url, function (data) {
        var pagination;
        if (data.next || data.previous) {
            pagination = generatePaginationButtons(data.next, data.previous);
        }

        // .results is what is returned from the API
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function (item) {
            // .name is returned from the API - the key to the character name value
            //el.innerHTML += "<p>" + item.name + "</p>";
            var dataRow = [];

            Object.keys(item).forEach( function (key) {
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15);

                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`.replace(/,/g, "");
    });
}