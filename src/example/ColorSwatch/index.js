import React from "react";
import Item from './Item';


class ColorSwatch extends React.Component {

	render()
	{
		const { props } = this;

		return (
			<div className="swatch">
				{props.colors.map((color, i) => {
					return (
						<Item
							key={i}
							color={color}
							id={i}
							onClick={props.onSelect}
							selected={props.selected === i}/>
					);
				})}
			</div>
		);
	}

}
ColorSwatch.defaultProps = {
	colors: [],
	selected: null,
	onSelect: () => {}
};


export default ColorSwatch;