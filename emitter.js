'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
getEmitter.isStar = false;
module.exports = getEmitter;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    return {

        events: {},

        on: function (event, context, handler) {


            if (!(event in this.events)) {
                this.events[event] = [];
            }

            this.events[event].push(
                {
                    students: context,
                    func: handler
                });

            return this;
        },

        off: function (event, context) {
            Object.keys(this.events).forEach(function (key) {
                if (key === event || key.indexOf(event + '.') === 0) {
                    this.events[key].forEach(function (ev) {
                        if (ev.students === context) {
                            this.events[key].splice(this.events[key].indexOf(ev), 1);
                        }
                    }, this);
                }
            }, this);

            return this;
        },

        emit: function (event) {
            event = getEvents(event);

            event.forEach(function (eventt) {
                if (eventt in this.events) {
                    this.events[eventt].forEach(function (ev) {
                        ev.func.call(ev.students);
                    });
                }

            }, this);

            return this;

        }

    };
}

function getEvents(event) {
    var result = [];
    var ev = event.split('.');
    if (ev === event) {
        return result.push(ev);
    }

    while (ev.length !== 0) {

        result.push(ev.join('.'));
        ev.pop();
    }

    return result;

}
