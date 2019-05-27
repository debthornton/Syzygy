function Slide(img, index, innerImg) {
    this.active = false;
    this.img = img;
    this.index = index;
    this.innerImg = innerImg;
 
    this.makeActive = function() {
        innerImg.style.width = screen.width + 'px';
        this.active = true;
        this.img.classList.remove('inactive');
        this.img.classList.add('active');
        this.img.classList.add('z-index');;
    }
    
    this.makeInactive = function() {       
        innerImg.style.width = screen.width + 'px';
        if(this.active === true) {  
            let img = this.img;
            setTimeout(function() {
                setTimeout(function() {
                    img.classList.remove('active');
                }, 300);        
                img.classList.remove('z-index');
                img.classList.add('becoming-inactive');
            }, 400);           
            setTimeout(function() {
                img.classList.remove('becoming-inactive');
                img.classList.add('inactive');
            }, 1200);
        } 
        this.active = false;
    }
}

let slideImages = document.getElementsByClassName('slide-image');

let slide1 = new Slide(document.getElementById('slide-1'), 1, slideImages[0]);

let slide2 = new Slide(document.getElementById('slide-2'), 2, slideImages[1]);

let slide3 = new Slide(document.getElementById('slide-3'), 3, slideImages[2]);

let slide4 = new Slide(document.getElementById('slide-4'), 4, slideImages[3]);

let slide5 = new Slide(document.getElementById('slide-5'), 5, slideImages[4]);

let slide6 = new Slide(document.getElementById('slide-6'), 6, slideImages[5]);

let slide7 = new Slide(document.getElementById('slide-7'), 7, slideImages[6]);

let slide8 = new Slide(document.getElementById('slide-8'), 8, slideImages[7]);

let slide9 = new Slide(document.getElementById('slide-9'), 9, slideImages[8]);

let slide10 = new Slide(document.getElementById('slide-10'), 10, slideImages[9]);

let slide11 = new Slide(document.getElementById('slide-11'), 11, slideImages[10]);

let slide12 = new Slide(document.getElementById('slide-12'), 12, slideImages[11]);

let slide13 = new Slide(document.getElementById('slide-13'), 13, slideImages[12]);

let slide14 = new Slide(document.getElementById('slide-14'), 14, slideImages[13]);

let slide15 = new Slide(document.getElementById('slide-15'), 15, slideImages[14]);

let slide16 = new Slide(document.getElementById('slide-16'), 16, slideImages[15]);

let slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8, slide9, slide10, slide11, slide12, slide13, slide14, slide15, slide16];

let index = 1;

function forwardSwipe() {
    if(index <= 15) {
        index++; 
        slides.forEach((slide) => {
            if(index === slide.index) {
                if(slide.active === false) {
                    slide.makeActive();
                }  
            }else {
                slide.makeInactive();
            }
        });
    }      
}

function backwardSwipe() {
    if(index > 1) {
        index--; 
        slides.forEach((slide) => {
            if(index === slide.index) {
                if(slide.active === false) {
                    slide.makeActive();
                }  
            }else {
                slide.makeInactive();
            }
        });
    }    
}

