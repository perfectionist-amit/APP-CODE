MyApp.config(function ($translateProvider) {
  
  $translateProvider.translations('EN', {
  	rsBack: 			'Back',
  	rsDescription: 		'Description',
  	rsMessages:			'Messages',
	rsCollivr: 			'Collivr',
	rsCollivred: 		'Collivred',
	rsCampaigns:		'Campaigns',
	rsSend:				'Send',
	rsLocations: 		'Locations',
	rsContacts: 		'Contacts',
	rsLogin: 			'Log in',
	rsForgotPwd:		'Forgot Password?',
	rsPrivacyPolicy:	'Privacy Policy',
	rsTermsOfUse:		'Terms of Use',
	rsSettings: 		'Settings',
	rsLogout: 			'Log out',
	rsSaveToSdCard: 	'Save To SD Card',
	rsEmail: 			'E-Mail',
	rsPassword:			'Password',

    rsMsgInputFull: 	'Please input email and password',
    rsMsgEmailInvalid: 	'Please input valid email address',
    rsMsgEmailInvalid: 	'Please input valid email address and password.',
    rsMsgNoCampaigns: 	'No Campaigns found',
    rsMsgInputNameAndPhone: 'Please ipnut your name and phone number',
    rsMsgSelectMessage: 'Please select at least 1 message',
    rsMsgValidPhone: 	'Please ipnut valid phone number',
  });
  
  $translateProvider.translations('DE', {
  	rsBack: 			'Back',
  	rsDescription: 		'Beschreibung',
  	rsMessages:			'Messages',
	rsCollivr: 			'Collivr',
	rsCollivred: 		'Collivred',
	rsCampaigns:		'Kampagnen',
	rsSend:				'Senden',
	rsLocations: 		'Locations',
	rsContacts: 		'Kontakte',
	rsLogin: 			'Anmelden',
	rsForgotPwd:		'Passwort vergessen?',
	rsPrivacyPolicy: 	'Privacy Policy',
	rsTermsOfUse:		'Terms of Use',
	rsSettings: 		'Einstellungen',
	rsLogout: 			'Abmelden',
	rsSaveToSdCard: 	'Save To SD Card',
	rsEmail: 			'E-Mail',
	rsPassword:			'Passwort',

    rsMsgInputFull: 	'Please input email and password',
    rsMsgEmailInvalid: 	'Please input valid email address',
    rsMsgEmailInvalid: 	'Please input valid email address and password.',
    rsMsgNoCampaigns: 	'No Campaigns found',
    rsMsgInputNameAndPhone: 'Please ipnut your name and phone number',
    rsMsgSelectMessage: 'Please select at least 1 message',
    rsMsgValidPhone: 	'Please ipnut valid phone number',
  });
  $translateProvider.preferredLanguage("EN");

});