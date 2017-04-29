
function update_theta_zoom(graph,message) {
	graph.graphContentWindow.postMessage({
		'task': 'relayout',
		'update': {'xaxis': {
			'range': [message.ranges.x[0], message.ranges.x[1]],
			'title': 'Position along x axis of the structure'
			},
					'yaxis': {
			'range': [message.ranges.y[0], message.ranges.y[1]],
			'title': 'Angle around the structure (theta)'
			}}
	}, 'https://plot.ly');
}

function coordinate_hover(graph,message) {
	graph.graphContentWindow.postMessage({
		'task': 'hover',
		'selection': {xval: message.points[0].x, yval: message.points[0].y}
	}, 'https://plot.ly');
}

// https://plot.ly/python/hover-events/