import Backbone from 'backbone';
import Todo_Model from './Todo_Model.js';

export default Backbone.Collection.extend({
    model: Todo_Model,
    url: '/api/',
    sortParam: 'done',
    sortMode: -1,
    comparator(a,b) {
        if (a.get(this.sortParam) > b.get(this.sortParam)) {
            return this.sortMode;
        } else if (a.get(this.sortParam) < b.get(this.sortParam)) {
            return this.sortMode * -1;
        } else {
            return 0;
        }
    }
});