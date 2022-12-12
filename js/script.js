// Import external scripts
import Snoweffect from "./snoweffect.js";
const createSnowEffect = () =>{
    // Create image element
    const flakeImage = new Image();

    // Set the source for image
    flakeImage.src = "../images/assets/snowflake.svg";
    
    // Create canvas element and set attributes: id, width, height. Then prepend to body
    const bgCanvas = document.createElement('canvas');
    bgCanvas.id = 'snoweffect-bg';
    bgCanvas.width = document.body.scrollWidth;
    bgCanvas.height = document.body.scrollHeight;
    bgCanvas.style = 'position:absolute; z-index:-5;';

    // Once image is loaded, create canvas, get 2d context from canvas and create snow effect instance and run the animation
    flakeImage.onload = () =>{
        document.body.prepend(bgCanvas);

        // Get the context from bgCanvas
        const ctx = bgCanvas.getContext('2d');
        ctx.globalAlpha = 0.2;

        // Set the flake velocity and create the Snow effect instace:
        let speed = 0.95;
        const snowEffect = new Snoweffect(ctx, bgCanvas.width, bgCanvas.height, flakeImage, speed);

        // Initialize snoweffect, sets the amount of flakes and create snowflake objects
        snowEffect.init();
        snowEffect.animate();

        // Run the actual animation
        window.addEventListener('resize', ()=>{
            bgCanvas.width = document.body.scrollWidth;
            bgCanvas.height = document.body.scrollHeight;
            snowEffect.reset(bgCanvas.width, bgCanvas.height);
        })
    }
}
// Run function create and Animate SnowEffect
createSnowEffect();

let content = {
    "artists":
    [
        {
            "name": "Artiste numero uno",
            "description": "Le Artiste conjanera bon cirku porr favorr",
            "img": "https://artist.com/image1"
        },
        {
            "name": "Falling monkeys",
            "description": "This british group is amazingly loud and schreecgyu",
            "img": "images/artist1.webp"
        }
    ]
}
console.log(JSON.stringify(content));