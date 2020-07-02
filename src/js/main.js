import Slider from './modules/slider';
import playVideo from './modules/playVideo';

window.addEventListener('DOMContentLoaded', () => {

    const slider = new Slider('.page', '.next');
    slider.render();

    const popupPlayer = new playVideo ('.play', '.overlay');
    popupPlayer.init();
});