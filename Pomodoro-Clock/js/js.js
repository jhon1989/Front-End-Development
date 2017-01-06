var app = angular.module('PomodoroApp', []);
app.controller('MainCtrl', function($scope, $interval) {
  $scope.breakLength   = 5;
  $scope.sessionLength = 25;
  $scope.timeLeft      = $scope.sessionLength;
  $scope.fillHeight    = '0%';
  $scope.sessionName   = 'Session';
  $scope.currentTotal;

  var runTimer            = false,
      secs                = 60 * $scope.timeLeft;
      $scope.originalTime = $scope.sessionLength;

  function secondsToHms(day) {
        day     = Number(day);
    var hour    = Math.floor(day / 3600),
        minute  = Math.floor(day % 3600 / 60),
        seconds = Math.floor(day % 3600 % 60);
    return (
      (hour > 0 ? hour + ":" + (minute < 10 ? "0" : "") : "") + minute + ":" + (seconds < 10 ? "0" : "") + seconds
    );
  }

  // Change default session length
  $scope.sessionLengthChange = function(time) {
    if (!runTimer) {
      if ($scope.sessionName === 'Session') {
        $scope.sessionLength += time;
        if ($scope.sessionLength < 1) {
          $scope.sessionLength = 1;
        }
        $scope.timeLeft     = $scope.sessionLength;
        $scope.originalTime = $scope.sessionLength;
        secs                = 60 * $scope.sessionLength;
      }
    }
  }

  // Change default break length
  $scope.breakLengthChange = function(time) {
    if (!runTimer){
      $scope.breakLength += time;
      if ($scope.breakLength < 1) {
        $scope.breakLength = 1;
      }
      if ($scope.sessionName === 'Break!') {
        $scope.timeLeft     = $scope.breakLength;
        $scope.originalTime = $scope.breakLength;
        secs                = 60 * $scope.breakLength;
      }
    }
  }

  $scope.toggleTimer = function() {
    if (!runTimer) {
      if ($scope.currentName === 'Sesson') {
        $scope.currentLength = $scope.sessionLength;
      } else {
        $scope.currentLength = $scope.breakLength;
      }

      updateTimer();
      runTimer = $interval(updateTimer, 1000);
    } else {
      $interval.cancel(runTimer);
      runTimer = false;
    }
  }

  function updateTimer() {
    secs -= 1;
    if (secs < 0) {

      var wav   = 'https://www.oringz.com/oringz-uploads/sounds-917-communication-channel.mp3',
          audio = new Audio(wav);
			audio.play();

      // toggle break and session
      $scope.fillColor = '#333333';
      if ($scope.sessionName === 'Break!') {
        $scope.sessionName   = 'Session';
        $scope.currentLength = $scope.sessionLength;
        $scope.timeLeft      = 60 * $scope.sessionLength;
        $scope.originalTime  = $scope.sessionLength;
        secs                 = 60 * $scope.sessionLength;
      } else {
        $scope.sessionName   = 'Break!';
        $scope.currentLength = $scope.breakLength;
        $scope.timeLeft      = 60 * $scope.breakLength;
        $scope.originalTime  = $scope.breakLength;
        secs                 = 60 * $scope.breakLength;
      }
    } else {
      if ($scope.sessionName === 'Break!') {
        $scope.fillColor = '#FF4444';
      } else {
        $scope.fillColor = '#99CC00';
      }
	    $scope.timeLeft       = secondsToHms(secs);
      var denom             = 60 * $scope.originalTime,
          perc              = Math.abs((secs / denom) * 100 - 100);
          $scope.fillHeight = perc + '%';
    }
  }

});
