import React from 'react';
import ReactLoading from 'react-loading';
import './loading.scss';

const Loading = ({ pending }) => {
	if (pending) {
		return (
			<section className="loading">
				<div className="loading-body">
					<div className="spinner">
						<ReactLoading type={"spokes"} color={"black"} height={50} width={50} />
					</div>
					<div className="text">Datele în curs de procesare...</div>
				</div>
			</section>
		);
	} else {
		return null;
	}
};

export default Loading;
