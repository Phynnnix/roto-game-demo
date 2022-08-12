function replaceClassByPrefix(element, classPrefix, newVal) {
    element.classList.forEach(cl => {
        if(cl.startsWith(classPrefix))
        {
            element.classList.remove(cl);
        }
    });
    element.classList.add(classPrefix+newVal);
}