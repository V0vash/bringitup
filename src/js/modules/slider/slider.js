import {$$} from '../services/wrapQ';


export default class Slider {
    constructor({page = '', btns = '', next ='', prev = ''}={}) {
        this.page = $$(page);
        this.slides = this.page.children;
        this.btns = $$(btns);
        this.slideIndex = 1;
    }

}