angular.module('myApp')
    .controller('HomeController', ['$scope', function($scope){
        var homeVm = this;
        homeVm.total = 5000;

        $scope.events = [
        ];
        $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic"
        };
        $scope.eventSources = [];

        var fb = new Firebase("https://thehomeapp.firebaseio.com/");

        fb.child("events").once("value", function (snapshot) {
            var object = snapshot.val();
            for(key in object){
                var event = object[key];
                event.start = new Date(event.start);
                $scope.events.push(event);
            }

            homeVm.currentBalance = homeVm.calculateBalance();
            $scope.$apply();
        });

        homeVm.eventSources= [$scope.events, $scope.eventSource];
        homeVm.saveEvent = function(){
            var newEvent = {
              title: homeVm.title + ' ' + homeVm.price,
              price: homeVm.price,
              start: homeVm.date == null ? new Date().toString() : homeVm.date.toString()
            };
            $scope.events.push(newEvent);
            homeVm.currentBalance = homeVm.calculateBalance();
            fb.child("events").push(newEvent);
            homeVm.title = '';
            homeVm.price = null;
            homeVm.date = null;
            homeVm.repeatFor = null;
            homeVm.repeatTimes = null;
        };

        homeVm.calculateBalance = function(){

            var getAllPrices = R.map(function(event){
                return parseInt(event.price);
            });

            var total = R.pipe(getAllPrices, R.sum);

            var balance = homeVm.total - total($scope.events);

            return balance;

        };






    }]);
