import React from 'react';
import style from './backArrow.module.css';

function BackArrow() {
	return (
		<div className={style.arrow} style={{
			transform: 'scale(-1, 1) scale(0.3)'}}>
			<div className={style.arrowTop} />
			<div className={style.arrowBottom} />
		</div>
	);
}

export default BackArrow;