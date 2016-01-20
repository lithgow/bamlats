/// <reference path="module.ts" />

namespace ToDos {

    interface NewTodo {
        text?: string;
        dueInDays?: number;
    }

    class NewTodoController {
        public todo: NewTodo;

        constructor(private $modalInstance: angular.ui.bootstrap.IModalServiceInstance) {
            this.todo = {};
        }

        public ok() {
            let todoItem: ToDoItem = {
                text: this.todo.text,
                due: moment.utc().startOf('day').add(this.todo.dueInDays, 'days').toISOString(),
                created: moment.utc().toISOString()
            }
            this.$modalInstance.close(todoItem);
            // this.$modalInstance.dismiss(); // the arg would be passed as the reason to the catch
        }
    }

    editorsModule.controller('NewTodoController', NewTodoController);
}