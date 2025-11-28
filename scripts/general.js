function MakeTableFromObjectArray(objArray, rowFun) {
    var keys = [];
    var tbl = document.createElement("table");
    tbl.cellPadding = 1;
    tbl.border = 0;
    tbl.cellSpacing = 1;
    tbl.className = "generic-table";
    if (objArray.length == 0) {
        tbl.innerHTML = "<tr><td>No Data Returned - Empty Data</td></tr>";
    }
    else {
        for (var key in objArray[0]) { keys.push(key); }
        var td, tr;
        tr = tbl.insertRow(-1);
        tr.className = "header";
        tr.onclick = rowFun;
        for (var c = 0; c < keys.length; c++) {
            td = tr.insertCell(-1);
            td.innerHTML = keys[c];
        }
        for (var r = 0; r < objArray.length; r++) {
            tr = tbl.insertRow(-1);
            tr.onclick = rowFun;
            tr.className = "data";
            for (var c = 0; c < keys.length; c++) {
                td = tr.insertCell(-1);
                var key  = keys[c];
                td.innerHTML = objArray[r][key];
            }
        }
    }
    return tbl;
}

function MakeTableFromObject(obj) {
    var keys = [];
    var tbl = document.createElement("table");
    tbl.cellPadding = 1;
    tbl.border = 0;
    tbl.cellSpacing = 1;
    tbl.className = "generic-table";
    if (obj == null) {
        tbl.innerHTML = "<tr><td>No Data Returned - Empty Data</td></tr>";
    }
    else {
        for (var key in obj) { keys.push(key); }
        var td, tr;        
        for (var c = 0; c < keys.length; c++) {
            var key = keys[c];
            tr = tbl.insertRow(-1);
            td = tr.insertCell(-1);
            td.innerHTML = key;
            td.className = "header";
            td = tr.insertCell(-1);
            var typ = typeof obj[key];
            td.innerHTML = typ;
            td.className = "data";
            td = tr.insertCell(-1);
            td.className = "data";
            var val = obj[key];
            console.log(key);
            console.log(val);
            if (typ == "object" && val != null) {
                td.innerHTML = JSON.stringify(val);
            }
            else {
                td.innerHTML = val;                
            }
        }
    }
    return tbl;
}

function PopulateSelect(arr, optCtl, optSelect) {
    var sel;
    if (optCtl) { sel = optCtl; }
    else { sel = document.createElement("select"); }
    var opt;
    if (optSelect) {
        opt = new Option("Select", "");
        sel.appendChild(opt);
    }
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].length > 0) {
            opt = new Option(arr[i], arr[i]);
            sel.appendChild(opt);
        }
    }
    return sel;
}

function ExpandImage(img){
    if (img.className == "expandable"){
        var tp = document.getElementById("page-header").offsetHeight;
        var oCalc = calcImgSize(img, tp);      
        var height = img.style["height"];
        var width = img.style["width"];
        var maxWid = img.style["max-width"];
        var maxHt = img.style["max-height"];
        var ht = parseInt(document.body.offsetHeight * .8);
        var mwd = parseInt(document.body.offsetWidth * .9);
        var oldStyle = {"height": height, "width": width, "max-width": maxWid, "max-height": maxHt}; 
        img["oldStyle"] = oldStyle;
        img.style["height"] = oCalc["height"];
        img.style["width"] = oCalc["width"];
        img.style["max-width"] = oCalc["width"];
        img.style["max-height"] = oCalc["height"];
        img.style["top"] = tp + "px";
        img.className = "expanded";
    }
    else if (img.className == "expanded"){
        var oldStyle = img["oldStyle"];
        img.style["max-width"] = oldStyle["max-width"];
        img.style["max-height"] = oldStyle["max-height"];
        img.style["width"] = oldStyle["width"];
        img.style["height"] = oldStyle["height"];
        img.style["top"] = "";
        img.className = "expandable"; 
    }
}

function calcImgSize(img, tp){
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const availableHeight = vh - tp;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.min(vw / iw, availableHeight / ih);
    newWidth = parseInt(iw * scale) + "px";
    newHeight = parseInt(ih * scale) + "px";
    return { width: newWidth, height: newHeight  };
}

