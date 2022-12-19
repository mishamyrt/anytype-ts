import { I, Util } from 'Lib';
import { observable, intercept, makeObservable } from 'mobx';

class BlockContentBookmark implements I.ContentBookmark {
	
	targetObjectId: string = '';
	state: I.BookmarkState = I.BookmarkState.Empty;
	url: string = '';
	
	constructor (props: I.ContentBookmark) {
		let self = this;
		
		self.targetObjectId = String(props.targetObjectId || '');
		self.state = Number(props.state) || I.BookmarkState.Empty;
		self.url = String(props.url || '');

		makeObservable(self, {
			targetObjectId: observable,
			state: observable,
			url: observable,
		});

		intercept(self as any, (change: any) => { return Util.intercept(self, change); });
	};

};

export default BlockContentBookmark;