import { inspect } from "@xstate/inspect";
import { assign, createMachine, interpret } from "xstate";
import invariant from "tiny-invariant";
import "./styles.css";

const machine = createMachine(
  {
    id: "re-entry",
    initial: "idle",
    context: {
      id: null,
      messages: [],
    } as {
      id: string | null;
      messages: string[];
    },
    schema: {
      events: {} as
        | { type: "room.join"; id: string }
        | { type: "room.disconnect" }
        | { type: "room.reconnect" }
        | { type: "message"; payload: string },
    },
    on: {
      "room.join": { actions: "action.assignRoomId", target: "listening" },
    },
    states: {
      idle: {},
      disconnected: {
        on: { "room.reconnect": "listening" },
      },
      listening: {
        on: {
          "room.disconnect": "disconnected",
          message: { actions: ["action.assignMessage"] },
        },
        invoke: {
          src: "service.subscribeToRoom",
          id: "service.subscribeToRoom",
        },
      },
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
    strict: true,
  },
  {
    actions: {
      "action.assignRoomId": assign({
        id: (_, evt) => {
          invariant(evt.type === "room.join");
          return evt.id;
        },
      }),
      "action.assignMessage": assign({
        messages: (ctx, evt) => {
          invariant(evt.type === "message");
          return ctx.messages.concat(evt.payload);
        },
      }),
    },
    services: {
      "service.subscribeToRoom": (ctx, evt) => (send, recv) => {
        let count = 0;
        const int = setInterval(() => {
          send({
            type: "message",
            payload: `Incoming message [${(count += 1)}] from room ${ctx.id}`,
          });
        }, 1000);
        return () => {
          return clearInterval(int);
        };
      },
    },
  },
);

inspect({
  iframe: false,
});

const service = interpret(machine, { devTools: true });
service.start();

const disconnect = document.querySelector(
  "[id=disconnect]",
) as HTMLButtonElement;
const reconnect = document.querySelector("[id=reconnect]") as HTMLButtonElement;
const debug = document.querySelector("[id=debug]") as HTMLElement;
const events = document.querySelector("[id=events]") as HTMLElement;

service.subscribe((s) => {
  debug.textContent = JSON.stringify(
    { value: s.value, context: s.context },
    null,
    2,
  );
  if (s.event.type === "message") {
    events.textContent += "\n" + JSON.stringify(s.event.type, null, 2);
  } else {
    events.textContent += "\n" + JSON.stringify(s.event);
  }
  if (s.can("room.disconnect")) {
    disconnect.disabled = false;
  } else {
    disconnect.disabled = true;
  }
  if (s.can("room.reconnect")) {
    reconnect.disabled = false;
  } else {
    reconnect.disabled = true;
  }
});

document.querySelector("[name=room]")?.addEventListener("change", (e) => {
  invariant(e.target instanceof HTMLSelectElement);
  service.send({ type: "room.join", id: e.target.value });
});
document.querySelector("[id=disconnect]")?.addEventListener("click", (e) => {
  service.send({ type: "room.disconnect" });
});
document.querySelector("[id=reconnect]")?.addEventListener("click", (e) => {
  service.send({ type: "room.reconnect" });
});
