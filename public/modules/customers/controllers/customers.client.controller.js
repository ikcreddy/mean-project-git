'use strict';

// Customers controller

var customerApp = angular.module('customers');

customerApp.controller('CustomersController', ['$scope', '$stateParams', 'Authentication', 'Customers','$modal','$log',
	function($scope, $stateParams, Authentication, Customers,$modal,$log) {

        this.authentication = Authentication;
        // Find a list of Customers
        this.customers = Customers.query();

        this.modalCreate = function(size){
            var modalInstance = $modal.open({
                templateUrl : 'modules/customers/views/create-customer.client.view.html',
                controller:function($scope,$modalInstance){

                    $scope.ok = function(){
                        $modalInstance.close( $scope.customer);
                    };
                    $scope.cancel = function(){
                        $modalInstance.dismiss('cancel');
                    };
                },
                size:size

            });
            modalInstance.result.then(function(selectedItem){
            });
        };



        this.modalUpdate = function(size,selectedCustomer){
            var modalInstance = $modal.open({
                templateUrl : 'modules/customers/views/edit-customer.client.view.html',
                controller:function($scope,$modalInstance,customer){
                    $scope.customer = customer;
                    $scope.ok = function(){
                      $modalInstance.close( $scope.customer);
                    }
                    $scope.cancel = function(){
                        $modalInstance.dismiss('cancel');
                    }
                },
                size:size,
                resolve:{
                    customer:function(){
                        return selectedCustomer;

                    }
                }
            })
            modalInstance.result.then(function(selectedItem){
                $scope.selected = selectedItem;

            })
        };

// Remove existing Customer
        this.remove = function(customer) {
            alert("hiiii")
            if ( customer ) {
                customer.$remove();

                for (var i in this.customers) {
                    if (this.customers [i] === customer) {
                        this.customers.splice(i, 1);
                    }
                }
            } else {
                this.customer.$remove(function() {

                });
            }
        };


    }
]);


customerApp.controller('CustomersCreateController', ['$scope','Customers',
    function($scope, Customers) {

        // Create new Customer
        this.create = function() {
            // Create new Customer object
            var customer = new Customers ({
                firstName: this.firstName,
                surName: this.surName,
                suburb: this.suburb,
                country: this.country,
                industry: this.industry,
                email: this.email,
                phone: this.phone,
                refered: this.refered,
                channel: this.channel
            });

            // Redirect after save
            customer.$save(function(response) {
                // Clear form fields
                $scope.firstName = '';
                $scope.surName = '';
                $scope.suburb = '';
                $scope.country = '';
                $scope.industry = '';
                $scope.email = '';
                $scope.phone = '';
                $scope.refered = '';
                $scope.channel = '';

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);



customerApp.controller('CustomersUpdateController', ['$scope','Customers',
    function($scope, Customers) {

        // Update existing Customer
        this.update = function(updatedCustomer) {
            var customer = updatedCustomer;
            customer.$update(function() {
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);



/*

		// Create new Customer
		$scope.create = function() {
			// Create new Customer object
			var customer = new Customers ({
				firstName: this.firstName,
                surName: this.surName,
                suburb: this.suburb,
                country: this.country,
                industry: this.industry,
                email: this.email,
                phone: this.phone,
                refered: this.refered,
                channel: this.channel
           	});

			// Redirect after save
			customer.$save(function(response) {
				$location.path('customers/' + response._id);

				// Clear form fields
				$scope.firstName = '';
                $scope.surName = '';
                $scope.suburb = '';
                $scope.country = '';
                $scope.industry = '';
                $scope.email = '';
                $scope.phone = '';
                $scope.refered = '';
                $scope.channel = '';

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Customer
		$scope.remove = function(customer) {
			if ( customer ) {
				customer.$remove();

				for (var i in $scope.customers) {
					if ($scope.customers [i] === customer) {
						$scope.customers.splice(i, 1);
					}
				}
			} else {
				$scope.customer.$remove(function() {
					$location.path('customers');
				});
			}
		};

		// Update existing Customer
		$scope.update = function() {
			var customer = $scope.customer;

			customer.$update(function() {
				$location.path('customers/' + customer._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		// Find existing Customer
		$scope.findOne = function() {
			$scope.customer = Customers.get({
				customerId: $stateParams.customerId
			});
		};
*/
