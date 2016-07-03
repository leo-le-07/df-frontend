(function () {
    'use strict';

    angular
        .module('app.booking')
        .factory('RouteQuerySer', routeQueryService);

    /** @ngInject **/
    function routeQueryService() {
        var service = {};

        service.filterOriPlaces = function(routes){
          var i;
          var oriPlaces = [];
          for (i=0; i< routes.length; i++){
            oriPlaces.push(routes[i].oriPlace);
          }
          return oriPlaces;
        };

        service.filterDesPlaces = function(routes, oriPlace){
          var i;
          if (oriPlace){
            for (i=0; i< routes.length; i++){
              if (routes[i].oriPlace.code === oriPlace.code){
                return routes[i].desPlaces;
              }
            }
          }
          return [];
        };

        service.query = function(items, query){
          return query ? items.filter(createFilterFor(query)) : items;
        };

        function createFilterFor(query) {
          return function filterFn(state) {
            return match(state, query);
          };
        }

        function match(state, query){
          var lowercaseQuery = angular.lowercase(query);
          return (
                state.nameUnsignedCode.toLowerCase().indexOf(lowercaseQuery) > -1
                || state.name.toLowerCase().indexOf(lowercaseQuery) > -1
                );
        }

        return service;
    }
})();
