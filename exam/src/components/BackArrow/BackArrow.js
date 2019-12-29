import React from 'react';
// eslint-disable-next-line
import style from './backArrow.module.css';

function BackArrow() {
	return (
		<div className={'arrow'} style={{
			transform: 'scale(-1, 1) scale(0.3)'}}>
			<div className={'arrowTop'} />
			<div className={'arrowBottom'} />
		</div>
	);
}

export default BackArrow;