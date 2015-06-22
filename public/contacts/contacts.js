
angular.module('myApp.contacts', []).controller('ContactsController', function ($scope, Contact) {

    $scope.contact = {};
    var _contact = {};

    $scope.saveContact = function () {
        //console.log('id ' + $scope.contact._id);
        if ( $scope.contact._id === undefined || $scope.contact._id === null ) {
            if ( $scope.contact.name !== undefined && $scope.contact.email !== undefined &&
                $scope.contact.tel !== undefined ) {
                Contact.save($scope.contact).success(function(data) {
                    $scope.contacts[$scope.contacts.length] = data;
                    console.log($scope.contacts);
                }).error(function() { console.log('Error on save'); });
            }
        }

        else {
            $scope.updateContact($scope.contact);
        }

        $('#contactModal').modal('hide');
        $scope.contact = {};
    };

    $scope.printList = function () {
        Contact.getAll().success(function (data) {
            $scope.contacts = data;
        }).error(function() {
            console.log('Error on get all contacts');
        });
    };

    $scope.updateContact = function(contact) {
        Contact.update(contact).success(function (data) {
            //console.log(data);
        }).error(function() {

        });
    };

    $scope.removeContact = function(id) {
        Contact.remove(id).success(function(data) {
            //console.log( typeof id );
            $('.' + id).remove();
        }).error(function() {
            console.log('Error on delete contact');
        });
    };

    $scope.prepareUpdate = function(contact) {
        $scope.contact = contact;

        //_contact = contact;   // reference?
        //_contact = angular.copy(contact);
        angular.copy(contact, _contact);

        $('#contactModal').modal('show');
    };

    $scope.cancelContact = function() {
        // reset
        angular.copy(_contact, $scope.contact);
        //console.log($scope.contact);

        $('#contactModal').modal('hide');

        _contact = {};
        $scope.contact = {};
    }

}).factory('Contact', function ($http) {
    // This is a factory function that will return a service (singleton object)

    return  {
        save: function (contact) {
            return $http.post('/access/save', contact);
        },

        update: function(contact) {
            return $http.put('/access/update/' + contact._id, contact);
        },

        getAll: function () {
            return $http.get('/access');
        },


        get: function(id) {
            return contacts[id];
        },

        remove: function(id) {
            return $http.delete('/access/' + id);
        }
    }

});
