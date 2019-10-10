import { roundCorners } from './canvas.js';

const xmlns = "http://www.w3.org/2000/svg";

const rangeSlider = document.getElementById('radius-range');

const svgs = [...document.querySelectorAll('path')];

svgs.forEach(svg => {
  const parent = svg.closest('svg');
  const clone = svg.cloneNode();
  clone.setAttributeNS(null, 'style', 'stroke: red');
  svg.insertAdjacentElement('beforebegin', clone);
  
  svg.setAttribute('data-original-d', svg.getAttribute('d'));
  const rCorners = roundCorners(svg.getAttribute('data-original-d'), rangeSlider.value);
  svg.setAttribute('d', rCorners.path);
  
  rCorners.commands.forEach((el, i) => {
    const circle = document.createElementNS(xmlns, "circle");
    circle.setAttributeNS(null, 'cx', el.values.x || 0);
    circle.setAttributeNS(null, 'cy', el.values.y || 0);
    // circle.setAttributeNS(null, 'r', el.radius);
    parent.appendChild(circle);
    // const txt = document.createElementNS(xmlns, "text");
    // txt.setAttributeNS(null, 'x', el.values.x || 0);
    // txt.setAttributeNS(null, 'y', el.values.y || 0);
    // txt.appendChild(document.createTextNode(`${i} ${el.marker} ${el.degrees}`));
    // parent.appendChild(txt);
    if (el.degrees) {
    }
  });
})

rangeSlider.addEventListener('input', () => {
  svgs.forEach(svg => {
    const rCorners = roundCorners(svg.getAttribute('data-original-d'), rangeSlider.value);
    svg.setAttribute('d', rCorners.path);
    }
  )
});
