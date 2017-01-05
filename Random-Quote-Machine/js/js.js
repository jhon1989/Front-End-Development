'use strict';
$( function () {

    QUOTE.randomQuote.getQuote();

    $("button").click(function () {
       QUOTE.randomQuote.getQuote();
    });

    $('.tweeter-quote').on('click', function () {
      if (!QUOTE.randomQuote.inIframe()) {
            QUOTE.randomQuote.openUrl('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + QUOTE.randomQuote.currentQuote + '" ' + QUOTE.randomQuote.currentQuoteAutor));
        }
    });

});

// Declare namespace
var QUOTE = QUOTE || {};

   QUOTE.randomQuote = {
     currentQuote: '',
     currentQuoteAutor: '',

     // function for validate iframe
     inIframe: function () {
       try {
         return window.self !== window.top;
       } catch (e) {
         return true;
       }
     },

     openUrl: function (url) {
       window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
     },

     getQuote: function () {
       var ajax = $.ajax({
         headers: {
           'X-Mashape-Key': 'OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V',
           Accept: 'application/json',
           'Content-Type': 'application/x-www-form-urlencoded',
         },
         url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat='
       });

       ajax.done( function (response) {
         var responseParseJson = JSON.parse(response);
         QUOTE.randomQuote.random(responseParseJson);
         QUOTE.randomQuote.currentQuote  = responseParseJson.quote;
         QUOTE.randomQuote.currentQuoteAutor = responseParseJson.author;

         if (QUOTE.randomQuote.inIframe()) {
           $('.tweeter-quote').attr(
             'href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' +  QUOTE.randomQuote.currentQuote  + '" ' + QUOTE.randomQuote.currentQuoteAutor));
         }
       });

       ajax.fail( function (response) {
         alert('Fail get quote');
       });
     },

    // Function for randomi the text quoute
    random: function (responseParseJson) {
        var colors = ["#5D9CEC", " #3BAFDA", "#8CC152", "#F6BB42", "#E9573F", "#DA4453", "#D770AD", "#AAB2BD"];
        var font = ['Taviraj', 'Droid Sans', 'Lora', 'Ubuntu', 'Noto Sans','Rubik', 'Indie Flower'];
        var colorBody = colors[ Math.floor(Math.random() * colors.length) ];
        var fontFamily = font[Math.floor(Math.random() * font.length)];

       $('body').animate({
           "background-color": colorBody,
       }, 1000);

       $('.quote-text').animate({ opacity:0 }, 500, function () {
           $(this).animate({ opacity: 1 }, 500);
           $('.quote-text p').text('!! ' + responseParseJson.quote);
       });
       $('.quote-author').animate({ opacity: 0}, 500, function () {
          $(this).animate({ opacity: 1}, 500);
           $('.quote-author p').html(responseParseJson.author);
       });


       $('.quote-text p').animate({
          'color': colorBody,
          'font-family': fontFamily,
          'font-size': '200%',
       }, 1000);

      $('.quote-author p').animate({
        'color': colorBody,
        'font-size': '100%',
      });

       $("button").animate({
          "background-color": colorBody,
          'font-family': fontFamily,
          'font-size': '120%',
       }, 1000);

       $("button").click( function () {
         $("button").css('color', 'white');
       });

      $('.tweeter-quote').animate({
        'background-color': colorBody,
      }, 1000);
    }
}
