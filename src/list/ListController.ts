/// <reference path="module.ts" />
// need the above line as otherwise ListController will be read prior to module.ts by the gulp typescript compilation step (as it uses alphabetical order)

namespace ToDos {

    class ListController {
        public todoList: ToDoItem[];

        constructor(private todoService: ToDoService,
                    errors: ErrorService,
                    private $timeout: angular.ITimeoutService,
                    private $modal: angular.ui.bootstrap.IModalService) {

            todoService.list()
                .then((list) => {
                    this.todoList = list;
                    //errors.push({message: 'Test message', level: 'warning'});
                })
                .catch((error) => {
                    errors.push(error);
                });
        }

        public addNew() {
            this.$modal.open({
                controller: 'NewTodoController',
                controllerAs: 'newCtrl',
                templateUrl: 'editors/new.html'
            }).result.then((item: ToDoItem) => {
                let info = this.$modal.open({
                    template: '<div><i class="fa fa-spinner fa-spin fa-2x"></i> Saving...</div>'
                });
                this.todoService.add(item)
                    .then((item) => {
                        this.todoList.push(item);
                        //this.$timeout(() => {
                            info.dismiss();
                        //}, 1000);
                    });
            });
        }

        public isOverdue(item: ToDoItem): boolean {
            if (!item.due) return false;
            let due = moment.utc(item.due, '');
            return due.isBefore(moment.utc());
        }
    }

    listModule.controller('ListController', ListController)

}