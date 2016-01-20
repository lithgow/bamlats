/// <reference path="module.ts" />

namespace ToDos {

    // in a proper app you could put this in a service
    function wrapError<T>(promise: angular.IPromise<T>) {
        // for response codes <200 && >299
        return promise.catch((response: angular.IHttpPromiseCallbackArg<{}>) => {
            // equivalent to changing the exception type
            switch (response.status) {
                case 401: throw { message: 'Not logged in', level: 'danger'};
                case 404: throw { message: 'Data was not found', level: 'danger'};
                default: throw { message: 'A bad thing happened', level: 'danger'};
            }
            return <T> null; // to stop it complaining about return type being void
        });

    }

    export interface ToDoItem {
        id?: string;
        text: string;
        due: string;
        created: string;
        done?: string;
        tags?: string[];
    }

    export class ToDoService {

        constructor(private $http: angular.IHttpService) {

        }

        // $http is the HttpService which uses the HttpBackendService behind the scenes, hence we use the mock HttpBackend in the test
        public list(): angular.IPromise<ToDoItem[]> {
            return wrapError(
                // angular <=1.4 had .success and .error instead of .then
                this.$http.get<ToDoItem[]>('/api/todos')
                    .then((response) => response.data));
        }

        public add(item: ToDoItem) {
            item.id = item.id || Date.now().toString();

            return wrapError(
                this.$http.post<ToDoItem>('/api/todos', item)
                    .then(() => item));
        }
    }

    // don't normally use 'Service' in the name (it's frowned upon) but sometimes, e.g. here, it's easier to distinguish that way
    listModule.service('todoService', ToDoService);
}