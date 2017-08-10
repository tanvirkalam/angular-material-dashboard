(function () {
    'use strict';

    angular
        .module('ngDashboard')
        .controller('MainController', mainController);

    mainController.$inject = ['$rootScope', '$scope'];

    function mainController($rootScope, $scope) {
        var vm = this;
        vm.title = "Generic Dashboard";
        var chart1 = {};
        chart1.type = "ColumnChart";
        chart1.cssStyle = "height:200px; width:300px;";
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

        $scope.$watch(function(){return vm.standardItems;}, function (items) {
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
                sizeX: 2,
                sizeY: 1,
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
            },
            {
                sizeX: 1,
                sizeY: 1,
                row: 0,
                col: 5
            },
            {
                sizeX: 2,
                sizeY: 1,
                row: 1,
                col: 0
            },
            {
                sizeX: 1,
                sizeY: 1,
                row: 1,
                col: 4
            },
            {
                sizeX: 1,
                sizeY: 2,
                row: 1,
                col: 5
            },
            {
                sizeX: 1,
                sizeY: 1,
                row: 2,
                col: 0
            },
            {
                sizeX: 2,
                sizeY: 1,
                row: 2,
                col: 1
            },
            {
                sizeX: 1,
                sizeY: 1,
                row: 2,
                col: 3
            },
            {
                sizeX: 1,
                sizeY: 1,
                row: 2,
                col: 4
            }
        ];
        activate();

        ////////////////

        function activate() {}
    }
})();