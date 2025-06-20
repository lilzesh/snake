import { axes, dirs } from './vars.js';

class Snake {
    constructor(options) {
        this.canvas = options.root;
        this.ctx = this.canvas.getContext('2d');
        this.bounds = this.canvas.getBoundingClientRect();

        this.size = 10;
        this.segments = [{
            x: this.coord('x'),
            y: this.coord('y'),
        }];
        this.axis = undefined;
        this.dir = undefined;

        this.target = this.get_target_loc();

        this.score = score;

        window.addEventListener('keydown', this.key.bind(this));
    }

    set add(segment) {
        this.segments.push(segment);
    }

    set new_target(segment) {
        this.target = segment;
    }

    key(e) {
        this.axis = axes[e.code];
        this.dir = dirs[e.code];
    }

    coord(axis) {
        let anchors = axis === 'x'
            ? this.bounds.width / this.size
            : this.bounds.height / this.size;
        
        anchors -= this.size;
        
        return Math.floor(Math.random() * anchors) * this.size;
    }

    get_target_loc() {
        let found = false;

        const segment = {
            x: this.coord('x'),
            y: this.coord('y'),
        };
       
        for (let i = 0; i < this.segments.length; i++) {
            const xs_same = this.segments[i].x === segment.x;
            const ys_same = this.segments[i].y === segment.y;

            if (xs_same && ys_same) {
                found = true;
                break;
            }
        }

        return found ? this.get_target_loc() : segment;
    }

    draw_snake() {
        for (let i = 0; i < this.segments.length; i++) {
            this.ctx.fillStyle = '#a9b1d6';
            
            this.ctx.fillRect(
                this.segments[i].x,
                this.segments[i].y,
                this.size,
                this.size
            );
        }
    }

    draw_target() {
        this.ctx.fillStyle = '#9ece6a';
        
        this.ctx.fillRect(
            this.target.x,
            this.target.y,
            this.size,
            this.size
        );
    }
}

export default new Snake({
    root,
});
