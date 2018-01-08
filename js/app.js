import angular from 'angular';
import ngRoute from 'angular-route';

import HeaderController from 'HeaderController';
import FooterController from 'FooterController';
import MainController from 'MainController';
import CalcController from 'CalcController';

import routerSettings from 'app.router.config';

// var angular = require('angular');
// var ngRoute = require('angular-route');

const app = angular.module('application', [
	'ngRoute'
 ]);
app.config(routerSettings);
app.controller('HeaderController', ['$scope', HeaderController]);
app.controller('FooterController', ['$scope', FooterController]);
app.controller('MainController', ['$timeout', MainController]);
app.controller('CalcController', ['$scope', CalcController])




// angular.element(function() {
// 	angular.bootstrap(document, ['application']);
// });
// angular.element(document).ready(() => {
// angular.bootstrap(document, ['application'])
// })