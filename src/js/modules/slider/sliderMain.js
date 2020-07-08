import Slider from './slider';

export default class MainSlider extends Slider{
    constructor(btns, next, prev){
        super(btns, prev, next);
    }

    showSlides(n){
        if(n > this.slides.length){
            this.slideIndex = 1;
        }
        if(n < 1){
            this.slideIndex = this.slides.length;
        }

        try{
            this.hanson.style.display = 'none';
            if(n === 3){
                this.hanson.classList.add('animated');
                setTimeout(()=>{
                this.hanson.style.display = 'block';
                this.hanson.classList.add('fadeInLeft');
            },3000);
            }else{
                this.hanson.classList.remove('fadeInLeft');
            }
        }catch(e){}

        this.slides.forEach(slide => {
            slide.style.display = 'none';
        });

        this.slides[this.slideIndex - 1].style.display = 'block';

    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    bindTriggers(){

        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                    this.plusSlides(1);
            });

            btn.parentNode.previousElementSibling.addEventListener('click', (e) =>{
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.showSlides);
            });
        });

    try{
        this.next.forEach(btn =>{
            btn.addEventListener('click', (e) =>{
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(1);
            });
        });

        this.prev.forEach(btn =>{
            btn.addEventListener('click', (e) =>{
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(-1);
            });
        });
    }catch(e){}
        
    }

    render(){
        if(this.container){
            try{
                this.hanson = $$('.hanson');
            }catch(e){}
            
            this.showSlides(this.slideIndex);
            this.bindTriggers();
        }
    }
}