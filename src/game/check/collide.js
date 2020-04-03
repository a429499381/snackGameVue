//碰撞检测
import {log} from '../gx';


export const collide = function (head, foo) {

    if (head.x == undefined || head.y == undefined ) {
        log(head, `${head}`, 'collide碰撞检测参数不全')
        return false
    }
    if (foo.x == undefined || foo.y == undefined) {
        log(foo, {foo}, 'collide碰撞检测参数不全')
        return false
    }

    if(head.x === foo.x && head.y === foo.y) {
        return true
    }

    return false

    
}

