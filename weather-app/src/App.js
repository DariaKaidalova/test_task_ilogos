import React from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import './main.css';

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

class Table extends React.Component {
	render() {
		return  (
			<table className={b-table}>
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

class Columnleft extends React.Component {
	render() {
		return  (
			<div className={b-content__columnLeft}>
				<Table />
			</div>
		);
	}
}

class Addbutton extends React.Component {
	render() {
		return  (
			<button className={b-button}>Add</button>
		);
	}
}

class Addfield extends React.Component {
	render() {
		return  (
			<input  className={b-control__field} type="text" placeholder="Add town or city">
		);
	}
}

class Controlswrap extends React.Component {
	render() {
		return  (
			<div className={l-control g-clearfix}>
				<div className={b-control -float_left}><Addfield /></div>
				<div className={b-control -float_left}><Addbutton /></div>
			</div>
		);
	}
}

class Sidebar extends React.Component {
	render() {
		return  (
			<aside className={b-sidebar}>
				<Controlswrap />
			</aside>
		);
	}
}

class Main extends React.Component {
	render() {
		return  (
			<main className={b-content}>
				<div className={b-content__inner g-clearfix}>
					<Sidebar />
					<Columnleft />
				</div>
			</main>
		);
	}
}

class Header extends React.Component {
	render() {
		return  (
			<header className={b-header}>
        <div className={b-header__inner}>
          <h1 className={b-header__title}>Let&#039;s find out the weather forecast!</h1>
        </div>
      </header>
		);
	}
}

class App extends extends React.Component {
	render() {
		return  (
			<Header />
			<Main />
		);
	}
}

export default App



