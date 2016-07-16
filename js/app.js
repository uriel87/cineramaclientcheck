/**
 * Created by user on 08/07/2016.
 */



var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider)  {

    $urlRouterProvider.otherwise('/main');

    $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: '../views/main.html',
            controller: 'moviesCtl'
        })
        .state('order', {
            url: '/order/',
            templateUrl: '../views/order.html',
            params: {
                movie_name: null
            },
            controller: 'orderCtl'
        })
        .state('loading', {
            url: '/loading',
            templateUrl: '../views/loading.html',
            controller: ''
        })
        .state('enjoy', {
            url: '/enjoy',
            templateUrl: '../views/enjoy.html',
            controller: ''
        })
        .state('payment', {
            url: '/payment',
            templateUrl: '../views/payment.html',
            params: {
                movieDetails: null,
                seats: null
            },
            controller: 'paymentCtl'
        })
        .state('movieTicket', {
            url: '/movieTicket',
            templateUrl: '../views/movieTicket.html',
            params: {
                movieDetails: null,
                seats: null,
                cart: null
            },
            controller: 'movieTicketCtl'
        })
        .state('myOrders', {
            url: '/myOrders',
            templateUrl: '../views/myOrders.html',
            controller: 'movieUserCtl'
        })
        .state('review', {
            url: '/review',
            templateUrl: '../views/review.html',
            params: {
                movieName: null,
                user: null
            },
            controller: 'reviewCtl'
        });

});
