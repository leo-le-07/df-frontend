/**
 * Created by Dona on 7/2/16.
 */
(function () {
  'use strict';

  angular
    .module('app.booking')
    .controller('SearchCtr', SearchCtr);

  /** @ngInject */
  function SearchCtr($scope, BDBooking, RouteQuerySer, RouteSearchSer, RouteDateSer, RoutePaxSer) {
    var vm = this;
    // Date
    vm.today      = new Date();
    vm.departDate = RouteSearchSer.departDate;
    vm.returnDate = RouteSearchSer.returnDate;
    // Round type
    vm.roundTrip   = RouteSearchSer.roundTrip;
    vm.isRoundTrip = isRoundTrip;
    // Paxes number
    vm.adultNum       = RouteSearchSer.adultNum;
    vm.childNum       = RouteSearchSer.childNum;
    vm.infantNum      = RouteSearchSer.infantNum;
    vm.adultNums      = RoutePaxSer.initAdultNums();
    vm.childNums      = RoutePaxSer.adaptChildNums(vm.adultNum);
    vm.infantNums     = RoutePaxSer.adaptInfantNums(vm.adultNum);
    vm.changeAdultNum = changeAdultNum;
    vm.changeChildNum = changeChildNum;
    // Places
    vm.queryOriPlace          = queryOriPlace;
    vm.queryDesPlace          = queryDesPlace;
    vm.selectedOriPlaceChange = selectedOriPlaceChange;
    vm.selectedDesPlaceChange = selectedDesPlaceChange;
    vm.oriPlace               = RouteSearchSer.oriPlace;
    vm.desPlace               = RouteSearchSer.desPlace;
    vm.desPlaces              = null;
    vm.routes                 = BDBooking.data.routes;
    vm.oriPlaces              = RouteQuerySer.filterOriPlaces(vm.routes);

    // Methods
    $scope.$watch('vm.departDate', function(){
      RouteDateSer.adaptReturnDate(vm.departDate, vm.returnDate, returnDatePicker);
    }, true);

    function changeAdultNum(){
      vm.childNum   = 0;
      vm.infantNum  = 0;
      vm.childNums  = RoutePaxSer.adaptChildNums(vm.adultNum);
      vm.infantNums = RoutePaxSer.adaptInfantNums(vm.adultNum);
    }

    function changeChildNum(){
      vm.adultNum   = 1;
      vm.infantNum  = 0;
      vm.adultNums  = RoutePaxSer.adaptAdultNums(vm.childNum);
      vm.infantNums = RoutePaxSer.adaptInfantNums(vm.adultNum);
    }

    function queryOriPlace(query) {
      return RouteQuerySer.query(vm.oriPlaces, query);
    }

    function queryDesPlace(query){
      return RouteQuerySer.query(vm.desPlaces, query);
    }

    function selectedOriPlaceChange(item) {
      vm.desPlaces     = RouteQuerySer.filterDesPlaces(vm.routes, vm.oriPlace);
      vm.desPlace      = null;
      vm.desSearchText = '';
    }

    function selectedDesPlaceChange(item) {
      if (item == null) {
        vm.desSearchText = "";
      }
    }

    function isRoundTrip(roundTrip) {
      return roundTrip;
    }
  }
})();
