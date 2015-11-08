MyApp.controller('settingCtrl', function ($scope, $translate, gApp, dealPost) {
	
	$scope.messages = {
		inputFullMsg: "rsInputFullMsg",
		emailInvalidMsg: "rsEmailInvalidMsg",
	};

	$scope.translateMessages = function() {

	}();

	$scope.loadPhoto = function () {

		var oInput = {
			user_id: gApp.user.id,
			token: gApp.token,
			locale: MyApp.locale,
		};

        dealPost(gApp.getApiURL("userimage"), oInput, function(data, error) {
			if (error) {
				gApp.postFail($scope.loadPhoto, angular.noop);
			}
			else {
				var image = data.image.replace("\\", "").replace("{\"file_location\":\"", "").replace("\"}", "");
				$scope.profileimage = image;
			}
		});
    }();

    $scope.onSignout = function(id) {
    };

});