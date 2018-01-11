import './calc.scss'
export default function CalcController ($scope) {
	
// начальные значения
        $scope.sex = ''; // пол
        $scope.target = ''; //цель
        $scope.age; //возраст
        $scope.weight; // вес
        $scope.growth; // рост
        $scope.activity = 0; // активность

        $scope.result = 0;
        $scope.goShow = 'false';
        $scope.bju = [0, 0, 0];
        $scope.bjuCalc = [1, 1, 3];
        $scope.toGramm = [4, 9, 4];
        $scope.sex = 'male';
        $scope.target = '0';
        $scope.activity = '1.375';
        $scope.age = 25;
        $scope.growth = 180;
        $scope.weight = 80;

        $scope.onClickCalculate = () => {
            if ($scope.sex == "male") {
                $scope.result = (((9.99 * $scope.weight) + (6.25 * $scope.growth) - (4.92 * $scope.age) + 5) * $scope.activity);            
            }
            else {
                $scope.result = (((9.99 * $scope.weight) + (6.25 * $scope.growth) - (4.92 * $scope.age) - 161) * $scope.activity);
            }

            $scope.result = Math.round($scope.result + ($scope.result * $scope.target));

            if ($scope.target == -0.2) {
                $scope.bjuCalc = [1, 0.8, 2.2];
                $scope.counter = $scope.result / 4;
                $scope.bjuCalc.forEach((x, i, arr) => {
                    $scope.bju[i] = (x * $scope.counter) / $scope.toGramm[i];
                })
                console.log('bju', $scope.bju)
                console.log('result', $scope.result)
            }
            if ($scope.target == 0.1) {
                $scope.bjuCalc = [1, 1, 4];
                $scope.counter = $scope.result / 6;
                $scope.bjuCalc.forEach((x, i, arr) => {
                    $scope.bju[i] = (x * $scope.counter) / $scope.toGramm[i];
                })
                console.log('bju', $scope.bju)
                console.log('result', $scope.result)
            }
            if ($scope.target == 0) {
                $scope.bjuCalc = [1, 1.1, 4];
                $scope.counter = $scope.result / 6.1;
                $scope.bjuCalc.forEach((x, i, arr) => {
                    $scope.bju[i] = (x * $scope.counter) / $scope.toGramm[i];
                })
                console.log('bju', $scope.bju)
                console.log('result', $scope.result)
            }       
                document.getElementById('proteins').setAttribute('style', `height: ${$scope.bju[0]*0.6}px;`);
                document.getElementById('fats').setAttribute('style', `height: ${$scope.bju[1]*0.6}px;`);
                document.getElementById('carbohydrates').setAttribute('style', `height: ${$scope.bju[2]*0.6}px;`);
                document.getElementById('cal').setAttribute('style', `height: ${$scope.result * 0.1}px;`)

                $scope['bgu_proteins'] = `${Math.round($scope.bju[0])} грамм`;
                $scope['bgu_fats'] = `${Math.round($scope.bju[1])} грамм`;
                $scope['bgu_carbohydrates'] = `${Math.round($scope.bju[2])} грамм`;
                $scope['bgu_cal'] = `${$scope.result} ккал`;
           
            $scope.goShow = 'true';
            console.log($scope.goShow)
        };

        $scope.onClickCalculate();
        // $scope.onClickNew = function() {
        // // начальные значения
        //     $scope.sex = ''; // пол
        //     $scope.target = ''; //цель
        //     $scope.age; //возраст
        //     $scope.weight; // вес
        //     $scope.growth; // рост
        //     $scope.activity = 0; // активность
    
        //     $scope.result = 0;
        //     $scope.goShow = 'false';
        // }
 }