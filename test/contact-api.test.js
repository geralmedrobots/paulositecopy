import assert from "node:assert/strict";
import test from "node:test";

import {
  ContactApiError,
  getContactEndpoint,
  normalizeContact,
  submitContact,
} from "../src/services/contactApi.js";

const values = {
  firstName: " Ana ",
  lastName: " Silva ",
  email: " ana@example.com ",
  phone: " ",
  address: " Coimbra ",
  message: " Gostaria de saber mais. ",
};

function response(status, body = {}, requestId = null) {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: { get: (name) => name.toLowerCase() === "x-request-id" ? requestId : null },
    json: async () => body,
  };
}

test("normalizes and maps contact fields", () => {
  assert.deepEqual(normalizeContact(values), {
    first_name: "Ana",
    last_name: "Silva",
    email: "ana@example.com",
    phone: null,
    address: "Coimbra",
    message: "Gostaria de saber mais.",
  });
});

test("joins the configured API base URL with the contact endpoint", () => {
  assert.equal(
    getContactEndpoint("http://127.0.0.1:8000/"),
    "http://127.0.0.1:8000/api/v1/contacts",
  );
});

test("submits JSON with an idempotency key", async () => {
  let captured;
  const result = await submitContact(values, {
    baseUrl: "http://127.0.0.1:8000",
    idempotencyKey: "test-key_123",
    fetchImpl: async (url, options) => {
      captured = { url, options };
      return response(201, { id: 7, status: "new", created_at: "2026-09-25T09:00:00Z" });
    },
  });

  assert.equal(captured.url, "http://127.0.0.1:8000/api/v1/contacts");
  assert.equal(captured.options.method, "POST");
  assert.equal(captured.options.headers["Content-Type"], "application/json");
  assert.equal(captured.options.headers["Idempotency-Key"], "test-key_123");
  assert.deepEqual(JSON.parse(captured.options.body), normalizeContact(values));
  assert.equal(result.data.id, 7);
});

test("captures the API request ID", async () => {
  const result = await submitContact(values, {
    baseUrl: "http://127.0.0.1:8000",
    fetchImpl: async () => response(201, { id: 1, status: "new", created_at: "x" }, "req-123"),
  });
  assert.equal(result.requestId, "req-123");
});

test("classifies 413 responses", async () => {
  await assert.rejects(
    submitContact(values, {
      baseUrl: "http://127.0.0.1:8000",
      fetchImpl: async () => response(413, {}, "req-413"),
    }),
    (error) => error instanceof ContactApiError && error.code === "requestTooLarge" && error.requestId === "req-413",
  );
});

test("classifies 422 responses", async () => {
  await assert.rejects(
    submitContact(values, {
      baseUrl: "http://127.0.0.1:8000",
      fetchImpl: async () => response(422),
    }),
    (error) => error instanceof ContactApiError && error.code === "validation",
  );
});

test("classifies 429 responses", async () => {
  await assert.rejects(
    submitContact(values, {
      baseUrl: "http://127.0.0.1:8000",
      fetchImpl: async () => response(429),
    }),
    (error) => error instanceof ContactApiError && error.code === "rateLimit",
  );
});

test("classifies server availability errors", async () => {
  for (const [status, code] of [[500, "server"], [503, "unavailable"]]) {
    await assert.rejects(
      submitContact(values, {
        baseUrl: "http://127.0.0.1:8000",
        fetchImpl: async () => response(status),
      }),
      (error) => error instanceof ContactApiError && error.code === code,
    );
  }
});

test("classifies network failures", async () => {
  await assert.rejects(
    submitContact(values, {
      baseUrl: "http://127.0.0.1:8000",
      fetchImpl: async () => { throw new TypeError("network down"); },
    }),
    (error) => error instanceof ContactApiError && error.code === "network",
  );
});
