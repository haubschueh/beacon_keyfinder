// Modell besteht aus Array von Beacons mit Attributen

/**
 * Created by M. Zimmermann, G. Seilheimer & C. Merschroth
 */

/*
UUID fuer Onyx-Beacons: 20CAE8A0-A9CF-11E3-A5E2-0800200C9A66
UUID fuer Estimote-Beacons: b9407f30-f5f8-466e-aff9-25556b57fe6d
 */

var mySingleBeacon = {
    //-----------------------------------
    //TODO 1.0.1: IDs an eigenen Beacon anpassen
    //Inhalte fuer title und identifier frei waehlbar, z.B. "Im Sendebereich von Beacon:" und "Beacon 2"
    //-----------------------------------

    uuid: "f7826da6-4fa2-4e98-8024-bc5b71e3052f",
    identifier: "B34C0N",
    major: "3",
    minor: "34332",
    title: "M4RC0"
};

/*
f7826da6-4fa2-4e98-8024-bc5b71e3052f	3000	34332	Y26j
f7826da6-4fa2-4e98-8024-bc5b71e3052f	5000	29169	VTTk
f7826da6-4fa2-4e98-8024-bc5b71e3052f	5000	14094	pCtf
*/

//-----------------------------------
//TODO 2.0.1: Array myBeacons verstehen, Major- und Minor-Kennung anpassen
//TODO 2.1.1: Anpassung myBeacons
//Uebergang Aufgabe 2.0 zu Aufgabe 2.1
//Hinweis zur Erweiterung: Statt Beacon-Daten lokal: Serverabfrage, leeres Array jedoch benötigt
//-----------------------------------
var myBeacons = []; //fuer Aufgabe 2.1 statt untenstehendes Array mit Werten
/*
var myBeacons = [
    {
        uuid:'20CAE8A0-A9CF-11E3-A5E2-0800200C9A66',
        major:"212",
        minor:"65033",
        identifier:"Beacon 1",
        title:"Eingang Coop Basel",
        text:"Willkommen im Coop Basel Stadt",
        specialOffer:"3 für 2"
    },
    {
        uuid:'20CAE8A0-A9CF-11E3-A5E2-0800200C9A66',
        major:"212",
        minor:"64020",
        identifier:"Beacon 2",
        title:"Coop Basel: Elektronikartikel",
        text:"Unseren Informationsstand finden Sie, wenn Sie den gelben Pfeilen folgen",
        specialOffer:"Zu jedem iPhone 7 Pro 256 GB gibt es ein iPod gratis"
    }
];
*/