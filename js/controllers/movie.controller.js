



app.controller('moviesCtl', ['$scope', '$http', '$sce','$stateParams', '$state',function($scope, $http, $sce, $stateParams, $state) {
    
    $scope.movies = [];
    $scope.poster = [];
    $scope.currentTab = true;

    $http.post("https://cineramaserver.herokuapp.com/getAllMovies/").success(function (data) {

        for(var i = 0; i < data.length; i++) {
            addDetailsMovie(data, i);
        }
        //console.log(data);
    }).error(function () {
        return "error was happened or the result is empty";
    });


    function addDetailsMovie (data, i) {
        $http.post("https://cineramaserver.herokuapp.com/getMovie/", {name: data[i]._id.name}).success(function (MovieDetails) {
            $scope.movies.push(angular.extend({},MovieDetails, data[i]));
            var temp = {
                "background-image" : "url("+ $sce.trustAsResourceUrl(MovieDetails.Poster) +")",
                "background-repeat": "no-repeat",
                "background-size": "100% 450px",
                "background-position" : "0px 50px"
            }
            $scope.poster[i] = temp;
        })
    }

    $scope.goToOrderPage = function (movieName) {
        $state.go('order' , {movie_name: movieName});
    }

    $scope.tabActive = function () {
        return !$scope.currentTab;
    }


}]);

















