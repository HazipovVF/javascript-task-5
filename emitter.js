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
            event = getOffEvents(event, Object.keys(this.events));
            event.forEach(function (eventt) {
                for (var i = 0; i < this.events[eventt].length; i++) {
                    if (this.events[eventt][i].students.focus === context.focus &&
                            this.events[eventt][i].students.wisdom === context.wisdom) {
                        this.events[eventt].splice(i, 1);
                    }
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
    result.push(event);
    if (event.indexOf('.') >= 0) {
        result.push(event.slice(0, event.indexOf('.')));
    }

    return result;
}

function getOffEvents(event, keys) {
    var result = [];
    if (event.indexOf('.') >= 0) {
        keys.forEach(function (key) {
            if (key === event) {
                result.push(event);
            }
        });


        return result;
    }
    keys.forEach(function (key) {
        if (key.indexOf(event) >= 0) {
            result.push(key);
        }
    });

    return result;
}
