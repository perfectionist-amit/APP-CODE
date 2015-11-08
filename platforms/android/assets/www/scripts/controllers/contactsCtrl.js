MyApp.controller('contactsCtrl', function ($scope, $http, $translate, gApp, dealPost) {

	var page = navController.getCurrentPage();

	$scope.nameFirstChars = [];
	$scope.contactsClassified = {};
	
	$scope.messages = {
		inputFullMsg: "rsInputFullMsg",
		emailInvalidMsg: "rsEmailInvalidMsg",
	};

	$scope.translateMessages = function() {

	}();

	$scope.loadContacts = function() {

		var oInput = {
			user_id: gApp.user.id,
			token: gApp.token
		};

		dealPost(gApp.getApiURL("leads/getuserleads"), oInput, function(data, error) {
			if (error) {
				gApp.postFail($scope.loadContacts, angular.noop);
			}
			else {
				$scope.contacts = [];
				for (var key in data) {
					if (data.hasOwnProperty(key)) {
						if( typeof data[key] === 'object' && data[key].fname.trim()) {
							$scope.checkCharExist(data[key].fname.charAt(0));
							$scope.contacts.push(data[key]);
						}
					}
				}
				gApp.contacts = $scope.contacts;

				for(var i = 0; i < $scope.contacts.length; i++) {
					for(var j = 0; j < $scope.nameFirstChars.length; j++) {
						if($scope.contacts[i].fname.charAt(0).toUpperCase() === $scope.nameFirstChars[j]) {
							$scope.contactsClassified[$scope.nameFirstChars[j]].push($scope.contacts[i]);
						}
					}
				}
			}
		});

	}();

	$scope.reloadContacts = function($done) {
    	var oInput = {
			user_id: gApp.user.id,
			token: gApp.token
		};
    	$http.post(gApp.getApiURL("leads/getuserleads"), oInput, {timeout: 10*1000}).
        success(function(data, status, headers, config, statusText) {
			$scope.contacts = [];
			for (var key in data) {
				if (data.hasOwnProperty(key)) {
					if( typeof data[key] === 'object' && data[key].fname.trim()) {
						$scope.checkCharExist(data[key].fname.charAt(0));
						$scope.contacts.push(data[key]);
					}
				}
			}
			gApp.contacts = $scope.contacts;

			for(var i = 0; i < $scope.contacts.length; i++) {
				for(var j = 0; j < $scope.nameFirstChars.length; j++) {
					if($scope.contacts[i].fname.charAt(0).toUpperCase() === $scope.nameFirstChars[j]) {
						$scope.contactsClassified[$scope.nameFirstChars[j]].push($scope.contacts[i]);
					}
				}
			}
        }).
        error(function(data, status, headers, config, statusText) {
          
        });
    }

    $scope.onCampaign = function(id) {
    	navController.pushPage('html/campaign.html', {campaignId: id});
    };

	$scope.checkCharExist = function(char) {
		var exist = false;
		for (var i = 0; i < $scope.nameFirstChars.length; i++) {
			if($scope.nameFirstChars[i].toUpperCase() === char.toUpperCase()) {
				exist = true;
				break;
			}
		}

		if(!exist) {
			$scope.nameFirstChars.push(char.toUpperCase());
			$scope.contactsClassified[char.toUpperCase()] = [];
		}
	};

	$scope.onContact = function(leadId) {
		navController.pushPage('html/contact.html', {leadId: leadId});
	}

});