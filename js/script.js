// Import external scripts
import Snoweffect from "./snoweffect.js";
import countdown from "./countdown.js";


//get artists info:
const checkIfArtistSelected = () =>{
    if(window.location.search){
        let artistId = window.location.search.replace('?artistid=','');
    }else{

    }
}
// Display all artists
const displayArtists = (artists) =>{
    // Diplay all artists on artist page:
}

// Window location:
switch (window.location.pathname){
    case "/":
        // Codes to use in frontpage side:

        // countdown
        // Define days etc to date.
        const days = document.getElementById('countDays');
        const hours = document.getElementById('countHours');
        const minutes = document.getElementById('countMinutes');
        const seconds = document.getElementById('countSeconds');
        // Initialize count down
        const CountDown = new countdown("Feb 3, 2023 16:00:00", days,  hours, minutes, seconds);

        break;
    case "/artister.html":
        fetch('content/artists.json')
            .then((response) => response.json())
            .then((data) => displayArtists(data['artists']))
        break;
    default:
        break;
}

// Snoweffect function
const createSnowEffect = () =>{
    // Create image element
    const flakeImage = new Image();
    // Set the source for image
    flakeImage.src = "../images/assets/snowflake.svg";

    // Once image is loaded, create canvas, get 2d context from canvas and create snow effect instance and run the animation
    flakeImage.onload = () =>{
        // Create canvas element and set attributes: id, width, height. Then prepend to body
        const bgCanvas = document.createElement('canvas');
        bgCanvas.id = 'snoweffect-bg';
        bgCanvas.width = document.body.scrollWidth;
        bgCanvas.height = window.innerHeight;
        bgCanvas.style = 'position:fixed; z-index:-5;';
        document.body.prepend(bgCanvas);

        // Get the context from bgCanvas
        const ctx = bgCanvas.getContext('2d');
        ctx.globalAlpha = 0.2;

        // Set the flake velocity and create the Snow effect instace:
        let speed = 0.95;
        const snowEffect = new Snoweffect(ctx, bgCanvas.width, bgCanvas.height, flakeImage, speed);

        // Initialize snoweffect, sets the amount of flakes and create snowflake objects
        snowEffect.init();

        // Run the actual animation
        snowEffect.animate();
        // Resize canvas when window is resized
        window.addEventListener('resize', ()=>{
            bgCanvas.width = document.body.scrollWidth;
            bgCanvas.height = window.innerHeight;
            snowEffect.reset(bgCanvas.width, bgCanvas.height);
            ctx.globalAlpha = 0.2;
        })
    }
}
// Run function create and Animate SnowEffect
createSnowEffect();

// Display mobile menu on click
const mainNav = document.getElementById('mainNav');
const topHeader = document.getElementById('topHeader');
showMenuBtn.addEventListener('click', () =>{
    topHeader.classList.toggle('showMenu');
})
