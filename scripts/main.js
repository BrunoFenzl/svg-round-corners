import { roundCorners } from './canvas.js';

const xmlns = "http://www.w3.org/2000/svg";

const rangeSlider = document.getElementById('radius-range');

const svgs = [...document.querySelectorAll('path')];
console.log('svgs.length 1', svgs.length);

svgs.forEach(svg => {
  const parent = svg.closest('svg');
  
  const clone = svg.cloneNode();
  clone.setAttributeNS(null, 'style', 'stroke: red');
  svg.insertAdjacentElement('beforebegin', clone);
  
  svg.setAttribute('data-original-d', svg.getAttribute('d'));
  const rCorners = roundCorners(svg.getAttribute('data-original-d'), rangeSlider.value);
  svg.setAttribute('d', rCorners.path);
  
  rCorners.commands.forEach((el, i) => {
    const txt = document.createElementNS(xmlns, "text");
    txt.setAttributeNS(null, 'x', el.values.x || 0);
    txt.setAttributeNS(null, 'y', el.values.y || 0);
    txt.appendChild(document.createTextNode(`${i} ${el.marker} ${el.degrees}`));
    if (el.degrees) {
      parent.appendChild(txt);
    }
  });
})

rangeSlider.addEventListener('input', () => {
  console.log('svgs.length 2', svgs.length);

  svgs.forEach(svg => {
    const rCorners = roundCorners(svg.getAttribute('data-original-d'), rangeSlider.value);
    svg.setAttribute('d', rCorners.path);
    }
  )
});
