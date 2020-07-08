export default class Download{
    constructor(triggers){
        this.btns = $$(triggers);
        this.path = 'assets/img/bitmap.jpg';
    }

    downloadFile(path){
        const link = document.createElement('a');

        link.setAttribute('href', path);
        link.setAttribute('download', 'file');

        link.style.display = 'none';
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    }

    init(){
        try{
            this.btns.forEach(item =>{
                item.addEventListener('click', (e) =>{
                    e.preventDefault();
                    e.stopPropagation();
                    this.downloadFile(this.path);
                });
            });
        }catch(e){};
    }
}