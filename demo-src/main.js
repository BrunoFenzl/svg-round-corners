import { roundCorners } from '../lib';
import { getAngle, getDistance } from '../lib/utils';

const svgns = 'http://www.w3.org/2000/svg';

class SVGPreview {
  constructor(stageSelector, pathSelector) {
    this.commands = [];
    this.dots = [];
    this.dotRadius = 5;
    this.mouseDownOffset = { x: 0, y: 0 };
    this.activeDotIndex;
    this.radius = 20;

    this.stage = document.querySelector(stageSelector);
    this.stageOffset = this.stage.getBoundingClientRect();
    this.path = document.querySelector(pathSelector);
    // this.rangeSlider = this.rangeSlider;

    // Set the svg stage to be the same size of the window
    this.stage.setAttribute('width', window.innerWidth);
    this.stage.setAttribute('height', window.innerHeight);

    // create clone path to show the difference between original
    // and path with rounded corners.
    this.clone = this.path.cloneNode();
    this.clone.classList.add('original');
    this.path.insertAdjacentElement('beforebegin', this.clone);

    this.rangeSlider = new RangeSlider('.controller', {});
    this.rangeSlider.addEventListener('update', evt => {
      this.radius = evt.detail;
      this.updatePath(evt.metaKey);
    });

    // bind event listeners to this class context
    this.dotMouseDown = this.dotMouseDown.bind(this);
    this.stageMouseMove = this.stageMouseMove.bind(this);
    this.stageMouseUp = this.stageMouseUp.bind(this);
    this.stageClick = this.stageClick.bind(this);

    this.stage.addEventListener('click', this.stageClick);
  }

  updatePath(closedPath) {
    // build the string
    const d =
      this.commands.reduce(
        (acc, curr) =>
          (acc += `${curr.marker}${curr.values.x},${curr.values.y}`),
        ''
      ) + (closedPath ? 'Z' : '');

    // update the path's
    this.path.setAttribute('d', d);
    this.path.setAttribute('data-original-d', d);
    this.clone.setAttribute('d', d);

    // round the corners
    const rCorners = roundCorners(d, this.radius);
    this.path.setAttribute('d', rCorners.path);
  }

  dotMouseDown(evt) {
    const dot = evt.target;
    this.activeDotIndex = this.dots.indexOf(dot);
    this.mouseDownOffset = {
      x:
        evt.clientX -
        this.stageOffset.left +
        this.dotRadius -
        dot.getAttributeNS(null, 'cx'),
      y:
        evt.clientY -
        this.stageOffset.top +
        this.dotRadius -
        dot.getAttributeNS(null, 'cy')
    };

    this.stage.addEventListener('mousemove', this.stageMouseMove);
    this.stage.addEventListener('mouseup', this.stageMouseUp);
  }

  stageMouseMove(evt) {
    const dot = this.dots[this.activeDotIndex];
    const pathCmd = this.commands[this.activeDotIndex].values;
    pathCmd.x = evt.clientX - this.mouseDownOffset.x;
    pathCmd.y = evt.clientY - this.mouseDownOffset.y;

    this.updatePath(evt.metaKey);

    dot.setAttributeNS(null, 'cx', pathCmd.x);
    dot.setAttributeNS(null, 'cy', pathCmd.y);
  }

  stageMouseUp() {
    // Cleanup
    this.stage.removeEventListener('mousemove', this.stageMouseMove);
    this.stage.removeEventListener('mouseup', this.stageMouseUp);
  }

  newDot(x, y) {
    const dot = document.createElementNS(svgns, 'circle');
    dot.setAttributeNS(null, 'cx', x);
    dot.setAttributeNS(null, 'cy', y);
    dot.setAttributeNS(null, 'r', this.dotRadius);
    this.stage.appendChild(dot);

    dot.addEventListener('mousedown', this.dotMouseDown.bind(this));

    return dot;
  }

  stageClick(evt) {
    // if dragging
    if (evt.shiftKey) return;

    const marker = this.commands.length ? 'L' : 'M';
    const x = evt.clientX - this.stageOffset.left;
    const y = evt.clientY - this.stageOffset.top;
    this.commands.push({ marker, values: { x, y } });
    this.dots.push(this.newDot(x, y));
    this.updatePath(evt.metaKey);
  }
}

// Component responsible for controlling the radius
class RangeSlider extends EventTarget {
  constructor(containerSelector, options) {
    super();
    const defaults = {
      size: 250,
      minRadius: 0,
      maxRadius: 70,
      startRadius: 20,
      handleRadius: 5
    };

    this.options = { ...defaults, ...options };
    this.mouseDownOffset = { x: 0, y: 0 };

    const str = `
      <svg
        class="radius-control"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="${this.options.size}"
        height="${this.options.size}"
        viewPort="0 0 ${this.options.size} ${this.options.size}"
      >
        <circle
          cx="${this.options.size / 2}"
          cy="${this.options.size / 2}"
          r="${this.options.startRadius}"
          class="radius-control__circle" />
        <line
          x1="${this.options.size / 2}"
          y1="${this.options.size / 2}"
          x2="${this.options.size / 2 + this.options.startRadius}"
          y2="${this.options.size / 2}"
          class="radius-control__line"
        />
        <circle
          cx="${this.options.size / 2 + this.options.startRadius}"
          cy="${this.options.size / 2}"
          r="${this.options.handleRadius}"
          class="radius-control__handle" />
      </svg>
    `;

    const container = document.querySelector(containerSelector);
    const range = document.createRange();
    // Make the parent of the first div in the document becomes the context node
    range.selectNode(container);
    var documentFragment = range.createContextualFragment(str);
    container.appendChild(documentFragment);

    // Get references to the parts we need
    this.stage = document.querySelector('.radius-control');
    this.circle = document.querySelector('.radius-control__circle');
    this.line = document.querySelector('.radius-control__line');
    this.handle = document.querySelector('.radius-control__handle');

    this.stageOffset = this.stage.getBoundingClientRect();

    // Add event listeners and bind the callbacks to the class context
    this.docMouseMove = this.docMouseMove.bind(this);
    this.docMouseUp = this.docMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);

    this.handle.addEventListener('mousedown', this.handleMouseDown);
  }

  handleMouseDown(evt) {
    // the x/y distance from the pointer to the center of the handle
    this.mouseDownOffset = {
      x:
        evt.clientX -
        this.stageOffset.x +
        this.options.handleRadius -
        this.handle.getAttributeNS(null, 'cx'),
      y:
        evt.clientY -
        this.stageOffset.y +
        this.options.handleRadius -
        this.handle.getAttributeNS(null, 'cy')
    };

    document.addEventListener('mousemove', this.docMouseMove);
    document.addEventListener('mouseup', this.docMouseUp);
  }

  docMouseMove(evt) {
    const x =
      evt.clientX -
      this.stageOffset.x +
      this.options.handleRadius -
      this.mouseDownOffset.x;
    const y =
      evt.clientY -
      this.stageOffset.y +
      this.options.handleRadius -
      this.mouseDownOffset.y;

    const p1 = { x, y };
    const p2 = { x: this.options.size / 2, y: this.options.size / 2 };
    // get distance from center of stage
    const distance = Math.min(getDistance(p1, p2), this.options.maxRadius);

    const angle = getAngle(p1, p2);
    // The handle should not pass the maximal radius defined in options
    const maxX = -Math.sin(angle) * distance + this.options.size / 2;
    const maxY = -Math.cos(angle) * distance + this.options.size / 2;

    this.handle.setAttributeNS(null, 'cx', maxX);
    this.handle.setAttributeNS(null, 'cy', maxY);

    this.circle.setAttribute('r', distance);
    this.line.setAttribute('x2', maxX);
    this.line.setAttribute('y2', maxY);

    // Dispatch custom Event
    const event = new CustomEvent('update', { detail: distance });
    this.dispatchEvent(event);
  }

  docMouseUp() {
    // Cleanup
    document.removeEventListener('mousemove', this.docMouseMove);
    document.removeEventListener('mouseup', this.docMouseUp);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SVGPreview('svg', 'path');
  });
} else {
  new SVGPreview('svg', 'path');
}
