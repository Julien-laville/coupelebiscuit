function Model3d(imageData,canvasId) {
    var domCanvas = document.getElementById(canvasId);
    this.imagePx = [];
    for(var i = 0; i < imageData.data.length; i += 4) {
        var p = !imageData.data[i+3] == 0;
        if(p)
            p = imageData.data[i] == 0 && imageData.data[i + 1] == 0 && imageData.data[i + 2] == 0;
        this.imagePx.push(!p)
    }
    this.height = imageData.height;
    this.width = imageData.width;
    //this.ctx3d = domCanvas.getContext('3d');
}

Model3d.prototype.cloundToShape = function() {
    var p = 0;
    var shape = [];
    /* look for the first */
    while((p += 4) < this.imagePx.length && !this.imagePx[p]) {}
    if(p == this.imagePx.length) {
        throw "BLANK_IMAGE";
    }
    shape.push(this.imagePx[p]);
    /* px found : look for the next */
    var finder = p;
    do {
        shape.push(finder);
        /**
         *  8 1 2
         *  7 x 3
         *  6 5 4
         */


        if(this.imagePx[finder - this.width]) {
            finder = finder - this.width;
        } else if(this.imagePx[finder - this.width + 1]) {
            finder = finder - this.width + 1;
        } else if(this.imagePx[finder + 1]) {
            finder = finder + 1;
        } else if(this.imagePx[finder + this.width + 1]) {
            finder = finder + this.width + 1;
        } else if(this.imagePx[finder + this.width]) {
            finder = finder + this.width;
        } else if(this.imagePx[finder + this.width - 1]) {
            finder = finder + this.width - 1;
        } else if(this.imagePx[finder - 1]) {
            finder = finder - 1;
        } else if(this.imagePx[finder - this.width - 1]) {
            finder = finder - this.width - 1;
        }

        /* 1st line / last line / 1st column / last column */


    } while(p != finder);
    return shape;
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