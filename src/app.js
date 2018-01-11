import angular from 'angular'
import ngRoute from 'angular-route'
import Menu from 'components/Menu'
import HeaderController from 'components/HeaderController'
import FooterController from 'components/FooterController'
import MainController from 'components/MainController'
import CalcController from 'components/CalcController'
import Blog from 'components/Blog'

import routerSettings from 'app.router.config'
import { MenuApi } from 'api'
// import 'angular-aria'
// import 'angular-animate'
// import 'angular-material'
import 'style/main.scss'

let menuList = [];
// setTimeout(() => console.log('hello'), 0)

setTimeout(() => {
  
  MenuApi.getMenu()
    .then(data => {
        data.feed.entry.forEach((x, i, arr) => {
            if (!((i+1)%11)) {
                let prod = {};
                prod['day7'] = arr[i]['gs$cell']['$t'];
                prod['day6'] = arr[i-1]['gs$cell']['$t'];
                prod['day5'] = arr[i-2]['gs$cell']['$t'];
                prod['day4'] = arr[i-3]['gs$cell']['$t'];
                prod['day3'] = arr[i-4]['gs$cell']['$t'];
                prod['day2'] = arr[i-5]['gs$cell']['$t'];
                prod['day1'] = arr[i-6]['gs$cell']['$t'];
                prod['price'] = arr[i-7]['gs$cell']['$t'];
                prod['img'] = arr[i-8]['gs$cell']['$t'];
                prod['description'] = arr[i-9]['gs$cell']['$t'];
                prod['name'] = arr[i-10]['gs$cell']['$t'];
                menuList.push(prod);
            }
        })
        menuList.splice(0,1)
        // console.log(menuList)
    })
    .catch(errors => { console.log(errors) })
}, 0)



angular.module('application', ['ngRoute'])
 .config(routerSettings)
 .factory('menuList', ['$http', () => menuList])
 .controller('Menu', ['$scope', '$timeout', 'menuList', '$route', '$rootScope', '$location', Menu])
 .controller('HeaderController', ['$scope', HeaderController])
 .controller('FooterController', ['$scope', FooterController])
 .controller('MainController', ['$timeout', MainController])
 .controller('CalcController', ['$scope', CalcController])
 .controller('Blog', ['scope', Blog])

 
