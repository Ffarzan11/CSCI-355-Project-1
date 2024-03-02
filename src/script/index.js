const explore_button = document.querySelectorAll('.explore-btn');

// ripple effect for the explore-btn 
explore_button.forEach(button => {
    button.addEventListener('click', function(e) {
        const x = e.clientX; //x-position wrt viewport
        const y = e.clientY; //y-position wrt viewport

        const buttonTop = e.target.offsetTop; //position of top part of btn
        const buttonLeft = e.target.offsetLeft; //position of left side of btn

        const xInside = x - buttonLeft; // x-position of the click inside btn
        const yInside = y - buttonTop; // y-position of the click inside btn

        //adding circle class to explore-btn for the effect
        const circle = document.createElement('span')
        circle.classList.add('circle')
        circle.style.top = yInside + 'px';
        circle.style.left = xInside + 'px';

        this.appendChild(circle)
    })
})