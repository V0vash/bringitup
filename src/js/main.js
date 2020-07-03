import MainSlider from './modules/slider/sliderMain';
import playVideo from './modules/playVideo';

window.addEventListener('DOMContentLoaded', () => {

    const slider = new MainSlider({page:'.page', btns:'.next'});
    slider.render();

    const popupPlayer = new playVideo ('.play', '.overlay');
    popupPlayer.init();
});