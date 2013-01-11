
function searchForm()
{

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