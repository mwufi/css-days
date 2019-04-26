// alert('Javascript loaded...')

function ran(t){
    return (Math.random() * t);
}

class CanvasDisplay{
    constructor(parent){
        this.canvas = document.createElement("canvas");
        this.canvas.width = 600;
        this.canvas.height = 400;
        parent.appendChild(this.canvas);
        this.cx = this.canvas.getContext('2d');

        this.state = {
            "actors": [
                {x: ran(600), y: ran(400), type: "plant"},
                {x: ran(600), y: ran(400), type: "animal"},
                {x: ran(600), y: ran(400), type: "animal"},
                {x: ran(600), y: ran(400), type: "animal"},
                {x: ran(600), y: ran(400), type: "rock"},
            ]
        };

        this.colors = {
            "plant": "green",
            "animal": "blue",
            "rock": "brown"
        }
    }

    clear(){
        this.canvas.remove();
    }

    clearDisplay(state){
        this.cx.fillStyle = "#EEE";
        this.cx.fillRect(0,0, this.canvas.width, this.canvas.height);
    }
    
    drawActors(state){
        for(let v of state.actors){
            this.cx.fillStyle = this.colors[v.type];
            this.cx.fillRect(v.x, v.y, 10, 10);
        }
    }
    
    moveActors(state){
        for(let v of state.actors){
            if(v.type === "animal" && v.x < 300){
                v.x += 1;
            }
        }
        
        return state;
    }

    update(){
        this.clearDisplay();
        this.drawActors(this.state);
        this.state = this.moveActors(this.state);
    }

    loop(){
        this.update();
        window.requestAnimationFrame(this.loop.bind(this));
    }
}

window.onload = () => {
    var c = new CanvasDisplay(document.getElementById('root'));
    c.loop();
}