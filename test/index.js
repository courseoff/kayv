var assert = require('assert');
var kayv = require('../');

var db = kayv('foobar');
var db2 = kayv('foobar2');

test('clear previous', function(done) {
    kayv('foobar2').clear(function() {
        db.clear(done);
    });
});

test('set', function(done) {
    db.set('foo', 'bar', done);
});

test('get', function(done) {
    db.get('foo', function(err, val) {
        assert.ifError(err);
        assert.equal(val, 'bar');
        done();
    });
});

test('should return `null` for unset `get`', function(done) {
    db.get('xkcd', function(err, val) {
        assert.ifError(err);
        assert.equal(undefined, val);
        done();
    });
});

test('should prefix keys', function(done) {
    db2.set('foo', 'baz', function() {
        db.get('foo', function(err, val) {
            assert.ifError(err);
            assert.equal(val, 'bar');
            done();
        });
    });
});

test('should have correct length', function(done) {
    db.length(function(err, length) {
        assert.equal(length, 1);
        done();
    });
});

test('should clear', function(done) {
    db.clear(done);
});

test('should have 0 length after clear', function(done) {
    db.length(function(err, length) {
        assert.equal(length, 0);
        done();
    });
});

test('should not have cleared other db', function(done) {
    db2.length(function(err, length) {
        assert.equal(length, 1);
        done();
    });
});

test('should save/restore objects', function(done) {
    var obj = { hello: 'world', when: 5 };

    db.set('magic', obj, function(err) {
        assert.ifError(err);

        db.get('magic', function(err, val) {
            assert.ifError(err);
            assert.deepEqual(val, obj);
            done();
        });
    });
});
