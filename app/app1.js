'use strict';

var app = angular.module('google-chart-sample', ['gridster', 'ngMaterial', 'googlechart', 'ngMdIcons']).value('googleChartApiConfig', {
    version: '1',
    optionalSettings: {
        packages: ['corechart'],
        language: 'en'
    }
});

app.controller("SampleCtrl", function ($scope, $http, $timeout, $mdDialog) {
    $scope.gridsterOptions = {
        columns: 4,
        isMobile: false, // stacks the grid items if true
        mobileBreakPoint: 480, // if the screen is not wider that this, remove the grid layout and stack the items
        mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
        draggable: {
            enabled: true, // whether dragging items is supported
            // handle: '.my-class', // optional selector for drag handle
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
                widget.chart.options.height = $element.height() - 70;
            },

            // optional callback fired when item is finished resizing 
            stop: function (event, $element, widget) {

                //widget.chart.type = widget.chart.type;
                console.log($element, widget);
                //      googleService.getReadyPromise()
                // .then(draw);               
                $timeout(function () {
                    widget.chart.options.width = $element.width();
                    widget.chart.options.height = $element.height() - 70;
                }, 700);
            }
        },
    };


    $scope.standardItems = [];


    $scope.init = function () {
        $http.get('http://localhost:8088/data.json').then(function (data) {
            $scope.standardItems.push({
                sizeX: 2,
                sizeY: 1,
                row: 0,
                col: 0,
                chart: data.data
            });
            // $scope.standardItems.push({
            //     sizeX: 2,
            //     sizeY: 1,
            //     row: 3,
            //     col: 4,
            //     chart: data.data
            // });

        });
        $http.get('http://localhost:8088/data1.json').then(function (data) {
            $scope.standardItems.push({
                sizeX: 2,
                sizeY: 1,
                row: 0,
                col: 2,
                chart: data.data
            });
            // $scope.standardItems.push({
            //     sizeX: 2,
            //     sizeY: 1,
            //     row: 3,
            //     col: 0,
            //     chart: data.data
            // });
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

    // $scope.settingChart = function settingChart(ev, w) {

    //     //$scope.selectedwidget = w;
    //     $mdDialog.show({
    //             controller: DialogController,
    //             locals: {
    //                 widget: w
    //             },
    //             templateUrl: '../widegt-setting-tml.html',
    //             parent: angular.element(document.body),
    //             targetEvent: ev,
    //             clickOutsideToClose: true,
    //             fullscreen: false // Only for -xs, -sm breakpoints.
    //         })
    //         .then(function (item) {
    //             console.log(item);               
    //         }, function () {
    //             console.error('test');
    //             $scope.status = 'You cancelled the dialog.';
    //         });
    // }

    // function DialogController($scope, $mdDialog, widget) {
    //     $scope.widget= angular.copy(widget);        
    //     $scope.submit = function () {
    //         widget = $scope.widget;
    //         $mdDialog.hide(widget);
    //     };       
    // };

})