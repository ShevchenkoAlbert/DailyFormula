export default function MainController  ($timeout) {
	var vm = this;
    vm.isReady = false;
    init();
    //////////////////////////
    function init() {
      $timeout(function() {
        vm.isReady = true;
      }, 2000);
  
 }
}

