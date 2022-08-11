let allSprites = document.querySelectorAll('.sprite-img');

allSprites.forEach(sprite => {
    sprite.addEventListener('click', event => {
        if(event){
            for (let i = 0; i < allSprites.length; i++) {
                allSprites[i].removeAttribute('class', 'selected-sprite')
            }
        }

        if(sprite === event.target) {  
            sprite.setAttribute('class', 'selected-sprite')
        } 
    });
});