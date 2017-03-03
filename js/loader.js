(function ($) {
  'use strict';

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
  var found = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var expected = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var extra = ['', '', '', '', '', '', '', '', ''];

  // Set fontsize for each circle
  for (var variable in circles) {
    if (circles.hasOwnProperty(variable)) {
      circles[variable].text.style.fontSize = '3rem';
    }
  }

  function printHost(container, object) {
    for (var i = 0; i < 9; i++) {
      expected[i] += object.expected[i] > 0 ? 1 : 0;
      found[i] += object.expected[i] > 0 && object.found[i] > 0 ? 1 : 0;
      if (object.expected[i] === 0 && object.found[i] > 0) {
        extra[i] = ' danger';
      } else if (object.expected[i] <= object.found[i]) {
        extra[i] = ' success';
      } else {
        extra[i] = '';
      }
    }

    container.innerHTML += '<tr>' +
      '<td><a href="http://' + object.host + '">' + object.host + '</a></td>' +
      '<td class="text-right' + extra[0] + '">' + object.found[0] + '</td>' +
      '<td class="text-right' + extra[1] + '">' + object.found[1] + '</td>' +
      '<td class="text-right' + extra[2] + '">' + object.found[2] + '</td>' +
      '<td class="text-right' + extra[3] + '">' + object.found[3] + '</td>' +
      '<td class="text-right' + extra[4] + '">' + object.found[4] + '</td>' +
      '<td class="text-right' + extra[5] + '">' + object.found[5] + '</td>' +
      '<td class="text-right' + extra[6] + '">' + object.found[6] + '</td>' +
      '<td class="text-right' + extra[7] + '">' + object.found[7] + '</td>' +
      '<td class="text-right' + extra[8] + '">' + object.found[8] + '</td>' +
      '</tr>';

    animate();
  }

  function animate() {
    var i = 0;
    var val = 0;
    for (var variable in circles) {
      if (circles.hasOwnProperty(variable)) {
        val = expected[i] === 0 ? 0 : found[i] / expected[i];
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
      var benchmark = JSON.parse(json);
      if (Array.isArray(benchmark)) {
        for (var i = 0; i < benchmark.length; i++) {
          printHost(container, benchmark[i]);
        }
      } else {
        printHost(container, benchmark);
      }
    },
  };
})(jQuery);
