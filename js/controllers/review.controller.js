

app.controller('reviewCtl', ['$scope', '$http', '$sce','$stateParams', '$state',function($scope, $http, $sce, $stateParams, $state) {
    
    $scope.movieName = $state.params.movieName;

    $scope.pushReview = function(review, comment) {

        var dataReview = {
            nameMovie: $state.params.movieName,
            userName: $state.params.user,
            comment: comment,
            review: review,
        }

        $http.post("https://cineramaserver.herokuapp.com/pushReview/", dataReview).success(function(res, status) {
            console.log(res);
            $state.go('main');
        });
        $state.go('loading');
    };




}]);
