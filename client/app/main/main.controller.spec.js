'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('ouchiSensorApp'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/things/showSensor')
      .respond({'name':'sensor1-temp', 'value':27, 'date':'2014-12-13T14:31:13.175Z'});



    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a sensor to the scope', function () {
    $httpBackend.flush();
    expect(scope.sensor).not.toBeNull();
  });
});
