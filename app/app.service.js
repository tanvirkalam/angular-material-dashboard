(function() {
    'use strict';

    angular
        .module('ngDashboard')
        .service('DataService', DataService);

    DataService.$inject = ['$http'];
    function DataService($http) {
        var service = this;

        service.getFakeData = getFakeData;
        
        

        ////////////////

        function getFakeData(datafor) {
            return $http.get('http://localhost:8088/'+ datafor + '.json');
         }
        }
})();