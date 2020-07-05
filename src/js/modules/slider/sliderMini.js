import {$$} from '../services/wrapQ';
import Slider from './slider';

export default class MiniSlider extends Slider{
    constructor(container, next, prev, activeClass, animate, autoplay){
        super(container, next, prev, activeClass, animate, autoplay);
    }
    
    decorizeSlides(){
        this.slides.forEach(slide =>{
            slide.classList.remove(this.activeClass);
            if(this.animate){
                $$('.card__title', slide).style.opacity = '0.4';
                $$('.card__controls-arrow', slide).style.opacity = '0';
            }
        });

        this.slides[0].classList.add(this.activeClass);
        if(this.animate){
            $$('.card__title', this.slides[0]).style.opacity = '1';
            $$('.card__controls-arrow', this.slides[0]).style.opacity = '1';
        }
    }

    skipBtns(btn, amountOfClicks){

        if (this.slides[0].tagName === 'BUTTON') {
            for (let i = 0; i < amountOfClicks; i++) {
               btn.click();
            }
         }
    }
    bindTriggers(){
        this.next.addEventListener('click', () =>{
            this.container.appendChild(this.slides[0]);
            this.decorizeSlides();

            this.skipBtns(this.next, 2);
        });
        this.prev.addEventListener('click', () =>{
            let lastSlide = this.slides[this.slides.length - 1];
            this.container.insertBefore(lastSlide, this.slides[0]);
            this.decorizeSlides();

            this.skipBtns(this.prev, 2);
        });
    }

    init(){
        this.container.style.cssText=`
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        allign-item: flex-start;
        `;

        this.bindTriggers();
        this.decorizeSlides();
    }
}