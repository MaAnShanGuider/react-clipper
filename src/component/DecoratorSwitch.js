import React, { Component } from 'react';

class DecoratorSwitch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isMouseDown: false,
			targetX: 20,
			targetY: 400
		};
	}
	componentDidMount() {
		
	}
	handleMouseDown = (e) => {
		console.log('handleMouseDown');
		e.stopPropagation();
		this.setState({
			isMouseDown: true
		});
	}
	handleMouseMove = (e) => {
		const { isMouseDown } = this.state;

		e.stopPropagation();
		if (isMouseDown){
			let maxOffsetX = document.documentElement.clientWidth;
			let maxOffsetY = document.documentElement.clientHeight;
			let targetX = 0;
			let targetY = 0;
			if (e.clientX - 35 <= 0){
				targetX = 0;
			} else if (e.clientX + 35 >= maxOffsetX){
				targetX = maxOffsetX - 70;
			} else {
				targetX = e.clientX - 35;
			}

			if (e.clientY - 35 <= 0){
				targetY = 0;
			} else if (e.clientY + 35 >= maxOffsetY){
				targetY = maxOffsetY - 70;
			} else {
				targetY = e.clientY - 35;
			}


			this.setState({ targetX, targetY });
		} else {
			this.setState({ isMouseDown: false });
		}
	}
	handleMouseUp = (e) => {
		e.stopPropagation();
		console.log('handleMouseUp');

		this.setState({
			isMouseDown: false
		});
	}

	handleTouchStart = (e) => {
		e.stopPropagation();
		this.setState({
			isMouseDown: true
		});
	}
	// 要考虑到四个边框的情况
	handleTouchMove = (e) => {
		e.stopPropagation();
		let maxOffsetX = document.documentElement.clientWidth;
		let maxOffsetY = document.documentElement.clientHeight;
		let targetX = 0;
		let targetY = 0;

		// 紧贴左边
		if (e.nativeEvent.changedTouches[0].clientX - 35 <= 0){
			targetX = 0;
		} else if (e.nativeEvent.changedTouches[0].clientX + 35 >= maxOffsetX){
			targetX = maxOffsetX - 70;
		} else {
			targetX = e.nativeEvent.changedTouches[0].clientX - 35;
		}

		if (e.nativeEvent.changedTouches[0].clientY - 35 <= 0){
			targetY = 0;
		} else if (e.nativeEvent.changedTouches[0].clientY + 35 >= maxOffsetY){
			targetY = maxOffsetY - 70;
		} else {
			targetY = e.nativeEvent.changedTouches[0].clientY - 35;
		}


		this.setState({ targetX, targetY });
	}
	handleTouchEnd = (e) => {
		e.stopPropagation();
		this.setState({
			isMouseDown: false
		});
	}
	render() {
		const { isMouseDown, targetX, targetY } = this.state;
		return (<div 
			className="iconfont icon-exchange" 
			style={{
				position: 'fixed',
				top: targetY,
				left: targetX,
				zIndex: 99,
				borderRadius: '100%',
				textAlign: 'center',
				background: isMouseDown ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)',
				lineHeight: '70px',
				height: '70px',
				width: '70px',
				// marginTop: '-70px',
				color: 'white',
				fontSize: '50px',
				transition: 'background .3s',
				cursor: 'pointer',
			}} 
			onClick={this.props.handleClick}
			onMouseDown={this.handleMouseDown}
			onMouseUp={this.handleMouseUp}
			onMouseMove={this.handleMouseMove}
			onMouseOut={this.handleMouseUp}
			onTouchStart={this.handleTouchStart}
			onTouchMove={this.handleTouchMove}
			onTouchEnd={this.handleTouchEnd}
		/>);
	}
}

export default DecoratorSwitch;