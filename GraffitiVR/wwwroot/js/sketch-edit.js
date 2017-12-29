$(function () {
    editor = ace.edit("editor");
});

function handleSave() {
    var Code = document.getElementById("Code");
    var strCode = editor.getValue();
    if (strCode == "") {
        alert("Enter valid javascript code.");
        return;
    }
    Code.value = strCode
    
    document.forms[0].submit();
}

function formIsOkay(model) {
    if (model.Name == "") {
        alert("Name is required.")
        return false;
    }

    if (model.Code == "") {
        alert("Code is required.")
        return false;
    }

    return true;
}

function saveRecord(bitView) {
    var txtName = document.getElementById("Name");
    var txtCode = editor.getValue();
    var txtTags = document.getElementById("Tags");
    var strURL = "/Sketch/UpdateSketch";
    var txtID = document.getElementById("Id");
    var model = {
        Id: txtID.value,
        Name: txtName.value,
        Code: txtCode,
        Tags: txtTags.value,
        Type: "javascript"
    };

    if (formIsOkay(model)) {
        $.ajax({
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            url: strURL,
            dataType: "json",
            data: JSON.stringify(model),
            success: function (data) {
                if (data.result == "ok") {
                    alert("Record saved.");
                    if (bitView) {
                        window.open("/sketch/renderSketch/" + model.Id, "vr_window")
                    }
                } else {
                    alert("Saved.")
                }
            },
            error: function () {
                alert("An error has occured!!!");
            }
        });
    }

}

function closeRecord(){
    window.location = "/sketch/";
}
