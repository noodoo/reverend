'use strict';

var test = require('tape');
var reverend = require('../');


test('noop', function (t) {
    var path, actual;

    path = '/';
    actual = reverend(path, {});
    t.equal(actual, path);

    path = '/foo';
    actual = reverend(path, {});
    t.equal(actual, path);

    path = '/foo/';
    actual = reverend(path, {});
    t.equal(actual, path);

    path = '/foo/bar';
    actual = reverend(path, {});
    t.equal(actual, path);

    path = '/foo/bar/';
    actual = reverend(path, {});
    t.equal(actual, path);

    t.end();
});


test('replacement', function (t) {
    var data, path, actual;

    data = {
        foo: 'foo',
        baz: 'baz'
    };

    path = '/:foo';
    actual = reverend(path, data);
    t.equal(actual, '/foo');

    path = '/:foo/';
    actual = reverend(path, data);
    t.equal(actual, '/foo/');

    path = '/:foo/bar';
    actual = reverend(path, data);
    t.equal(actual, '/foo/bar');

    path = '/:foo/bar/';
    actual = reverend(path, data);
    t.equal(actual, '/foo/bar/');

    path = '/:foo/bar/:baz';
    actual = reverend(path, data);
    t.equal(actual, '/foo/bar/baz');

    path = '/:foo/bar/:baz/';
    actual = reverend(path, data);
    t.equal(actual, '/foo/bar/baz/');

    path = '/:foo/bar/:foo/';
    actual = reverend(path, data);
    t.equal(actual, '/foo/bar/foo/');

    path = '/:foo/:bar/:foo/';
    actual = reverend(path, data);
    t.equal(actual, '/foo//foo/');

    t.end();
});


test('optional replacement', function (t) {
    var data, path, actual;

    data = {
        foo: 'foo',
        baz: 'baz'
    };

    path = '/:foo?';
    actual = reverend(path, data);
    t.equal(actual, '/foo');

    path = '/:foo?/';
    actual = reverend(path, data);
    t.equal(actual, '/foo/');

    path = '/:foo?/:bar?';
    actual = reverend(path, data);
    t.equal(actual, '/foo/');

    path = '/:foo?/:bar?/';
    actual = reverend(path, data);
    t.equal(actual, '/foo/');

    path = '/:bar?';
    actual = reverend(path, data);
    t.equal(actual, '/');

    path = '/:bar?/';
    actual = reverend(path, data);
    t.equal(actual, '/');

    path = '/:bar?/:baz?';
    actual = reverend(path, data);
    t.equal(actual, '/baz');

    path = '/:bar?/:baz?/';
    actual = reverend(path, data);
    t.equal(actual, '/baz/');

    t.end();
});

test('path type validation', function (t) {
    t.doesNotThrow(function () {
        reverend('/some/string', {});
    });

    t.doesNotThrow(function () {
        reverend(['/some/string'], {});
    });

    t.throws(function () {
        reverend(undefined, {});
    });

    t.throws(function () {
        reverend(null, {});
    });

    t.throws(function () {
        reverend(true, {});
    });

    t.throws(function () {
        reverend(10, {});
    });

    t.throws(function () {
        reverend({}, {});
    });

    t.throws(function () {
        reverend(/re/, {});
    });

    t.throws(function () {
        reverend(function () {}, {});
    });

    t.throws(function () {
        reverend([/re/], {});
    });

    t.end();
});
