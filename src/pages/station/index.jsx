import React, { Component } from 'react';
import {
  Card,
  CardTitle,
  Col,
  Preloader,
  Row,
} from 'react-materialize';
import PropTypes from 'prop-types';

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
      const { match } = this.props;
      const station = await new StationService().find(match.params);
      const data = (await new StationService().getData(station.id)).weather;
      const last = data[data.length - 1];
      this.setState({
        station,
        data,
        last,
      });
    } catch (error) {
      console.error(error);
      this.setState({
        error: true,
      });
    }
    this.setState({
      loading: false,
    });
  }

  render() {
    const { last, loading, station, error } = this.state;
    if (!error && loading) {
      return (
        <div className="center-align padding">
          <Preloader size="small" />
          <p>
            Carregando...
          </p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="center-align padding red-text">
          <p>
            Ocorreu um erro ao carregar os dados, tente novamente mais tarde.
          </p>
        </div>
      );
    }

    if (!last) {
      return (
        <p>Sem dados</p>
      );
    }

    return (
      <Card>
        <p>Última atualização: <b>{new Date(last.date).toLocaleString()}</b></p>
        <Row className="padding center-align summary">
          <Col s={2}>
            <i className="wi wi-thermometer blue-text" />
            <br />
            <span className="title">Temperatura</span>
            <br />
            <span className="data">
              {last.temperature.toLocaleString()}<br />Cº
            </span>
          </Col>
          <Col s={2}>
            <i className="wi wi-humidity blue-text" />
            <br />
            <span className="title">Umidade</span>
            <br />
            <span className="data">
              {last.humidity.toLocaleString()}%
            </span>
          </Col>
          <Col s={2}>
            <i className="wi wi-barometer blue-text" />
            <br />
            <span className="title">Pressão</span>
            <br />
            <span className="data">
              {last.pressure.toLocaleString()}<br />hPa
            </span>
          </Col>
          <Col s={2}>
            <i className="wi wi-rain blue-text" />
            <br />
            <span className="title">Chuva</span>
            <br />
            <span className="data">
              {last.precipitation.toLocaleString()}<br />mm
            </span>
          </Col>
          <Col s={2}>
            <i className="wi wi-windy blue-text" />
            <br />
            <span className="title">Velocidade do Vento</span>
            <br />
            <span className="data">
              {last.windSpeed.toLocaleString()}<br />km/h
            </span>
          </Col>
          <Col s={2}>
            <i className="wi wi-wind-direction blue-text" />
            <br />
            <span className="title">Direção do Vento</span>
            <br />
            <span className="data">
              {last.windDirection}
            </span>
          </Col>
        </Row>
      </Card>
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
