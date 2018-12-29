import React, { Component } from 'react';

import './Clipper.scss';
class Cliper extends Component {
	constructor(props) {
		super(props);

		const deviceWidth = document.documentElement.clientWidth; 
		const deviceHeight = document.documentElement.clientHeight; 
		this.state = {
			show_modals: false,
			img_src: null,
			deviceWidth: deviceWidth,
			deviceHeight: deviceHeight,
			initClipWidth: deviceWidth * 0.8,
			initClipHeight: deviceWidth * 0.8,
			imgCurrentWidth: deviceWidth * 0.5,
		}
	}
	handleChange = (e) => {
		console.log(e.currentTarget.files[0])

	
			
		let reader = new FileReader();
                // 监听reader对象的的onload事件，当图片加载完成时，把base64编码賦值给预览图片
        reader.addEventListener("load", () => {
					console.log(reader);
					let img = new Image();
					img.src = reader.result;//获取编码后的值,也可以用this.result获取
					img.onload = function () {
						console.log('height:'+this.height+'----width:'+this.width)
					}

                    this.setState({ show_modals: true, img_src: reader.result });
             }, false);
        // 调用reader.readAsDataURL()方法，把图片转成base64
        reader.readAsDataURL(e.currentTarget.files[0]);		
	}
	handleModalsClick = () => {
		this.setState({ show_modals: false });
	}
	handleClickRotate = (type) => {

		// 左旋
		if(type == 1){

		} else if(type == 2) { // 右旋

		}
	}
	// 难点其实在canvas 那里，别的倒不算什么
	render(){
		const { 
			show_modals, 
			img_src,
			initClipWidth,
			initClipHeight,
			deviceHeight,
			deviceWidth,
		 } = this.state;

		// 设备宽度

		return (
			<div>
				{// <input type="file"  accept="image/*" capture="camera" size="30" />
			}
				<label htmlFor="clipper_image">
					<span className="img_label">选择图片</span>
					<input 
						type="file"  
						accept="image/*" 
						size="30" 
						id="clipper_image" 
						name="clipper_image" 
						style={{display: 'none'}} 
						onChange={this.handleChange}
					/>
				</label>
				
				<div className="modals" style={ show_modals ? {} : {display: 'none'}} onClick={this.handleModalsClick}>
					<div className="outer-container" style={{ height: deviceHeight - 80}}>
						<div style={{
							width: deviceWidth * 0.25
						}}></div>
						<div className="center-container" style={{
							width: deviceWidth * 0.5,
						}}>
							<div style={{
								height: (deviceHeight - 80 - deviceWidth * 0.5) / 2,
							}}></div>
							<div className="img-container" style={{
								height: deviceWidth * 0.5,
								width: deviceWidth * 0.5,
								background: 'none',
							}}
							>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
							</div>
							<div style={{
								height: (deviceHeight - 80 - deviceWidth * 0.5) / 2,
							}}></div>
						</div>
						<div style={{
							width: deviceWidth * 0.25
						}}></div>
						<img src={img_src} alt="" style={{width: deviceWidth}} />
					</div>	
					<div className="footer-container">
						<button>按钮</button>
						<div onClick={() => handleClickRotate(1)}>左旋</div>
						<div onClick={() => handleClickRotate(2)}>右旋</div>
					</div>

			</div>
			</div>
			)
	}
}

export default Cliper; 