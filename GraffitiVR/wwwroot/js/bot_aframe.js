
//================================================================================

//http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

//================================================================================

function rgb(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

//================================================================================

function Bot()
{
	this.angle = 0;
	this.positionX = 0;
	this.positionY = 0;
	this.positionZ = 0;
	this.drawColor = "red";
	var sceneEl = document.querySelector('a-scene');

//================================================================================

	this.drawBoxAt = function(width,height,depth,x,y,z)
	{
		var entityEl = document.createElement('a-entity');
		entityEl.setAttribute('geometry', {
		  primitive: 'box',
		  height: height,
		  width: width,
		  depth: depth
		
		});

		entityEl.setAttribute('position', {x: x, y: y, z: z});
		entityEl.setAttribute('material', 'color', this.drawColor);
		entityEl.setAttribute('bot_element', true);
		
		sceneEl.appendChild(entityEl);
	}

//================================================================================

	this.drawBox = function(width,height,depth)
	{
		if(!height)
			height = width;
	
		if(!depth)
			depth = width;


		var entityEl = document.createElement('a-entity');
		entityEl.setAttribute('geometry', {
		  primitive: 'box',
		  height: height,
		  width: width,
		  depth: depth
		
		});

		var cubeX = this.positionX + width/2;
		var cubeY = this.positionY + height/2;
		var cubeZ = this.positionZ + depth/2;
		var cubeRotationY = this.angle;
	
		entityEl.setAttribute('position', {x: cubeX, y: cubeY, z: cubeZ});
		entityEl.setAttribute('rotation', {x: 0, y: cubeRotationY, z: 0});
		entityEl.setAttribute('material', 'color', this.drawColor);
		entityEl.setAttribute('bot_element', true);

		sceneEl.appendChild(entityEl);

	}

//================================================================================

	this.drawSphere = function(radius)
	{
		var entityEl = document.createElement('a-entity');
		entityEl.setAttribute('geometry', {
		  primitive: 'sphere',
		  radius: radius
		
		});

		var sX = this.positionX + radius/2;
		var sY = this.positionY + radius/2;
		var sZ = this.positionZ + radius/2;
	
		entityEl.setAttribute('position', {x: sX, y: sY, z: sZ});
		entityEl.setAttribute('material', 'color', this.drawColor);
		entityEl.setAttribute('bot_element', true);	

		sceneEl.appendChild(entityEl);



	}

//================================================================================

	this.drawSphereAt = function(radius,x,y,z)
	{
		var entityEl = document.createElement('a-entity');
		entityEl.setAttribute('geometry', {
		  primitive: 'sphere',
		  radius: radius
		
		});
	
		entityEl.setAttribute('position', {x: x, y: y, z: z});
		entityEl.setAttribute('material', 'color', this.drawColor);
		entityEl.setAttribute('bot_element', true);

		sceneEl.appendChild(entityEl);		
	}

//================================================================================

	this.drawCone = function(radius,height)
	{
		var entityEl = document.createElement('a-entity');
		entityEl.setAttribute('geometry', {
		  primitive: 'cone',
		  radius: radius,
		  height: height
		
		});

		var sX = this.positionX + radius/2;
		var sY = this.positionY + radius/2;
		var sZ = this.positionZ + radius/2;
	
		entityEl.setAttribute('position', {x: sX, y: sY, z: sZ});
		entityEl.setAttribute('material', 'color', this.drawColor);
		entityEl.setAttribute('bot_element', true);

		sceneEl.appendChild(entityEl);
	}

//================================================================================

	this.drawCylinder = function(radius,height)
	{
		var entityEl = document.createElement('a-entity');
		entityEl.setAttribute('geometry', {
		  primitive: 'cylinder',
		  radius: radius,
		  height: height
		
		});

		var sX = this.positionX + radius/2;
		var sY = this.positionY + radius/2;
		var sZ = this.positionZ + radius/2;
	
		entityEl.setAttribute('position', {x: sX, y: sY, z: sZ});
		entityEl.setAttribute('material', 'color', this.drawColor);
		entityEl.setAttribute('bot_element', true);

		sceneEl.appendChild(entityEl);
	}
	
//================================================================================
	
	this.drawImageAt = function(strPath,width, height, x,y,z)
	{
		var entityEl = document.createElement('a-image');
		entityEl.setAttribute('geometry', {
		  height: height,
		  width: width

		});

		entityEl.setAttribute('position', {x: x, y: y, z: z});
		entityEl.setAttribute('src', strPath);
		entityEl.setAttribute('bot_element', true);

		sceneEl.appendChild(entityEl);
	}
	
//================================================================================
	
	this.moveUp = function(steps)
	{
		this.positionY += steps;
	}

//================================================================================
   
	this.forward = function(steps)
    {
        var deltaX = steps * Math.cos(this.getAngleInRadians());
        var deltaZ = steps * Math.sin(this.getAngleInRadians());

		this.positionX += deltaX;
		this.positionZ += deltaZ;
	}
//================================================================================

	this.moveForward = function(steps){
		this.forward(steps);
	}

//================================================================================

	this.moveLeft = function(steps)
 	{
        var deltaX = steps * Math.cos(this.getAngleInRadians() - (Math.PI/2));
        var deltaZ = steps * Math.sin(this.getAngleInRadians()- (Math.PI/2));

		this.positionX += deltaX;
		this.positionZ += deltaZ;
	}

//================================================================================

	this.moveRight = function(steps)
	{
		this.moveLeft(steps * -1);
	}

//================================================================================

	this.setAngle = function(degrees)
    {
        this.angle = degrees;
	}

//================================================================================

	this.getAngle = function()
    {
        return this.angle;
	}

//================================================================================

    this.getAngleInRadians = function () {
        return (this.angle * Math.PI)/180;
    }

//================================================================================

	this.turn = function(angle)
	{
		var currentAngle = this.getAngle();
		this.setAngle(currentAngle + angle);
	}

//================================================================================

	this.locations = new Array();
	this.saveLocation = function(locationName)
	{
		var aPoint = {}
		aPoint.x = this.positionX;
		aPoint.y = this.positionY;
		aPoint.z = this.positionZ;
		aPoint.angle = this.getAngle();
		this.locations[locationName] = aPoint;
	}

//================================================================================

	this.moveToLocation = function(locationName)
	{
		var aPoint = this.locations[locationName];
		this.positionX = aPoint.x;
		this.positionY = aPoint.y;
		this.positionZ = aPoint.z;
		this.setAngle(aPoint.angle);

	}

//================================================================================

	//todo ... need to figure this out!
	this.createText = function(myText) {
		var entityEl = document.createElement('a-entity');

	
		entityEl.setAttribute('position', {x: this.positionX, y: this.positionY, z: this.positionZ});
		entityEl.setAttribute('text', myText);

		sceneEl.appendChild(entityEl);	
	}

//================================================================================
	
this.drawModel = function(strModelName, strScaleParams, strRotationParams)
{
	var entityEl = document.createElement('a-entity');

	var strObjModel = "obj: url(/models/" +strModelName+  ".obj); ";
	strObjModel +=    "mtl: url(/models/" +strModelName+  ".mtl); ";
	//console.log(strObjModel);

	entityEl.setAttribute('obj-model', strObjModel);
	entityEl.setAttribute('bot_element', true);

	var cubeX = this.positionX;
	var cubeY = this.positionY;
	var cubeZ = this.positionZ;
	var cubeRotationY = this.angle;

	entityEl.setAttribute('position', {x: cubeX, y: cubeY, z: cubeZ});
	entityEl.setAttribute('rotation', strRotationParams);
	entityEl.setAttribute('scale', strScaleParams);

	sceneEl.appendChild(entityEl);
}

//================================================================================

this.drawImage = function(strPath, strScaleParams, strRotationParams)
{
	var entityEl = document.createElement('a-image');
	
	entityEl.setAttribute('src', strPath);
	entityEl.setAttribute('bot_element', true);

	var cubeX = this.positionX;
	var cubeY = this.positionY;
	var cubeZ = this.positionZ;
	var cubeRotationY = this.angle;

	entityEl.setAttribute('position', {x: cubeX, y: cubeY, z: cubeZ});
	entityEl.setAttribute('rotation', strRotationParams);
	entityEl.setAttribute('scale', strScaleParams);
	
	sceneEl.appendChild(entityEl);
}


	


}
