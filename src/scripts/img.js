import cross from '../assets/close.png';

function imgLoader () {
    const crossIm = cross;
    
    const form = document.querySelector('form');
    const image = document.createElement('img');
    image.src = cross;
    image.id = 'cross';
    form.appendChild(image);

}

imgLoader();