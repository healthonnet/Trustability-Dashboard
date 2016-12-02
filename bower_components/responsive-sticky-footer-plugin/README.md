Responsive Sticky Footer Plugin
===============================

[![Build Status][travis-image]][travis-url]
[![Dependency Status][gemnasium-image]][gemnasium-url]
[![Bower version][bower-image]][bower-url]

Responsive sticky footer plugin for jQuery

Install
-------

### Bower

```bash
$ bower install responsive-sticky-footer-plugin
```

### Download

Download `jquery.responsiveStickyFooter.min.js` from the  [Github Release pages](https://github.com/williambelle/responsive-sticky-footer-plugin/releases)

Usage
-----

### 1. Include the javascript file on your site.

```html
<script src="dist/jquery.responsiveStickyFooter.min.js"></script>
```

### 2. Add the markup to your HTML.

```html
<footer id="footer" class="footer">
  <div class="container">
    <p class="text-center">Copyright © 2016 Project name</p>
  </div>
</footer>
```

### 3. Call the plugin.

```html
<script>
  $(window).on('load', function() {
    $('#footer').responsiveStickyFooter();
  });
</script>
```

Options
-------

### extraHeight

Type: ``int``

Add an extra height

```javascript
$('#footer').responsiveStickyFooter({
  extraHeight: 50
});
```

Build
-----

You need Node.js, then

```bash
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

The MIT License (MIT)

[travis-image]: https://travis-ci.org/williambelle/responsive-sticky-footer-plugin.svg?branch=master
[travis-url]: https://travis-ci.org/williambelle/responsive-sticky-footer-plugin
[gemnasium-image]: https://gemnasium.com/badges/github.com/williambelle/responsive-sticky-footer-plugin.svg
[gemnasium-url]: https://gemnasium.com/github.com/williambelle/responsive-sticky-footer-plugin
[bower-image]: https://img.shields.io/bower/v/responsive-sticky-footer-plugin.svg
[bower-url]: http://bower.io/search/?q=responsive-sticky-footer-plugin
