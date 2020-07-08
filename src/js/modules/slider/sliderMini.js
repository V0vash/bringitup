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

    nextSlide(){
        this.container.appendChild(this.slides[0]);
        this.decorizeSlides();

        this.skipBtns(this.next, 2);
    }

    bindTriggers(){
        this.next.addEventListener('click', () =>this.nextSlide());

        this.prev.addEventListener('click', () =>{
            let lastSlide = this.slides[this.slides.length - 1];
            this.container.insertBefore(lastSlide, this.slides[0]);
            this.decorizeSlides();

            this.skipBtns(this.prev, 2);
        });
    }

    activateAutoplay(delay){
        if(this.autoplay == true){

            let autoplay = setInterval(() => this.nextSlide(), delay);

            const stopTriggers = [this.next, this.prev, ...this.slides];

            stopTriggers.forEach(slide =>{
                slide.addEventListener('mouseenter', () =>{
                    clearInterval(autoplay);
                });
            });
            
            stopTriggers.forEach(slide =>{
                slide.addEventListener('mouseleave', () =>{
                    autoplay = setInterval(() => this.nextSlide(), delay);
                });
            });
        }
    }
    

    init(){
        try{
            this.container.style.cssText=`
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            allign-item: flex-start;
            `;

            this.bindTriggers();
            this.decorizeSlides();
            this.activateAutoplay(5000);
        }catch(e){}
    }
}