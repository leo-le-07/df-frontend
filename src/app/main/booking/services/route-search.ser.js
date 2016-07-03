(function () {
    'use strict';

    angular
        .module('app.booking')
        .factory('RouteSearchSer', routeSearchSer);

    /** @ngInject **/
    function routeSearchSer() {
        // var departDate = new Date();
        // var returnDate = new Date();
        // returnDate.setDate(returnDate.getDate() + 1);
        // var roundTrip = true;
        // var oriPlace = null;
        // var desPlace = null;
        // var adultNum = 1;
        // var childNum = 0;
        // var infantNum = 0;

        var service = {};

        service.departDate = new Date();
        service.returnDate = new Date();
        service.returnDate.setDate(service.returnDate.getDate() + 1);
        service.roundTrip = true;
        service.oriPlace = null;
        service.desPlace = null;
        service.adultNum = 1;
        service.childNum = 0;
        service.infantNum = 0;

        return service;
    }
})();
