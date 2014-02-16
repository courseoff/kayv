# kayv

Offline storage for key/value with an async api and optional key prefixing.

```js
var kayv = require('kayv');

var db = kayv('prefix');

// set a value
db.set('key', { foo: 'bar'}, function(err) {
    // value has been stored under <prefix>.<key>

    // get it later with `get`
    // db.get('key', ...)
});
```

## api

Similar to localStorage API except a callback `fn` is called when operations are complete. Callback functions follow "error first" style with the first argument being an `Error` instance or `null` if success.

### kayv(prefix)

Return a new `Db` instance to access key/values. The `prefix` is used to namespace all of the keys in this way allowing you to create separate "dbs".

### Db#clear(fn)

Clear all values from the db.

### Db#get(key, fn)

Get the value for a given `key`. If there is no `value` previously `set` then `value` will be `null`. Lack of value is NOT an error.

### Db#set(key, value, fn)

Set the `value` for a given `key`. Value can be any JSON serializable type.

### Db#remove(key)

Remove a given `key` from the db.

### Db#length(fn)

Return the number of total keys.

### Db#key(idx, fn)

Get the key at `idx`.
