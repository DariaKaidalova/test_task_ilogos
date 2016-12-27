import React from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import './main.css';

/*var watchId;
function startWatch() {
	if(navigator.geolocation) {
		var optn = {
			enableHighAccuracy: true,
			timeout: Infinity,
			maximumAge: 0
		};
		watchId = navigator.geolocation.getCurrentPosition(showPosition, showError, optn);
		console.log(navigator.geolocation.getCurrentPosition(showPosition, showError, optn));
	} else {
		alert('Geolocation is not supported in your browser');
	}

	function showPosition(position) {
		document.write('Latitude: '+position.coords.latitude+'Longitude: '+position.coords.longitude);
	}

	function showError(error) {
		switch(error.code) {
			case error.PERMISSION_DENIED:
				alert("User denied the request for Geolocation.");
				break;
			case error.POSITION_UNAVAILABLE:
				alert("Location information is unavailable.");
				break;
			case error.TIMEOUT:
				alert("The request to get user location timed out.");
				break;
			case error.UNKNOWN_ERROR:
				alert("An unknown error occurred.");
				break;
		}
	}
}

function stopWatch() {
 if (watchId) {
		navigator.geolocation.clearWatch(watchId);
		watchId = null;
	}
}*/

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

class Message extends React.Component {
	render() {
		return  (
			<div className={message}>The weather added to the table.</div>
		);
	}
}

class Messageerror extends React.Component {
	render() {
		return  (
			<div className={error} id="js-addFieldError">Please enter the city.</div>
		);
	}
}

class Removebutton extends React.Component {
	constructor(props) {
    super(props)
    this.state = {};;
    this.removeCity = this.removeCity.bind(this); //This binding is necessary to make 'this' work in the callback
  }

  removeCity(e) {
  	e.preventDefault();
  }
	render() {
		return  (
			<a className={button} href="" onClick={this.makeRequest}>Remove</a> 
		);
	}
}

var table = 'b-table',
    tableWeather = 'b-table__weather',
		tableWeatherItem = 'b-table__weatherItem',
		tableCity = 'b-table__city',
		tableCoord = 'b-table__coord ',
		tableRemoval = 'b-table__removal';

var rawArray = [];

var Weather = React.createClass({
  render: function(props) {
    return (
  		<tr name={this.props.city}>
  			<td className={tableCity}>{this.props.city}</td>
  			<td className={tableCoord}>{this.props.coord}</td>
  			<td className={tableWeather}>
  				<div className={tableWeatherItem}>{this.props.descr}</div>
  				<div className={tableWeatherItem}>{this.props.temp}</div>
  				<div className={tableWeatherItem}>{this.props.minTemp}</div>
  				<div className={tableWeatherItem}>{this.props.maxTemp}</div>
  				<div className={tableWeatherItem}>{this.props.pressure}</div>
  				<div className={tableWeatherItem}>{this.props.humidity}</div>
  				<div className={tableWeatherItem}>{this.props.wind}</div>
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
        	{rawArray}
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
    this.state = {
    	rowsNumber: rawArray.length
    };
    this.makeRequest = this.makeRequest.bind(this); //This binding is necessary to make 'this' work in the callback
  }

  makeRequest(e) {
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
			  	
					this.setState(function(prevState, props) {
						return {
							rowsNumber: prevState.rowsNumber + props.increment
						};
					});

					console.log(rawArray.length);

			    var currentWeather = JSON.parse(cityReq.responseText);
			    
			    var cityName = currentWeather.name, 
			    		coord = currentWeather.coord,
			    		cityCoord = 'Lon: '+ coord.lon + ', Lat: '+coord.lat,
	    				weather = currentWeather.weather, weatherArray =  weather[0],
	    				main = currentWeather.main,
	    				wind = currentWeather.wind,
	    				cityDescr = 'Weather: ' + weatherArray.description,
	    				cityTemp = 'Temperature: ' + main.temp + ' °C',
	    				cityMinTemp = 'Minimum temperature: ' + main.temp_min+ ' °C',
	    				cityMaxTemp = 'Maximum temperature: ' + main.temp_max + ' °C',
	    				cityPressure = 'Pressure: ' + main.pressure +' hpa',
	    				cityHumidity = 'Humidity: ' + main.humidity + '%',
    					cityWind = 'Wind: ' + wind.speed +' m/s';

					
					for (var i = 0; i < this.state.rowsNumber; i++) {
			    	rawArray.push(<Weather city={cityName} coord={cityCoord} descr={cityDescr} temp={cityTemp} minTemp={cityMinTemp} maxTemp={cityMaxTemp} pressure={cityPressure} humidity={cityHumidity} wind={cityWind}/>);
					}
					console.log(rawArray);
					//ReactDOM.render(rawArray, tbody);
					//ReactDOM.render(<Weather city={cityName} coord={cityCoord} descr={cityDescr} temp={cityTemp} minTemp={cityMinTemp} maxTemp={cityMaxTemp} pressure={cityPressure} humidity={cityHumidity} wind={cityWind}/>, tbody);
					ReactDOM.unmountComponentAtNode(messageContainer);
					ReactDOM.render(<Message/>, messageContainer);
			  } else {
			  	ReactDOM.unmountComponentAtNode(messageContainer);
			    ReactDOM.render(<Messageerror/>, messageContainer);
			  }
			};
  }

	render() {
		return  (
			<div className={control +' ' + floatLeft}><a onClick={this.makeRequest} className={button} href="">Add</a></div>
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
		currentWeatherVal = 'b-currentWeather__val';

class Currentweather extends React.Component {
	render(){
		return(
		<div className={currentWeatherWrap}>
			<h2 className={title}>Weather in Kharkiv, UA</h2>
			<ul className={currentWeather}>
				<li className={currentWeatherItem}>
					<span className={currentWeatherTitle}>test: </span>
					<span className={currentWeatherVal}>test</span>
				</li>
				<li className={currentWeatherItem}>
					<span className={currentWeatherTitle}>test: </span>
					<span className={currentWeatherVal}>test</span>
				</li>
			</ul>
		</div>
		);
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



