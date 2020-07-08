import {$$} from './services/wrapQ';


export default class VideoPlayer {
    constructor(triggers, popup) {
        this.btns = $$(triggers);
        this.overlay = $$(popup);
        this.close = $$('.close', this.overlay);
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    }

    bindTriggers(){
        this.btns.forEach((btn,i) => {
            try{
                const blockedElem = btn.closest('.module__video-item').nextElementSibling;

                if(i % 2 == 0){
                    blockedElem.setAttribute('data-disabled', 'true');
                }
            }catch(e){}

            btn.addEventListener('click', () => {
                if(!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true'){
                    this.activeBtn = btn;

                    if ($$('iframe#frame')){
                        this.overlay.style.display ='flex';
                        if(this.path !== btn.getAttribute('data-url')){
                            this.path = btn.getAttribute('data-url');
                            this.player.loadVideoById(this.path);
                        }
                    }else {
                        console.log('NO IFRAME');
                        this.path = btn.getAttribute('data-url');

                        this.createPlayer(this.path);
                    }
                }
            });
        });
    }

    bindCloseBtn(){
        this.close.addEventListener('click', () =>{
            this.overlay.style.display ='none';
            this.player.stopVideo();
        });
    }

    createPlayer(url){
        this.player =  new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`,
            events: {
                'onStateChange': this.onPlayerStateChange
              }
        });

        this.overlay.style.display ='flex';
    }

    onPlayerStateChange(state){
        try{
            const blockedElem = (this.activeBtn.closest('.module__video-item')).nextElementSibling;
            const playBtn = $$('svg', this.activeBtn).cloneNode(true);
    
            if(state.data === 0) {
                if($$('.play__circle', blockedElem).classList.contains('closed')){
                $$('.play__circle', blockedElem).classList.remove('closed');
                $$('svg', blockedElem).remove();
                $$('.play__circle', blockedElem).appendChild(playBtn);
                $$('.play__text', blockedElem).textContent = 'play video';
                $$('.play__text', blockedElem).classList.remove('attention');
                blockedElem.style.opacity = 1;
                blockedElem.style.filter = 'none';
    
                blockedElem.setAttribute('data-disabled', 'false');
                }
            }
        }catch(e){}

    }

    init(){
        console.log(this.btns);
        if(this.btns !== null){
        const tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        this.bindTriggers();
        this.bindCloseBtn();

        this.onPlayerStateChange();
        }
    }
}