(function ()
{
    'use strict';

    angular
        .module('app.sample')
        .controller('SampleController', SampleController);

    /** @ngInject */
    function SampleController(SampleData)
    {
        var vm        = this;
        vm.today      = new Date();

        vm.simulateQuery = false;
        vm.states = loadAll();
        vm.querySearch = querySearch;
        vm.selectedOriPlaceChange = selectedOriPlaceChange;
        vm.selectedDesPlaceChange = selectedDesPlaceChange;
        vm.curDate = new Date();
        vm.departDate = new Date();
        vm.returnDate = new Date();
        vm.returnDate.setDate(vm.departDate.getDate() + 1);
        vm.roundTrip = true;
        vm.options = {
            format: 'dddd, dd/mm/yyyy',
            formatSubmit: 'dd/mm/yyyy',
            monthsFull: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
            weekdaysFull: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
            weekdaysShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
            today: '',
            clear: '',
            close: 'Đóng'
        };
        vm.isRoundtrip = isRoundtrip;

        // Data

        // Methods
        function querySearch(query) {
            var results = query ? vm.states.filter(createFilterFor(query)) : vm.states,
                deferred;
            if (vm.simulateQuery) {
                deferred = $q.defer();
                $timeout(function() {
                    deferred.resolve(results);
                }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        function selectedOriPlaceChange(item) {
            if (item == null){
                vm.oriSearchText = "";
            }
        }
        function selectedDesPlaceChange(item) {
            if (item == null){
                vm.desSearchText = "";
            }
        }
        function loadAll() {
            var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';

            return allStates.split(/, +/g).map(function(state) {
                return {
                    value: state.toLowerCase(),
                    display: state
                };
            });
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };

        }

        function isRoundtrip(roundTrip){
            return roundTrip;
        }
        //////////
    }
})();
