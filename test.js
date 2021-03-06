const { spawn } = require('child_process');
const request = require('request');
const test = require('tape');

const child = spawn('node', ['index.js']);
test('responds to requests', (t) => {
  t.plan(3);
  child.stdout.on('data', () => {
    request('http://127.0.0.1:5000', (err, res, body) => {
      child.kill();
      t.false(err);
      t.equal(res.statusCode, 200);
      t.notEqual(body.indexOf('Hello World'), -1);
    });
  });
});
