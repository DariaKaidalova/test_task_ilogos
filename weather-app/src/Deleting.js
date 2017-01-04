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
      <tr id={this.props.city}>
        <td className={'b-table__city'}>{this.props.city}, {this.props.country}</td>
        <td className={'b-table__coord'}>Lat: {this.props.lat}, Lon: {this.props.lon}</td>
        <td className={'b-table__weather'}>
          <div className={'b-table__weatherItem'}>Weather: {this.props.descr}</div>
          <div className={'b-table__weatherItem'}>Temperature: {this.props.temp} �C</div>
          <div className={'b-table__weatherItem'}>Minimum temperature: {this.props.minTemp} �C</div>
          <div className={'b-table__weatherItem'}>Maximum temperature: {this.props.maxTemp} �C</div>
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
        <Maintable forecasts={this.props.forecasts}/>
			</div>
		);
	}
}

/*wrap of controls*/
class Controlswrap extends React.Component {
	render(){
		return(
			<div className={'l-control g-clearfix'}>
				<div className={'b-control -float_left'}><input id="js-addField" className={'b-field'} type="text" placeholder="Add town or city"/></div>
        <div className={'b-control -float_left'}><a onClick={this.props.onAddForecast} className={'b-button'} href="">Add</a></div>
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
						<span className={'b-currentWeather__title'}>Temperature:</span><span className={'b-currentWeather__val'}>{this.props.temp} �C</span>
					</li>
					<li className={'b-currentWeather__item'} >
						<span className={'b-currentWeather__title'}>Minimum temperature:</span><span className={'b-currentWeather__val'}>{this.props.minTemp} �C</span>
					</li>
					<li className={'b-currentWeather__item'}>
						<span className={'b-currentWeather__title'}>Maximum temperature:</span><span className={'b-currentWeather__val'}>{this.props.maxTemp} �C</span>
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
		else alert('Geolocation API �� �������������� � ����� ��������');
		
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

class Header extends React.Component {
	render() {
		return  (
			<header>
        <div>
          <h1>Let&#039;s find out the weather forecast!</h1>
        </div>
      </header>
		);
	}
}

//var weatherList = [], serialWeatherList, localWeatherList;

//localWeatherList = JSON.parse(localStorage.getItem('weatherKey'));

//if(localWeatherList !== null) weatherList = localWeatherList;

//console.log(localWeatherList);
class Main extends React.Component {
  constructor(props) {
    super(props);/*
    this.state = {
      isUsed: false
    };*/
    this.state = {
      cities: []
    };
  }  

  render() {
    console.log("Rendering", this.state.cities);
    
    let forecasts = [];

    for (let i = 0; i < this.state.cities.length; i++) {
      forecasts.push(<Weather onRemoveForecast={this.onRemoveForecast.bind(this, this.state.cities[i].id)}/>); 
    }

    return (
      <main>
        <div>
          <Sidebar onAddForecast={this.onAddForecast.bind(this)}/>
          <Columnleft forecasts={forecasts}/>
        </div>
      </main>
    )
  }

  onAddForecast(e) {
    e.preventDefault();
/*
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
            break;
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

        serialWeatherList = JSON.stringify(weatherList);
        localStorage.setItem('weatherKey', serialWeatherList);
        //localWeatherList = JSON.parse(localStorage.getItem('weatherKey'));
        
        this.setState(function(prevState, props) {
          return {
            isUsed: isUsed
          }
        });

        if(isUsed === false) ReactDOM.render(<Message content={'The weather added.'}/>, messageContainer);
        else ReactDOM.render(<Message content={'The weather updated.'}/>, messageContainer);

      } else {

        ReactDOM.unmountComponentAtNode(messageContainer);
        ReactDOM.render(<Messageerror content={'Please enter the city.'}/>, messageContainer);

      }
    }; */
    this.setState((prevState, props) => {
      
      let newState = Array.from(prevState.cities);
      newState.push({
        name: "city " + prevState.cities.length,
        id: prevState.cities.length + 1
      });
      
      return {
        cities: newState
      };
    });
  }

  onRemoveForecast(id, e) {
    e.preventDefault();
    
    this.setState((prevState, props) => {
      let newState = [];
      
      prevState.cities.forEach((x) => {
        if (x.id != id)
          newState.push(x);
      });
      
      return {
        cities: newState
      };
    });
  }
}

class App extends React.Component {
	render() {
		return  (
			<div>
				<Header />
				<Main />
			</div>
		);
	}
}