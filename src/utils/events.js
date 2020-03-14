// From https://gist.github.com/hkwon/766a7344c9f29675bd9eb49281a7936a

function Events() {
  const subscriptions = {};

  this.on = function subscribeCallbackToEvent(eventType, callback) {
    const id = Symbol("id");
    if (!subscriptions[eventType]) subscriptions[eventType] = {};
    subscriptions[eventType][id] = callback;
  };

  this.emit = function publishEventWithArgs(eventType, arg) {
    if (!subscriptions[eventType]) return;

    Object.getOwnPropertySymbols(subscriptions[eventType]).forEach(key =>
      subscriptions[eventType][key](arg)
    );
  };
}

const events = new Events();

export const send = (key, payload = null) => {
  return events.emit(key, payload);
};

export const receive = (key, callback) => events.on(key, callback);
