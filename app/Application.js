'use strict';

import Backbone from 'backbone';
import Coll from './Todo_collection';
import template from '../templates/template_todo.jade';
import Item from './Todo_Item_View.js';
import template_footer from '../templates/template_footer.jade';

export let App = Backbone.View.extend({

    events:{
        'click .onSubmit': 'addObj',
        'click .use_comparator': 'renderList',
        'click .success': 'showSuccess',
        'click .failure': 'showFailure'
    },

    initialize() {

        this.coll = new Coll();
        this.coll.fetch();
        let html = template();
        this.$el.html(html);
        this.listenTo(this.coll, 'reset', this.reset);
        this.listenTo(this.coll, 'add', this.renderObj);
        this.listenTo(this.coll, 'all', this.renderFooter);
        this.render();
        this.renderFooter();
    },

    render() {
        let list = this.$el.find('.list');
        this.coll.each((model)=>{
            let todo_item = new Item({model: model});
            list.append(todo_item.render());
        });
    },

    reset() {
        let list = this.$el.find('.list');
        list.html('');
        this.render();
    },

    addObj() {
        this.coll.add({});
    },

    renderObj(model) {
        let task = this.$el.find('.task');
        let list = this.$el.find('.list');
        let todo_item = new Item({model: model});

        if (model.isNew()) {
            model.set({
                title: task.val()
            });
            model.save();
            list.append(todo_item.render());
        } else {
            list.append(todo_item.render());
        }
        task.val('');
        list.append(todo_item.render());
    },

    renderFooter() {
        let json = this.coll.toJSON();
        let done = this.coll.where({done: true});
        let not_done = this.coll.where({done: false});
        let html = template_footer({
           all: json.length,
            done: done.length,
            not_done: not_done.length
        });
        this.$el.find('.footer').html(html);
    },

    renderList() {
        this.coll.fetch();
        this.coll.sort();
        let list = this.$el.find('.list');
        list.html('');
        this.coll.each((model)=>{
            let todo_item = new Item({model: model});
            list.append(todo_item.render());
        });
        this.coll.sortMode = this.coll.sortMode * -1;
    },

    showSuccess() {
        let list = this.$el.find('.list');
        list.html('');
        this.coll.each((model)=>{
            if(model.toJSON().done) {
                let todo_item = new Item({model: model});
                list.append(todo_item.render());
            }
        });
    },

    showFailure() {
        let list = this.$el.find('.list');
        list.html('');
        this.coll.each((model)=>{
            if(!model.toJSON().done) {
                let todo_item = new Item({model: model});
                list.append(todo_item.render());
            }
        });
    }
});