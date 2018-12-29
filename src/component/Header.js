import React, { Component } from 'react';
import style from "./style.less";
import CreateCanvas from './CreateCanvas';
import DecoratorSwitch from './DecoratorSwitch';
import pureRender from './pure-component-decorator';

@pureRender
class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDownloadImg: false,
			txt: "初始状态",
			showModals: false,
			num: 0

		}
	}
	handelKeyUp = (e) => {
		this.setState({
			txt: e.currentTarget.value
		})
	}
	render() {
		const { txt, showModals, num } = this.state;
		return (
			<div id="con">
				<div className={style.box}>
					<p>{num}</p>
					<input type="text" onChange={this.handelKeyUp} />
					<CreateCanvas text={txt} />
					<DecoratorSwitch />
				</div>
			</div>
		);
	}
}

export default Header;