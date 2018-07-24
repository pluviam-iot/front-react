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
        && station.location.urlCity === city
        && station.urlName === name
    ));
  }

  async getData(stationId) {
    const { data } = await api.get(`/stations/${stationId}`);
    return data;
  }
}
