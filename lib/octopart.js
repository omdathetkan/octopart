/*jslint white: false, indent: 4 */
var EventEmitter = require("events").EventEmitter;
var request = require('request');

var octopart = {};

//// private helper functions ////
var formatArgs = function (args) {
    var i, val, akey, result = {};
    Object.keys(args).forEach(function (key) {
        val = args[key];
        if (Array.isArray(val)) {
            for (i = 0; i < val.length; i++) {
                akey = key + '[' + i + ']';
                result[akey] = val[i];
            }
        }
        else {
            result[key] = val;
        }
    });
    return result;
};

//// exported octopart module functions ////
octopart.baseurl = "http://octopart.com/api/v3";
octopart.apikey = 'replace-me';

octopart.chunks = function (array, size) {
    var chunks = [];
    while (array.length) {
        chunks.push(array.splice(0, size));
    }
    return chunks;
};

octopart.request = function (endpoint, args) {
    var e = new EventEmitter();

    args.apikey = octopart.apikey;
    args = formatArgs(args);

    request({
        uri: octopart.baseurl + endpoint,
        qs: args,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode !== 200) {
            error = new Error("Invalid status code");
            error.statusCode = response.statusCode;
        }
        if (error) {
            e.emit('failure', error);
        }
        else {
            e.emit('success', body);
        }
        e.emit('complete', error, body);
    });

    // Return EventEmitter
    var self = {};
    self.complete = function (f) {
        e.on('complete', f);
        return self;
    };
    self.success = function (f) {
        e.on('success', f);
        return self;
    };
    self.failure = function (f) {
        e.on('failure', f);
        return self;
    };
    return self;
};

octopart.brands = {
    get: function (uids, options) {
        options = options || {};
        options.uids = Array.isArray(uids) ? uids : [uids];
        return octopart.request("/brands/get_multi", options);
    },
    search: function (q, options) {
        options = options || {};
        options.q = q;
        return octopart.request("/brands/search", options);
    }
};

octopart.categories = {
    get: function (uids, options) {
        options = options || {};
        options.uids = Array.isArray(uids) ? uids : [uids];
        return octopart.request("/categories/get_multi", options);
    },
    search: function (q, options) {
        options = options || {};
        options.q = q;
        return octopart.request("/categories/search", options);
    }
};

octopart.parts = {
    get: function (uids, options) {
        options = options || {};
        options.uids = Array.isArray(uids) ? uids : [uids];
        return octopart.request("/parts/get_multi", options);
    },
    match: function (queries, options) {
        options = options || {};
        options.queries = JSON.stringify(queries);
        return octopart.request("/parts/match", options);
    },
    search: function (q, options) {
        options = options || {};
        options.q = q;
        return octopart.request("/parts/search", options);
    }
};

octopart.sellers = {
    get: function (uids, options) {
        options = options || {};
        options.uids = Array.isArray(uids) ? uids : [uids];
        return octopart.request("/sellers/get_multi", options);
    },
    search: function (q, options) {
        options = options || {};
        options.q = q;
        return octopart.request("/sellers/get_multi", options);
    }
};

module.exports = octopart;