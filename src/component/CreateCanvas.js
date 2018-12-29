import React, { Component } from 'react';

class UpgradingHeader extends Component {
	constructor(props){
		super(props);
		this.state = {
			circleSmall: [],
			baseRadius: Math.PI / 180,
			timerId: 0
		 };
	}
	componentDidMount() {
		this.renderCanvas(this.props);
	}
	// 数据更改时，重新渲染一次这个canvas
	componentWillReceiveProps(nextProps) {
		if (this.props.text != nextProps.text){
			console.log(this.props, nextProps);

			this.setState({
				circleSmall: []
			}, () => {
				this.renderCanvas(nextProps);
			})
			
		}
	}
	renderCanvas = ($props) => {
		// 重新渲染, 再此之前，我们要把原来的东西给他全部清除掉。
		const { circleNumber } = $props;
		const { timerId } = this.state;
		let _this = this;
		let ctx = this.canvas.getContext('2d');
		this.clearAllReg(ctx);
		this.renderCircle(ctx);
		this.renderText(ctx, $props.text);

		for (let i = 0; i < circleNumber; i ++){
			this.createCircleSmall(Math.floor(Math.random() * (Math.PI * 2)), ctx);

		}

		clearInterval(timerId);
		let timer = setInterval(_this.renderAnimateCircle.bind(_this, ctx), 30);
		this.setState({ timerId: timer });
	}
	// 清除所有的图像，初始化
	clearAllReg = (ctx) => {
		const { sideLength, R } = this.props;
		ctx.clearRect(0,0,sideLength,sideLength);
	}
	// 绘制大圆
	renderCircle = (ctx) => {
		// 设置渐背景
		const { sideLength, R } = this.props;
		let grad = ctx.createLinearGradient(0, 0, 300, 0);
		grad.addColorStop(0, "#6090ff");               // 定义渐变色颜色
		grad.addColorStop(1, "#8bacfd");



		ctx.beginPath();			
		ctx.shadowBlur = 20;
		ctx.shadowColor = "#c8d7ff";
		
		ctx.arc(sideLength / 2, sideLength / 2, R, 0, 2 * Math.PI);
		
		ctx.fillStyle = grad;
		ctx.fill();
		ctx.closePath();
	}
	createCircleSmall= (initX, ctx) => {
		const { sideLength, R } = this.props;
		const { circleSmall, baseRadius } = this.state;

		let maxSmallCircleRadius = 6;
		let minSmallCircleRadius = 2;
		let circleTrackRadius = Math.floor(Math.random() * (sideLength / 2 - R - 2 * maxSmallCircleRadius)) + R + maxSmallCircleRadius; // 轨迹圆半径，初始角度为180.
		let circleSmallRadius = Math.floor(Math.random() * 4) + minSmallCircleRadius; // 小圆自身半径
		
		

		circleSmall.push({
			r: circleSmallRadius,
			R: circleTrackRadius,
			x: circleTrackRadius * Math.cos(initX) + sideLength / 2,
			y: circleTrackRadius * Math.sin(initX) + sideLength / 2,
			initX: initX,
			bgColor: this.getRandomBackgroundColor(),
			arrow: Math.random() > 0.5 ? 1 : -1,  // true, 顺时针；false, 逆时针
			speed: baseRadius * (Math.floor(Math.random() * 5) + 1), // 这个10就是我们的速度
		});
		this.setState({
			circleSmall
		});
	}
	renderAnimateCircle = (ctx) => {
		// 先清除之前的，再渲染新的。
		const { circleSmall } = this.state;
		const { sideLength } = this.props;
		for (let i = 0; i < circleSmall.length; i ++){
			
			let initX = circleSmall[i].initX + circleSmall[i].arrow * circleSmall[i].speed;
			let x = circleSmall[i].R * Math.cos(initX) + sideLength / 2;
			let y = circleSmall[i].R * Math.sin(initX) + sideLength / 2;

			this.clearArcFun(circleSmall[i].x, circleSmall[i].y, circleSmall[i].r, ctx);
			// this.clearArcFunTransparents(circleSmall[i].x, circleSmall[i].y, circleSmall[i].r, this.ctx);
			ctx.beginPath();
		
			ctx.arc(x, y, circleSmall[i].r, 0, 2 * Math.PI);
			
			ctx.fillStyle = circleSmall[i].bgColor;
			ctx.fill();
			ctx.closePath();
			circleSmall[i].x = x;
			circleSmall[i].y = y;
			circleSmall[i].initX = initX;
		}
		this.setState({
			circleSmall
		});
		

	}
	// 绘制文本
	renderText = (ctx, text) => {
		// canvas绘制文本时，只要我们使用
		// this.ctx.textAlign = 'center';
		// this.ctx.textBaseline = 'middle';
		// 就能使他文本按照我们定义的点居中, 根据长度判断
		const { sideLength } = this.props;
		let fontSize = '32';
		if(text.length > 4){
			fontSize = 128 / text.length;
		}
		
		ctx.beginPath();
		ctx.font = `${fontSize}px 微软雅黑`;
		ctx.shadowColor = 'rgba(0, 0, 0, 0)';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = 'white';
		ctx.fillText( text, sideLength / 2, sideLength / 2, sideLength);
		ctx.closePath();
	}
	getRandomBackgroundColor = () => {
		let randomNum1 = Math.floor(Math.random() * 255) + 1;
		let randomNum2 = Math.floor(Math.random() * 255) + 1;
		let randomNum3 = Math.floor(Math.random() * 255) + 1;

		return `rgb(${randomNum1}, ${randomNum2}, ${randomNum3})`;
	}
	clearArcFun = (x, y, r, cxt) => {    // (x,y)为要清除的圆的圆心，r为半径，cxt为context
		let stepClear = 0.2;// 别忘记这一步， 这个系数是精细程度，越小，越干净
		
		clearArc(x, y, r);
		function clearArc(x, y, radius){
			let calcWidth = radius - stepClear;  
			let calcHeight = Math.sqrt(radius * radius - calcWidth * calcWidth);  

			let posX = x - calcWidth;  
			let posY = y - calcHeight;  

			let widthX = 2 * calcWidth;  
			let heightY = 2 * calcHeight;  

			if (stepClear <= radius){  
				cxt.clearRect(posX - 1, posY - 1, widthX + 2, heightY + 2);   // - 1 和 +2 是修正值，扩大描边
				stepClear += 1;  
				clearArc(x, y, radius);  
			}  
		}  
	}
	render(){
		const { sideLength, lowLevel, create_time, text } = this.props;
		
		return <div className="g-reset g-relative v-upgradingHeader g-flex g-jc-c g-ai-c" >
			<div className="header-left">
				<div className="header-left-bg">
					{lowLevel}
				</div>
			</div>
			<div className="header-center" />
			<div>
				<canvas ref={ref => (this.canvas = ref)} width={sideLength} height={sideLength} className="g-show" style={{ margin: 'auto' }}/>
				<p className="g-tc">{create_time}</p>
			</div>

		</div>;
	}
}
UpgradingHeader.defaultProps = {
	sideLength: 186,
	R: 63, 
	text: '联创', 
	circleNumber: 6,
	lowLevel: '暗级I',
	create_time: '2018-12-05 13:00:16',
};

export default UpgradingHeader;