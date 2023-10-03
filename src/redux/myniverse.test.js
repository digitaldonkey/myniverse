import util from 'node:util';
import { updateGlobalTrend } from './myniverse.js';
import { vi } from 'vitest'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])

test('Test the test', () => {
  const expectedActions = [
    {type: 'CONSTANT_A', payload: 'a'},
    {type: 'CONSTANT_B', payload: 'b'}
  ]
  const store = mockStore(getTestingState())
  // store.dispatch(functionA('a', 'b'))
  //
  // expect(store.getActions()).toEqual(expectedActions)
})

test('Update and aggregate trend', () => {
  const serverUrl = 'https://sfba.social';

  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)
  const store = mockStore(getTestingState())
  myLog(mockStore);

  // TODO MOCH STORE does not solve any Problem
  //   You are suposed to provide a fully configured store
  //   See https://redux.js.org/usage/writing-tests#setting-up-a-reusable-test-render-function

  // Add a trend
  store.dispatch(updateGlobalTrend({
      trend: getTrends('aggregate_silentsunday'),
      serverUrl: serverUrl
  }))
  .then((newTrend) => {
    myLog('DISPATCH DONE')
    myLog(store.getState().myniverse.trends, 'newTrend')

    // TODO: STLL NOT EXECUTED HERE

    const [silentSundayResult] = store.getState().myniverse.trends.filter(
      (x) => x.name === 'silentsunday',
    );
    myLog(silentSundayResult)
  });


  // const [silentSundayResult] = store.getState().trends.filter(
  //   (x) => x.name === 'silentsunday',
  // );
  // // myLog(silentSundayResult, 'silentSundayResult')
  //
  // // Urls aggregated?
  // expect(silentSundayResult.urls).toEqual([
  //   {
  //     serverUrl: 'https://ravenation.club',
  //     url: 'https://ravenation.club/tags/silentsunday',
  //   },
  //   {
  //     serverUrl: 'https://sfba.social',
  //     url: 'https://sfba.social/tags/silentsunday',
  //   },
  // ]);
  // // Values aggregated?
  // expect(silentSundayResult.history[0].accounts).toBe(14);
  // expect(silentSundayResult.history[0].uses).toBe(104);
});

// test('Add new trend', () => {
//   const serverUrl = 'https://bla.social';
//   let state = getState();
//   const consoleSpy = vi.spyOn(console, 'log');
//
//   // Void. Changes state.
//   updateGlobalTrends(state, getTrends('add_furryfriday'), serverUrl);
//
//   const [furryfriday] = state.trends.filter((x) => x.name === 'furryfriday');
//   myLog(furryfriday, 'silentSundayResult');
//
//   expect(furryfriday.urls).toEqual([
//     {
//       serverUrl: 'https://bla.social',
//       url: 'https://bla.social/tags/furryfriday',
//     },
//   ]);
//
//   updateGlobalTrends(state, getTrends('add_furryfriday'), serverUrl);
//   // Update same again should lead same result.
//   expect(furryfriday.urls).toEqual([
//     {
//       serverUrl: 'https://bla.social',
//       url: 'https://bla.social/tags/furryfriday',
//     },
//   ]);
//   expect(consoleSpy).toHaveBeenCalledWith('Trend is allready aggregated.');
//
//   // Values aggregated?
//   // expect(silentSundayResult.history[0].accounts).toBe(14);
//   // expect(silentSundayResult.history[0].uses).toBe(104);
// });

// - Same Week
// - silentsunday in trends and existing

function getTrends(type) {
  switch (type) {
    case 'add_furryfriday':
      return {
        name: 'furryfriday',
        url: 'https://bla.social/tags/furryfriday',
        history: [
          {
            day: '1673913600',
            accounts: 10,
            uses: 100,
          },
          {
            day: '1673827200',
            accounts: 6,
            uses: 6,
          },
          {
            day: '1673740800',
            accounts: 5,
            uses: 5,
          },
          {
            day: '1673654400',
            accounts: 4,
            uses: 4,
          },
          {
            day: '1673568000',
            accounts: 3,
            uses: 3,
          },
          {
            day: '1673481600',
            accounts: 2,
            uses: 2,
          },
          {
            day: '1673395200',
            accounts: 1,
            uses: 1,
          },
        ],
      };
    case 'aggregate_silentsunday':
      return {
        name: 'silentsunday',
        url: 'https://sfba.social/tags/silentsunday',
        history: [
          {
            day: '1673913600',
            accounts: 10,
            uses: 100,
          },
          {
            day: '1673827200',
            accounts: 6,
            uses: 6,
          },
          {
            day: '1673740800',
            accounts: 5,
            uses: 5,
          },
          {
            day: '1673654400',
            accounts: 4,
            uses: 4,
          },
          {
            day: '1673568000',
            accounts: 3,
            uses: 3,
          },
          {
            day: '1673481600',
            accounts: 2,
            uses: 2,
          },
          {
            day: '1673395200',
            accounts: 1,
            uses: 1,
          },
        ],
      };
  }
}

function getTestingState() {
  return {
    myniverse: {
      trends: [
        {
          name: 'silentsunday',
          history: [
            {
              day: '1673913600',
              accounts: '4',
              uses: '4',
            },
            {
              day: '1673827200',
              accounts: '59',
              uses: '71',
            },
            {
              day: '1673740800',
              accounts: '391',
              uses: '459',
            },
            {
              day: '1673654400',
              accounts: '5',
              uses: '5',
            },
            {
              day: '1673568000',
              accounts: '2',
              uses: '2',
            },
            {
              day: '1673481600',
              accounts: '2',
              uses: '2',
            },
            {
              day: '1673395200',
              accounts: '1',
              uses: '1',
            },
          ],
          urls: [
            {
              serverUrl: 'https://ravenation.club',
              url: 'https://ravenation.club/tags/silentsunday',
            },
          ],
        },
        {
          name: 'tuesday',
          history: [
            {
              day: '1673913600',
              accounts: '13',
              uses: '17',
            },
            {
              day: '1673827200',
              accounts: '2',
              uses: '4',
            },
            {
              day: '1673740800',
              accounts: '1',
              uses: '1',
            },
            {
              day: '1673654400',
              accounts: '1',
              uses: '1',
            },
            {
              day: '1673568000',
              accounts: '0',
              uses: '0',
            },
            {
              day: '1673481600',
              accounts: '0',
              uses: '0',
            },
            {
              day: '1673395200',
              accounts: '12',
              uses: '17',
            },
          ],
          urls: [
            {
              serverUrl: 'https://ravenation.club',
              url: 'https://ravenation.club/tags/tuesday',
            },
          ],
        },
        {
          name: 'monochromemonday',
          history: [
            {
              day: '1673913600',
              accounts: 12,
              uses: 12,
            },
            {
              day: '1673827200',
              accounts: 50,
              uses: 53,
            },
            {
              day: '1673740800',
              accounts: 0,
              uses: 0,
            },
            {
              day: '1673654400',
              accounts: 0,
              uses: 0,
            },
            {
              day: '1673568000',
              accounts: 0,
              uses: 0,
            },
            {
              day: '1673481600',
              accounts: 0,
              uses: 0,
            },
            {
              day: '1673395200',
              accounts: 0,
              uses: 0,
            },
          ],
          urls: [
            {
              serverUrl: 'https://ravenation.club',
              url: 'https://ravenation.club/tags/monochromemonday',
            },
            {
              serverUrl: 'https://sfba.social',
              url: 'https://sfba.social/tags/monochromemonday',
            },
          ],
        },
      ],
    }
  };
}

function myLog(val, descr = null) {
  if (descr) {
    console.log(
      util.inspect(val, { showHidden: false, depth: null, colors: true }),
      descr,
    );
  } else {
    console.log(
      util.inspect(val, { showHidden: false, depth: null, colors: true }),
    );
  }
}
