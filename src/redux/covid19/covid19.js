import initialState from '../initialState';

// Constants
const FETCH_DATA = 'covid19_info_finder/covid19/FETCH_DATA';

// Action Creators
export const fetchData = (payload) => ({
  type: FETCH_DATA,
  payload,
});

// Reducers
const covid19Reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_DATA:
      return payload;

    default:
      return state;
  }
};

export const getCovidInfoFromServer = () => async (dispatch) => {
  const now = new Date();
  const dateObject = {
    year: now.getFullYear(),
    month: now.getMonth(),
    date: now.getDate(),
  };

  const { year } = dateObject;
  const month = dateObject.month.toString().length === 1 ? `0${dateObject.month}` : dateObject.month;
  const date = dateObject.date.toString().length === 1 ? `0${dateObject.date}` : dateObject.date;
  const url = `https://api.covid19tracking.narrativa.com/api/${year}-${month}-${date}`;
  const tempResult = await fetch(url);
  const finalResult = await tempResult.json();
  const dateString = `${year}-${month}-${date}`;
  const countriesDataArray = Object.values(finalResult.dates[dateString].countries);

  dispatch(fetchData(countriesDataArray));
};

export default covid19Reducer;
