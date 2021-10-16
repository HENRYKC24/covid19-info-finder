import initialState from '../initialState';

// Constants
const FETCH_FLAGS = 'covid19_info_finder/covid19/FETCH_FLAGS';

// Action Creators
export const fetchFlags = (payload) => ({
  type: FETCH_FLAGS,
  payload,
});

// Reducers
const covid19FlagsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_FLAGS:
      return payload;

    default:
      return state;
  }
};

export const getCovidFlagsFromServer = () => async (dispatch) => {
  const url = 'https://corona.lmao.ninja/v2/countries';
  const tempResult = await fetch(url);
  const finalResult = await tempResult.json();

  const countryNameAndFlagURl = finalResult.sort().map((item) => ({
    country: item.country,
    flagURL: item.countryInfo.flag,
  }));

  dispatch(fetchFlags(countryNameAndFlagURl));
};

export default covid19FlagsReducer;
