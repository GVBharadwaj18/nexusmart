// import { Inngest } from "inngest";

// // Create a client to send and receive events
// export const inngest = new Inngest({ id: "NexusMart e-commerce" });

// /inngest/client.ts
let InngestClass;

try {
  // Only load the real package on the server
  if (typeof window === "undefined") {
    InngestClass = require("inngest").Inngest;
  } else {
    // Browser fallback: a harmless mock
    InngestClass = function () {
      return {
        createFunction: () => ({}),
        send: () => Promise.resolve(),
      };
    };
  }
} catch (_e) {
  InngestClass = function () {
    return {
      createFunction: () => ({}),
      send: () => Promise.resolve(),
    };
  };
}

export const inngest = new InngestClass({ id: "NexusMart e-commerce" });
