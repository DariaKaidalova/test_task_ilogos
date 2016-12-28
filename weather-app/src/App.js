import React from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import './main.css';

var clearfix = 'g-clearfix',
		message =  'b-message',
		error ='b-message -type_error', 
		messageContainer = 'l-message',
		controlsWrap = 'l-control',
		control = 'b-control', 
		floatLeft = '-float_left',
		button = 'b-button',
		field = 'b-field',
		title = 'b-title';


var Message = React.createClass({
  render: function(props) {
    return (
			<div className={message}>{this.props.content}</div>
		);
	}
});


var Messageerror = React.createClass({
  render: function(props) {
    return (
			<div className={error} id="js-addFieldError">{this.props.content}</div>
		);
	}
});

class Removebutton extends React.Component {
	constructor(props) {
    super(props);
    this.state = {};
    this.removeCity = this.removeCity.bind(this); //This binding is necessary to make 'this' work in the callback
  }

  removeCity(e) {
  	e.preventDefault();
  }
	render() {
		return  (
			<a className={button} href="" onClick={this.getWeather}>Remove</a> 
		);
	}
}

var table = 'b-table',
    tableWeather = 'b-table__weather',
		tableWeatherItem = 'b-table__weatherItem',
		tableCity = 'b-table__city',
		tableCoord = 'b-table__coord ',
		tableRemoval = 'b-table__removal';

var Weather = React.createClass({
  render: function(props) {
    return (
  		<tr name={this.props.city}>
  			<td className={tableCity}>{this.props.city}, {this.props.country}</td>
  			<td className={tableCoord}>Lat: {this.props.lat}, Lon: {this.props.lon}</td>
  			<td className={tableWeather}>
  				<div className={tableWeatherItem}>Weather: {this.props.descr}</div>
  				<div className={tableWeatherItem}>Temperature: {this.props.temp} °C</div>
  				<div className={tableWeatherItem}>Minimum temperature: {this.props.minTemp} °C</div>
  				<div className={tableWeatherItem}>Maximum temperature: {this.props.maxTemp} °C</div>
  				<div className={tableWeatherItem}>Pressure: {this.props.pressure} hpa</div>
  				<div className={tableWeatherItem}>Humidity: {this.props.humidity} %</div>
  				<div className={tableWeatherItem}>Wind {this.props.wind} m/s</div>
  			</td>
  			<td className={tableRemoval}><Removebutton/></td>
			</tr>
  	)
  }
});

class Maintable extends React.Component {
	render() {
		return  (
			<table className={table}>
        <thead>
          <tr>
            <th>City</th>
            <th>Coordinates</th>
            <th>Weather forecast</th>
          </tr>
        </thead>
        <tbody id="js-tbody">
        
        </tbody>
      </table>
		);
	}
}

var columnLeft = 'b-content__columnLeft';

class Columnleft extends React.Component {
	render() {
		return  (
			<div className={columnLeft}>
				<Maintable />
			</div>
		);
	}
}

class Addbutton extends React.Component {
	constructor(props) {
    super(props);
    this.state = {};
    this.getWeather = this.getWeather.bind(this); //This binding is necessary to make 'this' work in the callback
  }

  getWeather(e) {
		e.preventDefault();

		var addField = document.getElementById('js-addField'),
		    city = addField.value,
		    tbody = document.getElementById('js-tbody'),
		    messageContainer = document.getElementById('js-messageContainer');

			var url = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=1cf63a228c90f35807d7814f738e9d6d&units=metric';

			ReactDOM.unmountComponentAtNode(messageContainer);

			var cityReq = new XMLHttpRequest();
			cityReq.open('GET', url);
			cityReq.send();

			cityReq.onreadystatechange = (e) => {
			  if (cityReq.readyState !== 4) return;
			  if (cityReq.status === 200) {

			    var currentWeather = JSON.parse(cityReq.responseText);

			    var cityName = currentWeather.name,
			    		sys = currentWeather.sys,
		    			cityCountry = sys.country, 
			    		coord = currentWeather.coord,
			    		cityLon = coord.lon,
			    		cityLat = coord.lat,
	    				weather = currentWeather.weather, weatherArray =  weather[0],
	    				main = currentWeather.main,
	    				wind = currentWeather.wind,
	    				cityDescr = weatherArray.description,
	    				cityTemp = main.temp,
	    				cityMinTemp = main.temp_min,
	    				cityMaxTemp = main.temp_max,
	    				cityPressure = main.pressure,
	    				cityHumidity = main.humidity,
    					cityWind = wind.speed;

					ReactDOM.render(<Weather city={cityName} country={cityCountry} lat={cityLat} lon={cityLon} descr={cityDescr} temp={cityTemp} minTemp={cityMinTemp} maxTemp={cityMaxTemp} pressure={cityPressure} humidity={cityHumidity} wind={cityWind}/>, tbody);
					ReactDOM.unmountComponentAtNode(messageContainer);
					ReactDOM.render(<Message content={'The weather added to the table.'}/>, messageContainer);
			  } else {
			  	ReactDOM.unmountComponentAtNode(messageContainer);
			    ReactDOM.render(<Messageerror content={'Please enter the city.'}/>, messageContainer);
			  }
			};
  }

	render() {
		return  (
			<div className={control +' ' + floatLeft}><a onClick={this.getWeather} className={button} href="">Add</a></div>
		);
	}
}

class Addfield extends React.Component {
	render() {
		return  (
			<div className={control +' ' + floatLeft}><input id="js-addField" className={field} type="text" placeholder="Add town or city"/></div>
		);
	}
}

class Controlswrap extends React.Component {
	render(){
		return(
			<div className={controlsWrap + ' ' + clearfix}>
				<Addfield/>
				<Addbutton/>
			</div>
		);
	}
}

var currentWeatherWrap = 'l-currentWeather',
		currentWeather = 'b-currentWeather',
		currentWeatherItem ='b-currentWeather__item',
		currentWeatherTitle = 'b-currentWeather__title',
		currentWeatherVal = 'b-currentWeather__val',
		marginRight = '-margin_right'

var Currentweathercontent = React.createClass({
  render: function(props) {
    return (
	  	<div>
	    	<h2 className={title}>Weather in {this.props.place}, {this.props.country}</h2>
				<ul className={currentWeather}>
					<li className={currentWeatherItem}>
						<div>
							<span className={currentWeatherTitle}>Lat:</span><span className={currentWeatherVal + ' ' + marginRight}>{this.props.currentLat},</span>
							<span className={currentWeatherTitle}>Lon:</span><span className={currentWeatherVal}>{this.props.currentLon}</span>
						</div>
					</li>
					<li className={currentWeatherItem}>
						<span className={currentWeatherTitle}>Weather:</span><span className={currentWeatherVal}>{this.props.weather}</span>
					</li>
					<li className={currentWeatherItem}>
						<span className={currentWeatherTitle}>Temperature:</span><span className={currentWeatherVal}>{this.props.temp} °C</span>
					</li>
					<li className={currentWeatherItem} >
						<span className={currentWeatherTitle}>Minimum temperature:</span><span className={currentWeatherVal}>{this.props.minTemp} °C</span>
					</li>
					<li className={currentWeatherItem}>
						<span className={currentWeatherTitle}>Maximum temperature:</span><span className={currentWeatherVal}>{this.props.maxTemp} °C</span>
					</li>
					<li className={currentWeatherItem} >
						<span className={currentWeatherTitle}>Pressure:</span><span className={currentWeatherVal}>{this.props.pressure} hpa</span>
					</li>
					<li className={currentWeatherItem}>
						<span className={currentWeatherTitle}>Humidity:</span><span className={currentWeatherVal}>{this.props.humidity} %</span>
					</li>
					<li className={currentWeatherItem} >
						<span className={currentWeatherTitle}>Wind:</span><span className={currentWeatherVal}>{this.props.wind} m/s</span>
					</li>
				</ul>
			</div>
  	)
  }
});

class Currentweather extends React.Component {
	constructor(props) {
    super(props);
    this.state = {};
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
			url = 'http://api.openweathermap.org/data/2.5/weather?lat='+currentLat+'&lon='+currentLon+'&appid=1cf63a228c90f35807d7814f738e9d6d&units=metric';
		
			currentPlaceReq = new XMLHttpRequest();
			currentPlaceReq.open('GET', url);
			currentPlaceReq.send();

			currentPlaceReq.onreadystatechange = (e) => {
			  if (currentPlaceReq.readyState !== 4) return;
			  if (currentPlaceReq.status === 200) {
			    currentPlaceWeather = JSON.parse(currentPlaceReq.responseText);
		    	console.log(currentPlaceWeather);

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
			<div className={currentWeatherWrap} id="js-currentWeather"></div>
		);
	}

	componentDidMount() {
		this.getCurrentWeather();
	}
}

var sidebar = 'b-sidebar';

class Sidebar extends React.Component {
	render() {
		return  (
			<aside className={sidebar}>
				<Controlswrap />
				<div className={messageContainer} id="js-messageContainer"></div>
				<Currentweather/>
			</aside>
		);
	}
}

var content = 'b-content',
		contentInner = 'b-content__inner';

class Main extends React.Component {
	render() {
		return  (
			<main className={content}>
				<div className={contentInner+ ' ' + clearfix}>
					<Sidebar />
					<Columnleft />
				</div>
			</main>
		);
	}
}

var header = 'b-header',
		headerInner = 'b-header__inner',
		headerTitle = 'b-header__title';

class Header extends React.Component {
	render() {
		return  (
			<header className={header}>
        <div className={headerInner}>
          <h1 className={headerTitle}>Let&#039;s find out the weather forecast!</h1>
        </div>
      </header>
		);
	}
}

var page = 'b-page';

class App extends React.Component {
	render() {
		return  (
			<div className={page}>
				<Header />
				<Main />
			</div>
		);
	}
}

export default App



