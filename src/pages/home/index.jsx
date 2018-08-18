import React, { Component } from 'react';
import {
  Card,
  Col,
  Preloader,
  Row,
} from 'react-materialize';
import { Link } from 'react-router-dom'

import WeaatherInfo from '../../components/weather_info';
import StationService from '../../services/station_service';

const WHITE_LIST_STATIONS = [
  '577e1e6d894057a155fa0e99', // Aeroclube
  '595b0c4b9ba2f913fe2153ba', // Fazenda Clarice
  '59f3eaf328c6a2439fd1323a', // Fazenda Fortaleza
];
const INPUTS = [
  'temperature',
  'humidity',
  'precipitation',
];

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    this.setState({
      loading: true,
      error: false,
    });

    try {
      await this.loadStations();
    } catch (error) {
      this.setState({
        error: true,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  async loadStations() {
    const stationService = new StationService();
    const { data } = await stationService.list();
    const validStations = data.stations.filter(station => WHITE_LIST_STATIONS.includes(station.id));
    const last = await Promise.all(validStations.map(station => stationService.last(station.id)));
    this.setState({
      last,
    });
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

  render() {
    const {
      last,
      error,
      loading,
    } = this.state;

    if (!error && loading) {
      return this.loading();
    }

    if (error) {
      return this.error();
    }

    return (
      <div>
        {last && last.map(station => (
          <Card key={station.station.name}>
            <h4>
              <Link to={station.station.url.replace('http://pluvi.am', '')}>{station.station.name}</Link>
            </h4>
            <p>Última atualização: <b>{new Date(station.weather.date).toLocaleString()}</b></p>
            <Row className="padding center-align">
              {
                station
                  .station
                  .inputs
                  .filter(input => INPUTS.includes(input.name))
                  .map(input => (
                    <Col s={12} m={4} key={input.name}>
                      <WeaatherInfo input={input} data={station.weather} />
                    </Col>
                  ))
              }
            </Row>
          </Card>
        ))}
      </div>
    );
  }
}
