# React-Simple-ColorPicker


## Install

Via yarn:

```bash
npm install --save github:RedgooseDev/react-simple-colorpicker
yarn add github:RedgooseDev/react-simple-colorpicker
```


## Usage

### javascript

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ColorPicker from 'react-simple-colorpicker';

class App extends React.Component {

	static defaultProps = {
		initialColor: '#ffffff'
	};

	constructor(props) {
		super();

		this.state = {
			color : props.initialColor
		};
	}

	render() {
		return (
			<ColorPicker
				color={this.state.color}
				onChange={(color) => this.setState({ color: color })}
				//paletteColors={[]}
			/>
		);
	}
}

ReactDOM.render(<App initialColor="#ffffff" />, document.querySelector("#app"));
```

### scss

```javascript
@import '~react-simple-colorpicker/src/ColorPicker/index.scss';
```