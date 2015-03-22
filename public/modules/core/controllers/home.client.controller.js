'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        $scope.alerts = [
            {
                icon:'glyphicon-user',
                color:'btn-success',
                total:'20,408',
                description:'Total Customers'
            },
            {
                icon:'glyphicon-calendar',
                color:'btn-primary',
                total:'8283',
                description:' UP Comming Events'
            },
            {
                icon:'glyphicon-edit',
                color:'btn-success',
                total:'852',
                description:' New Customres in 24HR'
            },
            {
                icon:'glyphicon-record',
                color:'btn-info',
                total:'87000',
                description:'Email Post'
            },
            {
                icon:'glyphicon-eye-open',
                color:'btn-warning',
                total:'268',
                description:' Followups required'
            },
            {
                icon:'glyphicon-flag',
                color:'btn-danger',
                total:'348',
                description:'Refferrals to moderate'
            }
        ];
	}
]);