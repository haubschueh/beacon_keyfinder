/**
 * Created by M. Zimmermann, G. Seilheimer & C. Merschroth
 */

function toPageDetailRanging(){
    $(':mobile-pagecontainer').pagecontainer('change', '#page-beaconinfo', {transition: 'slideup'});

    startRangingSingleBeacon();
}

function startRangingSingleBeacon(){

    $('#statusInfo').append('Started ');

    var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(
        mySingleBeacon.identifier,
        mySingleBeacon.uuid,
        mySingleBeacon.major,
        mySingleBeacon.minor
    );

    var delegate = new cordova.plugins.locationManager.Delegate();

    // Zuweisung der Funktion showBeacon
    // showBeacon wird vom Plugin aufgerufen, falls Beacon gefunden
    delegate.didRangeBeaconsInRegion = showBeacon;

    // Ab hier: Starten des Suchvorgangs nach Beacons
    cordova.plugins.locationManager.setDelegate(delegate);

    // required in iOS 8+
    cordova.plugins.locationManager.requestWhenInUseAuthorization();

    cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
        .fail(console.error)
        .done();
}

function showBeacon(pluginResult) {
    console.log(pluginResult);
    //-----------------------------------
    //TODO 3.1: Beacon-Objekt ausgeben: uuid, major, minor, proximity und accuracy
    //in entsprechende HTML-Elemente in page-beaconinfo
    //mittels $('#beispiel').text('beispieltext');
    //-----------------------------------
    $('#uuid').text("UUID: " + pluginResult.beacons[0].uuid);
    $('#major').text("UUID: " + pluginResult.beacons[0].major);
    $('#minor').text("UUID: " + pluginResult.beacons[0].minor);
    $('#proximity').text("UUID: " + JSON.stringify(pluginResult.beacons[0].proximity));
    $('#accuracy').text("UUID: " + pluginResult.beacons[0].accuracy);
    $('#statusInfo').text("UUID: " + pluginResult.beacons[0].statusInfo);





    //-----------------------------------
    //TODO 3.2: Fallunterscheidung und Aenderung der background-color von #statusInfo
    //-----------------------------------

    switch (pluginResult.beacons[0].proximity) {
        case "":

            break;
        case "":

            break;
        case "":

            break;
        case "":

            break;
    }
}

function stopRangingSingleBeacon(){

    var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(mySingleBeacon.identifier, mySingleBeacon.uuid, mySingleBeacon.major, mySingleBeacon.minor);

    cordova.plugins.locationManager.stopRangingBeaconsInRegion(beaconRegion)
        .fail(console.error)
        .done();

    $('#statusInfo').append(' stopped ');
}
