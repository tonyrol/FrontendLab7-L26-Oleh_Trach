var routerApp = angular.module('routerApp', ['ui.router']);
routerApp.service('dataService', function () {
    var studentList = [
        {
            id: 1,
            name: 'Svitlana',
            surname: 'Trach',
            photoUrl: 'https://www.utdallas.edu/newstudents/img/alex-ewing.jpg',
            dateOfBirth: '13.12.1991',
            pNumber: '7738509596'
        }, {
            id: 2,
            name: 'Ivan',
            surname: 'Ivanov',
            photoUrl: 'https://i.pinimg.com/736x/4e/4f/15/4e4f156176c600dadf1dec7959a67247--eddie-cahill-beautiful-people.jpg',
            dateOfBirth: '13.10.1991',
            pNumber: '7732509596'
        }, {
            id: 3,
            name: 'Ivan',
            surname: 'Petrov',
            photoUrl: 'http://msass.case.edu/wp-content/uploads/2014/12/studentresource3-300x300.jpg',
            dateOfBirth: '13.12.1989',
            pNumber: '7738509196'
        }, {
            id: 4,
            name: 'Ivanka',
            surname: 'Koval',
            photoUrl: 'http://usenate.umn.edu/sites/g/files/pua3451/f/styles/panopoly_image_original/public/media/pai-shantal.png?itok=EkJ34XNx',
            dateOfBirth: '13.02.1991',
            pNumber: '7735509596'
        }, {
            id: 5,
            name: 'Olena',
            surname: 'Stepanova',
            photoUrl: 'http://www.mheducation.com/content/dam/mhe/highered/explore/student-ambassadors/ambassadors/kotryna-staputyte.jpg',
            dateOfBirth: '3.12.1991',
            pNumber: '7738589596'
        }, {
            id: 6,
            name: 'Oleg',
            surname: 'Smirnov',
            photoUrl: 'https://i.pinimg.com/736x/99/5e/c8/995ec8a7c8a4e16d61ec756f48442df3--cus-damato-students.jpg',
            dateOfBirth: '13.12.1990',
            pNumber: '7738509796'
        }, {
            id: 7,
            name: 'Peter',
            surname: 'Shevchuk',
            photoUrl: 'http://www.ssmrome.com/wp-content/uploads/2017/07/ssmrome_ruslan_kikosh-300x300.jpg',
            dateOfBirth: '13.05.1991',
            pNumber: '7738579596'
        }, {
            id: 8,
            name: 'Olga',
            surname: 'Ivanova',
            photoUrl: 'http://www.businessinnovationfactory.com/sites/default/files/styles/project_grid/public/project-image-square/bif_5149_0.jpg?itok=JVONc6zG',
            dateOfBirth: '13.12.1992',
            pNumber: '7737509596'
        }
    ];

    this.getAllStudents = function () {
        return studentList;
    };

    this.getStudentById = function (id) {
        return studentList.find(function (student) {
            return student.id === +id;
        })
    };
});

routerApp.directive('studentItem', ['dataService', function (dataService) {
    var directiveDefinitionObject = {
        priority: 0,
        template: '<div ui-sref="info({id:{{student.id}}})"><div><img ng-src="{{student.photoUrl}}"></div>' +
        '<div ng-show="!input">{{student.name}} {{student.surname}}</div>' +
        '<div ng-show="input">' +
        '<input type="text" ng-click="$event.stopPropagation()" ng-model="student.name">' +
        '<input type="text" ng-click="$event.stopPropagation()" ng-model="student.surname">' +
        '</div>' +
        '<button ng-click="toggle($event)">{{text}}</button>' +
        '</div>',
        // templateUrl: 'directive.html',
        transclude: false,
        restrict: 'E',// 'A', 'C', 'M'
        scope: {id: "="},
        controller: function ($scope) {
            $scope.student = dataService.getStudentById($scope.id);
            $scope.text = 'Edit';
            $scope.input = false;
            $scope.toggle = function ($event) {
                $event.stopPropagation();

                if ($scope.input) {
                    $scope.text = "Edit";
                } else {
                    $scope.text = "Save";
                }
                $scope.input = !$scope.input;
            };
        },
        controllerAs: 'stringIdentifier',
        bindToController: false
    };

    return directiveDefinitionObject;
}]);

routerApp.directive('studentInfo', ['dataService', function (dataService) {
    var directiveDefinitionObject = {
        priority: 0,
        template: '<div><div><img ng-src="{{student.photoUrl}}"></div>' +
        '<div class="name">{{student.name}} {{student.surname}}</div>' +
        '<div><ul>' +
        '<li><span>Date of birth: </span>{{student.dateOfBirth}}</li>' +
        '<li><span>Phone number: </span>{{student.pNumber}}</li>' +
        '</ul></div>' +
        '</div>',
        // templateUrl: 'directive.html',
        transclude: false,
        restrict: 'E',// 'A', 'C', 'M'
        scope: {id: "="},
        controller: function ($scope) {
            $scope.student = dataService.getStudentById($scope.id)
        },
        controllerAs: 'stringIdentifier',
        bindToController: false
    };
    return directiveDefinitionObject;
}]);


routerApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/main');
    $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: 'main.html',
            controller: ['$scope', 'dataService', function ($scope, dataService) {
                $scope.studentList = dataService.getAllStudents();
            }]
        })
        .state('info', {
            url: '/info/:id',
            templateUrl: 'info.html',
            controller: function ($scope, $stateParams) {
                $scope.id = $stateParams.id;
            }
        });
});
