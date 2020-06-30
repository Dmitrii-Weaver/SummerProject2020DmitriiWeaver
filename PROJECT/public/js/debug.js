

export function setupMouseControl(canvas, entity, camera) {
    let lastevent

    let arr = ['mousedown', 'mousemove']
    arr.forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons === 1) {
                entity.vel.set(0, 0)
                entity.pos.set(
                    event.offsetX + camera.pos.x,
                    event.offsetY + camera.pos.y
                )
            }
            else if (event.buttons === 2 && lastevent && lastevent.buttons == 2 && lastevent.type == 'mousemove') {
                camera.pos.x -= event.offsetX - lastevent.offsetX

            }
            lastevent = event
        })
    });

    canvas.addEventListener('contextmenu', event => {
        event.preventDefault()
    })
}