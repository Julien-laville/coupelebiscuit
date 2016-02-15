module.exports = function(imageData) {

    this.data = [];
    this.height = imageData.height;
    this.width = imageData.width;
    for (var i = 0; i < imageData.data.length; i += 4) {
        var p = !imageData.data[i + 3] == 0;
        if (p)
            p = imageData.data[i] == 0 && imageData.data[i + 1] == 0 && imageData.data[i + 2] == 0;
        this.data.push(p)
    }


    this.prototype.edge = function (threshold) {
        var edgeData = [];
        var it = this;
        this.data.forEach(function (p, i) {
            var ab = it.ab(i);
            edgeData.push(it.isEdge(ab, threshold))
        });

        return edgeData;
    };

    this.prototype.isEdge = function (ab,threshold) {
        return ab[4] && (!ab[0] || !ab[1] || !ab[2] || !ab[3] || !ab[4] || !ab[5] || !ab[6] || !ab[7])
    };


    this.prototype.ab = function (p) {
        var ab = [];
        var index;
        var size = this.data.length;

        index = p - this.width - 1;
        if (index >= 0) {
            ab.push(this.data[index]);
        } else {
            ab.push(false)
        }

        index = p - this.width;
        if (index >= 0) {
            ab.push(this.data[index]);
        } else {
            ab.push(false)
        }

        index = p - this.width + 1;
        if (index >= 0) {
            ab.push(this.data[index]);
        } else {
            ab.push(false)
        }

        index = p - 1;
        if (index >= 0) {
            ab.push(this.data[index]);
        } else {
            ab.push(false)
        }

        ab.push(this.data[p]);

        index = p + 1;
        if (index < size) {
            ab.push(this.data[index]);
        } else {
            ab.push(false)
        }

        index = p + this.width - 1;
        if (index < size) {
            ab.push(this.data[index]);
        } else {
            ab.push(false)
        }

        index = p + this.width;
        if (index < size) {
            ab.push(this.data[index]);
        } else {
            ab.push(false)
        }

        index = p + this.width + 1;
        if (index < size) {
            ab.push(this.data[index]);
        } else {
            ab.push(false)
        }


        return ab;
    };

    this.prototype.vectors = function () {
        var p = 0;
        var shape = [];
        /* look for the first */
        while ((p += 4) < this.imagePx.length && !this.imagePx[p]) {
        }
        if (p == this.imagePx.length) {
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


            if (this.imagePx[finder - this.width]) {
                finder = finder - this.width;
            } else if (this.imagePx[finder - this.width + 1]) {
                finder = finder - this.width + 1;
            } else if (this.imagePx[finder + 1]) {
                finder = finder + 1;
            } else if (this.imagePx[finder + this.width + 1]) {
                finder = finder + this.width + 1;
            } else if (this.imagePx[finder + this.width]) {
                finder = finder + this.width;
            } else if (this.imagePx[finder + this.width - 1]) {
                finder = finder + this.width - 1;
            } else if (this.imagePx[finder - 1]) {
                finder = finder - 1;
            } else if (this.imagePx[finder - this.width - 1]) {
                finder = finder - this.width - 1;
            }

            /* 1st line / last line / 1st column / last column */


        } while (p != finder);
        return shape;
    };

    return {
        edge : this.edge,
        vectors : this.cloundToShape
    }
};

