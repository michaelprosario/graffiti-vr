$(function () {
    //Blockly.inject(document.getElementById('blocklyDiv'), { toolbox: document.getElementById('toolbox') });

    var txtBlocklyXML = document.getElementById("txtBlocklyXML");
    var xml = Blockly.Xml.textToDom(txtBlocklyXML.value);
    Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
});

// ====================================================================================================

function myAlert(strMessage) {
    var divAlertText = document.getElementById("divAlertText");
    divAlertText.innerText = strMessage;
    $('#divMyAlert').modal('show')
}

// ====================================================================================================

function showSampleCode() {
    window.open("/sketch/SampleCode","_blank")
}

// ====================================================================================================

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

// ====================================================================================================

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

// ====================================================================================================

function getBlocklyXml() {
    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var text = Blockly.Xml.domToText(xml);
    document.getElementById("txtBlocklyXML").value = text;
}

// ====================================================================================================

function saveRecord(bitView) {
    //get form stuff...
    var txtName = document.getElementById("txtName");
    var txtCode = document.getElementById("txtCode");
    var txtID = document.getElementById("hidRecordID");

    // Generate JavaScript code and display it.
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;

    //code generate JS
    var code = "";
    //code += "function _" + txtID.value + "(){ \n ";
    code += "var bot = new Bot(); \n ";
    code += Blockly.JavaScript.workspaceToCode();
    //code += "\n\n }; \n ";
    document.getElementById("txtCode").value = code;
    getBlocklyXml();

    var txtBlocklyXML = document.getElementById("txtBlocklyXML");
    var txtTags = document.getElementById("txtTags");
    var strURL = "/Sketch/UpdateSketch";
    var model = {
        Id: txtID.value,
        Name: txtName.value,
        Code: txtCode.value,
        Tags: txtTags.value,
        BlocklyXml: txtBlocklyXML.value,
        Type: "blockly"
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
                    alert("Error saving");
                }
            },
            error: function () {
                alert("An error has occured!!!");
            }
        });
    }

}



Blockly.Blocks['box'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.appendValueInput("width")
            .setCheck("Number")
            .appendField("box width=");
        this.appendValueInput("height")
            .setCheck("Number")
            .appendField("height=");
        this.appendValueInput("depth")
            .setCheck("Number")
            .appendField("depth=");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.JavaScript['box'] = function (block) {
    var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
    var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
    var value_depth = Blockly.JavaScript.valueToCode(block, 'depth', Blockly.JavaScript.ORDER_ATOMIC);
    var code = "bot.drawBox(" + value_width + "," + value_height + "," + value_depth + ");\n";
    return code;
};


Blockly.Blocks['move_to'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.appendValueInput("x")
            .setCheck("Number")
            .appendField("moveTo x=");
        this.appendValueInput("y")
            .setCheck("Number")
            .appendField("y=");
        this.appendValueInput("z")
            .setCheck("Number")
            .appendField("z=");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.JavaScript['move_to'] = function (block) {
    var x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
    var y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
    var z = Blockly.JavaScript.valueToCode(block, 'z', Blockly.JavaScript.ORDER_ATOMIC);
    var code = "bot.positionX = " + x + ";\n";
    code += "bot.positionY = " + y + ";\n";
    code += "bot.positionZ = " + z + ";\n";

    return code;
};


Blockly.Blocks['up'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.appendValueInput("blocks")
            .setCheck("Number")
            .appendField("up blocks=");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.JavaScript['up'] = function (block) {
    var value_blocks = Blockly.JavaScript.valueToCode(block, 'blocks', Blockly.JavaScript.ORDER_ATOMIC);

    var code = "bot.moveUp(" + value_blocks + ");\n";
    return code;
};

Blockly.Blocks['fwd'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.appendValueInput("blocks")
            .setCheck("Number")
            .appendField("fwd blocks=");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.JavaScript['fwd'] = function (block) {
    var value_blocks = Blockly.JavaScript.valueToCode(block, 'blocks', Blockly.JavaScript.ORDER_ATOMIC);

    var code = "bot.forward(" + value_blocks + ");\n";
    return code;
};

Blockly.Blocks['turn'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.appendValueInput("blocks")
            .setCheck("Number")
            .appendField("turn blocks=");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.JavaScript['turn'] = function (block) {
    var angle = Blockly.JavaScript.valueToCode(block, 'blocks', Blockly.JavaScript.ORDER_ATOMIC);

    var code = "bot.turn(" + angle + ");\n";
    return code;
};


Blockly.Blocks['left'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.appendValueInput("blocks")
            .setCheck("Number")
            .appendField("left blocks=");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.JavaScript['left'] = function (block) {
    var value_blocks = Blockly.JavaScript.valueToCode(block, 'blocks', Blockly.JavaScript.ORDER_ATOMIC);

    var code = "bot.moveLeft(" + value_blocks + ");\n";
    return code;
};


Blockly.Blocks['right'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.appendValueInput("blocks")
            .setCheck("Number")
            .appendField("right blocks=");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.JavaScript['right'] = function (block) {
    var value_blocks = Blockly.JavaScript.valueToCode(block, 'blocks', Blockly.JavaScript.ORDER_ATOMIC);

    var code = "bot.moveRight(" + value_blocks + ");\n";
    return code;
};

Blockly.Blocks['set_color'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.appendValueInput("color")
            .setCheck("String")
            .appendField("setColor color=");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.JavaScript['set_color'] = function (block) {
    var color = Blockly.JavaScript.valueToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC);
    var code = "bot.drawColor = " + color + ";\n";
    return code;
};

Blockly.Blocks['create_text'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.appendValueInput("text")
            .setCheck("String")
            .appendField("createText text=");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.JavaScript['create_text'] = function (block) {
    var text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
    var code = "bot.createText(" + text + ");\n";
    return code;
};



Blockly.Blocks['chkpt'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.appendValueInput("title")
            .setCheck("String")
            .appendField("checkPoint title=");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.JavaScript['chkpt'] = function (block) {
    var value_title = Blockly.JavaScript.valueToCode(block, 'title', Blockly.JavaScript.ORDER_ATOMIC);

    var code = "bot.saveLocation(" + value_title + ");\n";
    return code;
};



Blockly.Blocks['move'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.appendValueInput("title")
            .setCheck("String")
            .appendField("moveToCheckPoint title=");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.JavaScript['move'] = function (block) {
    var value_title = Blockly.JavaScript.valueToCode(block, 'title', Blockly.JavaScript.ORDER_ATOMIC);

    var code = "bot.moveToLocation(" + value_title + ");\n";
    return code;
};


Blockly.Blocks['cylinder'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.appendValueInput("radius")
            .setCheck("Number")
            .appendField("cylinder width=");
        this.appendValueInput("height")
            .setCheck("Number")
            .appendField("height=");

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.JavaScript['cylinder'] = function (block) {
    var value_radius = Blockly.JavaScript.valueToCode(block, 'radius', Blockly.JavaScript.ORDER_ATOMIC);
    var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);

    var code = "bot.drawCylinder(" + value_radius + "," + value_height + ");\n";
    return code;
};

Blockly.Blocks['cone'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.appendValueInput("radius")
            .setCheck("Number")
            .appendField("cone width=");
        this.appendValueInput("height")
            .setCheck("Number")
            .appendField("height=");

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.JavaScript['cone'] = function (block) {
    var value_radius = Blockly.JavaScript.valueToCode(block, 'radius', Blockly.JavaScript.ORDER_ATOMIC);
    var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);

    var code = "bot.drawCone(" + value_radius + "," + value_height + ");\n";
    return code;
};



/*
Blockly.Blocks['blocktype'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.appendValueInput("type")
        .setCheck("String")
        .appendField("blocktype type=");
    this.appendValueInput("message")
        .setCheck("String")
        .appendField("message=");

    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['blocktype'] = function(block) {
  var value_type = Blockly.JavaScript.valueToCode(block, 'type', Blockly.JavaScript.ORDER_ATOMIC);
  var value_message = Blockly.JavaScript.valueToCode(block, 'message', Blockly.JavaScript.ORDER_ATOMIC);

  
  var code = "drone.blocktype(" +value_message+ "," +value_type + ");\n";
  return code;
};*/


Blockly.Blocks['sphere'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.appendValueInput("radius")
            .setCheck("Number")
            .appendField("sphere radius=");

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.JavaScript['sphere'] = function (block) {
    var value_type = Blockly.JavaScript.valueToCode(block, 'type', Blockly.JavaScript.ORDER_ATOMIC);
    var value_radius = Blockly.JavaScript.valueToCode(block, 'radius', Blockly.JavaScript.ORDER_ATOMIC);


    var code = "bot.drawSphere(" + value_radius + ");\n";
    return code;
};

