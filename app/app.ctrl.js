(function () {
    'use strict';

    angular
        .module('ngDashboard')
        .controller('MainController', MainController);

    MainController.$inject = ['$rootScope', '$timeout', '$mdDialog', 'DataService'];

    function MainController($rootScope, $timeout, $mdDialog, DataService) {
        var vm = this;
        var toolBarHeight = 50;
        //gridster option
        vm.gridsterOptions = {
            columns: 4,
            isMobile: false, // stacks the grid items if true
            mobileBreakPoint: 480, // if the screen is not wider that this, remove the grid layout and stack the items
            mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
            draggable: {
                enabled: true, // whether dragging items is supported
                handle: 'h3', // optional selector for drag handle
                start: function (event, element, widget) {}, // optional callback fired when drag is started,
                drag: function (event, element, widget) {}, // optional callback fired when item is moved,
                stop: function (event, element, widget) {} // optional callback fired when item is finished dragging
            },
            resizable: {
                enabled: true,
                handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],

                // optional callback fired when resize is started
                start: function (event, element, widget) {},

                // optional callback fired when item is resized,
                resize: function (event, element, widget) {
                    // if (widget.chart.api) widget.chart.api.update();
                    updateGridsterItem(element, widget);
                },

                // optional callback fired when item is finished resizing 
                stop: function (event, element, widget) {
                    $timeout(function () {
                        updateGridsterItem(element, widget);
                    }, 700);
                }
            },
        };
        vm.dashboardItems = [];
        var idCounter = 0;

        function updateGridsterItem(element, widget) {
            widget.chart.options.width = element.width();
            widget.chart.options.height = element.height() - toolBarHeight;
        }

        activate();

        ////////////////

        function activate() {
            DataService.getFakeData('data').then(function (data) {
                var item = {
                    id: ++idCounter,
                    name: 'Test One',
                    sizeX: 1,
                    sizeY: 1,
                    row: 0,
                    col: 0,
                    chartProvider: 'google',
                    chart: angular.copy(data.data)
                };
                vm.dashboardItems.push(item);

                var item = {
                    id: ++idCounter,
                    name: 'Test Two',
                    sizeX: 1,
                    sizeY: 1,
                    row: 0,
                    col: 1,
                    chartProvider: 'google',
                    chart: angular.copy(data.data)
                };
                item.chart.type = 'PieChart';
                vm.dashboardItems.push(item);

                var item = {
                    id: ++idCounter,
                    name: 'Test Three',
                    sizeX: 1,
                    sizeY: 1,
                    row: 0,
                    col: 2,
                    chartProvider: 'google',
                    chart: angular.copy(data.data)
                };
                item.chart.type = 'LineChart';
                vm.dashboardItems.push(item);

            });


            DataService.getFakeData('data1').then(function (data) {
                var item = {
                    id: ++idCounter,
                    name: 'Test Four',
                    sizeX: 1,
                    sizeY: 1,
                    row: 0,
                    col: 3,
                    chartProvider: 'google',
                    chart: data.data
                };
                vm.dashboardItems.push(item);
            });
        }

        vm.removeWidget = function (ev, widget) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Would you like to remove this widget?')
                // .textContent('All of the banks have agreed to forgive you your debts.')
                .ariaLabel('Remove widget')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('Sounds like a bad');

            $mdDialog.show(confirm).then(function () {
                vm.dashboardItems.splice(vm.dashboardItems.indexOf(widget), 1);
            }, function () {
                //any 
            });

        }

        vm.configureWidget = function configureWidget(ev, gridster, widget) {
            showWidgetDialog(ev, widget, function(){
                updateGridsterItem(gridster.gridsterItem.$element, widget);
            });
        }

        vm.AddWidget = function (ev) {
            var widget = {
                id: ++idCounter,
                name: 'Test Add',
                sizeX: 1,
                sizeY: 1,               
                chartProvider: 'google',
                chart: undefined
            };
             showWidgetDialog(ev, widget, function(){
               // updateGridsterItem(gridster.gridsterItem.$element, widget);
               vm.dashboardItems.push(widget);
            });
            
        }

        function showWidgetDialog(ev, widget, callback) {
            $mdDialog.show({
                    controller: DialogController,
                    resolve: {
                        widget: function () {
                            return widget;
                        }
                    },
                    templateUrl: '../widegt-configure-tml.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: false // Only for -xs, -sm breakpoints.
                })
                .then(function (item) {
                    if(typeof callback === 'function')
                        callback();                    
                }, function () {});
        }

        function DialogController($scope, $mdDialog, widget) {
            $scope.widget = widget;
            $scope.form = {
                name: widget.name,
                sizeX: widget.sizeX,
                sizeY: widget.sizeY,
                col: widget.col,
                row: widget.row,
                chartProvider: widget.chartProvider,
                chart: angular.copy(widget.chart)
            };

            $scope.chartProviders = ['google', 'chartjs', 'chartlist'];
            //get chart type by chart provider
            $scope.getChartType = function () {

                switch ($scope.widget.chartProvider) {
                    //google charts types array
                    case 'google':
                        return ['AnnotationChart', 'BarChart', 'ColumnChart', 'Gauge', 'AreaChart', 'PieChart'];
                }

            }
            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.submit = function (ev) {
                angular.extend(widget, $scope.form);
                $mdDialog.hide(widget);
            };
        };

    }
})();