class Observable {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(o => o !== observer);
    }

    unsubscribeAll() {
        this.observers = [];
    }

    notify(data) {
        this.observers.forEach(observer => observer(data));
    }
}