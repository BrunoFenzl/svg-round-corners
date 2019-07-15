import Canvas from './canvas.js';

const rangeSlider = document.getElementById('radius-range');

const svgs = [...document.querySelectorAll('[data-svg]')];

const canvases = [];
svgs.forEach((el) => {
  console.log(el);
  canvases.push(new Canvas(el));
});


svgs.forEach((el, i) => {
  rangeSlider.addEventListener('input', evt => {
    canvases[i].calculatePath(evt.target.value);
  });
})
