var Db = function(prefix) {
    if (!(this instanceof Db)) {
        return new Db(prefix);
    }

    var self = this;
    self.prefix = prefix;
    self.storage = global.localStorage;
};

Db.prototype.clear = function(cb) {
    var self = this;
    var storage = self.storage;
    var prefix = self._prefix('');

    try {
        for (var idx=0 ; idx<storage.length ; ++idx) {
            var key = storage.key(idx);
            if (key.indexOf(prefix) != 0) {
                continue;
            }
            storage.removeItem(key);
        }
    } catch (err) {
        return cb(err);
    }

    cb();
};

Db.prototype.set = function(key, val, cb) {
    var self = this;
    key = self._prefix(key);
    try {
        val = JSON.stringify(val);
        self.storage.setItem(key, val);
    } catch (err) {
        return cb(err);
    }

    cb();
};

Db.prototype.get = function(key, cb) {
    var self = this;
    key = self._prefix(key);
    try {
        var item = self.storage.getItem(key);
        item = JSON.parse(item);
        cb(null, item);
    } catch (err) {
        return cb(err);
    }
};

Db.prototype.remove = function(key, val, cb) {
    var self = this;
    key = self._prefix(key);
    try {
        self.storage.removeItem(key);
    } catch (err) {
        return cb(err);
    }

    cb();
};

Db.prototype.length = function(cb) {
    var self = this;

    var storage = self.storage;
    var prefix = self._prefix('');
    var count = 0;
    for (var idx=0 ; idx<storage.length ; ++idx) {
        var key = storage.key(idx);
        if (key.indexOf(prefix) != 0) {
            continue;
        }
        count++;
    }

    cb(null, count);
};

Db.prototype.key = function(idx, cb) {
    var self = this;
    cb(null, self.storage.key(idx));
};

Db.prototype._prefix = function(key) {
    var self = this;
    return (self.prefix ? self.prefix + '.' : '') + key;
};

module.exports = Db;
