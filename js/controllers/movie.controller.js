




app.controller('moviesCtl', ['$scope', '$http','$stateParams', '$state',function($scope, $http, $stateParams, $state) {

    $scope.movies = [];
    $scope.poster = [];
    $scope.currentTab = true;

    $http.post("http://cineramaserver.herokuapp.com/getAllMovies/").success(function (data) {

        for(var i = 0; i < data.length; i++) {
            addDetailsMovie(data, i);
        }

        console.log(data);

    }).error(function () {
        return "error was happened or the result is empty";
    });


    function addDetailsMovie (data, i) {
        $http.post("http://cineramaserver.herokuapp.com/getMovie/", {name: data[i]._id.name}).success(function (MovieDetails) {
            $scope.movies.push(angular.extend({},MovieDetails, data[i]));
            //MovieDetails.Poster = "https://" + MovieDetails.Poster.substr(6);
            var temp = {
                "background-image" : "url("+ MovieDetails.Poster +")",
                "background-repeat": "no-repeat",
                "background-size": "100% 450px",
                "background-position" : "0px 50px"
            }
            $scope.poster[i] = temp;
            console.log($scope.poster[i]);
            //console.log($scope.movies);
        })
    }

    $scope.goToOrderPage = function (movieName) {
        $state.go('order' , {movie_name: movieName});
    }

    $scope.tabActive = function () {
        return !$scope.currentTab;
    }


}]);











// app.controller('moviesCtl', ['$scope', '$http',function($scope, $http) {
//
//     $scope.movies = [];
//     var i = 0;
// 	$http.post("https://cinerama.herokuapp.com/getAllMovies/").success(function (data) {
// 		//$scope.movies = data;
//         var movieName;
//         angular.forEach(data, function () {
//             movieName = data[i]._id.name;
//             console.log("movieName i: " + i + ": "  + movieName);
//             $http.post("https://cinerama.herokuapp.com/getMovie/", {name: movieName}).success(function (MovieDetails) {
//                 console.log("movieName in http i: " + i + ": "  + movieName);
//                 //angular.extend(data[i], MovieDetails);
//                 //console.log(data[i]);
//                 // posters.push(MovieDetails);
//                 //console.log("movie in i: " + data[i]._id.name);
//                 //$scope.movies.push(angular.extend(MovieDetails, data[i]));
//                 //$scope.movies.push(data[i]);
//                 $scope.movies.push(angular.merge(MovieDetails, data[i+1]));
//                 //console.log("$scope.movies i " + i + ": " + $scope.movies[i]);
//             })
//             i++;
//         })
//         //$scope.movies = data
//         console.log($scope.movies);
// 	}).error(function () {
// 		return "error was happened or the result is empty";
// 	});
//
// }]);












