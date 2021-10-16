import initialState from '../initialState';

// Constants
const FETCH_DATA = 'covid19_info_finder/covid19/FETCH_DATA';
const FILTER_STATE = 'covid19_info_finder/covid19/FILTER_STATE';

// Action Creators
export const fetchData = (payload) => ({
  type: FETCH_DATA,
  payload,
});

export const filterState = (payload) => ({
  type: FILTER_STATE,
  payload,
});

// Reducers
const covid19Reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_DATA:
      return payload;

    case FILTER_STATE:
      return payload;

    default:
      return state;
  }
};

export const getCovidInfoFromServer = (dateValue) => async (dispatch) => {
  try {
    const now = new Date();
    const dateObject = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      date: now.getDate(),
    };

    const { year } = dateObject;
    const month = dateObject.month.toString().length === 1 ? `0${dateObject.month}` : dateObject.month;
    const date = dateObject.date.toString().length === 1 ? `0${dateObject.date}` : dateObject.date;
    const defaultDate = `${year}-${month}-${date}`;
    const url = `https://api.covid19tracking.narrativa.com/api/${dateValue || defaultDate}`;
    const tempResult = await fetch(url);
    const finalResult = await tempResult.json();
    const countriesDataArray = Object.values(finalResult.dates[dateValue || defaultDate].countries);
    dispatch(fetchData(countriesDataArray));
  } catch (e) {
    const now = new Date();
    const dateObject = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      date: now.getDate() - 1,
    };

    const { year } = dateObject;
    const month = dateObject.month.toString().length === 1 ? `0${dateObject.month}` : dateObject.month;
    const date = dateObject.date.toString().length === 1 ? `0${dateObject.date}` : dateObject.date;
    const defaultDate = `${year}-${month}-${date}`;
    const url = `https://api.covid19tracking.narrativa.com/api/${dateValue || defaultDate}`;
    const tempResult = await fetch(url);
    const finalResult = await tempResult.json();
    const countriesDataArray = Object.values(finalResult.dates[dateValue || defaultDate].countries);
    dispatch(fetchData(countriesDataArray));
  }
};

export default covid19Reducer;
