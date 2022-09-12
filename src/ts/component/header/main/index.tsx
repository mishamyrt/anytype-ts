import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { I, DataUtil } from 'Lib';
import { Icon } from 'Component';
import { popupStore } from 'Store';
import { observer } from 'mobx-react';

interface Props extends I.HeaderComponent {};

const HeaderMainIndex = observer(class HeaderMainIndex extends React.Component<Props, {}> {
	
	constructor (props: any) {
		super(props);
		
		this.onSettings = this.onSettings.bind(this);
	};

	render () {
		const { onSearch } = this.props;

		return (
			<React.Fragment>
				<div className="side left" />

				<div className="side center" onClick={onSearch}>
					<div id="path" className="path">Search for an object</div>
				</div>

				<div className="side right">
					<Icon tooltip="Settings" className="settings big" onClick={this.onSettings} />
				</div>
			</React.Fragment>
		);
	};

	onSettings (e: any) {
		popupStore.open('settings', {});
	};

	componentDidMount () {
		DataUtil.setWindowTitleText('Dashboard');
	};

});

export default HeaderMainIndex;