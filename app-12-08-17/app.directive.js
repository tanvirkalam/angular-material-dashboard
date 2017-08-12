(function() {
    'use strict';

    angular
        .module('ngDashboard')
        .directive('ngChart', Directive);

    Directive.$inject = ['dependency1'];
    function Directive(dependency1) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: ControllerController,
            controllerAs: 'vm',
            link: link,
            restrict: 'A',
            scope: {
            }
        };
        return directive;
        
        function link(scope, element, attrs) {
        }
    }
    /* @ngInject */
    function ControllerController () {
        
    }
})();