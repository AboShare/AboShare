var aboID;

var gegenleistungen = [];

holeUserAbo();

holeAlleGegenleistungen();

// neues Abo erstellen
function neuesAbo(){

    let spiel = document.querySelector("#spiel").value;
    let datum = document.querySelector("#datum").value;
    let bild = document.querySelector("#bild").value;
    let beschreibung = document.querySelector("#beschreibung").value;
    let verein = document.querySelector("#verein").value;

    let formData = new FormData();
    formData.append('spiel', spiel);
    formData.append('datum', datum);
    formData.append('bild', bild);
    formData.append('beschreibung', beschreibung);
    formData.append('verein', verein);

    formData.append('gegenleistungen', JSON.stringify(gegenleistungen));

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    formData.append('user', userID);

    fetch("https://375639-3.web.fhgr.ch/php/neuesAbo.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((response) => {

            return response.text();

        })
        .then((data) => {

            // Nachricht ins HTML schreiben
            document.querySelector('#nachricht').innerHTML = data;

        })

}

// hole Abo vom eingeloggten User
function holeUserAbo() {

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);

    fetch("https://375639-3.web.fhgr.ch/php/holeUserAbo.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            if (res.status >= 200 && res.status < 300) {

                return res.json();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html";

            }

        })
        .then((data) => {

            if (data.length == 0) {

                document.querySelector('#infoText').innerHTML = "Fülle dieses Formular aus, um dein Abo aufzuschalten:";
                document.querySelector('#button-neue').classList.remove("hidden");

            } else {

                aboID = data[0].ID;

                document.querySelector('#infoText').innerHTML = "Hier kannst du dein Abo bearbeiten:";

                document.querySelector('#button-aktualisieren').classList.remove("hidden");
                document.querySelector('#button-loeschen').classList.remove("hidden");

                document.querySelector('#spiel').value = data[0].spiel;
                document.querySelector('#datum').value = data[0].datum;
                document.querySelector('#beschreibung').value = data[0].beschreibung;
                document.querySelector('#verein').value = data[0].Verein_ID;
                document.querySelector('#bild').value = data[0].bild;
                document.querySelector('#bild-vorschau').src = data[0].bild;

                holeGegenleistungenVonAbo(aboID);

            }
        })
}

// aktualisiere existirendes Abo
function aktualisiereAbo() {

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let spiel = document.querySelector('#spiel').value;
    let datum = document.querySelector('#datum').value;
    let beschreibung = document.querySelector('#beschreibung').value;
    let verein = document.querySelector('#verein').value;
    let bild = document.querySelector('#bild').value;

    let jsonGegenleistungen = JSON.stringify(gegenleistungen);

    let formData = new FormData();
    formData.append('userID', userID);
    formData.append('spiel', spiel);
    formData.append('datum', datum);
    formData.append('beschreibung', beschreibung);
    formData.append('verein', verein);
    formData.append('bild', bild);

    formData.append('gegenleistungen', jsonGegenleistungen);
    formData.append('aboID', aboID);

    fetch("https://375639-3.web.fhgr.ch/php/aktualisiereAbo.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            if (res.status >= 200 && res.status < 300) {

                return res.text();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            document.querySelector('#nachricht').innerHTML = data;

        })
}

// Abo löschen
function loescheAbo() {

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);
    formData.append('aboID', aboID);

    fetch("https://375639-3.web.fhgr.ch/php/loescheAbo.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            if (res.status >= 200 && res.status < 300) {

                return res.text();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            document.querySelector('#nachricht').innerHTML = data;

            document.querySelector('#button-neue').classList.remove("hidden");
            document.querySelector('#button-aktualisieren').classList.add("hidden");
            document.querySelector('#button-loeschen').classList.add("hidden");

            document.querySelector('#spiel').value = "";
            document.querySelector('#datum').value = "";
            document.querySelector('#beschreibung').value = "";
            document.querySelector('#verein').value = "";
            document.querySelector('#bild').value = "";
            document.querySelector('#bild-vorschau').src = "";
            document.querySelector('.gegenleistung').style = "Color: black;";

            gegenleistung = [];
            aboID = "";

        })
}

// hole alle Gegenleistungen die es (in der DB) gibt
function holeAlleGegenleistungen() {

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    fetch("https://375639-3.web.fhgr.ch/php/holeAlleGegenleistungen.php",
        {
            body: "",
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            if (res.status >= 200 && res.status < 300) {

                return res.json();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            // schreibe jede Gegenleistung in das HTML (auflisten)
            data.forEach(gegenleistung => {

                let dieseGegenleistung = document.createElement("div");

                dieseGegenleistung.innerHTML = " <p onclick='addGegenleistung(" + gegenleistung.ID + ")' id='" + gegenleistung.ID + "' class='gegenleistung'> +" + gegenleistung.name + "</p> ";
                dieseGegenleistung.style = 'margin-right: 10px; cursor: pointer;';
                document.getElementById("gegenleistungen").appendChild(dieseGegenleistung);

            });

        })
}

// Gegenleistung hinzufügen (Gegenleistung dem Array hinzufügen/wegnehmen und umfärben)
function addGegenleistung(id) {

    if (gegenleistungen.indexOf(id) == -1) {

        document.getElementById(id).style = "Color: blue;"
        gegenleistungen.push(id);

    } else {
        document.getElementById(id).style = "Color: black;"
        gegenleistungen.splice(gegenleistungen.indexOf(id), 1);
    }

}

// hole Gegenleistungen von Abo
function holeGegenleistungenVonAbo(id) {

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('aboID', id);

    fetch("https://375639-3.web.fhgr.ch/php/holeGegenleistungenVonAbo.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            if (res.status >= 200 && res.status < 300) {

                return res.json();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            if (data) {

                // ausgewählte Gegenleistungen umfärben/Array hinzufügen
                data.forEach(gegenleistung => {

                    document.getElementById(gegenleistung.ID).style = "color: Blue;";
                    gegenleistungen.push(parseInt(gegenleistung.ID));

                });

            }

        })

}

// logout
function logout(){

    localStorage.clear();
    window.location = "/login.html";

}