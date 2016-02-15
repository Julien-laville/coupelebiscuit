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