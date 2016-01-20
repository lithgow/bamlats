namespace ToDos {

    var deps = [
        'ui.router',
        'ui.bootstrap',
        'todos.filters',
        'todos.errors',
        'todos.editors',
        'todos.directives'
    ];

    export const listModule = angular.module('todos.list', deps);

    listModule.config(($stateProvider: angular.ui.IStateProvider) => {

        $stateProvider.state({
            name: 'root.todos',
            // url here is concatenated onto url of parent (i.e. '/' in our case)
            url: 'list',
            controller: 'ListController',
            // use controllerAs as ui.router doesn't support specifying this in the html - so we have coupling between name here and what we must use in html
            controllerAs: 'listCtrl',
            templateUrl: 'list/list.html'
        });

        $stateProvider.state({
            name: 'root.todos.edit',
            url: '/{id}',
            controller: 'EditController',
            controllerAs: 'editCtrl',
            templateUrl: 'editors/edit.html'
        });
    });
}