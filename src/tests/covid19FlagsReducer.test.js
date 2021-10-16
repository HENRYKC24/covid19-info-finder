import covid19Reducer, { fetchData } from '../redux/covid19/covid19';
import initialState from '../redux/initialState';

describe('covid19Reducer Test', () => {
  it('Returns an empty array with the initial state', () => {
    const state = covid19Reducer(initialState, fetchData(initialState));
    expect(state.covid19Data).toEqual([]);
  });

  it('Shows one object when action is dispatched with one object as payload', () => {
    const state = covid19Reducer([], fetchData([{ man: 'man', woman: 'woman' }]));
    expect(state).toEqual([{ man: 'man', woman: 'woman' }]);
  });

  it('Shows three objects when action is dispatched with three objects as payload', () => {
    const state = covid19Reducer([], fetchData([
      { name: 'United', cases: 500 },
      { name: 'UAE', cases: 9809 },
      { man: 'Congo', cases: 68000 },
    ]));
    expect(state).toEqual([
      { name: 'United', cases: 500 },
      { name: 'UAE', cases: 9809 },
      { man: 'Congo', cases: 68000 },
    ]);
  });
});
