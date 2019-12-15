import React from 'react';
import './App.css';

function Loading(props) {
	return (
		<div className="spinner-border" role="status">
			<span class="sr-only">Loading...</span>
		</div>
	);
}

function FetchError(props) {
	return (
		<div className="alert alert-danger">
			Unable to fetch data
		</div>
	);
}


class App extends React.Component {


	render() {
		return (
			<div>
				<h1>Jumppage</h1>
				<table className="table">
					<thead>
						<tr>
							<th colSpan="2">hello there</th>
						</tr>
					</thead>
				</table>
			</div>
		);
	}
}

export default App;
