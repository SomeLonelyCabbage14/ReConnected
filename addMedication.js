var curNotificationPerms = null
// document.getElementById("arduinoTrig").addEventListener("click", function (){
// //insert code to trigger arduino
// }) 
function getMedicationInfo() {
    let medname = document.getElementById("medname").value
    let dosage = document.getElementById("dosage").value
    let unit = document.getElementById("unit").value
    let datetimeval = document.getElementById("datetimepicker").value
    if (medname == "" || dosage == "" || unit == "none" || datetimeval == "") {
        alert("Please fill out all fields")
    } else {
        var medicationInfo = {
            'medname': medname,
            'dosage': dosage,
            'unit': unit,
            'datetime': datetimeval
        }
        return medicationInfo
    }
}

function getMedications() {
    var medications = localStorage.getItem("medications")
    medications = JSON.parse(medications)
    if (medications === null) {
        return []
    } else {
        return medications
    }
}

document.getElementById('medicationForm').addEventListener('submit', function (event) {
    event.preventDefault()
    var medication = getMedicationInfo()
    console.log("Medication entry added: ", medication)

    var medications = getMedications()
    medications.unshift(medication)
    console.log("All medications are now: ", medications)

    localStorage.setItem("medications", JSON.stringify(medications))
});

function notifyme() {
    Notification.requestPermission().then(function (getperm) {
        console.log('Permission is ', getperm)
        curNotificationPerms = getperm;
    });
    console.log(curNotificationPerms)
}

function triggerNotification() {
    if (curNotificationPerms === "granted") {
        const notification = new Notification("Med with ReConnected!", {
            body: "It's time to take your medication!"
        });
        console.log("notification should have been created")
        notification.addEventListener("click", e => {
            alert("NOTIF CLICKED")
        })
    }
    else {
        console.log('Permission was not granted')
    }

}
