function init_graph_obj(id){
	var obj = {
		graphContentWindow: $('#'+id)[0].contentWindow,
		id:id
	};
	obj.pinger = setInterval(function(){
		obj.graphContentWindow.postMessage({task: 'ping'}, '*'); //'https://plot.ly'
	}, 500);
	return obj;
}

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

function coordinate_hover(graphs,message) {
	for(var graph in graphs) {
		graph.graphContentWindow.postMessage({
			'task': 'hover',
			'selection': {xval: message.points[0].x, yval: message.points[0].y}
		}, 'https://plot.ly');
	}
}

function update_opacity(graph,message) {
	var x = abs(message.ranges.xscene[0] - message.ranges.xscene[1]),
		y = abs(message.ranges.yscene[0] - message.ranges.yscene[1]),
		z = abs(message.ranges.zscene[0] - message.ranges.zscene[1]),
		cube = x * y * z;
	console.log(cube);
}

// https://plot.ly/python/hover-events/

function show_image(data,message) {
	var x = Math.round(message.points[0].x * 10)/10,
		y = Math.round(message.points[0].y * 10)/10;
	console.log(x,y);
	var name = x.toString() + '_' + y.toString();
	console.log(name);
	console.log(data[name]);
}