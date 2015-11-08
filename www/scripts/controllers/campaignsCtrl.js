MyApp.controller('campaignsCtrl', function ($scope, $translate, $http, gApp, dealPost) {
	
	$scope.messages = {
		inputFullMsg: "rsInputFullMsg",
		emailInvalidMsg: "rsEmailInvalidMsg",
	};

	$scope.translateMessages = function() {

	}();

	$scope.loadCampaigns = function () {

		var oInput = {
			user_id: gApp.user.id,
			token: gApp.token
		};

        dealPost(gApp.getApiURL("campaigns/getuserallcampaign"), oInput, function(data, error) {
			if (error) {
				gApp.postFail($scope.loadCampaigns, angular.noop);
			}
			else {
				$scope.campaigns = data;
				gApp.campaigns = data;
			}
		});
    }();

    $scope.reloadCampaigns = function($done) {
    	var oInput = {
			user_id: gApp.user.id,
			token: gApp.token
		};
    	$http.post(gApp.getApiURL("campaigns/getuserallcampaign"), oInput, {timeout: 10*1000}).
        success(function(data, status, headers, config, statusText) {
          $scope.campaigns = data;
          $done();
        }).
        error(function(data, status, headers, config, statusText) {
          
        });
    }

    $scope.onCampaign = function(id) {
    	navController.pushPage('html/campaign.html', {campaignId: id});
    };

});