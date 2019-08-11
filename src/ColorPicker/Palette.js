import React from 'react';
import classNames from 'classnames';


class Palette extends React.Component {

	shouldComponentUpdate(nextProps, nextState)
	{
		return false;
	}

	/**
	 * render item
	 *
	 * @param {String} color hex type
	 * @param {Number} k
	 */
	renderItem(color, k)
	{
		return (
			<li key={k}>
				<div>
					<button
						type="button"
						onClick={(e) => this._onClickItem(color)}
						style={{ backgroundColor: color }}>
						{color}
					</button>
				</div>
			</li>
		);
	}

	/**
	 * on click item
	 *
	 * @param {String} color
	 */
	_onClickItem(color)
	{
		const { props } = this;

		if (props.onSelectColor)
		{
			props.onSelectColor(color);
		}
	}

	render()
	{
		const { props } = this;

		return (
			<nav className={classNames('cpPalette', props.className)}>
				<ul>
					{props.colors.map(this.renderItem.bind(this))}
				</ul>
			</nav>
		);
	}

}
Palette.defaultProps = {
	colors: [],
	onSelectColor: (color) => {},
	className: null,
};


export default Palette;