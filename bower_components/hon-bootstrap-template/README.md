HON-Bootstrap-Template
======================

[![Build Status][travis-image]][travis-url]
[![Dependency Status][gemnasium-image]][gemnasium-url]
[![Bower version][bower-image]][bower-url]

Bootstrap Template for HON small project

Install
-------

### Bower

```bash
$ bower install hon-bootstrap-template
```

### Download

Download `hon-bootstrap-template.min.js` and `hon-bootstrap-template.min.css`
from the  [Github Release pages](https://github.com/healthonnet/hon-bootstrap-template/releases)

Usage
-----

### 1. Include the css files in the ``<head>``.

```html
<!-- Bootstrap -->
<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
<!-- HON style -->
<link rel="stylesheet" href="bower_components/hon-bootstrap-template/dist/css/hon-bootstrap-template.min.css">
```

### 2. Include the javascript files at the end of ``<body>``.

```html
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="bower_components/responsive-sticky-footer-plugin/dist/jquery.responsiveStickyFooter.min.js"></script>
<script src="bower_components/hon-bootstrap-template/dist/js/hon-bootstrap-template.min.js"></script>
```

Build
-----

You need Node.js and Ruby, then

```bash
$ gem install sass
$ npm install
$ npm test
```

Release
-------

```bash
$ grunt release
```

License
-------

Apache License 2.0

[travis-image]: https://travis-ci.org/healthonnet/hon-bootstrap-template.svg?branch=master
[travis-url]: https://travis-ci.org/healthonnet/hon-bootstrap-template
[gemnasium-image]: https://gemnasium.com/badges/github.com/healthonnet/hon-bootstrap-template.svg
[gemnasium-url]: https://gemnasium.com/github.com/healthonnet/hon-bootstrap-template
[bower-image]: https://img.shields.io/bower/v/hon-bootstrap-template.svg
[bower-url]: https://bower.io/search/?q=hon-bootstrap-template
