var Cookie2D = function(canvasID) {

    var canvas = document.getElementById(canvasID);
    var canvasHeight = canvas.clientHeight;
    var canvasWidth = canvas.clientWidth;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    var cookieContext = canvas.getContext("2d");

    var tools = {
        HAND : 0,
        LINE : 1,
        CURVE : 2
    };

    var modes = {
        DEFAULT : 0,
        SNAP : 1
    };

    //initGrid("#dedede", 20);

    var currentTool = tools.LINE;
    var currentMode = modes.DEFAULT;
    var isPenDown = false;

    var currentColor = "#000000";

    function penDown(x,y) {
        switch(currentTool) {
            case tools.CURVE :
                return;
            case tools.HAND :
                startBrush();
                return;
            case tools.LINE :
                return;
        }
    }

    function penUp(x,y) {
        switch(currentTool) {
            case tools.CURVE :
                return;
            case tools.HAND :
                endBrush();
                return;
            case tools.LINE :
                return;
        }
    }

    function altAction(x,y) {
        switch(currentTool) {
            case tools.CURVE :
                return;
            case tools.HAND :
                return;
            case tools.LINE :
                closeLine();
        }
    }

    function penMove(x, y) {
        switch(currentTool) {
            case tools.CURVE :
                return;
            case tools.HAND :
                handLine(x, y);
                return;
            case tools.LINE :
                return;
        }
    }
    var movePathPoints = [];isPenDown = false;
    /* TODO monitor tool */
    setInterval(function() {
        console.log(movePathPoints.length)
    },1000);

    function startBrush(x,y) {
        isPenDown = true;
        cookieContext.moveTo(x,y);
        cookieContext.beginPath();
        movePathPoints.push({x: x, y : y});
    }

    function endBrush(x,y) {
        isPenDown = false;
    }

    function handLine(x,y) {
        if(isPenDown) {
            movePathPoints.push({x: x, y : y});
            cookieContext.lineTo(x,y);
            cookieContext.stroke();
        }

    }

    function draw(x,y) {
        switch(currentTool) {
            case tools.CURVE :
                drawCurve(x,y);
                return;
            case tools.HAND :
                return;
            case tools.LINE :
                drawLine(x,y);
        }
    }

    var isBeginPath = false;
    var pathPoints = [];
    function drawLine(x,y) {

        pathPoints.push({x: x, y : y});
        if(currentTool == tools.LINE && !isBeginPath) {
            isBeginPath = true;
            cookieContext.strokeStyle = currentColor;
            cookieContext.lineWidth = 2;
            cookieContext.beginPath();      // Début du chemin
            cookieContext.moveTo(x,y);
        } else {
            cookieContext.lineTo(x,y);
            cookieContext.stroke();
        }
    }
    function closeLine() {
        var firstPoint = pathPoints[0];
        cookieContext.lineTo(firstPoint.x, firstPoint.y);
        cookieContext.fill();
        isBeginPath = false;
        pathPoints = [];
    }


    function drawCurve() {}

    function initGrid(color, gridSize, options) {
        options = options || {};
        cookieContext.beginPath();
        cookieContext.strokeStyle = color;
        var xBoxCount = canvasWidth / gridSize;
        for(var i = 0; i < xBoxCount; i += 1) {
            var xPos = i * gridSize;
            cookieContext.moveTo(xPos, 0);
            cookieContext.lineTo(xPos, canvasHeight);
        }
        var yBoxCount = canvasHeight / gridSize;
        for(var j = 0; j < yBoxCount; j += 1) {
            var yPos = j * gridSize;
            cookieContext.moveTo(0, yPos);
            cookieContext.lineTo(canvasWidth, yPos);
        }
        cookieContext.stroke();
    }

    var initListeners = function() {
        window.onmousedown = function(event) {
            penDown();
        };
        canvas.onmouseup = function(event) {
            penUp();
        };
        canvas.onmousemove = function(event) {
            penMove(event.layerX, event.layerY);
        };
        canvas.onclick = function(event) {
            draw(event.layerX, event.layerY);
        };
        canvas.oncontextmenu = function(e) {
            altAction(event.layerX, event.layerY);
            e.preventDefault();
            return false;
        };
    }();

    function clear() {
        isBeginPath = false;
        pathPoints = [];
        cookieContext.clearRect(0, 0, canvas.width, canvas.height);
        initGrid("#dedede", 20)
    }

    return {
        setTool: function (tool) {
            currentTool = tool;
        },
        setSize : function(size) {
            cookieContext.lineWidth =  (size + 1) * 4 ;
        },
        setColor: function (color) {
            currentColor = color
        },
        clear : clear,

        finish : function() {
            var image = new Image(cookieContext.getImageData(0,0,canvasWidth,canvasHeight));
            var edges = image.process();

            var imgData = cookieContext.getImageData(0,0,canvasWidth,canvasHeight);
            edges.forEach(function(edge, i){
                imgData.data[i * 4] = edge ? 255 : 0;
                imgData.data[i * 4 + 1] = edge ? 255 : 0;
                imgData.data[i * 4 + 2] = edge ? 255 : 0;
                imgData.data[i * 4 + 3] = 255
            });
            cookieContext.putImageData(imgData, 0, 0);
        },

        cancel : function() {
            var pathPointsBackup = pathPoints;
            clear();
            pathPoints = pathPointsBackup;
            var point = pathPoints.pop();
            console.log("removed x : " + point.x + " y : " + point.y);
            isBeginPath = true;
            cookieContext.strokeStyle = currentColor;
            cookieContext.lineWidth = 2;
            cookieContext.beginPath();

            var firstPoint = pathPoints[0];
            cookieContext.moveTo(firstPoint.x, firstPoint.y);
            for(var i = 1 ; i < pathPoints.length; i += 1) {
                point = pathPoints[i];
                cookieContext.lineTo(point.x,point.y);
            }
            cookieContext.stroke();

        }
    }
};

