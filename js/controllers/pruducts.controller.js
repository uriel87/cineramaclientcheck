

app.controller('paymentCtl', ['$scope', '$http','$stateParams', '$state',function($scope, $http, $stateParams, $state) {

	$scope.cart = [];
	$scope.movieDetails = $state.params.movieDetails;
	$scope.Userseats = $state.params.seats;

	$http.post("https://cineramaserver.herokuapp.com/getAllProduct/").success(function (data) {
		$scope.products = data;
		console.log(data);
	}).error(function () {
		return "error was happened or the result is empty";
	});


	$scope.addToCart = function (product) {
		var found = false;
		$scope.cart.forEach(function (item) {
			if (item._id == product._id) {
				item.quantity++;
				found = true;
			}
		});
		if (!found) {
			$scope.cart.push(angular.extend(product, {quantity: 1}, product));
		}
	};

	$scope.getCartPrice = function () {
		//console.log($scope.cart);
		var total = 0;
		var ticktPrice = 0
		if ($scope.Userseats.length) {
			ticktPrice = $scope.Userseats.length * 40;
		}
		$scope.cart.forEach(function (product) {
			total += product.price * product.quantity;
		});
		return total + ticktPrice;
	};


	$scope.sendOrderRequest = function() {
	    for (var i = 0; i < $scope.Userseats.length; i++) {

	        var orderUser = {
	            name: $scope.movieDetails._id.name,
	            date: $scope.movieDetails._id.time,
	            auditorium: $scope.movieDetails._id.auditorium,
	            cinema: $scope.movieDetails._id.cinema,
	            branch: $scope.movieDetails._id.branch,
	            row: $scope.Userseats[i].row,
	            number: $scope.Userseats[i].number,
	            email: 'Yossi.Levy@gmail.com'
	        }

			var dataOrder = {
				movieDetails: $scope.movieDetails,
				seats: $scope.Userseats,
				cart: $scope.cart
			}

			//$state.go('movieTicket' , dataOrder);

            $http.post("https://cineramaserver.herokuapp.com/setOrderMovie/", orderUser).success(function(res, status) {
	            console.log(res);
				$state.go('movieTicket' , dataOrder);
            });
			$state.go('loading');

	    }
	};



	$scope.returnToOrder = function () {
		$state.go('order' , {movie_name: $scope.movieDetails._id.name});
	};




}]);






