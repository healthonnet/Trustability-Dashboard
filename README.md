HON-Gold-Standard-Trustability
==============================

Gold standard benchmark dashboard

Install
-------

This project is shipped with `yarn`. You can use it instead of `npm` for packet management.

### With yarn

```
$ yarn
$ bower install
```

### With npm

```
$ npm install
```

Test
----

```
$ npm test
```

Run
---

Launch an express server at http://localhost:3000

```
$ npm start
```

You can set a different port with the environment variable `PORT`.

```
$ PORT=5000 npm start
```

Input information
-----------------

### Database selection

Choose between

* khresmoi_docs
* kconnect_docs

### Comparator

Add A comparator file. It is useful for showing results spinner information.

### Add a URL

Fetch from `api-kconnect`

### Add a Domain

Fetch from `CouchDB` available in `api-kconnect`.

### Run the whole database

Will fetch the database results and show the output for benchmark comparison.

API Documentation
-----------------

### API information

```
GET /api
{
  "title": "xxxxx",
  "version": "xxxx"
}
```

### Conducts routes

```
GET /api/conducts
{
  "message": "nothing to show.",
}
```

```
POST /api/conducts
file: conduct
{
  "message": "file has been uploaded.",
  "size": "number of HONconducts found",
}
```

```
GET /api/conducts/:conduct
{
  trustability: {}
}
```

Author
------

Pierre REPETTO-ANDIPATIN: <pierre.repetto@healthonnet.org>

License
-------

MIT
