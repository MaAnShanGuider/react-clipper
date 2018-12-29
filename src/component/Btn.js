import React, { Component } from 'react';

class Btn extends Component {
	constructor(props) {
		super(props);
	}

	handleClick = () => {
		const { saveImg } = this.props;

		saveImg();
	}
	// handleClickShow
	render() {
		return (
			<div>
				<button onClick={this.handleClickShow}>保存图片</button>
			</div>
			)
	}
}

export default Btn;