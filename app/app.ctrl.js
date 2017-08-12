(function () {
    'use strict';

    angular
        .module('ngDashboard')      
        .controller('MainController', MainController);

    MainController.$inject = ['$http', '$timeout', '$mdDialog', 'DataService'];

    function MainController($http, $timeout, $mdDialog, DataService) {
        var vm = this;

        //gridster option
        vm.gridsterOptions = {
            columns: 4,
            isMobile: false, // stacks the grid items if true
            mobileBreakPoint: 480, // if the screen is not wider that this, remove the grid layout and stack the items
            mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
            draggable: {
                enabled: true, // whether dragging items is supported
                handle: 'h3', // optional selector for drag handle
                start: function (event, $element, widget) {}, // optional callback fired when drag is started,
                drag: function (event, $element, widget) {}, // optional callback fired when item is moved,
                stop: function (event, $element, widget) {} // optional callback fired when item is finished dragging
            },
            resizable: {
                enabled: true,
                handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],

                // optional callback fired when resize is started
                start: function (event, $element, widget) {},

                // optional callback fired when item is resized,
                resize: function (event, $element, widget) {
                    // if (widget.chart.api) widget.chart.api.update();
                    widget.chart.options.width = $element.width();
                    widget.chart.options.height = $element.height() - 50;
                },

                // optional callback fired when item is finished resizing 
                stop: function (event, $element, widget) {

                    //widget.chart.type = widget.chart.type;
                    console.log($element, widget);
                    //      googleService.getReadyPromise()
                    // .then(draw);               
                    $timeout(function () {
                        widget.chart.options.width = $element.width();
                        widget.chart.options.height = $element.height() - 50;
                    }, 700);
                }
            },
        };
        vm.dashboardItems = [];

        activate();

        ////////////////

        function activate() {
            DataService.getFakeData('data').then(function (data) {
                var item = {
                    sizeX: 1,
                    sizeY: 1,
                    row: 0,
                    col: 0,
                    chart: angular.copy(data.data)
                };
                vm.dashboardItems.push(item); 

                 var item = {
                    sizeX: 1,
                    sizeY: 1,
                    row: 0,
                    col: 1,
                    chart: angular.copy(data.data)
                };
                item.chart.type = 'PieChart';
                vm.dashboardItems.push(item);

                var item = {
                    sizeX: 1,
                    sizeY: 1,
                    row: 0,
                    col: 2,
                    chart: angular.copy(data.data)
                };
                item.chart.type = 'LineChart';
                vm.dashboardItems.push(item);

            });

            
             DataService.getFakeData('data1').then(function (data) {
                var item = {
                    sizeX: 1,
                    sizeY: 1,
                    row: 0,
                    col: 3,
                    chart: data.data
                };
                vm.dashboardItems.push(item); 
            });
        }
    }
})();