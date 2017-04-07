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
    console.log("no beacon found");
    if(pluginResult.beacons.length < 1) return;
    //-----------------------------------
    //TODO 3.1: Beacon-Objekt ausgeben: uuid, major, minor, proximity und accuracy
    //in entsprechende HTML-Elemente in page-beaconinfo
    //mittels $('#beispiel').text('beispieltext');
    //-----------------------------------
    $('#uuid').text("UUID: " + pluginResult.beacons[0].uuid);
    $('#major').text("major: " + pluginResult.beacons[0].major);
    $('#minor').text("minor: " + pluginResult.beacons[0].minor);
    $('#proximity').text("proximity: " + JSON.stringify(pluginResult.beacons[0].proximity));
    $('#accuracy').text("accuracy: " + pluginResult.beacons[0].accuracy);
    $('#statusInfo').text("statusInfo: " + pluginResult.beacons[0].statusInfo);





    //-----------------------------------
    //TODO 3.2: Fallunterscheidung und Aenderung der background-color von #statusInfo
    //-----------------------------------

    switch (pluginResult.beacons[0].proximity) {
        case "ProximityImmediate":
            $("#statusInfo").css({'background-color': 'green'});
            break;
        case "ProximityNear":
            $("#statusInfo").css({'background-color': 'yellow'});
            break;
        case "ProximityFar":
            $("#statusInfo").css({'background-color': 'red'});
            break;
        case "ProximityUnknown":
            $("#statusInfo").css({'background-color': 'grey'});
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
