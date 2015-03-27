describe('Home Controller Tests', function () {
    var controllerConstructor;
    var scope;

    beforeEach(module('myApp'));

    beforeEach(inject(function($controller, $rootScope){
        controllerConstructor = $controller
        scope = $rootScope.$new();
    }));

    it('Home Controller scope should contain test', function(){
        var homeController = controllerConstructor('HomeController', {$scope: scope});
        expect(homeController.test).toBe('This is working');
    });

});
