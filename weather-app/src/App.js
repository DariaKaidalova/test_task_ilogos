import React from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import './main.css';


/*messages*/
var Message = React.createClass({
  render: function(props) {
    return (
			<div className={'b-message'}>{this.props.content}</div>
		);
	}
});

var Messageerror = React.createClass({
  render: function(props) {
    return (
			<div className={'b-message -type_error'} id="js-addFieldError">{this.props.content}</div>
		);
	}
});


/*table raw with city/place weather*/
var Weather = React.createClass({
  render: function(props) {
    return (
      <tr id={this.props.city}>
        <td className={'b-table__city'}>{this.props.place}, {this.props.country}</td>
        <td className={'b-table__coord'}>Lat: {this.props.lat}, Lon: {this.props.lon}</td>
        <td className={'b-table__weather'}>
          <div className={'b-table__weatherItem'}>Weather: {this.props.descr}</div>
          <div className={'b-table__weatherItem'}>Temperature: {this.props.temp} °C</div>
          <div className={'b-table__weatherItem'}>Minimum temperature: {this.props.minTemp} °C</div>
          <div className={'b-table__weatherItem'}>Maximum temperature: {this.props.maxTemp} °C</div>
          <div className={'b-table__weatherItem'}>Pressure: {this.props.pressure} hpa</div>
          <div className={'b-table__weatherItem'}>Humidity: {this.props.humidity} %</div>
          <div className={'b-table__weatherItem'}>Wind: {this.props.wind} m/s</div>
        </td>
        <td className={'b-table__removal'}><a className={'b-button'} href="" onClick={this.props.onRemoveForecast}>Remove</a></td>
      </tr>
    )
  }
});

/*table*/
class Maintable extends React.Component {
  render() {
    return (
      <table className={'b-table'}>
        <thead>
          <tr>
            <th>Place</th>
            <th>Coordinates</th>
            <th>Weather forecast</th>
          </tr>
        </thead>
        <tbody id="js-tbody">
          {this.props.forecasts}
        </tbody>
      </table>
    )
  }
};


/*column left*/
class Columnleft extends React.Component {
	render() {
		return  (
			<div className={'b-content__columnLeft'}>
        <Maintable forecasts={this.props.forecasts}/>
			</div>
		);
	}
}

/*wrap of controls*/
class Controlswrap extends React.Component {
	render(){
		return(
			<div className={'l-control'}>
        <div className={'g-clearfix'}>
  				<div className={'b-control -float_left'}><input id="js-addField" className={'b-field'} type="text" placeholder="Add town or city"/></div>
          <div className={'b-control -float_left'}><a onClick={this.props.onAddForecast} className={'b-button'} href="">Add</a></div>
  			</div>
      </div>
		);
	}
}

/*current weather wrap*/
var Currentweathercontent = React.createClass({
  render: function(props) {
    return (
	  	<div>
	    	<h2 className={'b-title'}>Weather in {this.props.place}, {this.props.country}</h2>
				<ul className={ 'b-currentWeather'}>
					<li className={'b-currentWeather__item'}>
						<div>
							<span className={'b-currentWeather__title'}>Lat:</span><span className={'b-currentWeather__val -margin_right'}>{this.props.currentLat},</span>
							<span className={'b-currentWeather__title'}>Lon:</span><span className={'b-currentWeather__val'}>{this.props.currentLon}</span>
						</div>
					</li>
					<li className={'b-currentWeather__item'}>
						<span className={'b-currentWeather__title'}>Weather:</span><span className={'b-currentWeather__val'}>{this.props.weather}</span>
					</li>
					<li className={'b-currentWeather__item'}>
						<span className={'b-currentWeather__title'}>Temperature:</span><span className={'b-currentWeather__val'}>{this.props.temp} °C</span>
					</li>
					<li className={'b-currentWeather__item'} >
						<span className={'b-currentWeather__title'}>Minimum temperature:</span><span className={'b-currentWeather__val'}>{this.props.minTemp} °C</span>
					</li>
					<li className={'b-currentWeather__item'}>
						<span className={'b-currentWeather__title'}>Maximum temperature:</span><span className={'b-currentWeather__val'}>{this.props.maxTemp} °C</span>
					</li>
					<li className={'b-currentWeather__item'} >
						<span className={'b-currentWeather__title'}>Pressure:</span><span className={'b-currentWeather__val'}>{this.props.pressure} hpa</span>
					</li>
					<li className={'b-currentWeather__item'}>
						<span className={'b-currentWeather__title'}>Humidity:</span><span className={'b-currentWeather__val'}>{this.props.humidity} %</span>
					</li>
					<li className={'b-currentWeather__item'} >
						<span className={'b-currentWeather__title'}>Wind:</span><span className={'b-currentWeather__val'}>{this.props.wind} m/s</span>
					</li>
				</ul>
			</div>
  	)
  }
});

/*current weather content*/
var Loading = require('react-loading');
class Currentweather extends React.Component {
	constructor(props) {
    super(props);
    this.getCurrentWeather = this.getCurrentWeather.bind(this); 
  }

  getCurrentWeather() {
  	var currentLat, currentLon, url, currentPlaceReq, currentPlaceWeather;
		if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
				currentLat = (position.coords.latitude).toFixed(2);
				currentLon = (position.coords.longitude).toFixed(2);
				getCurrentData();
			});
		} 
		else alert('Geolocation API не поддерживается в вашем браузере');
		
		function getCurrentData() {
			url = 'api.openweathermap.org/data/2.5/weather?lat='+currentLat+'&lon='+currentLon+'&appid=1cf63a228c90f35807d7814f738e9d6d&units=metric';
		
			currentPlaceReq = new XMLHttpRequest();
			currentPlaceReq.open('GET', url);
			currentPlaceReq.send();

			currentPlaceReq.onreadystatechange = (e) => {
			  if (currentPlaceReq.readyState !== 4) return;
			  if (currentPlaceReq.status === 200) {
			    currentPlaceWeather = JSON.parse(currentPlaceReq.responseText);

		    	var currentWeatherWrap = document.getElementById('js-currentWeather'),
		    			placeName = currentPlaceWeather.name,
		    			sys = currentPlaceWeather.sys,
		    			placeCountry = sys.country,
		    			weather = currentPlaceWeather.weather, weatherArray =  weather[0],
	    				main = currentPlaceWeather.main,
	    				wind = currentPlaceWeather.wind,
	    				placeDescr = weatherArray.description,
	    				placeTemp =  main.temp,
	    				placeMinTemp = main.temp_min,
	    				placeMaxTemp = main.temp_max,
	    				placePressure = main.pressure,
	    				placeHumidity = main.humidity,
    					placeWind = wind.speed;

		    	ReactDOM.render(<Currentweathercontent place={placeName} country={placeCountry} currentLat={currentLat} currentLon={currentLon} weather={placeDescr } temp={placeTemp} minTemp={placeMinTemp} maxTemp={placeMaxTemp} pressure={placePressure} humidity={placeHumidity} wind={placeWind}/>, currentWeatherWrap);
				}
			  else { 
			  	ReactDOM.render(<Messageerror content={'Please check HTML5 Geolocation or download a modern browser!'}/>, currentWeatherWrap);
			  }
			};
		}
	}

	render(){
		return(
			<div className={'l-currentWeather'} id="js-currentWeather">
        <div className={'b-loading'}>
          <Loading type='spinningBubbles' color='#e3e3e3'/>
        </div> 
        
      </div>
		);
	}

	componentDidMount() {
		this.getCurrentWeather();
	}
}

/*right sidebar*/
class Sidebar extends React.Component {
  render() {
    return  (
      <aside className={'b-sidebar'}>
        <Controlswrap onAddForecast={this.props.onAddForecast}/>
        <div className={'l-message -type_adding'} id="js-messageContainer"></div>
        <Currentweather/>
      </aside>
    );
  }
}

/*header*/
class Header extends React.Component {
	render() {
		return  (
			<header className={'b-header'}>
        <div className={'b-header__inner'}>
          <h1 className={'b-header__title'}>Let&#039;s find out the weather forecast!</h1>
        </div>
      </header>
		);
	}
}

/*main*/
class Main extends React.Component {
  constructor(props) {
    super(props);
    var localPlaces = JSON.parse(localStorage.getItem('placesKey')), placesVal = [];
    if(localPlaces !== null) placesVal = localPlaces;
    this.state = {
      places: placesVal
    };
  }  

  render() {

    let forecasts = [];

    for (let i = 0; i < this.state.places.length; i++) {
      let places = this.state.places[i];
      forecasts.push(<Weather key={i.toString()} place={places.placeName} country={places.placeCountry} lat={places.placeLat} lon={places.placeLon} descr={places.placeDescr} temp={places.placeTemp} minTemp={places.placeMinTemp} maxTemp={places.placeMaxTemp} pressure={places.placePressure} humidity={places.placeHumidity} wind={places.placeWind} onRemoveForecast={this.onRemoveForecast.bind(this, places.id)}/>); 
    }

    return (
      <main className={'b-content'}>
        <div className={'b-content__inner g-clearfix'}>
          <Sidebar onAddForecast={this.onAddForecast.bind(this)}/>
          <Columnleft forecasts={forecasts}/>
        </div>
      </main>
    )
  }

  onAddForecast(e) {
    e.preventDefault();

    var addFieldVal = document.getElementById('js-addField').value,
        messageContainer = document.getElementById('js-messageContainer'),
        url = 'api.openweathermap.org/data/2.5/weather?q='+addFieldVal+'&appid=1cf63a228c90f35807d7814f738e9d6d&units=metric';
  
    ReactDOM.unmountComponentAtNode(messageContainer);

    var placeReq = new XMLHttpRequest();
    placeReq.open('GET', url);
    placeReq.send();

    placeReq.onreadystatechange = (e) => {
      if (placeReq.readyState !== 4) return;
      if (placeReq.status === 200) {

        var currentWeather = JSON.parse(placeReq.responseText),
            placeName = currentWeather.name,
            sys = currentWeather.sys,
            placeCountry = sys.country,
            coord = currentWeather.coord,
            placeLon = coord.lon,
            placeLat = coord.lat,
            weather = currentWeather.weather,
            weatherArray =  weather[0],
            main = currentWeather.main,
            wind = currentWeather.wind,
            placeDescr = weatherArray.description,
            placeTemp = main.temp,
            placeMinTemp = main.temp_min,
            placeMaxTemp = main.temp_max,
            placePressure = main.pressure,
            placeHumidity = main.humidity,
            placeWind = wind.speed;

        var index = -1, isUsed = false;

        for (let i = 0; i < this.state.places.length; i++) {
          let places = this.state.places[i];
          if(places.placeName === placeName) {
            index = i;
            isUsed = true;
            break;
          }
        }

        if(isUsed === false) {
          this.setState((prevState, props) => {
        
            let newState = Array.from(prevState.places);
            newState.push({
              name: 'city ' + prevState.places.length,
              id: prevState.places.length + 1,
              placeName: placeName,
              placeCountry: placeCountry,
              placeLat: placeLat,
              placeLon: placeLon,
              placeDescr: placeDescr,
              placeTemp: placeTemp,
              placeMinTemp: placeMinTemp,
              placeMaxTemp: placeMaxTemp,
              placePressure: placePressure,
              placeHumidity: placeHumidity,
              placeWind: placeWind
            });

            console.log('isUsed = '+isUsed);
            
            return {
              places: newState
            };
          });
        }
        else {
          this.setState((prevState, props) => {
            let newState = Array.from(prevState.places);
            newState.splice(index, 1, {
              name: 'city ' + prevState.places.length,
              id: index,
              placeName: placeName,
              placeCountry: placeCountry,
              placeLat: placeLat,
              placeLon: placeLon,
              placeDescr: placeDescr,
              placeTemp: placeTemp,
              placeMinTemp: placeMinTemp,
              placeMaxTemp: placeMaxTemp,
              placePressure: placePressure,
              placeHumidity: placeHumidity,
              placeWind: placeWind
            });

            console.log('isUsed = '+isUsed);

            return {
              places: newState
            };
          });
        }

        console.log(this.state.places);

        var serialPlaces = JSON.stringify(this.state.places);
        localStorage.setItem('placesKey', serialPlaces);
      
        if(isUsed === false) ReactDOM.render(<Message content={'The weather added.'}/>, messageContainer);
        else ReactDOM.render(<Message content={'The weather updated.'}/>, messageContainer);

      } else {

        ReactDOM.unmountComponentAtNode(messageContainer);
        ReactDOM.render(<Messageerror content={'Please enter the city.'}/>, messageContainer);

      }
    };
  }

  onRemoveForecast(id, e) {
    e.preventDefault();
    
    this.setState((prevState, props) => {
      let newState = [];
      
      prevState.places.forEach((x) => {
        if (x.id !== id)
          newState.push(x);
      });
      
      return {
        places: newState
      };
    });
  }
}

/*app*/
class App extends React.Component {
	render() {
		return  (
			<div className={'b-page'}>
				<Header />
				<Main />
			</div>
		);
	}
}

export default App



