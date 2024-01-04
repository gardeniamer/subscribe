class Observer {
    constructor() {
        this.message = {}
    }

    subscribe(type, fn) {
        if (!this.message[type]) {
            this.message[type] = []
        }
        this.message[type].push(fn)
    }

    unsubscribe(type, fn) {
        if (!this.message[type]) {
            return
        }
        if (!fn) {
            delete this.message[type]
        }
        else {
            this.message[type] = this.message[type].filter((item) => item != fn)
        }

    }

    publish(type, data, once = false) {
        if (!this.message[type]) {
            return
        }
        this.message[type].forEach((item) => {
            item(data)
        })
        if (once) delete this.message[type]
    }

}

const p1 = new Observer()

p1.subscribe("abc", handlerA)
p1.subscribe("abc", handlerB)

function handlerA(data) {
    console.log("handlerA:" + data);
}

function handlerB() {
    console.log("handlerB");
}

p1.unsubscribe("abc", handlerB)

p1.publish("abc", 123)