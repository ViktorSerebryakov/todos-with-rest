'use strict';

import Backbone from 'backbone';
import template from '../templates/template_li.jade';

export default Backbone.View.extend({

    tagName: 'li',

    className: 'todo_el',

    events:{
        'click .delete': 'delete',
        'click .done': 'done',
        'blur .title': 'editTitle'
    },

    initialize() {
        this.template = template;
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    },

    render() {
        let json = this.model.toJSON();
        let html = this.template(json);
        this.$el.html(html);
        return this.$el;
    },

    delete() {
        this.model.destroy();
    },

    done() {
        let done = !this.model.get('done');
        this.model.set({
            done: done
        });
        this.model.save();
    },

    editTitle() {
        this.model.set({
            title: this.$el.find('.title').text()
        });
        this.model.save();
    }
});