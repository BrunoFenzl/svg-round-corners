// square with all relative coordinates
const rawRelativeSquare =
  'm216.1042,78.4l0,49.49112l49.21308,0l0,-49.49112l-49.21308,0z';

const squareCommands = [
  {
    marker: 'M',
    values: {
      x: 216.1042,
      y: 78.4
    }
  },
  {
    marker: 'L',
    values: {
      x: 216.1042,
      y: 127.89112
    }
  },
  {
    marker: 'L',
    values: {
      x: 265.31728,
      y: 127.89112
    }
  },
  {
    marker: 'L',
    values: {
      x: 265.31728,
      y: 78.4
    }
  },
  {
    marker: 'L',
    values: {
      x: 216.1042,
      y: 78.4
    }
  },
  {
    marker: 'Z',
    values: {
      x: 216.1042,
      y: 78.4
    }
  }
];

const roundedSquareCmds = {
  path: 'M226.104,78.4A10,10,-90,0,0,216.104,88.4L216.104,117.891A10,10,-90,0,0,226.104,127.891L255.317,127.891A10,10,270,0,0,265.317,117.891L265.317,88.4A10,10,-90,0,0,255.317,78.4Z',
  commands: [
    {
      marker: 'M',
      values: {
        x:226.104,
        y:78.4
      }
    },
    {
      marker: 'A',
      radius:10,
      values: {
        radiusX:10,
        radiusY:10,
        rotation:-90,
        largeArc:0,
        sweep:0,
        x:216.104,
        y:88.4
      }
    },
    {
      marker: 'L',
      values: {
        x:216.104,
        y:117.891
      }
    },
    {
      marker: 'A',
      radius:10,
      values: {
        radiusX:10,
        radiusY:10,
        rotation:-90,
        largeArc:0,
        sweep:0,
        x:226.104,
        y:127.891
      }
    },
    {
      marker: 'L',
      values: {
        x:255.317,
        y:127.891
      }
    },
    {
      marker: 'A',
      radius:10,
      values: {
        radiusX:10,
        radiusY:10,
        rotation:270,
        largeArc:0,
        sweep:0,
        x:265.317,
        y:117.891
      }
    },
    {
      marker: 'L',
      values: {
        x:265.317,
        y:88.4
      }
    },
    {
      marker: 'A',
      radius:10,
      values: {
        radiusX:10,
        radiusY:10,
        rotation:-90,
        largeArc:0,
        sweep:0,
        x:255.317,
        y:78.4
      }
    },
    {
      marker: 'Z',
      values: {
        x:216.1042,
        y:78.4
      }
    }
  ]
};

// coputed rawRelativeSquare
const computedSquare = 'M236.104,78.4A20,20,-90,0,0,216.104,98.4L216.104,107.891A20,20,-90,0,0,236.104,127.891L245.317,127.891A20,20,270,0,0,265.317,107.891L265.317,98.4A20,20,-90,0,0,245.317,78.4Z';

// nested squares
const rawCompoundAbsolute = 'M297,297H100V100H297ZM198.5,137,L137,198.5,L198.5,260,L260,198.5Z';

const relativeCommands = [
  {
    marker: 'm',
    values: { x: 0, y: 0 }
  },
  {
    marker: 'l',
    values: { x: 1, y: 1 }
  },
  {
    marker: 'a',
    values: { x: 1, y: 1 }
  },
  {
    marker: 'c',
    values: { x: 1, y: 1, x1: 1, y1: 1, x2: 1, y2: 1 }
  },
  {
    marker: 's',
    values: { x: 1, y: 1, x2: 1, y2: 1 }
  },
  {
    marker: 'q',
    values: { x: 1, y: 1, x1: 1, y1: 1 }
  },
  {
    marker: 't',
    values: { x: 1, y: 1 }
  },
];

const relativeCommandsHV = [
  {
    marker: 'm',
    values: { x: 0, y: 0 }
  },
  {
    marker: 'h',
    values: { x: 1 }
  },
  {
    marker: 'v',
    values: { y: 1 }
  },
];

const overlapped = [
  {
    marker: 'M',
    values: {
      x: 216.1042,
      y: 78.4
    }
  },
  {
    marker: 'L',
    values: {
      x: 216.1042,
      y: 78.4
    }
  },
  {
    marker: 'L',
    values: {
      x: 216.1042,
      y: 78.4
    }
  }
];

const badLine = [
  {
    marker: 'M',
    values: {
      x: 0,
      y: 0
    }
  },
  {
    marker: 'L',
    values: {
      x: 61.599999999999994,
      y: 0
    }
  },
  {
    marker: 'L',
    values: {
      x: 61.599999999999994,
      y: -2.8
    }
  },
  {
    marker: 'L',
    values: {
      x: 267.4,
      y: -2.8
    }
  },
  {
    marker: 'L',
    values: {
      x: 466.2,
      y: -2.8
    }
  },
  {
    marker: 'L',
    values: {
      x: 466.2,
      y: 25.586567164179062
    }
  },
  {
    marker: 'L',
    values: {
      x: 659.4,
      y: 25.586567164179062
    }
  },
  {
    marker: 'L',
    values: {
      x: 690.1999999999999,
      y: 25.586567164179062
    }
  },
  {
    marker: 'L',
    values: {
      x: 690.1999999999999,
      y: 165.2
    }
  },
  {
    marker: 'L',
    values: {
      x: 660.0999999999999,
      y: 165.2
    }
  },
  {
    marker: 'L',
    values: {
      x: 910.3499999999999,
      y: 165.2
    }
  }
];

const rawSegments = `M293,82 L313,82 L313,291 L288,291 L288,311`;

const roundedSegments = `M293,82L303,82A10,10,90,0,1,313,92L313,278.5A12.5,12.5,-270,0,1,300.5,291L298,291A10,10,-90,0,0,288,301L288,311`;

export {
  rawRelativeSquare,
  squareCommands,
  roundedSquareCmds,
  computedSquare,
  rawCompoundAbsolute,
  relativeCommands,
  relativeCommandsHV,
  overlapped,
  rawSegments,
  roundedSegments,
  badLine
};
