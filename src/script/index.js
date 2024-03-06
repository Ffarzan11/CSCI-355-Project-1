const explore_button = document.querySelectorAll('.explore-btn');
const nav = document.querySelector('.nav')
const carousel_imgs = document.getElementById('imgs')
const carousel_left_btn = document.getElementById('left')
const carousel_right_btn = document.getElementById('right')
const carousel_each_img = document.querySelectorAll('#imgs img')
const toggles = document.querySelectorAll('.faq-toggle')

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

// navigation effect
window.addEventListener('scroll', fixNav)

function fixNav() {
    console.log(window.scrollY, nav.offsetHeight)
    if(window.scrollY > nav.offsetHeight + 1050){
        nav.classList.add('active');
    }
    else{
        nav.classList.remove('active');
    }

    if(nav.classList.contains('active') && window.scrollY > nav.offsetHeight +2050) {
        nav.classList.remove('active');
    }
}

//carousel
let index = 0
let interval = setInterval(run, 2000)

function run() {
    index++;
    changeImage()
}

function changeImage() {
    if(index > carousel_each_img.length - 1) {
        console.log(index)
        index = 0
    }
    else if (index < 0) {
        index = carousel_each_img.length - 1
    }

    if(window.innerWidth >= 300 && window.innerWidth <= 600) {
        console.log(innerWidth)
        carousel_imgs.style.transform = `translateX(${-index*236}px)`
    }
    else if(window.innerWidth >= 700 && window.innerWidth <= 1000) {
        carousel_imgs.style.transform = `translateX(${-index*339}px)`
    }
    else {
        carousel_imgs.style.transform = `translateX(${-index*339}px)`
    }
    
}

function resetInterval() {
    clearInterval(interval)
    interval = setInterval(run, 2000)
}
carousel_right_btn.addEventListener('click', ()=> {
    index++
    changeImage()
    resetInterval()
})

carousel_left_btn.addEventListener('click', ()=> {
    index--
    changeImage()
    resetInterval()
})

//faq toggle
toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        toggle.parentNode.classList.toggle('active') //adding and removing the active class on click
    })
})