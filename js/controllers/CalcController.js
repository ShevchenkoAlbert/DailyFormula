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

        $scope.onClickCalculate = function() {
            
            // console.log('click');
            if ($scope.sex == "male") {
                $scope.result = (((9.99 * $scope.weight) + (6.25 * $scope.growth) - (4.92 * $scope.age) + 5) * $scope.activity);            
            }
            else {
                $scope.result = (((9.99 * $scope.weight) + (6.25 * $scope.growth) - (4.92 * $scope.age) - 161) * $scope.activity);
            }


            $scope.result = Math.round($scope.result + ($scope.result * $scope.target));
            $scope.goShow = 'true';
            console.log($scope.goShow)
        };

        $scope.onClickNew = function() {
        // начальные значения
            $scope.sex = ''; // пол
            $scope.target = ''; //цель
            $scope.age; //возраст
            $scope.weight; // вес
            $scope.growth; // рост
            $scope.activity = 0; // активность
    
            $scope.result = 0;
            $scope.goShow = 'false';
        }
 }