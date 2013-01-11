function searchDiscounts() {
var url = $(location).attr('href').toString() + "discount";
var data = "q=" + encodeURIComponent($("#q").val()) + "&cat=" + encodeURIComponent(cat) + "&d=" + domain + "&s=" + s;
if ($("#splo").val() !== "-lo price-" && $("#splo").val() !== "") {
data += "&splo=" + $("#splo").val();
}
if ($("#sphi").val() !== "-hi price-" && $("#sphi").val() !== "") {
data += "&sphi=" + $("#sphi").val();
}
if (sort !== "") {
data += "&sort=" + encodeURIComponent(sort);
}
if (comps !== "") {
data += "&cmp=" + encodeURIComponent(comps);
}

var w = $("#result").width();
var h = $("#result").height();
data += "&cols=" + Math.floor(w/140) + "&rows=" + Math.round(h/195);
//alert(w + "x" + h);
//alert(data);

$("#suggest").html("");
$("#suggest").css("visibility", "hidden");
last = 0;
max = 9999;
$.ajax({
'url': url + "?" + data,
'method': 'GET',
'success': function(results) {
var srchTerm = $("#q").val();
var update = ((srchTerm === ""  || srchTerm === "-product name-") && cat === "" && domain === "") ? false : true;
if (results.hasOwnProperty('domain')) {
domain = results['domain'];
}
if (update && results.hasOwnProperty('info')) {
var info = results['info'].split(/\s+/);
last = parseInt(info[0].substr(info[0].indexOf("-")+1), 10);
max = parseInt(info[2], 10);

$("#info").html(results['info']);
//alert(results['info']);
}
if (results.hasOwnProperty('list')) {
$("#listing").html(results['list']);
}
if (results.hasOwnProperty('prodct') && results['prodct'] != null) {
$("#desc").html(results['prodct']);
}
if (update) {
var rslt = (results.hasOwnProperty('result')) ? results['result'] : "<div style='margin:5px auto;font:bold 8.5pt verdana;color:#f00;text-align:center;width:99%'>no discounts available for this search</div>";

var posn = rslt.indexOf("<div id='pages'>");
if (posn < 0) {
$("#result").html(rslt);
}
else {
$("#result").html(rslt.substr(0, posn));
$("#paginate").html(rslt.substr(posn));
}
}
$("#rslt").scrollTop(0);

$("#suggest").html("");
$("#suggest").css("visibility", "hidden");
if (typeof piwikTracker !== "undefined") {
if (srchTerm === "-product name-") {
srchTerm = "All";
}
if (domain !== null && domain !== "") {
srchTerm += ";store:" + domain;
}
if (cat !== "") {
srchTerm += ";cat:" + cat;
}
if (sort !== "") {
srchTerm += ";order:" + sort;
}
if ($("#splo").val() !== "-lo price-" && $("#splo").val() !== "") {
srchTerm += ";splo:" + $("#splo").val();
}
if ($("#sphi").val() !== "-hi price-" && $("#sphi").val() !== "") {
srchTerm += ";sphi:" + $("#sphi").val();
}
if (results.hasOwnProperty('ip') && results['ip'] != null) {
srchTerm += ";ip:" + results['ip'];
}
piwikTracker.trackSiteSearch(srchTerm, $("#cat_refine").val(), max);
}
}
});

//window.history.pushState(null, "rossionext", "/discount?" + data);
}
