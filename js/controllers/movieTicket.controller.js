
app.controller('movieTicketCtl', ['$scope', '$http','$stateParams', '$state',function($scope, $http, $stateParams, $state) {

    $scope.cart = $state.params.cart;
    $scope.movieDetails = $state.params.movieDetails;
    $scope.Userseats = $state.params.seats;

}]);






