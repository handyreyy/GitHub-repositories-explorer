import { vi } from "vitest";

export const mockGet = vi.fn();

export default {
  create: () => ({
    get: mockGet,
  }),
};
