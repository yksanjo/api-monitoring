const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

test('next app has app router entry files', () => {
  assert.equal(fs.existsSync('app/layout.tsx'), true);
  assert.equal(fs.existsSync('app/page.tsx'), true);
});
