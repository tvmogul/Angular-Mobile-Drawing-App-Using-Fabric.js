
// Get object of URL parameters
//var allVars = $.getUrlVars();

// Getting URL var by its nam
//var byName = $.getUrlVar('name');
$.extend({
    getUrlVars: function () {
        var vars = [], hash;

        //https://localhost:44344/Content/mobile-drawing-app/#siteplan?driveid=016178507&siteid=016004269&length=100&width=100
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function (name) {
        return $.getUrlVars()[name];
    }
});

function ReplaceAll(Source, stringToFind, stringToReplace) {
    var temp = Source;
    var index = temp.indexOf(stringToFind);
    while (index != -1) {
        temp = temp.replace(stringToFind, stringToReplace);
        index = temp.indexOf(stringToFind);
    }
    return temp;
}