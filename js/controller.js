// Controller fuer Events

/**
 * Created by M. Zimmermann, G. Seilheimer & C. Merschroth
 */

document.addEventListener("deviceready", init, false);

    function init(){

        var table = $("<table/>").addClass('keys');

        table.addClass('ui-responsive')
        $('table.keys').attr('data-role', 'table');
        for (var i in myBeacons) {
            var row = $("<tr/>");
            var tdRadio = $("<td/>");
            value="' + i + '"
            tdRadio.append($('<input type="radio" name="key" value="' + myBeacons[i].identifier +'" id="' + myBeacons[i].identifier +'">'));
            tdRadio.append($('<label for="' + myBeacons[i].identifier +'">'+ myBeacons[i].title+'</label>'));
            row.append(tdRadio)
            row.append($("<td/>").text(myBeacons[i].text))

            table.append(row);

        }
        $("#keyFinderContent").append(table);

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








