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

            this.events[event].push({
                students: context,
                func: handler
            });

            return this;
        },

        off: function (event, context) {
            Object.keys(this.events).forEach(function (key) {
                var fact = this.events[key];
                if (key === event || key.indexOf(event + '.') === 0) {
                    fact.forEach(function (occasion) {
                        if (occasion.students === context) {
                            fact.splice(fact.indexOf(occasion), 1);
                        }
                    }, this);
                }
            }, this);

            return this;
        },

        emit: function (event) {
            var eventMassiv = getEvents(event);

            eventMassiv.forEach(function (singleEvent) {
                if (singleEvent in this.events) {
                    this.events[singleEvent].forEach(function (occasion) {
                        occasion.func.call(occasion.students);
                    });
                }

            }, this);

            return this;

        }

    };
}

function getEvents(event) {
    var result = [];
    var eventMas = event.split('.');
    if (eventMas === event) {
        return result.push(eventMas);
    }

    while (eventMas.length !== 0) {
        result.push(eventMas.join('.'));
        eventMas.pop();
    }

    return result;

}
