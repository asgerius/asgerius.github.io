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

	renderRow(courses) {
		return courses.projects.map((course, i) => {
			return (
				<tr>
					<td><strong>{i === 0 ? courses.category : ""}</strong></td>
					<td>{course.name}</td>
					<td><a href={course.page} target="\_blank">{cleanUrl(course.page)}</a></td>
					<td><a href={course.repo} target="\_blank">{cleanUrl(course.repo)}</a> {course.private ? "(private)" : null}</td>
				</tr>
			);
		});
	}

	renderTableBody() {

		return this.state.projects.map(cat => {
			return (
				<tbody>
					{this.renderRow(cat)}
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
							<th scope="row">Category</th>
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
				<h1 className="pt-4">Jumppage</h1>
				<p>The following is a list of all my major projects as well projects to which I have made contributions.</p>
				<p><a href="https://github.com/asgerius/" target="\_blank">Github profile</a></p>
				<Request
					url="https://raw.githubusercontent.com/asgerius/asgerius.github.io/master/src/gh-jumppage/public/projects.json"
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
