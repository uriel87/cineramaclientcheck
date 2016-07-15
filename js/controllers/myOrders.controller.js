

app.controller('movieUserCtl', ['$scope', '$http','$stateParams', '$state',function($scope, $http, $stateParams, $state) {

    var data = {
        email: "Yossi.Levy@gmail.com"
    };

    // $http.post("https://cinerama.herokuapp.com/getMovieUser/", data).success(function(moviesUser, status) {
    //     $scope.moviesUser = moviesUser;
    //     console.log($scope.moviesUser);
    // })


    $http.post("https://cineramaserver.herokuapp.com/getMovieUser/", data).success(function(moviesUser, status) {
        $scope.moviesUser = moviesUser;
        console.log($scope.moviesUser);
    })


    $scope.goToPushReviewPage = function(movieName, user) {
        $state.go('review' , {movieName: movieName, user: user});
    };



}]);






