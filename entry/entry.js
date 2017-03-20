'use strict';

import '../styles/my_style.styl';
import Model from './../app/Todo_Model.js';
import {App} from './../app/Application.js';

function ready() {
    let app = new App({
        el: '.wrapper'
    });
}

document.addEventListener("DOMContentLoaded", ready);