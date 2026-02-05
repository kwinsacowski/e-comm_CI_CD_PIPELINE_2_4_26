import "@testing-library/jest-dom";
import "whatwg-fetch";

import { TextEncoder, TextDecoder } from "util";

if (!globalThis.TextEncoder) {
  globalThis.TextEncoder = TextEncoder as unknown as typeof globalThis.TextEncoder;
}

if (!globalThis.TextDecoder) {
  globalThis.TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder;
}

jest.mock("./firebase/firebaseConfig", () => ({
  auth: {},
  db: {}
}));
