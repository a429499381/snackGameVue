//碰撞检测


/* 最难调试碰撞检测 */
var collide = function (head, foo) {

    if (head.x == undefined || head.y == undefined || head.w == undefined || head.h == undefined) {
        log(head, `${head.name}`, 'collide碰撞检测参数不全')
        return false
    }
    if (foo.x == undefined || foo.y == undefined || foo.w == undefined || foo.h == undefined) {
       //  log(paddle, `${paddle.name}`, 'collide碰撞检测参数不全')
        return false
    }

    if(head.x === foo.x && head.y === foo.y) {
        return true
    }

    return false

    
}

