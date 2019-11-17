import { getAngle } from "./utils";

describe('utils', function() {
  it('should get the angle between two points', function() {
    const p1 = { x: 10, y: 0 };
    const p2 = { x: 0, y: 10 };
    expect(getAngle(p1, p2).toBe(-0.7853981633974483));
  });

  it('angle between tow points should be zero', function() {
    const p1 = { x: 0, y: 0 };
    const p2 = { x: 0, y: 10 };
    expect(getAngle(p1, p2).toBe(0));
  });
});