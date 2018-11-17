import React, { Component } from 'react';
import {
  Card,
  Col,
  Preloader,
  Row,
  ProgressBar,
} from 'react-materialize';
import PropTypes from 'prop-types';

import WeaatherInfo from '../../components/weather_info';
import Chart from '../../components/chart';
import StationService from '../../services/station_service';

import './index.css';

export default class Station extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });

    try {
      const stationService = new StationService();
      const { match } = this.props;
      const station = await stationService.find(match.params);
      const data = (await stationService.getData(station.id));

      this.updateData(data);
    } catch (error) {
      console.error(error);
      this.setState({
        error: true,
      });
    }

    this.intervalLast = setInterval(() => this.updateWithLast(), 60000);

    this.setState({
      loading: false,
    });
  }

  async updateWithLast() {
    this.setState({
      loadingLast: true,
    });

    try {
      const stationService = new StationService();
      const { station } = this.state;
      const last = await stationService.last(station._id);
      const { weather } = last;
      const { data } = this.state;
      if (weather.date !== data[data.length - 1].date) {
        data.push(weather);
        this.updateDataWithLast({
          station,
          weather: [...data],
        });
      }
    } finally {
      this.setState({
        loadingLast: false,
      });
    }
  }

  updateDataWithLast(data) {
    this.updateData(data, false);
  }

  updateData(data, cumulative = true) {
    try {
      const stationService = new StationService();
      const last = {
        ...data.weather[data.weather.length - 1],
      };

      if (cumulative) {
        const cumulative = stationService.getCumulative({
          data: data.weather,
          station: data.station,
        });
        Object.keys(cumulative).forEach((key) => {
          last[key] = cumulative[key];
        });
      }

      this.setState({
        station: data.station,
        data: data.weather,
        last,
      });
    } catch (error) {
      console.error('Falha ao carregar last', error);
    }
  }

  header() {
    const { station } = this.state;
    const link = `https://www.google.com.br/maps/place/${station.location.coordinates.latitudeDecimal},${station.location.coordinates.longitudeDecimal}`;
    return (
      <div center-align className="header">
        <h1>
          {station.fullName}<br />
          <small>{station.location.country} - {station.location.county} - {station.location.city}</small>
        </h1>
        <a
          href={link}
          rel="noopener noreferrer"
          target="_blank"
        >
          Localização
        </a>
      </div>
    );
  }

  loading() {
    return (
      <div>
        <div className="center-align padding">
          <Preloader size="small" />
          <p>
            Carregando...
          </p>
        </div>
      </div>
    );
  }

  error() {
    return (
      <div>
        <div className="center-align padding red-text">
          <p>
            Ocorreu um erro ao carregar os dados, tente novamente mais tarde.
          </p>
        </div>
      </div>
    );
  }

  noData() {
    return (
      <div>
        <p>Sem dados</p>
      </div>
    );
  }

  render() {
    const {
      last,
      loading,
      station,
      error,
      data,
      loadingLast,
    } = this.state;

    if (!error && loading) {
      return this.loading();
    }

    if (error) {
      return this.error();
    }

    if (!last) {
      return this.noData();
    }

    return (
      <div>
        {this.header()}
        {(station.messages || []).map(message => <p className="alert-message red-text" key={message.message}>{message.message}</p>)}
        <Card>
          <p>Última atualização: <b>{new Date(last.date).toLocaleString()}</b></p>
          {loadingLast && <ProgressBar />}
          <Row className="padding center-align">
            {
              station
                .inputs
                .filter(input => input.headerType === 'default')
                .map(input => (
                  <Col s={12} m={2} key={input.name}>
                    <WeaatherInfo input={input} data={last} />
                  </Col>
                ))
            }
          </Row>
        </Card>

        {station.inputs.filter(input => input.chartType !== 'none').map(input => <Chart key={input.name} data={data} input={input} />)}
      </div>
    );
  }
}

Station.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      country: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
