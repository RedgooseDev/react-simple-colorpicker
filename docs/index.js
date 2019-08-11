(function(){

	if (!ColorPicker)
	{
		console.error('not found ColorPicker');
		return null;
	}

	const defaultColor = '#d73d7d';
	const elements = {
		input_hex: document.getElementById('colorCode_hex'),
		input_rgba: document.getElementById('colorCode_rgba'),
	};


	function rgb2hex(rgb)
	{
		rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
		return (rgb && rgb.length === 4) ? "#" +
			("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
			("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
			("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
	}
	function hex2rgb(hex) {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? 'rgba('+ parseInt(result[1], 16) +',' + parseInt(result[2], 16) + ','+ parseInt(result[3], 16) +',1)' : null;
	}

	function onChanged(color)
	{
		color = color || hex2rgb(defaultColor);
		elements.input_rgba.value = color;
		elements.input_hex.value = rgb2hex(color);
	}

	ReactDOM.render(
		React.createElement(
			ColorPicker,
			{
				color: defaultColor,
				onChange: onChanged
			}
		),
		document.getElementById('app')
	);

	// set color in input
	onChanged();

}());