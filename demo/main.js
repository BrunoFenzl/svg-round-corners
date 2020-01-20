import { roundCorners, parsePath } from '../lib';

const xmlns = "http://www.w3.org/2000/svg";

const rangeSlider = document.getElementById('radius-range');

const containers = [...document.querySelectorAll('svg')];
const svgs = [...document.querySelectorAll('path')];

const debug = document.getElementById('debug');

svgs.forEach(svg => {
  const parent = svg.closest('svg');
  const clone = svg.cloneNode();
  // clone.setAttributeNS(null, 'style', 'stroke: red; stroke-opacity:0');
  clone.setAttributeNS(null, 'style', 'stroke: red');
  svg.insertAdjacentElement('beforebegin', clone);
  
  svg.setAttribute('data-original-d', svg.getAttribute('d'));
  const rCorners = roundCorners(svg.getAttribute('data-original-d'), rangeSlider.value);
  console.log(parsePath(svg.getAttribute('data-original-d')), rCorners);
  svg.setAttribute('d', rCorners.path);
  
  rCorners.commands.forEach((el, i) => {
    const circle = document.createElementNS(xmlns, "circle");
    circle.setAttributeNS(null, 'cx', el.values.x || 0);
    circle.setAttributeNS(null, 'cy', el.values.y || 0);
    // circle.setAttributeNS(null, 'r', el.radius);
    // parent.appendChild(circle);
    // const txt = document.createElementNS(xmlns, "text");
    // txt.setAttributeNS(null, 'x', el.values.x || 0);
    // txt.setAttributeNS(null, 'y', el.values.y || 0);
    // txt.appendChild(document.createTextNode(`${i} ${el.marker} ${el.degrees}`));
    // parent.appendChild(txt);
    if (el.degrees) {
    }
  });

  
});

containers.forEach(svg => {
  const rect = svg.getBoundingClientRect();
  svg.addEventListener('mousemove', (evt) => {
    debug.innerText = `${evt.clientX - rect.left} ${evt.clientY - rect.top}`; 
  });
});



rangeSlider.addEventListener('input', () => {
  svgs.forEach(svg => {
    const rCorners = roundCorners(svg.getAttribute('data-original-d'), rangeSlider.value);
    svg.setAttribute('d', rCorners.path);
    }
  )
});
