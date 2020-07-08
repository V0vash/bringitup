export default class ShowInfo{
    constructor(triggers){
        this.btns = $$(triggers);
    }

    init(){
        try{
            this.btns.forEach(btn =>{
                btn.addEventListener('click', () => {
                    const msg = btn.parentNode.nextElementSibling;
                    msg.classList.toggle('msg');
                    msg.style.marginTop = '20px';
                    msg.classList.add('animated', 'fadeIn');
                });
            });
        }catch(e){}
    }
}