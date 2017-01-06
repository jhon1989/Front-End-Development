
$('.random').click( function (event) {
    event.preventDefault();
    WIKI.getRandomWiki.randomWiki();
});

document.getElementById('clean').addEventListener('click', function () {
  document.getElementById('search').value = " ";
  document.getElementById('search').setAttribute('placeholder', 'Search here your  article');
});

$('#search').keypress( function (event) {
      if  (event.which == 13) {
          WIKI.getRandomWiki.getWiki();
      }
});

var WIKI = WIKI || {};

WIKI.getRandomWiki = {

  randomWiki: function () {
     return window.open('https://en.wikipedia.org/wiki/Special:Random');
  },

  getWiki: function () {
    var ajax = $.ajax({
       jsonp: 'callback',
       dataType: 'jsonp',
       url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=20&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='+ $('#search').val(),
       format:'json',
    });

    ajax.done( function (response) {
       WIKI.getRandomWiki.travelResponse(response);
       WIKI.getRandomWiki.moveDivSearch();
    });

    ajax.fail( function (response) {
      alert('Error internal server');
    });

  },

  travelResponse: function (response) {
     var result   = response.query.pages,
         div      = '',
         pageWiki = 'https://en.wikipedia.org/?curid=';

      $.each(result, function (key, value) {
        div += "<a href='"+ pageWiki + value.pageid +"' class='btn-default href-wiki' target='_blank'><div class='w3-panel w3-card-2'><p>" + value.title + "</p><p>" + value.extract+ "</p></div></a>";
      });

       WIKI.getRandomWiki.appendResult(div);
  },

  appendResult: function (div) {
    $('.search-wiki').empty().html(div);
  },

  moveDivSearch: function () {
    $('#form-search').css({
      'margin-top':'1px'
    });
  }

}
