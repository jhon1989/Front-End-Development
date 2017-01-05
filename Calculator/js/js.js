/* Created by Jhon Janer Moreno */

/* Declare all variable for applicaciton */
var $showResult    = $('.show-result'),
    $showOperation = $('.show-operation'),
    $btnDivision   = $('.btn-division'),
    $btnPlus       = $('.btn-max'),
    $btnLess       = $('.btn-less'),
    $btnPoint      = $('.point'),
    $btnMultiply   = $('.btn-x'),
    $btnEqual      = $('.equal'),
    $btnOne        = $('.btn-1'),
    $btnTwo        = $('.btn-2'),
    $btnThree      = $('.btn-3'),
    $btnFour       = $('.btn-4'),
    $btnFive       = $('.btn-5'),
    $btnSix        = $('.btn-6'),
    $btnSevent     = $('.btn-7'),
    $btnEight      = $('.btn-8'),
    $btnNine       = $('.btn-9'),
    $btnCero       = $('.btn-0'),
    pressEqual     = false,
    allSymbol      = [$showOperation.text(), $btnDivision.text(), $btnPlus.text(), $btnLess.text(), $btnPoint.text(), $btnMultiply.text(), $btnEqual.text()];

$( function () {

  caculator.placeholder('Carry out your operation');

  $('.clear-text').click( function () {
      caculator.placeholder('Carry out your operation');
  });

  $btnEqual.click( function () {
      caculator.operation();
  });

  $btnDivision.click( function () {
      caculator.clearShowResult();
      caculator.insertSymbol($btnDivision.text());
  });

  $btnPlus.click( function () {
      caculator.clearShowResult();
      caculator.insertSymbol($btnPlus.text());
  });

  $btnMultiply.click( function () {
      caculator.clearShowResult();
      caculator.insertSymbol($btnMultiply.text());
  });

  $btnLess.click( function () {
      caculator.clearShowResult();
      caculator.insertSymbol($btnLess.text());
  });

  $btnPoint.click( function () {
      caculator.clearShowResult();
      caculator.insertSymbol($btnPoint.text());
  });

  $btnCero.click( function () {
     caculator.insertNumber($btnCero.text());
  });

  $btnNine.click( function () {
     caculator.insertNumber($btnNine.text());
  });

  $btnEight.click( function () {
     caculator.insertNumber($btnEight.text());
  });

  $btnSevent.click( function () {
     caculator.insertNumber($btnSevent.text());
  });

  $btnSix.click( function () {
     caculator.insertNumber($btnSix.text());
  });

  $btnFive.click( function () {
     caculator.insertNumber($btnFive.text());
  });

  $btnFour.click( function () {
     caculator.insertNumber($btnFour.text());
  });

  $btnThree.click( function () {
     caculator.insertNumber($btnThree.text());
  });

  $btnTwo.click( function () {
     caculator.insertNumber($btnTwo.text());
  });

  $btnOne.click( function () {
     caculator.insertNumber($btnOne.text());
  });

});

/* Create namespace calculator */
var caculator = {
  insertNumber: function (value) {

    if (allSymbol.indexOf(caculator.getLastValue()) != -1)
    {
      $showResult.val("");
    }
    caculator.concatenateValue(value);
  },

  concatenateValue: function (value) {
    var numberCharAllowed = 18;

    if (pressEqual == true)
    {
       caculator.clearShowResult();
       caculator.clearShowOperation();
       pressEqual = false;
    }

    if ($showOperation.val().length <= 18)
    {
       $showOperation.val($showOperation.val() + '' + value);
    }
    else
    {
      caculator.placeholder('Digit Limit Met');
    }

    if ($showResult.val().length <= 18/2)
    {
      $showResult.val($showResult.val() + '' + value);
    }
    else
    {
      caculator.placeholder('Digit Limit Met');
    }

  },

  insertSymbol: function (value) {
     if ($showOperation.val().length > 0)
     {
       if (allSymbol.indexOf(caculator.getLastValue()) == -1)
       {
           caculator.concatenateValue(value);
       }
     }
  },

  getLastValue: function () {
     return $showOperation.val().substr(-1);
  },

  clearShowResult: function () {
     $showResult.val('');
  },

  clearShowOperation: function () {
     $showOperation.val('');
  },

  placeholder: function (message) {
     caculator.clearShowResult();
     caculator.clearShowOperation();
     $showResult.attr('placeholder', '0');
     $showOperation.attr('placeholder', message);
  },

  operation: function (value) {
     pressEqual = true;
     $showResult.val(eval($showOperation.val()));
     $showOperation.val($showOperation.val() + '=' + eval($showOperation.val()));
  }

}
