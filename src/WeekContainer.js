
import React from 'react';
import apiConfig from './apiKeys';
import DayCard from './DayCard';

class WeekContainer extends React.Component {
  state = {
    fullData: [],
    lat: null,
    lng: null
  }

  render() {
    if (this.state.fullData.length > 0) {
      const reading = this.state.fullData[0];
      return (
        <div className="flex">
          <DayCard reading={reading} key={0} />
        </div>
      )
    }
    else {
      return (
        <div className="flex"></div>
      )
    }
  }
  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({ lat: position.coords.latitude, lng: position.coords.longitude });
      const weatherURL =
      `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lng}&units=imperial&APPID=${apiConfig.owmkey}`
      fetch(weatherURL)
      .then(res => res.json())
      .then(data => {
        this.data = [data];
        this.setState({
          fullData: this.data
        })
      })
    }, err => console.log(err)
    );

  }
}

export default WeekContainer