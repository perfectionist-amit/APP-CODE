
MyApp.controller('loginCtrl', function ($scope, $translate, gApp, dealPost) {
	// $translate.use(MyApp.locale).then(function(data) {
 //                    console.log("SUCCESS -> " + data);
 //                    alert(language.value);
 //                }, function(error) {
 //                    console.log("ERROR -> " + error);
 //                    alert(language.value);
 //                });

	$scope.user = {
		// email: "psharma@essencesoftwares.com", 
		// password: "123456"
		email: "", 
		password: ""
	}

	$scope.messages = {
		inputFullMsg: "Please input email and password",
		emailInvalidMsg: "Please input valid email address",
		credentialInvalid: "Please input valid email address and password."
	};

	$scope.translateMessages = function() {
		$translate('rsMsgInputFull').then(function (translation) {
			$scope.messages.inputFullMsg = translation;
		});

		$translate('rsMsgEmailInvalid').then(function (translation) {
			$scope.messages.emailInvalidMsg = translation;
		});

		$translate('rsMsgCredetialInvalid').then(function (translation) {
			$scope.messages.emailInvalidMsg = translation;
		});
	}();

	$scope.checkValidUserInfo = function() {

		if( !$scope.user.email.trim() || !$scope.user.password.trim() ) {
			ons.notification.alert({ message: $scope.messages.inputFullMsg });
			return false;
		}

		var emRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    	if( !emRegex.test($scope.user.email) ) {
    		ons.notification.alert({ message: $scope.messages.emailInvalidMsg });
    		return false;
    	}

    	return true;

	};

    $scope.onLogin = function () {
        // ons.notification.alert({ message: gApp });
        if( !$scope.checkValidUserInfo() ) return;

        dealPost(gApp.getApiURL("user/login"), $scope.user, function(data, error) {
			if (error) {
				gApp.postFail($scope.onLogin, angular.noop);
			}
			else {
				if(data.status == -1) {
					ons.notification.alert({ message: $scope.messages.credentialInvalid });
				} else {
					gApp.user.id = data.status;
					gApp.token = data.app_token;
					navController.pushPage('html/welcome.html', {animation: 'slide'});
				}
			}
		});
    };

    $scope.onForgotPassword = function () {
    	
    	var emRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    	if( !emRegex.test($scope.user.email) ) {
    		ons.notification.alert({ message: "Please input Email and Password" });
    	}

        dealPost(gApp.getApiURL("forgotpassword"), $scope.user, function(data, error) {
			if (error) {
				gApp.postFail($scope.onForgotPassword, angular.noop);
			}
			else {
				ons.notification.alert({ message: "New password has been sent to your email." });
			}
		});
    };

});