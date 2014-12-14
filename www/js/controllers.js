angular.module('ippy.controllers', [])

.controller('AppCtrl', function($scope, $ionicPopup, $http) {

    var checkPortEndpoint = 'https://ippy.herokuapp.com/port-check';
    var domainToIpEndpoint = 'https://ippy.herokuapp.com/domain-to-ip';

    $scope.checkPortModel = {
        ip: '',
        port: 80
    };
    $scope.domainToIpModel = {
        domain: ''
    };

    $scope.checkPort = function(){
        if(typeof $scope.checkPortModel.ip === "string" && typeof $scope.checkPortModel.port === "number"){
            $http.post(checkPortEndpoint, $scope.checkPortModel).
                success(function(data, status, headers, config) {
                    $scope.showAlert("Results", data.toString());
                }).
                error(function(data, status, headers, config) {
                    $scope.showAlert("Error", "Failed To Check Port.");
                });
        }else{
            $scope.showAlert("Error", "Invalid Input.");
        }
    };

    $scope.domainToIp = function(){
        if(typeof $scope.domainToIpModel.domain === "string"){
            $http.post(domainToIpEndpoint, $scope.domainToIpModel).
                success(function(data, status, headers, config) {
                    $scope.showAlert("Results", data.toString());
                }).
                error(function(data, status, headers, config) {
                    $scope.showAlert("Error", "Failed To Convert Domain To Ip.");
                });
        }else{
            $scope.showAlert("Error", "Invalid Input.");
        }
    };

    $scope.showAlert = function(title, templateText) {
        var alertPopup = $ionicPopup.alert({
            title: title,
            template: templateText
        });
        alertPopup.then(function(res) {});
    };

})