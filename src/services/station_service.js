import api from './api';

export default class StationService {
  list() {
    return api.get('/stations');
  }

  async find({
    country,
    state,
    city,
    name,
  }) {
    const { data } = await this.list();
    return data.stations.find(station => (
      station.location.countryCode === country.toUpperCase()
        && station.location.countyCode === state.toUpperCase()
        && station.location.urlCity.replace(/[\W]/, '') === city.replace(/[\W]/, '')
        && station.urlName === name
    ));
  }

  async getData(stationId) {
    const { data } = await api.get(`/stations/${stationId}`);
    return data;
  }

  async last(stationId) {
    const { data } = await api.get(`/stations/${stationId}/last`);
    return data;
  }

  getCumulative({ data, station }) {
    return station
      .inputs
      .filter(input => input.cumulative)
      .reduce((result, input) => {
        result[input.name] = data.reduce((resultInternal, item) => {
          const isToday = new Date().getDay() == new Date(item.date).getDay(); // getDay is a day of Week
          if (isToday){
            return resultInternal + +item[input.name]
          }

          return resultInternal;
        }, 0.0);
        return result;
      }, {});
  }
}
