// Controller fuer Events

/**
 * Created by M. Zimmermann, G. Seilheimer & C. Merschroth
 */

document.addEventListener("deviceready", init, false);

    function init(){
        
        $('#startMonitoringSingleBeaconButton').click(toPageDetailSingleBeacon);
        $('#stopMonitoringSingleBeaconButton').click(stopMonitoringSingleBeacon);
        
        $('#startMonitoringMultipleBeaconButton').click(toPageDetailMonitoring);
        $('#stopMonitoringMultipleBeaconButton').click(stopMonitoringBeacons);

        $('#startRangingBeaconButton').click(toPageDetailRanging);
        $('#stopRangingBeaconButton').click(stopRangingSingleBeacon);

        $('#backHomeButton').click(disableButtons);

        // position='fixed' aller Header+Footer
        $.mobile.toolbar.prototype.options.position = "fixed";

        //-----------------------------------
        //TODO 2.2.3: Verhalten bei Klick auf eine Notification festlegen
        //siehe Plugin-Dokumentation: https://www.npmjs.com/package/de.appplant.cordova.plugin.local-notification
        //-----------------------------------

        cordova.plugins.notification.local.on("click", function (notification) {
            showValues(notification.data, 'TRUE');
        });

        console.log("DOM ready");

    }



/**
 * Allgemeine Funktionen
 */

function clearPageDetail() {

    //Ausgabebereiche leeren
    $('#detailTitle').empty();
    $('#detailText').empty();
    $('#detailSpecialOffer').empty();
    $('#detailInfo').empty().css('background-color', 'white');
}

function disableButtons() {
    $('#stopMonitoringSingleBeaconButton').addClass('ui-disabled');
    $('#stopMonitoringMultipleBeaconButton').addClass('ui-disabled');
}








