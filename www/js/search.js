
function searchForm()
{

var initHTML = $("<html><head><link rel=" + "stylesheet" +  "href=" + "http://code.jquery.com/mobile/1.2.0-alpha.1/jquery.mobile-1.2.0-alpha.1.min.css" + "/>" + 
"<script src=" + "http://code.jquery.com/jquery-1.7.2.min.js" + "></script>" + 
"<script src=" + "http://code.jquery.com/mobile/1.2.0-alpha.1/jquery.mobile-1.2.0-alpha.1.min.js" + "></script>"
+ "</head><body>"
);

print (initHTML);
document.write(initHTML);


var nextHTML = ("<div id=" + "rossioPage" + "data-role=" + "page" + "id=" + "album-list" + "><div data-role=" + "content" + "data-theme=" + "b" + ">" + 
"<h1>Discounted Shoes</h1></div><!-- /header -->" + 
"<ul id=" + "rossioList" + "data-role=" + "listview" + "data-split-icon=" + "gear" + "data-split-theme=" + "d" + "></ul></div></div>");

document.write(nextHTML);


var rossioURL = "http://www.rossiosquare.com/discount?q=bags&rows=10&format=json";

var movies;

$('#rossioPage').bind('pageshow', function(event) {
getList();
});

function getList() {
$.getJSON(rossioURL, function(data) {
$('#moviesList li').remove();
//movies = data.items;
$.each(data.result, function(index, val) {
$('#rossioList').append('<li>' +
'<a href="' + val.pgurl + '"target="_blank">' + 
'<img src="http://www.rossiosquare.com/image/mibuzzar/' + val.imgurl + '"/></a>' +
'<h4>' + val.dtitle + '</h4>' +
'</a></li>');
});
$('#rossioList').listview('refresh');
});

};

};