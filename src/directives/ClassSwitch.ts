namespace ToDos {

    const module = angular.module('todos.directives', []);

    function applyClasses(element: JQuery, array: any[]) {
        let done = false;
        for (let item of array) {
            if (typeof item === 'object') {
                let klass = Object.keys(item)[0];

                if (done) {
                    element.removeClass(klass);
                } else {
                    let value = item[klass];
                    if (value) {
                        done = true;
                        element.addClass(klass);
                    } else {
                        element.removeClass(klass);
                    }
                }
            } else {
                // assume item is a string at this point
                if (done) {
                    element.removeClass(item);
                } else {
                    element.addClass(item);
                }
            }
        }
    }

    module.directive('classSwitch', () => {

        // will be called once for each instance of the directive to initialise it (it's like a directive's constructor)
        // one of the only parts of angular in which the order of arguments is important
        // they are not injected so you need them in this order, you can't just leave one off if you don't need it
        // SEAC - scope, element, attrs, controller
        // controller will be created just before link function is called
        function link(scope: angular.IScope, element: JQuery, attrs: any) {

            // scope.$applyAsync tells angular about something it doesn't currently know about

            let expr = attrs.classSwitch;

            if (expr[0] !== '[') {
                expr = '[' + expr + ']';
            }

            let array = scope.$eval(expr);
            applyClasses(element, array);

            scope.$watch(expr, (newValue: any[]) => {
                applyClasses(element, newValue);
            });
        }

        /**
         * restrict says what we can attach directive to:
         *
         * E - element
         * A - attribute
         * C - class (attach to things with that class, e.g. 'active')
         * M - html comments - don't use
         * */
        let cs: angular.IDirective = {
            restrict: 'EAC',
            link: link
        };

        return cs;
    });
}