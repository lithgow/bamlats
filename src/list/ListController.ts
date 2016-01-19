/// <reference path="module.ts" />
// need the above line as otherwise ListController will be read prior to module.ts by the gulp typescript compilation step (as it uses alphabetical order)

namespace ToDos {

    class ListController {
        public todoList: ToDoItem[];

        constructor(todoService: ToDoService, errors: ErrorService) {
            todoService.list()
                .then((list) => {
                    this.todoList = list;
                    errors.push({message: 'Test message', level: 'warning'});
                })
                .catch((error) => {
                    errors.push(error);
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