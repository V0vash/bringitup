import {$$} from './services/wrapQ';

export default class Forms {
    constructor(forms){
        this.forms = document.querySelectorAll(forms);
        this.inputs = $$('input');
        this.url = 'assets/question.php';
        this.message = {
            loading: 'Loading...',
            success: 'Thank you, we will contact you',
            failure: 'Something went wrong'
        };
    }

    async postData(url, data){
        const res = await fetch(url,{
            method: 'POST',
            body: data
        });
        return await res.text();
    }

    clearInputs(){
        this.inputs.forEach(item =>{
            item.value='';
        });
    }
    
    createStatusMessage(form){
        const statusMassage = document.createElement('div');
        statusMassage.classList.add('status');
        form.append(statusMassage);
        return $$('.status');
    }

    checkEmailInput() {
        const emailInputs = document.getElementsByName("email");

        emailInputs.forEach(input => {
            input.addEventListener('keypress', function (e) {
                if (e.key.match(/[^a-z A-Z 0-9 @ \.]/ig)) {
                    e.preventDefault();
                }
            });
        });
    }

    initMask(){

        let setCursorPosition = (pos, elem) =>{
            elem.focus();

            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            }else if (elem.createTextRange){
                let range = elem.createTextRange();

                range.collapse(true);
                range.moveStart('character', pos);
                range.moveEnd('character', pos);
                range.select();
            }
        };

        let inputs = document.getElementsByName("phone");
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });

        function createMask(event){
            let matrix = '+1 (___) ___ __-__',
            i = 0,
            def = matrix.replace(/\D/g, ''),
            val = this.value.replace(/\D/g, '');

            if (def.length >= val.length){
                val = def;
            }

            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });

            if(event.type === 'blur'){
                if (this.value.length == 2){
                    this.value = '';
                }
                }else {
                    setCursorPosition(this.value.length, this);
                }
            }
    }

    init(){
        this.checkEmailInput();
        this.initMask();

        this.forms.forEach((item) => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();

            const status = this.createStatusMessage(item);

            const formData = new FormData(item);

            status.textContent = this.message.loading;
            
            this.postData(this.url, formData)
                .then(res => {
                console.log(res);
                status.textContent = this.message.success;
            })
            .catch(() =>{
                console.log('error');
                status.textContent = this.message.failure;
            })
            .finally(() => {
                this.clearInputs();
                setTimeout(()=>{
                    status.remove();
                }, 5000);
            });
        });

        });
    }

}