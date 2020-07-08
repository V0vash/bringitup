import MainSlider from './modules/slider/sliderMain';
import MiniSlider from './modules/slider/sliderMini';
import playVideo from './modules/playVideo';
import Difference from './modules/difference';
import Forms from './modules/forms';
import ShowInfo from './modules/showInfo';
import Download from './modules/download';

window.addEventListener('DOMContentLoaded', () => {

    const mainSlider = new MainSlider({container:'.page', btns:'.next'});
    mainSlider.render();

    const showUpSlider = new MiniSlider({
        container:'.showup__content-slider',
        next:'.showup__next',
        prev:'.showup__prev',
        activeClass: 'card-active',
        animate: true
    });
    showUpSlider.init();
    
    const modulesSlider = new MiniSlider({
        container:'.modules__content-slider',
        next:'.modules__info-btns .slick-next',
        prev:'.modules__info-btns .slick-prev',
        activeClass: 'card-active',
        animate: true,
        autoplay: true
    });
    modulesSlider.init();

    const feedSlider = new MiniSlider({
        container:'.feed__slider',
        next:'.feed__slider .slick-next',
        prev:'.feed__slider .slick-prev',
        activeClass:'feed__item-active'
    });
    feedSlider.init();

    new playVideo ('.page .play', '.overlay').init();

    new Difference('.officerold', '.officernew', '.officer__card-item').init();

    new Forms('.form').init();

    //modules 

    
    const modulePageSlider = new MainSlider({container: '.moduleapp',
     btns: '.next',
     next:'.nextmodule',
     prev:'.prevmodule'});
    modulePageSlider.render();

    new playVideo('.module__video-item .play', '.overlay').init();

    new ShowInfo('.module__info-show .plus').init();

    new Download('.download').init();
});