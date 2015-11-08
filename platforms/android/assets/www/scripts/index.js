// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints,
// and then run "window.location.reload()" in the JavaScript Console.

var MyApp = angular.module('dealApp', ['onsen', 'LocalStorageModule', 'pascalprecht.translate', 'uiGmapgoogle-maps']);
MyApp.locale = "EN";
MyApp.run(function($translate, $rootScope)  {
    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        // document.addEventListener( 'pause', onPause.bind( this ), false );
        // document.addEventListener( 'resume', onResume.bind( this ), false );

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var watchID = navigator.geolocation.watchPosition(
            function(position) {
                MyApp.position = position.coords;
                // alert(JSON.stringify(MyApp.position));
            }, 
            function(error){
                // error
                // alert(JSON.stringify(error));
            }, 
            { 
                timeout: 60000 
            }
        );

        // navigator.geolocation.getCurrentPosition(function(position) {
        //     // MyApp.position = position.coords;
        //     // alert()
        // });

        navigator.globalization.getPreferredLanguage(
            function (language) {
                console.log("SUCCESS -> " + language.value);
                MyApp.locale = (language.value).split("-")[0].toUpperCase();
                $translate.use(MyApp.locale).then(function(data) {
                    $rootScope.$broadcast("REFRESH");
                    console.log("SUCCESS -> " + data);
                }, function(error) {
                    console.log("ERROR -> " + error);
                });
            },
            function (error) {
                console.log("ERROR -> " + error);
            }
        );

    };
});
// MyApp.locale = "EN";

(function () {
    "use strict";

    // document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    // function onDeviceReady() {
    //     // Handle the Cordova pause and resume events
    //     document.addEventListener( 'pause', onPause.bind( this ), false );
    //     document.addEventListener( 'resume', onResume.bind( this ), false );

    //     // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    //     var watchID = navigator.geolocation.watchPosition(
    //         function(position) {
    //             MyApp.psition = position.coords;
    //         }, 
    //         function(error){
    //             // error
    //             // alert(JSON.stringify(error));
    //         }, 
    //         { 
    //             timeout: 60000 
    //         }
    //     );

    //     navigator.globalization.getPreferredLanguage(
    //         function (language) {
    //             console.log("SUCCESS -> " + language.value);
    //             // alert($translate);
    //             MyApp.locale = (language.value).split("-")[0].toUpperCase();
    //             alert("ready: " + MyApp.locale);
    //             angular.bootstrap(document, ['MyApp']);
    //         },
    //         function (error) {
    //             console.log("ERROR -> " + error);
    //         }
    //     );
    // };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();