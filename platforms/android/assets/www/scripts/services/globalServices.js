(function(){
  'use strict';

  MyApp.service('gApp', ['$timeout', 'localStorageService', function($timeout, localStorageService) {
    this.server = {
      baseURL: 'http://develop.send-your-message.com/app/'
    };

    this.user = {id: 10};

    this.token = "aabf7016be848f4ee05db565bd148896";
    this.locale = "en";
    this.campaigns = [];
    this.contacts = [];
    this.currentCampaign = {};

    this.busyState = false;

    // function : setBusy
    this.setBusy = function(state, now) {
      if (state == this.busyState)
        return;

      var me = this;

      if (state) {
        this.busyState = true;

        $timeout(function() {
          if (me.busyState === true)
            app.scaBusy.show();
        }, 100);
      }
      else {
        this.busyState = false;

        if (!now) {
          $timeout(function() {
            app.scaBusy.hide();
          }, 100);
        }
        else {
          app.scaBusy.hide();
        }
      }
    };

    this.getApiURL = function(query) {
      return (this.server.baseURL + query);
    };

    this.postFail = function(yescb, nocb) {
      ons.notification.confirm({
        message: 'Unable to contact the server. Would you like to try again?',
        title: 'Error',
        buttonLabels: ['Yes', 'No'],
        primaryButtonIndex: 1,
        callback: function(index) {
          // -1: Cancel
          // 0-: Button index from the left
          if (index === 0) { // yes
            if (angular.isFunction(yescb)) yescb();
          }
          else if (index == 1) {
            if (angular.isFunction(nocb)) nocb();
          }
        }
      });
    };

    this.setLocale = function(locale) {
      this.locale = locale;
    };

    this.getDateWithOffset = function(offset) {

      var today = new Date();
      var theDay = new Date();
      if (!offset)
        theDay = today;
      else
        theDay.setDate(today.getDate()+offset);
      var dd = theDay.getDate();
      var mm = theDay.getMonth() + 1;  // January is 0!
      var yyyy = theDay.getFullYear();
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      theDay = mm + '/' + dd + '/' + yyyy;
      return theDay;
    };

    this.dateToMonthDay = function(theDay) {

      var dd = theDay.getDate();
      var mm = theDay.getMonth() + 1;  // January is 0!
      var yyyy = theDay.getFullYear();
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      theDay = mm + '/' + dd + '/' + yyyy;
      return theDay;
    };

    this.dateToString = function(date) {

      var retString = "";
      var dd = date.getDate();
      var mm = date.getMonth() + 1;  // January is 0!
      var yyyy = date.getFullYear();
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      retString = mm + '/' + dd + '/' + yyyy + " ";

      var h = parseInt(date.getHours()), m = parseInt(date.getMinutes());
      if (h > 12) {
        h = h - 12;
        if(m < 10) m = '0' + m.toString();
        else m = m.toString();
        retString += h.toString() + ":" + m + ":00 PM";
      } else {
        if(m < 10) m = '0' + m.toString();
        else m = m.toString();
        retString += h.toString() + ":" + m + ":00 AM";
      }

      return retString;
    };

  }]);

  MyApp.factory('dealPost', ['$http', 'gApp', function($http, gApp) {
    return function(url, data, callback, context, timeout) {

      if (!timeout) {
        timeout = 15 * 1000;
      }

      gApp.setBusy(true);

      var handler = function(d, e) {
        gApp.setBusy(false);

        if (callback) {
          if (context) {
            callback.call(context, d, 0);
          }
          else {
            callback(d, e);
          }
        }
      };

      $http.post(url, data, {timeout: timeout}).
        success(function(data, status, headers, config, statusText) {
          handler(data, 0);
        }).
        error(function(data, status, headers, config, statusText) {
          handler(status, true);
        });
    };
  }]);

})();