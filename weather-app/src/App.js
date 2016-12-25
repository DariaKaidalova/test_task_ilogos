import React from 'react';
//import ReactDOM from 'react-dom';
import './normalize.css';
import './main.css';

var clearfix = 'g-clearfix';

class Tablerow extends React.Component {
	render() {
		return  (
			<tr>
				<td>test</td>
				<td>test</td>
			</tr>
		);
	}
}

var table = 'b-table';
class Maintable extends React.Component {
	render() {
		return  (
			<table className={table}>
        <thead>
          <tr>
            <th>City or town</th>
            <th>Weather forecast</th>
          </tr>
        </thead>
        <tbody>
        	<Tablerow />
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
	render() {
		return  (
			<div className={control +' ' + floatLeft}><button className={button}>Add</button></div>
		);
	}
}

class Addfield extends React.Component {
	render() {
		return  (
			<div className={control +' ' + floatLeft}><input  className={field} type="text" placeholder="Add town or city"/></div>
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



