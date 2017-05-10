(function ($) {
  'use strict';

  /**
   * Volatile structure
   * {
   *   'my-domain.com': {
   *     honconduct: true,
   *     urls: [{
   *       url: 'https://my-domain.com/page-1',
   *       results: [0,1,0,1,0,0,0]
   *     }, ...],
   *   }
   * }
   */
  var structure = {};
  if (localStorage.structure) {
    structure = JSON.parse(localStorage.structure);
  }

  /**
   * Progressbar params
   * simple code taken from progressbar.js tutorial
   */
  var progressbarParams = {
    color: '#aaa',
    strokeWidth: 10,
    trailWidth: 8,
    easing: 'easeInOut',
    duration: 1400,
    text: {
      autoStyleContainer: false,
    },
    from: { color: '#ea5752', width: 10 },
    to: { color: '#75dd49', width: 10 }, // 4fb722
    step: function (state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);

      var value = Math.round(circle.value() * 100);
      circle.setText(value + ' %');
      circle.text.style.color = state.color;
    },
  };

  // Defines circles
  var circles = {
    authority: new ProgressBar.Circle('#authority', progressbarParams),
    complementarity: new ProgressBar.Circle('#complementarity',
      progressbarParams),
    privacy: new ProgressBar.Circle('#privacy', progressbarParams),
    attribution: new ProgressBar.Circle('#attribution', progressbarParams),
    justifiability: new ProgressBar.Circle('#justifiability', progressbarParams),
    transparency: new ProgressBar.Circle('#transparency', progressbarParams),
    finance: new ProgressBar.Circle('#finance', progressbarParams),
    ad: new ProgressBar.Circle('#ad', progressbarParams),
    date: new ProgressBar.Circle('#date', progressbarParams),
  };

  // Set fontsize for each circle
  for (var variable in circles) {
    if (circles.hasOwnProperty(variable)) {
      circles[variable].text.style.fontSize = '3rem';
    }
  }

  /**
   * http://stackoverflow.com/questions/8498592
   */
  function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get the hostname
    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];

    return hostname;
  }

  function addUrl(object) {
    // Yes, object.host should have been named object.url
    var domain = extractHostname(object.host);

    // Domain does not exist
    if (!structure[domain]) {
      structure[domain] = {
        urls: [],
        principles: [0,0,0,0,0,0,0,0,0],
      };
      if (object.expected) {
        structure[domain].honconduct = true;
      }
    }

    var isUnique = true;
    for (var i = 0; i < structure[domain].urls; i++) {
      if (structure[domain].urls[i] === object.host) {
        isUnique = false;
      }
    }

    if (isUnique) {
      structure[domain].urls.push({
        url: object.host,
        results: object.found,
      });
      for (i = 0; i < 9; i++) {
        if (object.found[i] > 0) {
          structure[domain].principles[i] = 1;
        }
      }
    }
  }

  function getURLrows(urls, expected, principles) {
    var result = '';
    var extra = [];
    var found = [];
    var total = [];
    for (var i = 0; i < urls.length; i++) {
      found = [0,0,0,0,0,0,0,0,0];
      for (var j = 0; j < 9; j++) {
        extra[j] = '';
        if (expected && urls[i].results[j] === 0) {
          extra[j] = ' danger';
        }
        if (urls[i].results[j] > 0) {
          extra[j] = ' success';
          found[j] = 1;
         }
      }
      result += '<tr>' +
        '<td><a href="' + urls[i].url + '">' + urls[i].url + '</a></td>' +
        '<td class="text-right' + extra[0] + '">' + found[0] + '</td>' +
        '<td class="text-right' + extra[1] + '">' + found[1] + '</td>' +
        '<td class="text-right' + extra[2] + '">' + found[2] + '</td>' +
        '<td class="text-right' + extra[3] + '">' + found[3] + '</td>' +
        '<td class="text-right' + extra[4] + '">' + found[4] + '</td>' +
        '<td class="text-right' + extra[5] + '">' + found[5] + '</td>' +
        '<td class="text-right' + extra[6] + '">' + found[6] + '</td>' +
        '<td class="text-right' + extra[7] + '">' + found[7] + '</td>' +
        '<td class="text-right' + extra[8] + '">' + found[8] + '</td>' +
        '</tr>';
    }
    for (i = 0; i < 9; i++) {
      total[i] = '&#10060;';
      if (principles[i] > 0) {
        total[i] = '&#9989';
      }
    }
    result += '<tr>' +
      '<th class="text-right">summary</th>' +
      '<td class="text-right">' + total[0] + '</td>' +
      '<td class="text-right">' + total[1] + '</td>' +
      '<td class="text-right">' + total[2] + '</td>' +
      '<td class="text-right">' + total[3] + '</td>' +
      '<td class="text-right">' + total[4] + '</td>' +
      '<td class="text-right">' + total[5] + '</td>' +
      '<td class="text-right">' + total[6] + '</td>' +
      '<td class="text-right">' + total[7] + '</td>' +
      '<td class="text-right">' + total[8] + '</td>' +
      '</tr>';
    return result;
  }

  function printHost(domain, object) {
    return '<table class="table table-striped table-condensed">' +
      '<thead><tr><th>' + domain + '</th>' +
      '<th class="text-right">HC1</th>' +
      '<th class="text-right">HC2</th>' +
      '<th class="text-right">HC3</th>' +
      '<th class="text-right">HC4</th>' +
      '<th class="text-right">HC5</th>' +
      '<th class="text-right">HC6</th>' +
      '<th class="text-right">HC7</th>' +
      '<th class="text-right">HC8</th>' +
      '<th class="text-right">HC9</th>' +
      '</th></thead><tbody>' +
      getURLrows(object.urls, object.honconduct, object.principles) +
      '</tbody></table>';
  }

  function printHosts(container) {
    container.innerHTML = '';
    for (var host in structure) {
      if (structure.hasOwnProperty(host)) {
        container.innerHTML += printHost(host, structure[host]);
      }
    }
    animate();
  }

  function saveStructure() {
    localStorage.structure = JSON.stringify(structure);
  }

  function getProportion() {
    var result = [0,0,0,0,0,0,0,0,0];
    var count = 0;
    for (var host in structure) {
      if (structure.hasOwnProperty(host)) {
        for (var j = 0; j < 9; j++) {

          result[j] += structure[host].principles[j];
        }
        count++;
      }
    }
    if (count > 0) {
      for (var i = 0; i < 9; i++) {
        result[i] = result[i] / count;
      }
    }
    return result;
  }

  function animate() {
    var i = 0;
    var val = 0;
    var found = getProportion();
    for (var variable in circles) {
      if (circles.hasOwnProperty(variable)) {
        val = found[i];
        circles[variable].animate(val);
        i++;
      } else {
        // Useless case to avoid jshint crying.
        i++;
      }
    }
  }

  Loader.Load = {
    load: function (container, json) {
      Loader.Load.loadJson(JSON.parse(json));
    },

    loadJson: function(container, json) {
      if (Array.isArray(json)) {
        for (var i = 0; i < json.length; i++) {
          addUrl(json[i]);
        }
      } else {
        addUrl(json);
      }
      printHosts(container);
      saveStructure();
    },

    removeHost: function() {

    },

    removeAll: function(evt) {
      structure = {};
      printHosts(document.getElementById('details'));
      saveStructure();
    },

    printHosts: function(container) {
      printHosts(document.getElementById(container));
    },

    handleFileSelect: function (evt) {
      var files = document.getElementById('file-input').files;
      if (!files.length) {
        window.alert('Please select a file!');
        return;
      }

      var file = files[0];
      var reader = new FileReader();
      reader.onloadend = function (evt) {
        if (evt.target.readyState === FileReader.DONE) {
          Loader.Load.load(
            document.getElementById('details'),
            evt.target.result
          );
        }
      };
      reader.readAsText(file, 'UFT-8');
    },

    handleURLSelect: function(evt) {
      var url = document.getElementById('url-input').value;
      $.ajax({
        url: '/api/url/' + encodeURIComponent(url),
        success: function(result) {
          Loader.Load.loadJson(
            document.getElementById('details'),
            result
          );
        },
        error: function(error) {
          window.alert('The provided URL does not work. Sad!');
        }});
    },

    handleDomainSelect: function(evt) {
      window.alert('Not yet implemented.');
    },
  };
})(jQuery);
