import React from 'react';
import './App.css';
import Request from "react-http-request";

function Loading(props) {
	console.log(props);
	return (
		<div className="spinner-border" role="status">
			<span className="sr-only">Loading...</span>
		</div>
	);
}

function FetchError(props) {
	const errorMsg = `${props.error.response.statusCode} ${props.error.response.statusText}`
	return (
		<div className="alert alert-danger">
			Unable to fetch data.<br></br>
			Error status: {errorMsg}
		</div>
	);
}

class ProjectComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			projects: props.projects
		};
	}

	renderRow(courses) {
		return courses.map(course => {
			return (
				<tr>
					<td>{course.name}</td>
					<td>{course.link}</td>
					<td><a href={course.repo} target="\_blank">{course.repo}</a></td>
				</tr>
			);
		});
	}

	renderTableBody() {

		return this.state.projects.map(cat => {
			return (
				<tbody>
					<tr><td colSpan="3">{cat.category}</td></tr>
					{this.renderRow(this.state.projects.projects)}
				</tbody>
			);
		});
	}

	render() {
		return (
			<div>
				<table className="table">
					<thead>
						<tr>
							<th scope="row">Project</th>
							<th scope="row">Page</th>
							<th scope="row">Repository</th>
						</tr>
					</thead>
					{this.renderTableBody()}
				</table>
			</div>
		);
	}
}


class App extends React.Component {

	render() {
		return (
			<div>
				<h1>Jumppage</h1>
				<Request
					url="https://raw.githubusercontent.com/asgerius/asgerius.github.io/master/src/gh-jumppage/public/projects.json"
					method="get"
					accept="application/json"
					verbose={true}
				>
					{
						({error, result, loading}) => {
							if (loading) {
								return <Loading></Loading>;
							} else if (result) {
								return <ProjectComponent projects={JSON.parse(result.text)}></ProjectComponent>;
							} else {
								return <FetchError error={error}></FetchError>;
							}
						}
					}
				</Request>
			</div>
		);
	}
}

export default App;
