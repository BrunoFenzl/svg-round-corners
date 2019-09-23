import utils from './utils';
import vars from './testVariables';

test('should parse path', () => {
  const parsed = utils.pathParser(vars.pathSquare, false);
  expect(parsed).toEqual(vars.commandsSquare);
});

test('should remove overlaped', () => {
  const abs = vars.absOverlapped.map(utils.removeOverlapped);
  expect(abs).toEqual(vars.absNoOverlap);
});

test('should remove latest overlaped', () => {
  utils.removeLastCmdIfOverlapped(vars.commandsSquare);
  expect(vars.commandsSquare).toEqual(vars.absLatestNoOverlap);
});


