/* ===== Wave Hello Component ===== */

(function () {
  'use strict';

  var greetings = [
    'Hello',       // English
    'Hola',        // Spanish
    'Bonjour',     // French
    'Hallo',       // German
    'Ciao',        // Italian
    'Olá',         // Portuguese
    'こんにちは',    // Japanese
    '안녕하세요',    // Korean
    '你好',         // Chinese
    'नमस्ते',       // Hindi
    'Hej',         // Swedish / Danish
    'Merhaba',     // Turkish
    'Xin chào',    // Vietnamese
    'Hei',         // Norwegian
    'Hallo',       // Dutch
  ];

  var hand = document.querySelector('.wave-hand');
  var greeting = document.querySelector('.wave-greeting');
  if (!hand || !greeting) return;

  var index = 0;
  var PAUSE = 2200;

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function setWaveVariation() {
    hand.style.setProperty('--wave-duration', randomBetween(0.8, 1.1).toFixed(2) + 's');
    hand.style.setProperty('--wave-peak', randomBetween(14, 22).toFixed(1) + 'deg');
    hand.style.setProperty('--wave-valley', randomBetween(-12, -6).toFixed(1) + 'deg');
    hand.style.setProperty('--wave-peak-2', randomBetween(10, 18).toFixed(1) + 'deg');
    hand.style.setProperty('--wave-valley-2', randomBetween(-8, -3).toFixed(1) + 'deg');
    hand.style.setProperty('--wave-peak-3', randomBetween(5, 12).toFixed(1) + 'deg');
  }

  function triggerWave() {
    hand.classList.remove('waving');
    // Force reflow so the animation restarts
    void hand.offsetWidth;
    setWaveVariation();
    hand.classList.add('waving');
  }

  function nextGreeting() {
    index = (index + 1) % greetings.length;

    // Fade out current text
    greeting.classList.remove('fade-in');
    greeting.classList.add('fade-out');

    setTimeout(function () {
      greeting.textContent = greetings[index];
      greeting.classList.remove('fade-out');
      greeting.classList.add('fade-in');

      // Wave with each new greeting
      triggerWave();
    }, 300);
  }

  // Initial wave on load
  setTimeout(triggerWave, 400);

  // Remove waving class when animation ends so it can re-trigger
  hand.addEventListener('animationend', function () {
    hand.classList.remove('waving');
  });

  // Cycle greetings
  setInterval(nextGreeting, PAUSE);
})();
