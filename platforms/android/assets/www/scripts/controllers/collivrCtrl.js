MyApp.controller('collivrCtrl', function ($scope, $translate, gApp, dealPost) {

	var page = navController.getCurrentPage();
	
	$scope.messages = {
		ipnutNameAndPhone: "rsMsgInputNameAndPhone",
		selectMessage: "rsMsgSelectMessage",
        ipnutValidPhone: "rsMsgValidPhone"
	};
    $scope.checkboxModel = [];

	$scope.translateMessages = function() {
        $translate('rsMsgInputNameAndPhone').then(function (translation) {
            $scope.messages.ipnutNameAndPhone = translation;
        });
        $translate('rsMsgSelectMessage').then(function (translation) {
            $scope.messages.selectMessage = translation;
        });
        $translate('rsMsgValidPhone').then(function (translation) {
            $scope.messages.ipnutValidPhone = translation;
        });
	}();

	$scope.campaign = gApp.currentCampaign;
    for (var i = 0; i < $scope.campaign.email_data.length; i++) {
        $scope.campaign.email_data[i].selected = false;
        $scope.checkboxModel[i] = false;
    }


	$scope.user = {
		// firstname: $scope.campaign.fields_data[0].label,
		// lastname: $scope.campaign.fields_data[1].label,
		// phone: $scope.campaign.fields_data[2].label,
        firstname: "",
        lastname: "",
        phone: "",
		email: $scope.campaign.campaign_data.sender_email
	};

    $scope.toggleMessage = function(event, index) {
        // event.preventDefault();
        // alert(JSON.stringify($scope.checkboxModel));
        $scope.campaign.email_data[index].selected = $scope.checkboxModel[index];
        // $scope.campaign.email_data[index].selected = !$scope.campaign.email_data[index].selected;
        // alert(index);
        // var dom_message = document.getElementsByClassName("item-message-" + index);
        // if($scope.campaign.email_data[index].selected) {
        //     dom_message.setAttribute("checked");
        // } else {
        //     dom_message.removeAttribute("checked");
        // }
    }

    $scope.validUserInfo = function() {

        if($scope.user.firstname.length == 0 || $scope.user.lastname.length == 0 || $scope.user.phone.length == 0) {
            ons.notification.alert({ message: $scope.messages.ipnutNameAndPhone });
            return false;
        }

        var phoneno = /^\+?(0|[1-9]\d*)$/;
        if(!$scope.user.phone.match(phoneno)) {
            ons.notification.alert({ message: $scope.messages.ipnutValidPhone });
            return false;
        }

        return true;
    };

    $scope.onSend = function() {

        if(!$scope.validUserInfo()) return;

    	var messages = "";
        var cntMessage = 0;
    	for(var i = 0; i < $scope.campaign.email_data.length; i++) {
            if($scope.campaign.email_data[i].selected) {
                messages += $scope.campaign.email_data[i].id.toString() + ",";
                cntMessage++;
            }
    	}

        if(cntMessage < 1) {
            ons.notification.alert({ message: $scope.messages.selectMessage });
            return; 
        }

    	var myPosition = {
    		latitude: MyApp.position ? MyApp.position.latitude : 52.31,
    		longitude: MyApp.position ? MyApp.position.longitude : 13.24
    	};

    	// var myPosition = {
    	// 	latitude: 37.9664,
    	// 	longitude: 23.7167
    	// };

    	var oInput = {
    		user_id: gApp.user.id,
    		token: gApp.token,
    		campaign_id: $scope.campaign.campaign_data.id, 
    		messages: messages.substr(0, messages.length-1),
    		email: $scope.user.email,
    		name: $scope.campaign.campaign_data.sender_name,
    		geo_lng: myPosition.latitude,
    		geo_lat: myPosition.longitude,
    	};
        // field_fname: $scope.user.firstname,
        //     field_lname: $scope.user.lastname,
        //     field_phone: $scope.user.phone
        oInput["field_"+$scope.campaign.fields_data[0].id] = $scope.user.firstname;
        oInput["field_"+$scope.campaign.fields_data[1].id] = $scope.user.lastname;
        oInput["field_"+$scope.campaign.fields_data[2].id] = $scope.user.phone;

        // alert(JSON.stringify(oInput));

        dealPost(gApp.getApiURL("campaigns/sendmessage"), oInput, function(data, error) {
			if (error) {
				gApp.postFail($scope.onSend, angular.noop);
			}
			else {
				ons.notification.alert({ message: "Messages have been sent successfully!" });
			}
		});
    };

});