angular.module('myApp')
    .controller('HomeController', ['$scope', function($scope){
        var homeVm = this;

        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        homeVm.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic"
        };

        homeVm.events = [
        ];

        homeVm.saveEvent = function(){
            var newEvent = {
              title: homeVm.title + ' ' + homeVm.price,
              price: homeVm.price,
              start: homeVm.date == null ? new Date() : homeVm.date
            };

            homeVm.events.push(newEvent);
            homeVm.currentBalance = homeVm.calculateBalance();
        };

        homeVm.calculateBalance = function(){

            var getAllPrices = R.map(function(event){
                return event.price;
            });

            var total = R.pipe(getAllPrices, R.sum);

            var balance = homeVm.total - total(homeVm.events);

            return balance;

        };

        homeVm.total = 5000;
        homeVm.currentBalance = homeVm.calculateBalance();




        homeVm.eventSources= [homeVm.events, homeVm.eventSource];

    }]);
