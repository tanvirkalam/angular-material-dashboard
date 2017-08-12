(function () {
    'use strict';

    angular
        .module('ngDashboard')
        .controller('MainController', mainController)
        .controller("SampleCtrl", function ($scope, $http) {

            $scope.init = function () {
                $http.get('data.json').success(function (data) {
                    $scope.chart = data;
                });
                $http.get('data1.json').success(function (data) {
                    $scope.chart1 = data;
                });
            };

            $scope.init();
            $scope.selected = function (selectedItem) {
                alert("You selected " + $scope.chart.data.cols[selectedItem.column].label + " in " +
                    $scope.chart.data.rows[selectedItem.row].c[0].v);
            };


            $scope.selected1 = function (selectedItem) {
                alert("You selected " + $scope.chart1.data.cols[selectedItem.column].label + " in " +
                    $scope.chart1.data.rows[selectedItem.row].c[0].v);
            };

            $scope.chartReady = function () {};


        });;

    mainController.$inject = ['$rootScope', '$scope'];

    function mainController($rootScope, $scope) {
        var vm = this;
        vm.gridsterOptions = {
            margins: [20, 20],
            columns: 4,
            mobileModeEnabled: false,
            draggable: {
                handle: 'h3'
            },
            resizable: {
                enabled: true,
                handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],

                // optional callback fired when resize is started
                start: function (event, $element, widget) {},

                // optional callback fired when item is resized,
                resize: function (event, $element, widget) {
                    if (widget.chart.api) widget.chart.api.update();
                },

                // optional callback fired when item is finished resizing 
                stop: function (event, $element, widget) {
                    $timeout(function () {
                        if (widget.chart.api) widget.chart.api.update();
                    }, 400)
                }
            },
        };
        vm.title = "Generic Dashboard";
        var chart1 = {};
        chart1.type = "ColumnChart";
        // chart1.cssStyle = "height:200px; width:300px;";
        chart1.data = {
            "cols": [{
                    id: "month",
                    label: "Month",
                    type: "string"
                },
                {
                    id: "laptop-id",
                    label: "Laptop",
                    type: "number"
                },
                {
                    id: "desktop-id",
                    label: "Desktop",
                    type: "number"
                },
                {
                    id: "server-id",
                    label: "Server",
                    type: "number"
                },
                {
                    id: "cost-id",
                    label: "Shipping",
                    type: "number"
                }
            ],
            "rows": [{
                    c: [{
                            v: "January"
                        },
                        {
                            v: 19,
                            f: "42 items"
                        },
                        {
                            v: 12,
                            f: "Ony 12 items"
                        },
                        {
                            v: 7,
                            f: "7 servers"
                        },
                        {
                            v: 4
                        }
                    ]
                },
                {
                    c: [{
                            v: "February"
                        },
                        {
                            v: 13
                        },
                        {
                            v: 1,
                            f: "1 unit (Out of stock this month)"
                        },
                        {
                            v: 12
                        },
                        {
                            v: 2
                        }
                    ]
                },
                {
                    c: [{
                            v: "March"
                        },
                        {
                            v: 24
                        },
                        {
                            v: 0
                        },
                        {
                            v: 11
                        },
                        {
                            v: 6
                        }

                    ]
                }
            ]
        };
        $rootScope.$on('gridster-resized', function (sizes, gridster) {
            console.log(sizes, gridster);
            // sizes[0] = width
            // sizes[1] = height
            // gridster.
        });
        $rootScope.$on('gridster-item-initialized', function (item) {
            console.log(item);
            // item.$element
            // item.gridster
            // item.row
            // item.col
            // item.sizeX
            // item.sizeY
            // item.minSizeX
            // item.minSizeY
            // item.maxSizeX
            // item.maxSizeY
        });

        $rootScope.$on('gridster-item-resized', function (item) {
            console.log(item);
            // item.$element
            // item.gridster
            // item.row
            // item.col
            // item.sizeX
            // item.sizeY
            // item.minSizeX
            // item.minSizeY
            // item.maxSizeX
            // item.maxSizeY
        });
        $rootScope.$on('gridster-item-transition-end', function (item) {
            console.log(item);
            // item.$element
            // item.gridster
            // item.row
            // item.col
            // item.sizeX
            // item.sizeY
            // item.minSizeX
            // item.minSizeY
            // item.maxSizeX
            // item.maxSizeY
        });

        $scope.$watch(function () {
            return vm.standardItems;
        }, function (items) {
            // one of the items changed
            console.log(items);
        }, true);

        chart1.options = {
            "title": "Sales per month",
            "isStacked": "true",
            "fill": 20,
            "displayExactValues": true,
            "vAxis": {
                "title": "Sales unit",
                "gridlines": {
                    "count": 6
                }
            },
            "hAxis": {
                "title": "Date"
            }
        };

        chart1.formatters = {};

        vm.chart = chart1;

        vm.standardItems = [{
                sizeX: 4,
                sizeY: 2,
                row: 0,
                col: 0
            },
            {
                sizeX: 2,
                sizeY: 2,
                row: 0,
                col: 2
            },
            {
                sizeX: 1,
                sizeY: 1,
                row: 0,
                col: 4
            }
        ];
        activate();

        ////////////////

        function activate() {}
    }
})();