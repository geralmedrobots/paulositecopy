import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { server } from "../scripts/serve.mjs";
let origin;
before(async () => {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
});
after(() => new Promise((resolve) => server.close(resolve)));
for (const name of ["home", "ultrabot"]) {
  test(`${name}: full video and security headers`, async () => {
    const expected = await readFile(`public/assets/${name}.mp4`);
    const response = await fetch(`${origin}/assets/${name}.mp4`);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("accept-ranges"), "bytes");
    assert.equal(
      response.headers.get("content-length"),
      String(expected.length),
    );
    assert.equal(response.headers.get("content-type"), "video/mp4");
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    assert.ok(response.headers.get("content-security-policy"));
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), expected);
  });
  test(`${name}: closed, open, suffix and clamped ranges`, async () => {
    const expected = await readFile(`public/assets/${name}.mp4`);
    const size = expected.length;
    for (const [range, start, end] of [
      ["bytes=0-99", 0, 99],
      ["bytes=100-", 100, size - 1],
      ["bytes=-50", size - 50, size - 1],
      [`bytes=${size - 20}-${size + 100}`, size - 20, size - 1],
      [`bytes=-${size + 1}`, 0, size - 1],
    ]) {
      const response = await fetch(`${origin}/assets/${name}.mp4`, {
        headers: { Range: range },
      });
      assert.equal(response.status, 206, range);
      assert.equal(
        response.headers.get("content-range"),
        `bytes ${start}-${end}/${size}`,
      );
      assert.equal(
        response.headers.get("content-length"),
        String(end - start + 1),
      );
      assert.deepEqual(
        Buffer.from(await response.arrayBuffer()),
        expected.subarray(start, end + 1),
      );
    }
  });
  test(`${name}: invalid and unsatisfiable ranges`, async () => {
    const size = (await readFile(`public/assets/${name}.mp4`)).length;
    for (const range of [
      "bad",
      "bytes=-",
      "bytes=-0",
      "bytes=50-20",
      `bytes=${size}-`,
      "bytes=0-1,3-4",
      "bytes=999999999999999999999-",
    ]) {
      const response = await fetch(`${origin}/assets/${name}.mp4`, {
        headers: { Range: range },
      });
      assert.equal(response.status, 416, range);
      assert.equal(response.headers.get("content-range"), `bytes */${size}`);
      assert.equal(response.headers.get("accept-ranges"), "bytes");
      assert.ok(response.headers.get("content-security-policy"));
      assert.equal(await response.text(), "");
    }
  });
  test(`${name}: HEAD reports full length without a body, including with Range`, async () => {
    const size = (await readFile(`public/assets/${name}.mp4`)).length;
    for (const headers of [{}, { Range: "bytes=0-99" }]) {
      const response = await fetch(`${origin}/assets/${name}.mp4`, {
        method: "HEAD",
        headers,
      });
      assert.equal(response.status, 200);
      assert.equal(response.headers.get("content-length"), String(size));
      assert.equal(response.headers.get("accept-ranges"), "bytes");
      assert.equal(await response.text(), "");
    }
  });
}
