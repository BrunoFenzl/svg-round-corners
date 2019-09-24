import { roundCorners } from './canvas.js';

const xmlns = "http://www.w3.org/2000/svg";

const rangeSlider = document.getElementById('radius-range');

const svgs = [...document.querySelectorAll('[data-svg]')];

svgs.forEach(svg =>
  svg.setAttribute('data-original-d', svg.getAttribute('d'))
);

svgs.forEach(svg => {
  const parent = svg.closest('svg');
  const rCorners = roundCorners(svg.getAttribute('data-original-d'), rangeSlider.value);
  svg.setAttribute('d', rCorners.path)
  rCorners.commands.forEach((el, i) => {
    const txt = document.createElementNS(xmlns, "text");
    txt.setAttributeNS(null, 'x', el.values.x || 0);
    txt.setAttributeNS(null, 'y', el.values.y || 0);
    txt.appendChild(document.createTextNode(`${i}:${el.marker}`));
    parent.appendChild(txt);
  });
})

rangeSlider.addEventListener('input', () => 
  svgs.forEach(svg => {
    const rCorners = roundCorners(svg.getAttribute('data-original-d'), rangeSlider.value);
    svg.setAttribute('d', rCorners.path);
    }
  )
);
