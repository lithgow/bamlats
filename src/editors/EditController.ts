/// <reference path="module.ts" />

namespace ToDos {

    interface EditParams {
        id: string;
    }

    class EditController {
        public todo: ToDoItem;

        constructor($stateParams: EditParams,
                    private $state: angular.ui.IStateService,
                    $http: angular.IHttpService) {
            $http.get<ToDoItem>('/api/todos/' + $stateParams.id)
                .then((response) => {
                    this.todo = response.data;
                });
        }

        public close() {
            // can use '^' to go up one state
            // can use '.' to go to child state
            // can use '^.sibling' to go to sibling state
            // can use '^.^' to go to grandparent state
            this.$state.go('^');
        }
    }

    editorsModule.controller('EditController', EditController);

}