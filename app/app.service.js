(function () {
    'use strict';

    angular
        .module('ngDashboard')
        .service('DataService', DataService)
        .service('GoogleService', GoogleService);

    GoogleService.$inject = [];

    function GoogleService() {
        var service = this;
        service.getDefaultOptions = getDefaultOptions;

        function getDefaultOptions() {
            return {
                "title": "",
                "isStacked": "true",
                "fill": 20,
                "is3D": false,
                "colors": ["#28a6a8", "rgb(124, 124, 172)", "rgb(0, 227, 253)", "rgb(0, 206, 230)", "rgb(26, 110, 112)"],
                "animation": {
                    "startup": true,
                    "duration": 700,
                    "easing": "inAndOut"
                },
                "displayExactValues": false,                
                "legend": {
                    "position": "bottom"
                }            }
        }

    }
    DataService.$inject = ['$http'];

    function DataService($http) {
        var service = this;

        service.getFakeData = getFakeData;



        ////////////////

        function getFakeData(datafor) {
            return $http.get('http://localhost:8088/' + datafor + '.json');
        }
    }
})();