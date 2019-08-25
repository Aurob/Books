var socket = io();
var pako = window.pako;

socket.on('init',(res)=>{
    console.log(res);
});
socket.on('clientLeave', (id)=>{
    var allBnds = document.getElementsByTagName('div');
    for(div in allBnds){
        if(allBnds[div].id.startsWith(id)){
            var bnd = get(allBnds[div].id);
            bnd.remove();
        }
    }
});

//This updates the client with others
socket.on('update',(packet)=>{
    if(Object.keys(packet)[0].indexOf(socket.id) >-1){
        //console.log('ignoring');
    }else{
        bnd = get(Object.keys(packet)[0]);
        if(!bnd){
            addBoundary(Object.keys(packet)[0]);
            bnd = get(Object.keys(packet)[0]);
        }

        if(Object.keys(packet)[3]){
            bnd.remove();
        }else{
            bnd.style.position = 'absolute';
            bnd.style.left = packet[Object.keys(packet)][0][0];
            bnd.style.top = packet[Object.keys(packet)][0][1];
            bnd.style.width = packet[Object.keys(packet)][0][2];
            bnd.style.height = packet[Object.keys(packet)][0][3];
            
            bnd.style.zIndex = '-1';
            bnd.style.pointerEvents = false;

            bw = parseInt(String(bnd.style.width).replace('px',''));
            bnd.children[0].style.fontSize = bw*.1+'px';

            if(packet[Object.keys(packet)][1]){
                bnd.children[0].innerText = packet[Object.keys(packet)][1];
                bnd.children[0].contentEditeable = "false";
                bnd.style.border = "";
            }
            if(packet[Object.keys(packet)][2]){
                bnd.children[1].src = zip(packet[Object.keys(packet)][2],false);
                bnd.style.border = "";
                bnd.children[1].style.zIndex = '-1';
                bnd.children[1].style.height = "100%";
                bnd.children[1].style.width = "100%";
            }
        }
    }
});

socket.on('del',(id)=>{
    if(!(id.startsWith(socket.id))){
        var bnd = get(id);
        bnd.remove();
    }
});


//HTML script init
function runit(){  
    console.log("hello");
    //zoom();
    addBoundary(); // change name?
}
//

//canvas = get('main');
//context = canvas.getContext('2d');
var clicked;
var cx = 0, cy = 0;
var bndCanvas = [];
var bndImages = [];
var clickId;
var del;
var resizetop, resizing, dontgrab, newTxt, newImg;
var canvas, context;
var bndClickX = 0, bndClickY = 0;
var oobX = 0, oobY = 0;
var scrollClick, oob;
var clickNode;
var zm = 0;
var client = {};
var zippedImg, zippedTxt;
function movBound(e){
    
    var b = (clickId) ? get(clickId) : get(e.target.id);

    var text = b.children[0].innerText;
    var img = b.children[1].src;
    b.style.position ='absolute';
    if(bndClickX != 0 && bndClickY !=0){
        b.style.left = (e.x)-(bndClickX)+'px';//-(b.clientWidth/3)+'px';
        b.style.top = (e.y)-(bndClickY)+'px';//-(b.clientHeight/3)+'px';
    }

    if(b.id in client){
        if(text != '' && hash(text) != client[b.id][0]){
            client[b.id][0] = hash(text);
            newTxt = text;//zip(text,true);
        }else newTxt = false;
        if(img != '' && hash(img) != client[b.id][1]){
            client[b.id][1] = hash(img);
            newImg = zip(img, true);
        }else newImg = false;

    }else{
        client[b.id] = [hash(text), hash(img)];
        newTxt = text;//zip(text, true); 
        newImg = zip(img, true);
    }

    bndLoc = [b.style.left,b.style.top,b.style.width,b.style.height];
    var packet = {[socket.id + b.id] : [bndLoc, newTxt, newImg, del]};
    socket.emit('bndMove', packet);   
}

function boundaryHover(e){
    //console.log("Hovering in "+e.target.id);
    var hoverNode = (e.target.id=='') ? false : bndId(e);

    if(clicked && hoverNode==clickId){
        movBound(e);
    }
    if(hoverNode) oob = false;
    if(clicked && !hoverNode){
        //console.log('oob');
        oobX = e.clientX;
        oobY = e.clientY;
        oob = true;
        movBound(e);
    }
    if(e.layerY < 50){
        //console.log('resize?');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        resizetop = true;
    }else resizetop = false;

    if(dontgrab){
        //console.log("resizing");
        b = get(bndId(e));
        //console.log(b);        
    }
}

function boundaryClick(e){
    if(e.button != 2){


        var b = get(bndId(e));
        if(clicked){
            clicked = false;
            bndClickX = 0;
            bndClickY = 0;
            clickId = '';
            if(bndImages.indexOf(bndId(e)) < 0){
                b.style.borderColor = "black";
                b.style.cursor = 'grab';
            } else {
                b.style.border = '';
                b.style.cursor = 'grab';
            }
            
            b.style.zIndex = "-1"; //when not moving a boundary, move it to the back
        }else {
            clickNode = e;
            clickId = bndId(e);
            movBound(e);
            b.style.border = "solid";
            b.style.borderColor = "red";
            b.style.zIndex = "0";
            b.style.cursor = 'grabbing';
            bndClickX = e.layerX;
            bndClickY = e.layerY;
            clicked = true;
        }
    }
}

function fileDrop(e, bg){
    e.stopPropagation();
    e.preventDefault();
    if(e.target.id.startsWith("_f")){
        id = e.target.id;
        var items = e.dataTransfer.items;
        var files = e.dataTransfer.files;

        if(files.length > 0){
            if(files[0].type.startsWith('image')){
                let reader = new FileReader()
                reader.readAsDataURL(files[0])
                reader.onloadend = function() {
                    if(bg){
                        document.body.style.backgroundImage = "url("+reader.result+")";
                        document.body.style.backgroundSize = 'cover';
                    }else{
                        var boundary = get(id);
                        boundary.children[1].src = reader.result;
                        boundary.children[1].style.height = "100%";
                        boundary.children[1].style.width = "100%";
                        boundary.children[1].style.zIndex = "0";
                        boundary.style.border = '';
                        movBound(e);
                        
                    }
                }
                
            }
            if(files[0].type.startsWith('text')){
                let reader = new FileReader()
                reader.readAsText(files[0])
                reader.onloadend = function() { 
                    var boundary = get(id);
                    boundary.children[0].innerText = reader.result;
                    boundary.children[0].style.height = "100%";
                    boundary.children[0].style.width = "100%";
                    boundary.children[0].style.zIndex = "0";
                    boundary.children[0].style.fontSize = '12px';//boundary.width*.1+'px'; 
                    boundary.style.overflowY = 'scroll';

                }
            }
            bndImages.push(id);
        }
        else if(items.length > 0){
            if(bg){
                document.body.style.backgroundImage = "url("+e.dataTransfer.getData('text/x-moz-url-data')+")";
            }
            else{
                var boundary = get(id);
                boundary.children[1].src = e.dataTransfer.getData('text/x-moz-url-data');
                boundary.children[1].style.height = "100%";
                boundary.children[1].style.width = "100%";
                boundary.children[1].style.zIndex = "0";
                boundary.style.border = '';
                movBound(e);
            }
            bndImages.push(id);
        }
        return false;
    }
}

function bndText(e){
    var boundary = get(clickId);
    boundary.childNodes[1].innerText = 'text here';
}
function deleteBoundary(e){
    var boundary = get(clickId);
    boundary.remove();
    socket.emit('del', socket.id+clickId);
    clickId = ''; clicked = false;

}

//Boundaries
var boundCnt = 0;
var boundaries = [];
function addBoundary(boundId){
    var boundId = (boundId) ? boundId : "_f"+boundCnt;
    board = get('board');
    board.innerHTML += 
        "<div class='fz' id='"+boundId+"' style='border:solid;width:25px;height:25px;'>\
        <p id='"+boundId+"' contenteditable='true' style='font-size:.1px; word-wrap:break-word;'></p>\
        <img id='"+boundId+"'/>\
        </div>";
    boundaries.push(boundId);
    boundCnt++;
    return boundId;
}

//Zoom
var zooming = false;
w = 0;
var outOfBnd = false;
function zoom(e){
    var scrollLocation = (clicked) ? clickId : e.target.id; 

    fileBoundary = get(scrollLocation);
    if(boundaries.indexOf(scrollLocation) > -1){

        //Removes 'px' from the value and returns an int. Is there a better method?
        bt = parseInt(String(fileBoundary.style.top).replace('px',''));
        bw = parseInt(String(fileBoundary.style.width).replace('px',''));
        bl = parseInt(String(fileBoundary.style.left).replace('px',''));
        
        zm = 0;
        (e.deltaY < 0) ? zm=10 : zm=-10;
        
        fileBoundary.style.width = zm+bw+'px';
        fileBoundary.style.height = zm+bw+'px';

        //Attempt to center the box around the cursor when zooming
        //fileBoundary.style.left = bl - zm +'px';
        //fileBoundary.style.top = bt - zm +'px';

        //Adjust the text font size when zooming
        //text = fileBoundary.children[0];
        //text.style.fontSize = bw*.1+'px';

        movBound(e); //Update everyone's client
    }
}
//MISC helper functions

//Shortname element retrieval
function get(id){
    return document.getElementById(id);
}

//Returns the id of an element
function bndId(node){
    var id = (node.target.id.startsWith('_f')) ? node.target.id : node.target.parentElement.id;
    return id;
}

//Simple string hash for storing values
function hash(str){
    var hash = 0, i, chr;
    if (str.length === 0) return hash;
    
    for (i = 0; i < str.length; i++) {   
        chr   = str.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  //Compression and decompression : zip(string, true) 'true' to compress, zip(string, false) 'false' to decompress
  function zip(data, option){
    if(option){ //zipping
        var str = JSON.stringify(data);
        var data = unescape(encodeURIComponent(str));
        var resultAsBinString  = pako.deflate(data, { to: 'string' });
        return resultAsBinString;
    }else{ //unzipping
        var uncompressed = pako.inflate(data, { to: 'string' });
        var decoded = decodeURIComponent(escape(uncompressed));
        return JSON.parse(decoded);
    }
}
//

//Events
//Scrolling
window.addEventListener('wheel',(zoom));

//For tracking mouse location and boundary dragging
window.addEventListener('mousemove',(e)=> {
    (e.target.id!='' || clicked) ? boundaryHover(e) : '';
}); 

window.addEventListener('click',(e)=> {

    if(e.target.id == ''){
        if(clicked){
            e = clickNode;
            id = clickId;
        }
    }else id = bndId(e);

    (id!='' && id.startsWith('_f')) ? boundaryClick(e) : '';
});

//For handling file drops
window.addEventListener('dragover', (e)=> e.preventDefault(), false);
window.addEventListener('drop', (e)=> {
    (e.target.id!='') ? fileDrop(e, false) : fileDrop(e, true); //Sets image for boundary or background
});

//For creating and deleting boundaries
window.addEventListener('keypress',(e)=>{
    (e.key=='=') ? addBoundary(false) : '';
    (e.key=='-' && clicked) ? deleteBoundary(e) : '';
    (e.key=='t') ? bndText(e) : '';

});
