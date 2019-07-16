import { roundCorners } from './canvas.js';

const rangeSlider = document.getElementById('radius-range');

const svgs = [...document.querySelectorAll('[data-svg]')];

svgs.forEach(svg =>
  svg.setAttribute('data-original-d', svg.getAttribute('d'))
);

rangeSlider.addEventListener('input', () => 
  svgs.forEach(svg => 
    svg.setAttribute('d', roundCorners(svg.getAttribute('data-original-d')))
  )
);
