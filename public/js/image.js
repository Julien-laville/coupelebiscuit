
    var Image = function(imageData) {
        this.data = [];
        this.height = imageData.height;
        this.width = imageData.width;
        for(var i = 0; i < imageData.data.length; i += 4) {
            var p = !imageData.data[i+3] == 0;
            if(p)
                p = imageData.data[i] == 0 && imageData.data[i + 1] == 0 && imageData.data[i + 2] == 0;
            this.data.push(p)
        }
    };

    Image.prototype.edge = function() {
        var edgeData = [];
        var it = this;
        this.data.forEach(function(p, i) {
            var ab = it.ab(i);
            edgeData.push(it.isEdge(ab))
        });

        return edgeData;
    };

    Image.prototype.isEdge = function(ab) {
        return ab[4] && (!ab[0] || !ab[1] || !ab[2] || !ab[3]  || !ab[4] || !ab[5] || !ab[6] || !ab[7])
    };


    Image.prototype.ab = function(p) {
        var ab = [];
        var index;
        var size = this.data.length;

        index = p - this.width - 1;
        if(index >= 0) {
            ab.push(this.data[index]);
        } else {ab.push(false)}

        index = p - this.width;
        if(index >= 0) {
            ab.push(this.data[index]);
        } else {ab.push(false)}

        index = p - this.width + 1;
        if(index >= 0) {
            ab.push(this.data[index]);
        } else {ab.push(false)}

        index = p - 1;
        if(index >= 0) {
            ab.push(this.data[index]);
        } else {ab.push(false)}

        ab.push(this.data[p]);

        index = p + 1;
        if(index < size) {
            ab.push(this.data[index]);
        } else {ab.push(false)}

        index = p + this.width - 1;
        if(index < size) {
            ab.push(this.data[index]);
        } else {ab.push(false)}

        index = p + this.width;
        if(index < size) {
            ab.push(this.data[index]);
        } else {ab.push(false)}

        index = p + this.width + 1;
        if(index < size) {
            ab.push(this.data[index]);
        } else {ab.push(false)}


        return ab;
    };

    Image.prototype.process = function() {
        return this.edge();
    };

