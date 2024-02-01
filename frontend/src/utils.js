export const handleFadeOut = (component, callback, navTo) => {
    if(component){
        component.classList = ''
        component.classList = 'fade-out'

        if(callback){
            setTimeout(() => {
                callback(navTo)
            }, 1000)
        }
    }
}

export const switchClass = (component, newClass, callback, navTo) => {
    if(component){
        component.classList = ''
        
        if(newClass) component.classList = newClass

        if(callback){
            setTimeout(() => {
                callback(navTo)
            }, 1000)
        }
    }
}