(function () {
  'use strict';

  angular
    .module('app.booking', ['pickadate'])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider, pickADateProvider) {
    // State
    $stateProvider
      .state('app.booking', {
        url: '/booking',
        views: {
          'content@app': {
            templateUrl: 'app/main/booking/booking.html',
            controller: 'BookingCtr as vm'
          },
          'search@app.booking': {
            templateUrl: 'app/main/booking/search/search.html',
            controller: 'SearchCtr as vm'
          },
          'flight@app.booking': {
            templateUrl: 'app/main/booking/flight/flight.html',
            controller: 'FlightCtr as vm'
          },
          'pax@app.booking': {
            templateUrl: 'app/main/booking/pax/pax.html',
            controller: 'PaxCtr as vm'
          },
          'summary@app.booking': {
            templateUrl: 'app/main/booking/summary/summary.html',
            controller: 'SummaryCtr as vm'
          }
        },
        resolve: {
          BDBooking: function (msApi) {
            return msApi.resolve('booking@get');
          }
        }
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/booking');

    // Api
    msApiProvider.register('booking', ['app/data/booking/data.json']);

    // Navigation
    msNavigationServiceProvider.saveItem('fuse', {
      title: 'SAMPLE',
      group: true,
      weight: 1
    });

    msNavigationServiceProvider.saveItem('fuse.booking', {
      title: 'Booking',
      icon: 'icon-tile-four',
      state: 'app.booking',
      /*stateParams: {
       'param1': 'page'
       },*/
      translate: 'SAMPLE.SAMPLE_NAV',
      weight: 1
    });

    pickADateProvider.setOptions({
      // Strings and translations
      monthsFull: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
      monthsShort: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
      weekdaysFull: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
      weekdaysShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],

      // Buttons
      today: 'Hôm nay',
      clear: '',
      close: 'Đóng',

      // Formats
      format: 'dddd, ngày dd-mm-yyyy',
      formatSubmit: 'dd/mm/yyyy',
      hiddenSuffix: '_submit',

      // First day of the week
      firstDay: 1
    });
  }
})();
