import snake from './snake.js';

;(() => {
    let stop;
    let tick_length;
    let last_tick;
    let next_tick;
    let ticks_total;
    let time_since_tick;
    let last_render;

    function main(timestamp) {
        stop = window.requestAnimationFrame(main);
        next_tick = last_tick + tick_length;
        ticks_total = 0;

        if (timestamp > next_tick) {
            time_since_tick = timestamp - last_tick;
            ticks_total = Math.floor(time_since_tick / tick_length);
        }

        queue_updates(ticks_total);
        render(timestamp);
        last_render = timestamp;
    }

    function queue_updates(ticks_total) {
        for (let i = 0; i < ticks_total; i++) {
            last_tick += tick_length;
            update(last_tick);
        }
    }

    function update(last_tick) {
        const head = snake.segments[0];
        const dist = snake.dir * snake.size; 
        
        if (snake.axis && snake.dir) {
            snake.ctx.clearRect(
                0,
                0,
                snake.canvas.width,
                snake.canvas.height
            );

            snake.segments.unshift({
                x: snake.axis === 'x' ? head.x + dist : head.x,
                y: snake.axis === 'y' ? head.y + dist : head.y, 
            });

            snake.segments.pop();
        }
        
        if (head.x === snake.target.x && head.y === snake.target.y) {
            snake.segments.push(snake.target);
       
            snake.score.textContent = snake.segments.length;

            snake.new_target = snake.get_target_loc();
        }
    }

    function render(timestamp) {
        snake.draw_snake();
        snake.draw_target();
    }

    last_tick = performance.now();
    last_render = last_tick;
    tick_length = 50;

    main(performance.now());
})();

