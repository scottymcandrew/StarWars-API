const apiEndpoint = "https://swapi.co/api/";

function getData(starWarsSubject, cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", apiEndpoint + starWarsSubject + "/");
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

function writeToDocument(starWarsSubject) {
    var el = document.getElementById("data");
    // Clear results each run so subsequent values are not written continuously to the page
    el.innerHTML = "";
    getData(starWarsSubject, function (data) {
        // .results is what is returned from the API
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function (item) {
            // .name is returned from the API - the key to the character name value
            //el.innerHTML += "<p>" + item.name + "</p>";
        });

        el.innerHTML = `<table>${tableHeaders}</table>`;
    });
}