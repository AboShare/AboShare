
holeUser();

holeAbos();

// hole den eingeloggten User
function holeUser() {

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);

    fetch("https://375639-3.web.fhgr.ch/php/holeUser.php",
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

            // Name von User ins HTML schreiben
            document.querySelector("#username").innerHTML = data[0].name;

        })
}

// hole alle Abos die es gibt
function holeAbos(){

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);

    fetch("https://375639-3.web.fhgr.ch/php/holeAbos.php",
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

            abosAnzeigen(data);

        })

}

// Abos im HTML anzeigen
function abosAnzeigen(data) {


    data.forEach(abo => {
        
        let aboContainer = document.createElement("div");
        aboContainer.innerHTML =

            '<div class="abo">' +
            '<h2>' + abo.spiel + '</h2>' +
            '<img class="abo-image" src="' + abo.bild + '">' +
            '<p><b>Datum:</b> ' + abo.datum + '</p>' +
            '<p><b>Beschreibung:</b> ' + abo.beschreibung + '</p>' +
            '<p><b>Bereitgestellt von:</b> ' + abo.name + '</p>' +
            '<b>Email:</b> <a target="_blank" href="mailto:'+ abo.email + '">' + abo.email + '</a>' +
            '<p><b>Dafür möchte ich gerne: </b><span id="Abo-' + abo.ID + '">  </span></p>'
            + '</div>';

        document.getElementById("liste-abo").appendChild(aboContainer);

        holeGegenleistungenVonAbo(abo.ID);

    });

}

// Ausgewählte Gegenleistungen von Abo holen
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

            if (data.length > 0) {

                data.forEach(element => {

                    document.getElementById("Abo-" + id).innerHTML += element.name + ' ';

                });

            }

        })

}

// logout
function logout(){

    localStorage.clear();
    window.location = "/login.html";

}