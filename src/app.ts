namespace ToDos {

    const deps = [
        'ui.router',
        'todos.list'
    ];

    const app = angular.module('todos', deps);

    class RootController {

    }

    app.controller('RootController', RootController);

    // configure the providers that will provide the services once the application is running
    app.config(($stateProvider: angular.ui.IStateProvider) => {
        // these providers are added to a list and when asked for it will just iterate through all matching providers in the list
        $stateProvider.state({
            name: 'root',
            url: '/',
            views: {
                '': { // the default view
                    controller: 'RootController',
                    controllerAs: 'root',
                    templateUrl: '/root/root.html'
                },
                'errors': {
                    controller: 'ErrorsController',
                    controllerAs: 'errors',
                    templateUrl: '/errors/errors.html'
                }
            },
        });
    });

    app.config(($urlRouterProvider: angular.ui.IUrlRouterProvider) => {
        $urlRouterProvider.otherwise('/');
    });

    // uncomment this to show locale filter switching date format for US
    //app.config((localeProvider: LocaleProvider) => {
    //   localeProvider.override = 'en-US';
    //});
}
