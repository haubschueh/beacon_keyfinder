/**
 * Created by M. Zimmermann, G. Seilheimer & C. Merschroth
 */

function toPageDetailSingleBeacon() {
	$(':mobile-pagecontainer').pagecontainer('change', '#page-detail', {transition: 'slideup'});
	$('#stopMonitoringSingleBeaconButton').removeClass('ui-disabled');

	startMonitoringSingleBeacon();
}

function startMonitoringSingleBeacon() {

    var delegate = new cordova.plugins.locationManager.Delegate();

    cordova.plugins.locationManager.setDelegate(delegate);

    // required in iOS 8+
    cordova.plugins.locationManager.requestWhenInUseAuthorization();


    var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(

		//-----------------------------------
		//TODO 1.0.2: Zugriff auf mySingleBeacon in model.js: identifier, uuid, major, minor
		//-----------------------------------
        mySingleBeacon.identifier,
        mySingleBeacon.uuid,
        mySingleBeacon.major,
        mySingleBeacon.minor
    );

    cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
        .fail(console.error)
        .done();


    //-----------------------------------
    //TODO 1.0.3: Rueckmeldung anfuegen, dass Monitoring gestartet ist: bei <p>-Element mit der ID "detailInfo" mittels .append()
    //-----------------------------------
    $('#detailInfo').append('Started ');

    delegate.didEnterRegion = onEnterSingleRegion;

    delegate.didExitRegion = onExitRegion;
}

function onEnterSingleRegion(pluginResult) {

    //-----------------------------------
    //TODO 1.0.4: Wenn Identifier des pluginResult-Objektes mit Identifier von mySingleBeacon uebereinstimmen
    //Ausgabe von title und identifier als <h3> bzw. <p>-Element mittels .append() in entsprechende HTML-Elemente
    //Hinweis: pluginResult.region.identifier aus GitHub
    //-----------------------------------

    if (mySingleBeacon.identifier == pluginResult.region.identifier){
        $('#detailTitle').append('<h3>' + mySingleBeacon.title + '</h3>');
        $('#detailText').append('<p>' + mySingleBeacon.identifier + '</p>');

        //-----------------------------------
        //TODO 1.1.1: Erweiterung mit Notifikation
        //Weiterfuehrende Info: https://www.npmjs.com/package/de.appplant.cordova.plugin.local-notification
        //-----------------------------------
        cordova.plugins.notification.local.schedule({
            title: mySingleBeacon.title,
            text: mySingleBeacon.identifier
        });
    }
}

function onExitRegion(){

    $('#detailInfo').append('|region exited| ');

    //-----------------------------------
    //TODO 2.4.3: Aenderung der background-color von #statusInfo auf 'green'
    //TODO 2.4.4: LED-aufleuchten lassen, Funktionsaufruf anlegen -> flashLight() vervollstaendigen
    //-----------------------------------

    $('#detailInfo').css('background-color', 'green');
    flashLight();
}

//-----------------------------------
//Folgender Code ab Aufgabe 2
//Hinweis: obenstehende Funktion onExitRegion() wird weiterverwendet und wird in Aufgabe 2.4 erweitert
//-----------------------------------

function toPageDetailMonitoring() {
	$(':mobile-pagecontainer').pagecontainer('change', '#page-detail', {transition: 'slideup'});
	$('#stopMonitoringMultipleBeaconButton').removeClass('ui-disabled');
	
	//startMonitoringBeacons();

	//-----------------------------------
	//Uebergang Aufgabe 2.0 zu Aufgabe 2.1
	//Hinweis zur Erweiterung: Statt Funktionsaufruf startMonitoringBeacons(): Funktionsaufruf getBeaconData()
    //Aenderung in model.js noetig -> TODO 2.1.1
	//-----------------------------------
	getBeaconData();
}

function getBeaconData(){

	//-----------------------------------
	//TODO 2.1.2: getBeaconData() verstehen
    //http://api.jquery.com/jQuery.ajax/
	//-----------------------------------

	var transmitData = {
		'sending'  : 'getBeacons'
	};

	$.ajax({
		type: "GET",
		data: transmitData,
		dataType: "json",
		crossDomain : true,
		url: "http://beacon.contic.de/chOpenWS.php", //Absoluter Pfad zur response.php-Datei
        //Erfolgsfall:
		success: function(data) {
			$(data).each(function(index, element) {
				myBeacons[index] = element;
			});

			startMonitoringBeacons();

		},
        //Fehlerbehandlung:
		error: function(error) {
			alert(JSON.stringify(error));
		}
	});

}

function startMonitoringBeacons() {

	var delegate = new cordova.plugins.locationManager.Delegate();

	cordova.plugins.locationManager.setDelegate(delegate);

	// required in iOS 8+
	cordova.plugins.locationManager.requestWhenInUseAuthorization();

	for (var i in myBeacons) {
		var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(

            //-----------------------------------
            //TODO 2.0.2: Zugriff auf Werte aus Array myBeacons
            //-----------------------------------
			myBeacons[i].identifier,
			myBeacons[i].uuid,
			myBeacons[i].major,
			myBeacons[i].minor
		);

		cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
			.fail(console.error)
			.done();
	}

	$('#detailInfo').append('Started ');

	delegate.didEnterRegion = onEnterRegion; // != onEnterSingleRegion

	delegate.didExitRegion = onExitRegion; // Funktion bereits in Aufgabe 1 verwendet
}

function onEnterRegion(pluginResult) {

	//Array-Index bestimmen - fuer Ausgabe dem Beacon zugehoeriger Information noetig
	for (var i = 0; i < myBeacons.length; i++){
		if (myBeacons[i].identifier == pluginResult.region.identifier){

            // i -> beaconID

            //-----------------------------------
            //TODO 2.0.3: Ausgabe der zum Beacon gehoerenden Werte
            //-----------------------------------
			showValues(i, 'FALSE');

            //-----------------------------------
            //TODO 2.2.1: Eine Notifikation ausloesen
            //-----------------------------------
			startNotification(i);

			//-----------------------------------
			//TODO 2.3.1: Tracking ausloesen
			//-----------------------------------
			trackEvent(i);

			break;
		}
	}

	//-----------------------------------
	//TODO 2.4.1: Bei Bertreten einer Beacon Region Vibrationsalarm ausloesen
    //Weiterfuehrende Info: https://www.npmjs.com/package/cordova-plugin-vibration
	//-----------------------------------
	navigator.vibrate(500);

	//-----------------------------------
	//TODO 2.4.2: #detail-info weiss faerben
	//-----------------------------------
	$('#detailInfo').css('background-color', 'white');

}

function showValues(beaconID, isNotification){

	var actBeacon = myBeacons[beaconID];

	clearPageDetail();

	//-----------------------------------
	//TODO 2.0.4: Ausgabe der zum Beacon gehoerenden Werte (Header, Bezeichnung und Sonderangebot)
    //Hinweis: Aehnlich zu onEnterSingleRegion
	//-----------------------------------

	$('#detailTitle').append('<h3>' + actBeacon.title + '</h3>');
	$('#detailText').append('<p>' + actBeacon.text + '</p>');

	$('#detailSpecialOffer').append('<p>' + actBeacon.specialOffer + '</p>');

    //Fall: Klick auf Notification, bewirkt Seitenwechsel zur Anzeige von Daten
	if (isNotification == 'TRUE'){
		$(':mobile-pagecontainer').pagecontainer('change', '#page-detail');
	}
}

function startNotification(beaconID){

	var actBeacon = myBeacons[beaconID];

	//-----------------------------------
	//TODO 2.2.2: Notification ausloesen
	//-----------------------------------

	cordova.plugins.notification.local.schedule({
		title: actBeacon.title,
		text: actBeacon.text,
		data: beaconID
	});
}

function trackEvent(beaconID){

	var actBeacon = myBeacons[beaconID];

	//-----------------------------------
	//TODO 2.3.2: Piwik setEcommerceView() - Daten des Beacons an Piwik uebergeben
    //Weiterfuehrende Info: https://piwik.org/docs/ecommerce-analytics/#tracking-ecommerce-orders-items-purchased-required
	//-----------------------------------

	var piwikProductName = actBeacon.identifier;

	var piwikProductCategory = 'Beispiel: Angebote';
	var piwikProductPrice = 0.4;
	var beaconPiwikID = piwikProductName + ' | ' + actBeacon.uuid + ' | ' + actBeacon.major + ' | ' + actBeacon.minor;

	var piwikTracker = Piwik.getTracker("http://piwik.contic.de/piwik.php", 5);

	piwikTracker.setEcommerceView(beaconPiwikID, piwikProductName, piwikProductCategory, piwikProductPrice);

	piwikTracker.trackPageView();
	piwikTracker.enableLinkTracking();

	$('#detailInfo').append('|event tracked| ');
}

function flashLight() {
	//Pruefen ob LED verfuegbar
	//Weiterfuehrende Info: https://www.npmjs.com/package/cordova-plugin-flashlight
	window.plugins.flashlight.available(function(isAvailable) {
		if (isAvailable) {

			//-----------------------------------
			//TODO 2.4.5: LED einschalten
			//-----------------------------------
			window.plugins.flashlight.switchOn();

			//-----------------------------------
			//TODO 2.4.6: LED nach 2s ausschalten
			//-----------------------------------
			setTimeout(function() {
				window.plugins.flashlight.switchOff();
			}, 2000);

		} else {
			alert("Geraet hat keine LED-Funktion");
		}
	});
}

//Ab hier keine Aenderung an den Funktionen noetig

function stopMonitoringSingleBeacon(){

    var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(mySingleBeacon.identifier, mySingleBeacon.uuid, mySingleBeacon.major, mySingleBeacon.minor);

    cordova.plugins.locationManager.stopRangingBeaconsInRegion(beaconRegion)
        .fail(console.error)
        .done();

    $('#detailInfo').append(' stopped');
}

function stopMonitoringBeacons() {

    for (var i in myBeacons) {
        var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(myBeacons[i].identifier, myBeacons[i].uuid, myBeacons[i].major, myBeacons[i].minor);

        cordova.plugins.locationManager.stopRangingBeaconsInRegion(beaconRegion)
            .fail(console.error)
            .done();
    }

    $('#detailInfo').append(' stopped');
}

