
let $$ = (selector, base = document) => {
    let elements = base.querySelectorAll(selector);
    if (elements.length == 1){
        return elements[0];
    }else if(elements.length == 0){
        return null;
    }else{
        return elements;
    }
}

export {$$};
