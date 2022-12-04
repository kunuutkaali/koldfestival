window.onload = () =>{
    // Define, create a canvas and prepend it to body when the window has been loaded
    const bgCanvas = document.createElement('canvas');
    bgCanvas.id = 'bgCanvas';
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    document.body.prepend(bgCanvas);

    // Define context    
    const ctx = bgCanvas.getContext('2d');
    
    // Get the image and show it
    let src = 'snowflake.svg';
    const snowflake = new Image();
    snowflake.src = src;
    snowflake.onload = ()=>{
        // Create the snow effect
        const snowEffect = new Snoweffect(ctx, bgCanvas.width, bgCanvas.height, snowflake);
        // initiate and define number of snowflakes as param. If not set define by window width:
        snowEffect.init();
        // Starte the actual animation.
        snowEffect.animate();
    }
}
class Snowflake {
    constructor(effect, img){
        this.img = img;
        this.scale = Math.random() * (0.25 - 0.05) + 0.05;
        this.width = img.width * this.scale;
        this.height = img.height * this.scale;
        this.effect = effect;
        this.x = Math.random() * this.effect.width - this.width * 0.5;
        this.y = Math.random() * this.effect.height - this.width;
        this.speedY = 4 * this.scale;
    }
    update(){
        if(this.y > this.effect.height){
            this.x = Math.random() * this.effect.width - this.width;
            this.y = -this.height;
        }
        this.y += this.speedY;
    }
    draw(context){
        context.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}

// Snow effect
class Snoweffect {
    constructor(ctx, width, height, flakeImage){
        this.context = ctx;
        this.flakeImage = flakeImage;
        this.width = width;
        this.height = height;
        this.flakes = [];
    }
    init(numberOfFlakes){
        if(numberOfFlakes === undefined){
            if(this.width < 675){
                numberOfFlakes = 10;
            }else if(this.width < 800){
                numberOfFlakes = 25;
            }else if(this.width < 1800){
                numberOfFlakes = 35;
            }else{
                numberOfFlakes = 50;
            }
        }
        for(let i = 0; i < numberOfFlakes; i++){
            this.flakes.push(new Snowflake(this, this.flakeImage))
        }
    }
    update(){
        this.flakes.forEach(flake => flake.update())
    }
    draw(){
        this.flakes.forEach(flake => flake.draw(this.context));
    }
    animate(){
        this.context.clearRect(0, 0, this.width, this.height);
        this.update();
        this.draw(this.context);
        requestAnimationFrame(this.animate.bind(this));
    }
}