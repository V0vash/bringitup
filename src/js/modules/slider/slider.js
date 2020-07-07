import {$$} from '../services/wrapQ';

export default class Slider {
    constructor({
        container = null,
        btns = null,
        next = null,
        prev = null,
        activeClass = '',
        animate,
        autoplay }={}) {
        this.container = $$(container);
        try{this.slides = this.container.children;}catch(e){}
        this.btns = $$(btns);
        this.next = $$(next);
        this.prev = $$(prev);
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
        this.slideIndex = 1;
    }

}