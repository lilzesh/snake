import { axes, dirs, bounds } from './vars.js';

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
        window.addEventListener('keydown', this.key.bind(this));
    }

    set add(segment) {
        this.segments.push(segment);
    }

    set new_target(segment) {
        this.target = segment;
    }

    key(e) {
        if (axes[e.code] === this.axis) return;

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

    out_of_bounds() {
        let head = this.segments[0];
        let valid = true;
        
        if (this.dir === -1) {
            valid = head[this.axis] < 0
        } else {
            valid  = head[this.axis] > this.canvas[bounds[this.axis]];
        }

        return valid;
    }

    get_target_loc() {
        const segment = {
            x: this.coord('x'),
            y: this.coord('y'),
        };
       
        const found = this.in_segments(segment, 0);

        return found ? this.get_target_loc() : segment;
    }

    in_segments(segment, start = 0) {
        let found = false;

        for (let i = start; i < this.segments.length; i++) {
            const xs_same = this.segments[i].x === segment.x;
            const ys_same = this.segments[i].y === segment.y;

            if (xs_same && ys_same) {
                found = true;
                break;
            }
        }

        return found;
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
        this.ctx.fillStyle = '#9d7cd8';
        
        this.ctx.fillRect(
            this.target.x,
            this.target.y,
            this.size,
            this.size
        );
    }

    clear() {
        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    }

    reset() {
        this.segments = [{
            x: this.coord('x'),
            y: this.coord('y'),
        }];
        this.axis = undefined;
        this.dir = undefined;
        this.target = this.get_target_loc();
    }
}

export default new Snake({
    root,
});
