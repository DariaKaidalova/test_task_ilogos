import React from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import './main.css';

/*Messeges*/
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
      <tr name={this.props.city}>
        <td className={'b-table__city'}>{this.props.city}, {this.props.country}</td>
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
        <td className={'b-table__removal'}><Removebutton onRemoveForecast={this.props.onRemoveForecast}/></td>
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
            <th>City</th>
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
        <Maintable forecasts={this.props.forecasts} onRemoveForecast={this.props.onRemoveForecast} />
			</div>
		);
	}
}

/*button 'Add'*/
class Addbutton extends React.Component {
  render() {
    return  (
      <div className={'b-control -float_left'}><a onClick={this.props.onAddForecast} className={'b-button'} href="">Add</a></div>
    );
  }
}

/*button 'Remove'*/
class Removebutton extends React.Component {
  render() {
    return  (
      <a className={'b-button'} onClick={this.props.onRemoveForecast} href="" >Remove</a> 
    );
  }
}

/*field for adding weather*/
class Addfield extends React.Component {
	render() {
		return  (
			<div className={'b-control -float_left'}><input id="js-addField" className={'b-field'} type="text" placeholder="Add town or city"/></div>
		);
	}
}

/*wrap of controls*/
class Controlswrap extends React.Component {
	render(){
		return(
			<div className={'l-control g-clearfix'}>
				<Addfield />
        <Addbutton onAddForecast={this.props.onAddForecast}/>
			</div>
		);
	}
}

/*current weather block*/
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
			url = 'http://api.openweathermap.org/data/2.5/weather?lat='+currentLat+'&lon='+currentLon+'&appid=1cf63a228c90f35807d7814f738e9d6d&units=metric';
		
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
			<div className={'l-currentWeather'} id="js-currentWeather"></div>
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
        <div className={'l-message'} id="js-messageContainer"></div>
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
/*var weatherSerial, localParsedWeather;
if(localParsedWeather !== 'underfined') {
//if(localParsedWeather.length > 0) weatherList = localParsedWeather;
console.log(localParsedWeather);
}*/
/*weatherSerial = JSON.stringify(weatherList);
localStorage.setItem('weatherKey', weatherSerial);
localParsedWeather = JSON.parse(localStorage.getItem('weatherKey'));*/
var weatherList = [];
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUsed: false
    };
  }  

  render() {
    let forecasts = [];

    for (let i = 0; i < weatherList.length; i++) {
      var item = weatherList[i];
      forecasts.push(<Weather key={i.toString()} city={item.cityName} country={item.cityCountry} lat={item.cityLat} lon={item.cityLon} descr={item.cityDescr} temp={item.cityTemp} minTemp={item.cityMinTemp} maxTemp={item.cityMaxTemp} pressure={item.cityPressure} humidity={item.cityHumidity} wind={item.cityWind} onRemoveForecast={this.props.onRemoveForecast}/>); 
    }

    return (
      <main className={'b-content'}>
        <div className={'b-content__inner g-clearfix'}>
          <Sidebar onAddForecast={this.onAddForecast.bind(this)}/>
          <Columnleft forecasts={forecasts} onRemoveForecast={this.onRemoveForecast.bind(this)}/>
        </div>
      </main>
    )
  }

  onAddForecast(e) {
    e.preventDefault();

    var addFieldVal = document.getElementById('js-addField').value,
        messageContainer = document.getElementById('js-messageContainer'),
        url = 'http://api.openweathermap.org/data/2.5/weather?q='+addFieldVal+'&appid=1cf63a228c90f35807d7814f738e9d6d&units=metric';
  
    ReactDOM.unmountComponentAtNode(messageContainer);

    var cityReq = new XMLHttpRequest();
    cityReq.open('GET', url);
    cityReq.send();

    cityReq.onreadystatechange = (e) => {
      if (cityReq.readyState !== 4) return;
      if (cityReq.status === 200) {

        var currentWeather = JSON.parse(cityReq.responseText),
            cityName = currentWeather.name,
            sys = currentWeather.sys,
            cityCountry = sys.country,
            coord = currentWeather.coord,
            cityLon = coord.lon,
            cityLat = coord.lat,
            weather = currentWeather.weather,
            weatherArray =  weather[0],
            main = currentWeather.main,
            wind = currentWeather.wind,
            cityDescr = weatherArray.description,
            cityTemp = main.temp,
            cityMinTemp = main.temp_min,
            cityMaxTemp = main.temp_max,
            cityPressure = main.pressure,
            cityHumidity = main.humidity,
            cityWind = wind.speed;

        var index = -1, isUsed = false;

        for (let i = 0; i < weatherList.length; i++) {
          var item = weatherList[i];
          if(item.cityName === cityName) {
            index = i;
            isUsed = true;
          }
        }

        var obj = {
          cityName: cityName,
          cityCountry: cityCountry,
          cityLat: cityLat,
          cityLon: cityLon,
          cityDescr: cityDescr,
          cityTemp: cityTemp,
          cityMinTemp: cityMinTemp,
          cityMaxTemp: cityMaxTemp,
          cityPressure: cityPressure,
          cityHumidity: cityHumidity,
          cityWind: cityWind
        }

        if(isUsed === false) {
          weatherList.push(obj);
        }
        else {
          weatherList.splice(index, 1, obj);
        }
        
        this.setState(function(prevState, props) {
          return {
            isUsed: isUsed
          }
        });

        ReactDOM.unmountComponentAtNode(messageContainer);
        ReactDOM.render(<Message content={'The weather added to the table.'}/>, messageContainer);

      } else {

        ReactDOM.unmountComponentAtNode(messageContainer);
        ReactDOM.render(<Messageerror content={'Please enter the city.'}/>, messageContainer);

      }
    }; 
  }

  onRemoveForecast(e) {
    e.preventDefault();
    console.log('test');
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



