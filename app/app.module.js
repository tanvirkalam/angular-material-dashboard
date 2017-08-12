(function () {
    'use strict';

    angular
        .module('ngDashboard', ['gridster', 'ngMaterial', 'googlechart', 'ngMdIcons'])
        .value('googleChartApiConfig', {
            version: '1',
            optionalSettings: {
                packages: ['corechart']
            }
        });
})();