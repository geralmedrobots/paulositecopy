import test from "node:test";
import assert from "node:assert/strict";
import {
  isValidEndpoint,
  submitContact,
  validateContact,
} from "../src/services/contactService.js";
test("Endpoint accepts HTTPS or a local path and rejects unsafe destinations", () => {
  for (const endpoint of ["/api/contact", "https://example.com/contact"])
    assert.equal(isValidEndpoint(endpoint), true);
  for (const endpoint of [
    "",
    "//evil.example",
    "/\\evil.example",
    "javascript:alert(1)",
    "http://example.com",
    "https://user:secret@example.com",
    " /api/contact",
    "/api/contact#x",
  ])
    assert.equal(isValidEndpoint(endpoint), false, endpoint);
});
test("Email is required; all original optional fields remain optional", () => {
  assert.ok(validateContact({}).email);
  assert.ok(validateContact({ email: "bad" }).email);
  assert.deepEqual(validateContact({ email: "person@example.com" }), {});
  assert.deepEqual(
    validateContact({ email: "person@example.com" }, "order"),
    {},
  );
  assert.ok(
    validateContact({ email: "person@example.com", message: "x".repeat(10001) })
      .message,
  );
});
test("Submission sends only declared fields and accepts an explicit backend receipt", async () => {
  let request;
  const result = await submitContact(
    { email: " person@example.com ", name: " Guest ", unknown: "discard" },
    {
      kind: "order",
      endpoint: "/api/contact",
      requestId: "test-id",
      fetchImpl: async (url, options) => {
        request = { url, options };
        return { ok: true, json: async () => ({ ok: true }) };
      },
    },
  );
  assert.deepEqual(result, { ok: true });
  const body = JSON.parse(request.options.body);
  assert.deepEqual(body, {
    kind: "order",
    fields: { name: "Guest", email: "person@example.com", message: "" },
    requestId: "test-id",
  });
  assert.equal(request.options.credentials, "omit");
  assert.equal(request.options.redirect, "error");
});
test("Missing endpoint never sends a request", async () => {
  let called = false;
  await assert.rejects(
    submitContact(
      { email: "person@example.com" },
      {
        endpoint: "",
        fetchImpl: async () => {
          called = true;
        },
      },
    ),
  );
  assert.equal(called, false);
});
test("HTTP failures, invalid JSON and unconfirmed receipts never report success", async () => {
  for (const response of [
    { ok: false },
    { ok: true, json: async () => ({ ok: false }) },
    { ok: true, json: async () => ({ success: true }) },
    {
      ok: true,
      json: async () => {
        throw new Error("not JSON");
      },
    },
  ])
    await assert.rejects(
      submitContact(
        { email: "person@example.com" },
        { endpoint: "/api/contact", fetchImpl: async () => response },
      ),
    );
});
test("Network failures and timeouts are explicit failures", async () => {
  await assert.rejects(
    submitContact(
      { email: "person@example.com" },
      {
        endpoint: "/api/contact",
        fetchImpl: async () => {
          throw new Error("offline");
        },
      },
    ),
  );
  await assert.rejects(
    submitContact(
      { email: "person@example.com" },
      {
        endpoint: "/api/contact",
        timeoutMs: 5,
        fetchImpl: (_url, { signal }) =>
          new Promise((_resolve, reject) =>
            signal.addEventListener("abort", () =>
              reject(new Error("aborted")),
            ),
          ),
      },
    ),
  );
});
test("Caller cancellation aborts a pending submission", async () => {
  const controller = new AbortController();
  const request = submitContact(
    { email: "person@example.com" },
    {
      endpoint: "/api/contact",
      signal: controller.signal,
      fetchImpl: (_url, { signal }) =>
        new Promise((_resolve, reject) =>
          signal.addEventListener("abort", () => reject(new Error("aborted"))),
        ),
    },
  );
  controller.abort();
  await assert.rejects(request);
});
