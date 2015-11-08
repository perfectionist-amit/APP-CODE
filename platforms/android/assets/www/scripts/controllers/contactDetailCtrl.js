MyApp.controller('contactDetailCtrl', function ($scope, $translate, gApp, dealPost) {

	var page = navController.getCurrentPage();
	
	$scope.messages = {
		inputFullMsg: "rsInputFullMsg",
		emailInvalidMsg: "rsEmailInvalidMsg",
	};

	var myPosition = {
		latitude: MyApp.position ? MyApp.position.latitude : 52.31,
		longitude: MyApp.position ? MyApp.position.longitude : 13.24
	};

	$scope.map = {
		center: myPosition,
        zoom: 13,
        options: {
            draggable: false,
            scrollwheel: false,
            disableDefaultUI: true
        }
	};

	$scope.markers = [];

	// $scope.marker = {
	// 	center: myPosition,
 //        options: {
 //            draggable: false,
 //            clickable: false
 //        }
	// }

	$scope.translateMessages = function() {

	}();

	$scope.loadContact = function () {

		var oInput = {
			lead_id: page.options.leadId,
			user_id: gApp.user.id,
			token: gApp.token
		};

		dealPost(gApp.getApiURL("leads/getleaddetail"), oInput, function(data, error) {
			if (error) {
				gApp.postFail($scope.loadContacts, angular.noop);
			}
			else {
				$scope.contact = data;
				for(var i = 0; i < data.location.length; i++) {
					var marker = {
						center: {
							latitude: data.location[i].geo_lat,
							longitude: data.location[i].geo_lng
						},
						options: {
				            draggable: false,
				            clickable: false
				        }
					}
					$scope.markers.push(marker);
				}
				$scope.map.center = $scope.markers[0] ? $scope.markers[0].center : myPosition;
			}
		});
		
    }();

    $scope.onCollivr = function() {
    	navController.pushPage('html/collivr.html', {
            animation: 'slide'
        });
    };

});