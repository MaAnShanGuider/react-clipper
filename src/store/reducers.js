const initState = {
	text: "我是initState"
}
const HomeReducer = (state = initState, action) => {
	switch (action.type) {
	case "xi":
		return { text: "我是xi" };
	case "ha":
		return { text: "我是ha" };
	case "FETCH_SUCCEEDED":
		return { text: "请求成功" };
	case "FETCH_FAILED":
		return { text: "请求失败" };
	default:
		return state;
	}
}

export default HomeReducer;