import './style.scss'
import translit from 'translitit-cyrillic-russian-to-latin'
import { MenuApi } from 'api'

export default function Menu($scope, $timeout, menu, $route, $rootScope, $location) {
    $scope.menuList = menu;
    $scope.modalStatus = false;
    $scope.commentsStatus = false;
    $scope.basketMessageStatus = false;
    $scope.currentDay = 1;
    $scope.comments = [];
    $scope['calc_price'] = null;
    $scope['basket_result'] = null;
    $scope.basketConfirm = false;
    $scope.factor = null;
    $scope.counter = 1;
    $scope.basket = [];
    $scope.basketSpread = false;
    $scope.count = 1;
    $scope.newPost = false;
    $scope.stars = [false, false, false, false, false];
    $scope.userRating = 3;

    const original = $location.path;
    $location.path = (path, reload) => {
        if (reload === false) {
            let lastRoute = $route.current;
            let un = $rootScope.$on('$locationChangeSuccess', () => {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };
    
    $scope.get = (() => { 
        if ($scope.menuList == false) {
            $scope.menuList = [];
            MenuApi.getMenu()
                .then(data => {
                    data.feed.entry.forEach(function(x, i, arr) {
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
                            $scope.menuList.push(prod);
                        }
                    })
                    $scope.menuList.splice(0,1)
                    $scope.$apply();
                })
                .catch(errors => { console.log(errors) })
        }   
    })()
    $scope.basketItemsOnload = (() => {
        $scope.basket = JSON.parse(localStorage.getItem('basket-data'));
        $scope.basket ? null : $scope.basket = [];
    })()
    $scope.show = (index) => {
        let title = $scope.menuList[index].name,
            routeTitle = title.toLowerCase().replace(/\s/ig, '_');
        $location.path(`/menu/${ translit(routeTitle) }`, false);
        $scope['current_name_src'] = title;
        $scope['current_index'] = index;
        $scope.title = title;
        $scope.des = $scope.menuList[index].description;
        $scope.counter = 1;
        $scope['img_src'] = $scope.menuList[index].img;
        $scope['default_price'] = $scope.menuList[index].price;
        $scope['share14_price'] = Math.floor($scope.menuList[index].price * 0.95);
        $scope['share30_price'] = Math.floor($scope.menuList[index].price * 0.90);
        $scope['calc_price'] = $scope.menuList[index].price;
        $scope.factor = $scope.menuList[index].price;
        for (let i = 1; i < 8; i++) {
            $scope[`day${i}`] = $scope.menuList[index][`day${i}`];
        }
        $scope.modalStatus = true;
        MenuApi.getPosts({ title })
        .then((data) => $scope.comments = [...data] )
    }
    $scope.closeModal = () => {
        $location.path(`/menu`, false);
        $scope.modalStatus = false;
        $scope.comments = [];  
    }
    $scope.calculatePrice = () => {
        let counter = $scope.counter;
        if (counter >= 14 && counter < 30) $scope.factor = +$scope['share14_price'];
        if (counter < 14) $scope.factor = +$scope['default_price'];
        if (counter >= 30) $scope.factor = +$scope['share30_price'];
        $scope['calc_price'] = $scope.factor * $scope.counter;
    }
    $scope.addToBasket = () => {
        $location.path(`/menu`, false);
        let item = {
            img: `/${$scope['img_src']}`,
            name: $scope.title,
            des: $scope.des,
            days: $scope.counter,
            counter: 1,
            price: $scope.factor,
            result: $scope['calc_price']
        }
        $scope.basket.push(item)
        localStorage.setItem('basket-data', JSON.stringify($scope.basket));
        $scope.modalStatus = false;
        $scope.basketMessageStatus = true;
        
    }
    $scope.openBasket = () => {
        $location.path(`/menu/cart`, false);
        $scope.modalStatus = false;
        $scope.showBasketBtn = false;
        $scope.basketSpread = true;
        $scope['basket_result'] = 0;
        $scope.basket.forEach((x, i, arr) => {
            $scope['basket_result'] += +x.result * x.counter;
        })
    }
    $scope.updateBasketItem = (item, index, count) => {
        let upd = { ...$scope.basket[index] };
        upd.counter = count;
        $scope.basket[index] = upd;
        $scope['basket_result'] = 0;
        $scope.basket.forEach((x, i, arr) => {
            $scope['basket_result'] += +x.result * x.counter;
        })
        localStorage.setItem('basket-data', JSON.stringify($scope.basket));
    }
    $scope.closeBasket = () => {
        $location.path(`/menu`, false);
        $scope.basketSpread = false;
        if ($scope.basket.length > 0) {
            $scope.showBasketBtn = true;
            $scope['basket_counter'] = $scope.basket.length; 
        }  
    }
    $scope.removeBasketItem = (index) => {
        $scope.basket.splice(index, 1);
        localStorage.setItem('basket-data', JSON.stringify($scope.basket));
        $scope.basket.length == 0 && $scope.closeBasket();
        $scope['basket_result'] = 0;
        $scope.basket.forEach((x, i, arr) => {
            $scope['basket_result'] += +x.result * x.counter;
        })
    }
    $scope.showComments = () => {
        $location.path(`${window.location.pathname}/comments`, false);
        $scope.commentsStatus=true;
    }
    $scope.closeComments = () => {
        let prevLocation = window.location.pathname.replace('/comments', '');
        $location.path(prevLocation, false);
        $scope.commentsStatus=false;
    }
    $scope.userAddPost = (e) => {
        let time = new Date();
        let dd = time.getDate();
        let mm = time.getMonth()+1; //January is 0!
        let yyyy = time.getFullYear();
        if (dd<10) dd = '0' + dd
        if (mm<10) mm = '0' + mm
        time = `${dd}.${mm}.${yyyy}`;
        let rating = '';
        for (let i=0; i < $scope.userRating; i++) {
            rating += ' ★';
        }
        let data = {
            user: $scope['post_user_name'],
            email: $scope['post_user_email'],
            comment: $scope['post_user_text'],
            rating: rating,
            programm: $scope['current_name_src'],
            time
        }
        let request = {...data};
        $scope['post_user_name'] = '';
        $scope['post_user_email'] = '';
        $scope['post_user_text'] = '';
        $scope.stars.forEach((x,i,arr) => arr[i] = false);
        $scope.comments.push(request);
        $scope.comments = [...$scope.comments];
        MenuApi.addPost(request)
    }
    $scope.setRating = (rating) => {
        $scope.userRating = rating;
        $scope.stars.forEach((item, i, arr) => {
            if (i+1 <= rating) {
                arr[i] = true
            } else arr[i] = false;
        })
    }
    $scope.confirm = false;
    $scope.confirmRequest = () => {
        
        $scope.basketConfirm = !$scope.basketConfirm;
        if (!$scope.baksketConfirm && $scope['phone_user']) {
            $scope.confirm = true;
            $scope.basketSpread = false;
            $timeout(() => {
                $scope.confirm = false;
                $scope['phone_user'] = '';
            }, 2000)
        } else {
            $scope.confirm = false;
        }
    }
}