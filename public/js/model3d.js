function Model3d(canvasId) {
    var domCanvas = document.getElementById(canvasId);

    this.ctx3d = domCanvas.getContext('3d');
}

Model3d.prototype.cloundToShape = function(imagePx) {
    var p = 0;
    var shape = [];
    var x, y = 0;
    /* look for the first */
    while(p += 1 < imagePx.length || imagePx[p]) {}
    if(p == imagePx.length) {
        throw "BLANK_IMAGE";
    }
    shape.push(imagePx[p]);
    /* px found : look for the next */
    for (var i = p; i < imagePx.length; i += 1) {

        var px = imagePx[i];
        /**
         *  8 1 2
         *  7 x 3
         *  6 5 4
         */
        x = px.x;
        y = px.y;
        for(var ln = 0; ln < 8; ln += 1) {


        }

        /* 1st line / last line / 1st column / last column */


    }
};

Model3d.prototype.convert = function(shapes) {
    for(var shapeKey in shapes) {
        if (shapes.hasOwnProperty(shapeKey)) {
            var shape = shapes[shapeKey];
            this.cloundToShape(shape.dots);
        }
    }
};

Model3d.prototype.draw = function() {
    var it = this;
    requestAnimationFrame(function(funData) {
        console.log(funData);
        it.draw();
    })
};