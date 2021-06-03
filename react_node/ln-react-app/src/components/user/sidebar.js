import React from 'react'

const UserList = ({users_data}) => {
	return users_data.map(user => {
			return <li key={user.name}>
				<a href = {user.email}>{user.name}</a>
				</li>
		})
}

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<nav id="sidebar">
				<div class="sidebar-header">
					<h3>Bootstrap Sidebar</h3>
				</div>
				<ul class="list-unstyled components">
					<p>Dummy Heading</p>
					<UserList users_data={this.props.users_data}/>
				</ul>
				<ul class="list-unstyled CTAs">
					<li>
						<a href="https://bootstrapious.com/tutorial/files/sidebar.zip" class="download">Download source</a>
					</li>
					<li>
						<a href="https://bootstrapious.com/p/bootstrap-sidebar" class="article">Back to article</a>
					</li>
				</ul>
			</nav>
		);
	}
}

export default Sidebar