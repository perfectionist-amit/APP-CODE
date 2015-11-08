MyApp.controller('campaignDetailCtrl', function ($scope, $translate, gApp, dealPost) {

	var page = navController.getCurrentPage();
	
	$scope.messages = {
		inputFullMsg: "rsInputFullMsg",
		emailInvalidMsg: "rsEmailInvalidMsg",
	};

	$scope.translateMessages = function() {

	}();

	$scope.loadCampaign = function () {

		for (var i =0; i < gApp.campaigns.length; i++) {
			if(gApp.campaigns[i].campaign_data.id == page.options.campaignId) {
				$scope.campaign = gApp.campaigns[i];
				gApp.currentCampaign = $scope.campaign;
				break;
			}
		};
    }();

    $scope.onCollivr = function() {
    	navController.pushPage('html/collivr.html', {
            animation: 'slide'
        });
    };

});