

app.controller('orderCtl', ['$scope', '$http', '$sce','$stateParams', '$state',function($scope, $http, $sce, $stateParams, $state) {

    $scope.CurrentBranch = [];
    $scope.movieChoose = null;
    $scope.Userseats = [];
    $scope.moviePage = $state.params.movie_name;


    var data = {
        name: $scope.moviePage
    };


    $http.post("https://cineramaserver.herokuapp.com/getMovieDetails/" , data).success(function(movie, status) {
        $scope.movies = movie;
        //console.log($scope.movies);
    });



    $http.post("https://cineramaserver.herokuapp.com/getMovie/", data).success(function(movieDetails, status) {
        $scope.movieDetails = movieDetails;
        $scope.imdbRating = $scope.movieDetails.imdbRating * 10;
        //console.log($scope.movieDetails);
    });


    $http.post("https://cineramaserver.herokuapp.com/getMovieTrailer/", data).success(function(movieTrailer, status) {

        // if(!movieTrailer) {
        //     return null;
        // }
        // var urltrailer = movieTrailer.replace("watch?v=", "v/");
        // $scope.movieTrailer = $sce.trustAsResourceUrl(urltrailer.toString());
        // //console.log("movie trailer " + $scope.movieTrailer);

        if(!movieTrailer) {
            return null;
        }
        var urltrailer = movieTrailer.replace("watch?v=", "v/");
        //$scope.movieTrailer = $sce.trustAsResourceUrl(movieTrailer);
        $scope.movieTrailer = $sce.trustAsResourceUrl(urltrailer);
        console.log("movie trailer " + $scope.movieTrailer);

    });


    $http.post("https://cineramaserver.herokuapp.com/getMovieReview/", data).success(function(review, status) {
        $scope.review = review;
        $scope.lastComment = review[0].reviews[review[0].reviews.length - 1];
        //console.log($scope.review);
    });


    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }


    $scope.changeCurrentMovie = function(currentBranch) {
        $scope.CurrentBranch = [];
        $scope.movieChoose = null;
        $scope.selectedIndex = -1;
        for (var i = 0; i < $scope.movies.length; i++) {
            if( ($scope.movies[i]._id.branch == currentBranch._id.branch) && ($scope.movies[i]._id.cinema == currentBranch._id.cinema) && ($scope.movies[i]._id.auditorium == currentBranch._id.auditorium)) {
                $scope.CurrentBranch.push(angular.extend({}, $scope.movies[i]));
            }
        }
        //console.log($scope.CurrentBranch);
    };


    $scope.movieChooseByTime = function(movieChoose) {
        $scope.movieChoose = movieChoose;
        //console.log($scope.movieChoose);
    };

    $scope.itemClicked = function ($index) {
        $scope.selectedIndex = $index;
    }

    $scope.setPercentageReview = function (reviewType) {
        var widthPrecetage;
        var styleHr;


        if(!$scope.review[0]) {
            return 0;
        }

        switch(reviewType) {
            case "lame":
                if(!$scope.review[0].lame) {
                    widthPrecetage = 0;
                    break;
                }
                widthPrecetage = ($scope.review[0].lame / $scope.review[0].reviews.length)  * 80
                styleHr = {
                    "width" : widthPrecetage + '%',
                    "background-color" : "#00b3fe"
                }
                break;
            case "wow":
                if(!$scope.review[0].wow) {
                    widthPrecetage = 0;
                    break;
                }
                widthPrecetage = ($scope.review[0].wow / $scope.review[0].reviews.length)  * 80
                styleHr = {
                    "width" : widthPrecetage + '%',
                    "background-color" : "#963cff"
                }
                break;
            case "wtf":
                if(!$scope.review[0].wtf) {
                    widthPrecetage = 0;
                    break;
                }
                widthPrecetage = ($scope.review[0].wtf / $scope.review[0].reviews.length)  * 80
                styleHr = {
                    "width" : widthPrecetage + '%',
                    "background-color" : "#32fd8f"
                }
                break;
            default:
                if(!$scope.review[0].nice) {
                    widthPrecetage = 0;
                    break;
                }
                widthPrecetage = ($scope.review[0].nice / $scope.review[0].reviews.length)  * 80
                styleHr = {
                    "width" : widthPrecetage + '%',
                    "background-color" : "#f56d5f"
                }
                break;
        }

        return styleHr;
    }


    $scope.setSeat = function(seats, isChecked) {
        if(isChecked) {
            $scope.Userseats.push(seats);
            //console.log($scope.Userseats);
        } else {
            var index = $scope.Userseats.indexOf(seats);
            $scope.Userseats.splice(index, 1);
            //console.log($scope.Userseats);
        }
    };



    $scope.goToPaymentPage = function() {

        var dataOrder = {
            movieDetails: $scope.movieChoose,
            seats: $scope.Userseats
        }

        $state.go('payment' , dataOrder);
    };


}]);
