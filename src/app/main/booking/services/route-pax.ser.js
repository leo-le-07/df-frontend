(function () {
    'use strict';

    angular
        .module('app.booking')
        .factory('RoutePaxSer', routePaxService);

    /** @ngInject **/
    function routePaxService() {
        var maxPaxNum = 6;

        var service = {};

        service.initAdultNums = function(){
          var results = buildArraySequenceNum(maxPaxNum);
          results.shift();
          return results;
        };

        service.adaptAdultNums = function(childNum){
          var results = buildArraySequenceNum(maxPaxNum - childNum);
          results.shift();
          return results;
        };

        service.adaptChildNums = function(adultNum){
          return buildArraySequenceNum(maxPaxNum - adultNum);
        };

        service.adaptInfantNums = function(adultNum){
          var maxNum = adultNum > 2 ? 2 : 1;
          return buildArraySequenceNum(maxNum);
        };

        function buildArraySequenceNum(maxNum) {
          var results = [];
          for (var i = 0; i <= maxNum; i++){
            results.push(i);
          }
          return results;
        }

        return service;
    }
})();
