namespace ToDos {

    const filterModule = angular.module('todos.filters', []);

    export class LocaleProvider {
        public override: string;

        public $get() {
            return () => this.override || navigator.language || 'en-GB';
        }
    }

    export type LocaleService = () => string;

    filterModule.provider('locale', LocaleProvider);

    filterModule.filter('moment', (locale: LocaleService) => {

        // the name of this filter function doesn't matter as it's not used, BUT if it throws an error we will see the name at runtime
        return function momentFilter(input, format) {

            if (format === 'short') {
                if (locale() === 'en-US') {
                    format = 'MM/DD/YYYY';
                } else {
                    format = 'DD/MM/YYYY';
                }
                return moment.utc(input, '').format(format);
            } else {
                return moment.utc(input, '').format('dd MMMM yyyy');
            }

        }

    });

}
