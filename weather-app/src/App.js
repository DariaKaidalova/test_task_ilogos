import React from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import './main.css';

var clearfix = 'g-clearfix',
		error ='b-message -type_error', 
		messageContainer = 'l-message';
// warning = 'b-message -type_warning',
// message =  'b-message'

// class Message extends React.Component {
// 	render() {
// 		return  (
// 			<div className={message}></div>
// 		);
// 	}
// }

// class Messagewarning extends React.Component {
// 	render() {
// 		return  (
// 			<div className={warning}></div>
// 		);
// 	}
// }

class Messageerror extends React.Component {
	render() {
		return  (
			<div className={error} id="js-addFieldError">Please enter the city.</div>
		);
	}
}

/*class Tablerow extends React.Component {
	render() {
		return  (
			<tr>
				<td>test</td>
				<td>test</td>
				<td></>
			</tr>
		);
	}
}*/
var tableWeather = 'b-table__weather';
var Weather = React.createClass({
  render: function(props) {
    return (
  		<tr>
  			<td>{this.props.city}</td>
  			<td>{this.props.coord}</td>
  			<td>
  				<div className={tableWeather}>{this.props.descr}</div>
  				<div className={tableWeather}>{this.props.temp}</div>
  				<div className={tableWeather}>{this.props.minTemp}</div>
  				<div className={tableWeather}>{this.props.maxTemp}</div>
  				<div className={tableWeather}>{this.props.pressure}</div>
  				<div className={tableWeather}>{this.props.humidity}</div>
  				<div className={tableWeather}>{this.props.wind}</div>
  			</td>
			</tr>
  	)
  }
});

var table = 'b-table';
class Maintable extends React.Component {
	render() {
		return  (
			<table className={table}>
        <thead>
          <tr>
            <th>City or town</th>
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

var controlsWrap = 'l-control',
		control = 'b-control', 
		floatLeft = '-float_left',
		button = 'b-button',
		field = 'b-field';
	
class Addbutton extends React.Component {
	constructor(props) {
    super(props);
    this.state = {};
    this.makeRequest = this.makeRequest.bind(this); //This binding is necessary to make 'this' work in the callback
  }

  makeRequest(e) {
		e.preventDefault();

		var addField = document.getElementById('js-addField'),
		    cityName = addField.value,
		    tbody = document.getElementById('js-tbody'),
		    messageContainer = document.getElementById('js-messageContainer');

			var url = 'http://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=1cf63a228c90f35807d7814f738e9d6d';

			var cityReq = new XMLHttpRequest();
			cityReq.open('GET', url);
			cityReq.send();

			cityReq.onreadystatechange = (e) => {
			  if (cityReq.readyState !== 4) return;
			  if (cityReq.status === 200) {
			    var currentWeather = JSON.parse(cityReq.responseText);
			    var coord = currentWeather.coord,
			    		cityCoord = 'Lon: '+ coord.lon + ', lat: '+coord.lat,
	    				weather = currentWeather.weather, weatherArray =  weather[0],
	    				main = currentWeather.main,
	    				wind = currentWeather.wind,
	    				cityDescr = 'Weather: ' + weatherArray.description,
	    				cityTemp = 'temperature: ' + main.temp + ' °C',
	    				cityMinTemp = 'Minimum temperature: ' + main.temp_min + ' °C',
	    				cityMaxTemp = 'Maximum temperature: ' + main.temp_max + ' °C',
	    				cityPressure = 'Pressure: ' + main.pressure +' hpa',
	    				cityHumidity = 'humidity: ' + main.humidity+'%',
    					cityWind = 'wind: ' + wind.speed+' m/s';

	    				cityconsole.log(currentWeather);

					ReactDOM.render(<Weather city={cityName} coord={cityCoord} descr={cityDescr} temp={cityTemp} minTemp={cityMinTemp} maxTemp={cityMaxTemp} pressure={cityPressure} humidity={cityHumidity} wind={cityWind}, tbody);
					ReactDOM.unmountComponentAtNode(messageContainer);
			  } else {
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

var sidebar = 'b-sidebar';
class Sidebar extends React.Component {
	render() {
		return  (
			<aside className={sidebar}>
				<Controlswrap />
				<div className={messageContainer} id="js-messageContainer"></div>
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



