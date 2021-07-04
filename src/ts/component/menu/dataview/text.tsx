import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { I } from 'ts/lib';
import { observer } from 'mobx-react';
import { setRange } from 'selection-ranges';

interface Props extends I.Menu {}

const $ = require('jquery');
const raf = require('raf');

const MenuText = observer(class MenuText extends React.Component<Props, {}> {
	
	_isMounted: boolean = false;
	ref: any = null;

	constructor (props: any) {
		super(props);

		this.onInput = this.onInput.bind(this);
		this.onBlur = this.onBlur.bind(this);
	};
	
	render () {
		const { param } = this.props;
		const { data } = param;
		const { value } = data;

		return (
			<div 
				id="input"
				ref={(ref: any) => { this.ref = ref; }} 
				contentEditable={true}
				suppressContentEditableWarning={true}
				onBlur={this.onBlur}
				onInput={this.onInput}
			>
				{value}
			</div>
		);
	};

	componentDidMount () {
		this._isMounted = true;

		const { param } = this.props;
		const { data } = param;
		const { value } = data;
		const node = $(ReactDOM.findDOMNode(this));
		const length = value.length;

		node.focus();
		setRange(node.get(0), { start: length, end: length });

		this.resize();
	};

	componentWillUnmount () {
		this._isMounted = false;
	};

	onInput (e: any) {
		this.resize();
	};

	onBlur (e: any) {
		const { param, close } = this.props;
		const { data } = param;
		const { onChange } = data;

		onChange(this.getValue());
		close();
	};

	getValue (): string {
		if (!this._isMounted) {
			return '';
		};
		
		const node = $(ReactDOM.findDOMNode(this));
		return String(node.get(0).innerText || '');
	};

	resize () {
		raf(() => {
			if (!this._isMounted) {
				return;
			};

			const { position, getId } = this.props;
			const obj = $(`#${getId()}`);
			const node = $(ReactDOM.findDOMNode(this));
			const win = $(window);
			const wh = win.height();

			obj.css({ height: 'auto' });
			node.css({ height: 'auto' });
			const sh = node.get(0).scrollHeight;

			node.css({ height: Math.min(wh - 100, sh) });
			node.scrollTop(sh);

			position();
		});
	};

});

export default MenuText;