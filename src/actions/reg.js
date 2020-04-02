// eslint-disable-next-line no-unused-vars
export class Reg {
    constructor() {
        this.actions = {}
        this.keydowns = {}
        this.init()
    }
    init() {
        //event
        var self = this
        window.addEventListener('keydown', function (event) {
            self.keydowns[event.code] = true;
            // 比对获取KEY 响应的函数 并执行
            self.keyAction()
            console.log('keydown')
        })
        window.addEventListener('keyup', function (event) {
            // log('keyup', event.code)
            self.keydowns[event.code] = false;
        })
    }

    regMouseEvent = (key, object) => {
        var self = this
        let obj = object || window
        obj.addEventListener(key, (event) => {
            if (event.type === 'mousedown') {
                //log('regMouseEvent d', event.movementX)
                self.keydowns[event.type] = true;
                self.keydowns['mousemove'] = true;
                self.keyAction({ key: event.type, x: event.x, y: event.y })
            }
            if (event.type === 'mouseup') {
                //log('regMouseEvent u', event.movementX)
                self.keydowns[event.type] = true;
                self.keydowns['mousemove'] = false;
                self.keyAction({ key: event.type, x: event.x, y: event.y })
                return true
            }
            if (event.type === 'mousemove') {
                // 让鼠标按键控制是否执行 mousemove方法
                if (self.keydowns['mousemove']) {
                    // 比对获取KEY 响应的函数 并执行
                    self.keyAction({ key: event.type, x: event.x, y: event.y })
                }
                return true
            }

            return false

        })
    }

    // 把回调函数 存在相应的KEY
    register = (key, callback) => {
        // ('key ok', key)
        this.actions[key] = callback;
    }

    // 移除 注册
    RemoveRegister = (key) => {
        this.actions[key] = false
        this.keydowns[key] = false
        ////log('RemoveRegister',  this.keydowns[key])
        return false
    }

    // 比对 响应按键 执行保存回调函数
    keyAction(obj) {
        var actions = Object.keys(this.actions);
        if (actions) {
            for (var i = 0; i < actions.length; i++) {
                let key = actions[i];
                if (this.keydowns[key] && this.actions[key]) {

                    if (obj && obj.key === key) {
                        this.actions[key](obj);
                        return
                    }

                    this.actions[key](key);
                    // this.actions[key]();

                }
            }
        }


    }

}