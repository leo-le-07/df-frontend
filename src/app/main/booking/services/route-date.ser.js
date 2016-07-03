(function () {
    'use strict';

    angular
        .module('app.booking')
        .factory('RouteDateSer', routeDateService);

    /** @ngInject **/
    function routeDateService() {
        var service = {};

        service.adaptReturnDate = function(departDate, returnDate, datePickerId){
          if (departDate && returnDate){
            var departDateStr = getDateStrYYYYMMDD(departDate);
            var returnDateStr = getDateStrYYYYMMDD(returnDate);
            if (departDateStr > returnDateStr) {
              returnDate.setDate(departDate.getDate() + 1);
              updateDatePicker(datePickerId, returnDate);
            }
          }
        };

        function updateDatePicker(datePickerId, date) {
          var returnDateElement = angular.element(datePickerId);
          returnDateElement.pickadate('picker').set('select', date.getTime());
        };

        function getDateStrYYYYMMDD(date){
          var mm = date.getMonth() + 1;
          var dd = date.getDate();
          return [date.getFullYear(), mm.toString().length === 2 ? mm : '0' + mm.toString(), dd.toString().length === 2 ? dd : '0' + dd.toString()].join('');
        };

        return service;
    }
})();
