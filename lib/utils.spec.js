import {
  getAngle,
  getDistance,
  getOppositeLength,
  getAdjacentLength,
  getTangentLength,
  getTangentNoHyp,
  getOffset,
  mod,
  roundValues,
} from "./utils.js";

describe('utils', function() {
  it('getAngle(): Should get the angle between two points', () => {
    const p1 = { x: 10, y: 0 };
    const p2 = { x: 0, y: 10 };
    expect(getAngle(p1, p2)).toBe(-0.7853981633974483);
  });

  it('getAngle(): Angle between tow points should be zero', () => {
    const p1 = { x: 0, y: 0 };
    const p2 = { x: 0, y: 10 };
    expect(getAngle(p1, p2)).toBe(0);
  });

  it('getDistance(): Should return distance between two points', () => {
    const p1 = { x: 10, y: 0 };
    const p2 = { x: 0, y: 10 };
    expect(getDistance(p1, p2)).toBe(14.142135623730951);
  });

  it('getOppositeLength(); Math.sin 45° 45° 90°', () => {
    expect(getOppositeLength(Math.PI / 4, 5 * Math.sqrt(2))).toBe(5); // 45° 45° 90°
  });

  it('getOppositeLength(); Opposite side should be zero if angle is 0', () => {
    expect(getOppositeLength(0, 100)).toBe(0); // 0° 0° 0°
  });
  
  it('getAdjacentLength(); Math.cos 45° 45° 90°', () => {
    expect(getAdjacentLength(Math.PI / 4, 5 * Math.sqrt(2))).toBeCloseTo(5); // 45° 45° 90°
  });

  it('getAdjacentLength(); Adjacent side should be equal hypothenuse', () => {
    expect(getAdjacentLength(0, 100)).toBe(100); // 0° 0° 0°
  });

  it('getTangentLength(); Math.tan 45° 45° 90°', () => {
    expect(getTangentLength(Math.PI / 4, 5)).toBeCloseTo(5);
  });

  it('getTangentLength(); Adjacent side should be equal opposite when angle = 0', () => {
    expect(getTangentLength(0, 100)).toBe(100); // 0° 0° 0°
  });
  
    it('getTangentNoHyp(); Math.tan 45° 45° 90°', () => {
      expect(getTangentNoHyp(Math.PI / 4, 5)).toBeCloseTo(5);
    });
  
    it('getTangentNoHyp(); Opposite side should be 0 when angle = 0', () => {
      expect(getTangentNoHyp(0, 100)).toBe(0); // 0° 0° 0°
    });
  
    it('getOffset(); angle = 45°, radius = 10', () => {
      expect(getOffset(Math.PI / 4, 10)).toEqual({ offset: 24.14213562373095, sweepFlag: 1 });
    });

    // it('getOffset(); angle = -90°, radius = 35', () => {
    //   const o = getOffset(-Math.PI / 2, 35);
    //   expect(o.offset).toBeCloseTo(35);
    //   expect(o.sweepFlag).toBe(0);
    // });

    // it('getOffset(); angle = -45°, radius = 0', () => {
    //   const o = getOffset(-Math.PI / 4, 0);
    //   expect(o.offset).toBe(-0);
    //   expect(o.sweepFlag).toBe(0);
    // });

    // it('getOffset(); angle = 270, radius = 35', () => {
    //   const o = getOffset(Math.PI * 1.5, 35);
    //   expect(o.offset).toBeCloseTo(35);
    //   expect(o.sweepFlag).toBe(-0);
    // });

    it('mod(); should be inside range', () => {
      expect(mod(1, 2)).toBe(1);
    });

    it('mod(); should wrap in the end', () => {
      expect(mod(-1, 2)).toBe(1);
    });

    it('mod(); should wrap in the beginning', () => {
      expect(mod(3, 2)).toBe(1);
    });

    it('roundValues(); should wrap in the beginning', () => {
      const o = {
        values: {
          x: 10.001,
          x: -2,
          someProp: 16.8696690098698,
        }
      };

      const rounded = {
        values: {
          x: 10,
          x: -2,
          someProp: 16.87,
        }
      };
      expect(roundValues(o, 2)).toEqual(rounded);
    });
});