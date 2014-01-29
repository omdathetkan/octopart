# Octopart

A simple wrapper for the Octopart V3 API for Node.
http://octopart.com/api/docs/v3/rest-api

## Quick Example

```javascript
var octopart = require("octopart");

octopart.apikey = '12345678';

var queries = [
    {reference: '1', mpn: 'SN74S74N'},
    {reference: '2', mpn: 'CRCW060310K0FKEA'},
];

octopart.parts.match(queries, {
    exact_only: true,
    show: ['uid','mpn','manufacturer']
}).success(function(body) {
    for(var i=0;i<body.results.length;i++) {
        console.log("Result", i, body.results[i].items);
    }
}).failure(function(err) {
    console.log("Ooops....", err");
});
```

## Implemented endpoints

```javascript
octopart.brands.get(uids, options)
octopart.brands.search(q, options)
octopart.categories.get(uids, options)
octopart.categories.search(q, options)
octopart.parts.get(uids, options)
octopart.parts.match(queries, options)
octopart.parts.search(q, options)
octopart.sellers.get(uids, options)
octopart.sellers.search(q, options)
```