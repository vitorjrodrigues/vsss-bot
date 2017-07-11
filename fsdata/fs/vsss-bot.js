function writeFloatAt(buff, pos, val) {
	var f_tmp = new Float32Array(1);
	f_tmp[0] = val;
	
	var b_tmp = new Uint8Array(f_tmp.buffer);
	buff.set(b_tmp, pos);
}

var myApp = angular.module('myApp', []);
myApp.controller("vsssBotController", function($scope) {
	console.log("AngularJS scope initializing...");
	
	$scope.speedCaptions = [
		"-100%", "-80%", "-60%", "-40%", "-20%", "0%", "+20%", "+40%", "+60%", "+80%", "+100%"
	];
	$scope.speedValues = [
		-1.0, -0.8, -0.6, -0.4, -0.2, 0, +0.2, +0.4, +0.6, +0.8, +1.0
	];
	
	$scope.onSpeedChange = function() {
		if (!$scope.online)
			return;
		
		var payload = {
			leftVel:  $scope.speedValues[$scope.left_vel_rng],
			rightVel: $scope.speedValues[$scope.right_vel_rng]
		};
		var buff = $scope.Robot_Command.encodeDelimited(payload).finish();
		
		console.log(payload, buff);
		
		$scope.ws.send(buff);
	};
	
	$scope.online = false;
	$scope.updateOnlineStatus = function() {
		$scope.online = 
			$scope.Robot_Command &&
			$scope.ws.readyState == WebSocket.OPEN;
	}
	
	// Start a websocket
	$scope.ws = new WebSocket("ws://" + location.host + "/ws");
	$scope.ws.binaryType = 'arraybuffer';

	$scope.ws.onopen = function () {
		console.log("WebSocket: Connection open.");
		$scope.updateOnlineStatus();
		$scope.$apply();
		
		// ESP's HTTPD might kill our socket if it stays inactive.
		// Work around by sending PING packets every 5 seconds.
		window.setInterval(function() {
			console.log("Ping?");
			$scope.ws.send("PING");
			$scope.ping_req = Date.now();
			$scope.$apply();
		}, 1000);
	};

	$scope.ws.onmessage = function (e) {
		console.log("WebSocket: Connection data: " + e.data);
		
		if (e.data == "PONG!") {
			$scope.ping = Date.now() - $scope.ping_req;
		}
		
		$scope.apply();
	};

	$scope.ws.onerror = function (e) {
		console.log("WebSocket: Connection failed.");
		$scope.updateOnlineStatus();
		$scope.$apply();
	};
	
	// Load  protobuf message types
	protobuf.load("vsss-pb/command.proto", function(err, root) {
		if (err) {
			console.log("Failed to load vsss-pb/command.proto.", err);
			return;
		}
		console.log("Protobuf message formats loaded.");
		
		$scope.Robot_Command = root.lookupType("vss_command.Robot_Command");
		
		$scope.updateOnlineStatus();
		$scope.$apply();
	});
	
	console.log("AngularJS scope initialized.");
});
