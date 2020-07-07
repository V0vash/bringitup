import {$$} from './services/wrapQ';

export default class Difference {
    constructor(oldOfficer, newOfficer, items){
        try{
            this.oldOfficer = $$(oldOfficer);
            this.oldItems = $$(items, this.oldOfficer);
            this.newOfficer = $$(newOfficer);
            this.newItems = $$(items, this.newOfficer);
    
            this.oldCounter = 0;
            this.newCounter = 0;
        }catch(e){}
    }

    hideItems(items){
        items.forEach((item, i ,arr) => {
            if(i !== arr.length - 1){
                item.style.display = 'none';
            }
        });
    }

    bindTriggers(container, items, counter){
        $$('.plus', container).addEventListener('click', () =>{
            if(counter !== items.length - 2){
                items[counter].classList.add('animated', 'fadeIn');
                items[counter].style.display = 'flex';
                counter++;
            } else {
                items[counter].classList.add('animated', 'fadeIn');
                items[counter].style.display = 'flex';
                items[items.length - 1].remove();
            }
        });

    }


    init(){
        try{
        this.hideItems(this.oldItems);
        this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
        this.hideItems(this.newItems);
        this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);
        }catch(e){}

    }

}