import React from 'react';
import './App.css';
import Request from "react-http-request";

function cleanUrl(url, stripSub = false) {
	if (!url) {
		return;
	}
	if (url.startsWith("https://")) {
		url = url.slice(8);
	} else if (url.startsWith("http://")) {
		url = url.slice(7);
	}
	if (stripSub && url.indexOf("/") > -1) {
		const idx = url.indexOf("/");
		url.slice(0, idx);
	}
	return url;
}

function Loading(props) {
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

	renderRow(project) {
		return (
			<tr>
				<td>{project.name}</td>
				<td><a href={project.page} target="\_blank">{cleanUrl(project.page)}</a></td>
				<td><a href={project.repo} target="\_blank">{cleanUrl(project.repo)}</a> {project.private ? "(private)" : null}</td>
			</tr>
		);
	}

	renderTableBody() {

		return this.state.projects.map(project => {
			return (
				<tbody>
					{this.renderRow(project)}
				</tbody>
			);
		});
	}

	render() {
		return (
			<div>
				<table className="table table-responsive">
					<thead>
						<tr>
							<th scope="row">Project</th>
							<th scope="row">Paper / Page</th>
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
				<h1 className="pt-4">Jumppage</h1>
				<p><a href="https://github.com/asgerius/" target="\_blank">Github profile</a></p>
				<Request
					url="https://raw.githubusercontent.com/asgerius/asgerius.github.io/master/projects.json"
					method="get"
					accept="application/json"
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
