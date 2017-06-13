app.controller('profileCrtl', function ($scope, $http, $timeout, $location, $rootScope, $route,Data) {
    $scope.isProfileEdit = false;
    $rootScope.$on("getProfileMethod", function(event, data){
           $scope.getProfile(data);
        });
    $scope.getProfile = function (profile) {
        Data.post('userProfile', {
            customer: profile
        }).then(function (results) {
            $rootScope.profile = results;
            $scope.currentProfile = $rootScope.profile.email;
            if (results.status == "success") {
                $location.path('userprofile');
            }
        });
    }

    $scope.deleteUser = function (id) {
        Data.post('deleteUser', {customer:id}).then(function (results) {
            Data.toast(results);
            if (results.status == "info") {
                $scope.logout();
            }
        });
    }
    
    $scope.editProfile = function (profile) {
        Data.post('updateProfile', {customer:profile}).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $scope.isProfileEdit = false;
                $route.reload();
            }
        });
    }
});