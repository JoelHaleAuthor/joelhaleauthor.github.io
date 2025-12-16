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
        var parentWidth = parseInt(img.parentElement.parentElement.offsetWidth);
        var tp = document.getElementById("page-header").offsetHeight;
        var oCalc = calcImgSize(img, tp);      
        var height = img.style["height"];
        var width = img.style["width"];
        var left = img.style["left"];
        var maxWid = img.style["max-width"];
        var maxHt = img.style["max-height"];
        //var ht = parseInt(document.body.offsetHeight * .8);
        //var mwd = parseInt(document.body.offsetWidth * .9);
        var oldStyle = {"height": height, "width": width, "max-width": maxWid, "max-height": maxHt, "left": left}; 
        var newWidth = oCalc["width"];
        if (newWidth > parentWidth){
            newWidth = parentWidth - 30;
        }
        //var newLeft = (parseInt(oCalc["viewWidth"] - parentWidth) / 2) + img.parentElement.parentElement.offsetLeft - parseInt(newWidth/3);
        var newLeft = document.body.offsetWidth / 2 - (newWidth / 2);
        img["oldStyle"] = oldStyle;
        img.style["height"] = oCalc["height"] + "px";
        img.style["width"] = oCalc["width"] + "px";
        img.style["max-width"] = oCalc["width"] + "px";
        img.style["max-height"] = oCalc["height"] + "px";
        img.style["left"]= newLeft + "px";
        img.style["top"] = tp + "px";
        img.className = "expanded";
        //console.log({ "img.style['width']": img.style["width"], "oCalc": oCalc, newLeft: newLeft });
    }
    else if (img.className == "expanded"){
        var oldStyle = img["oldStyle"];
        img.style["max-width"] = oldStyle["max-width"];
        img.style["max-height"] = oldStyle["max-height"];
        img.style["width"] = oldStyle["width"];
        img.style["height"] = oldStyle["height"];
        img.style["left"] = oldStyle["left"];
        img.style["top"] = "";
        img.className = "expandable"; 
    }
}

function calcImgSize(img, tp){
    const tagName = img.tagName.toLowerCase();
    const vw = window.innerWidth;
    const vh = window.innerHeight - 50;
    const availableHeight = vh - tp;
    const iw = (tagName === "img" ? img.naturalWidth : img.offsetWidth - 50);
    const ih = (tagName === "img" ? img.naturalHeight : img.offsetHeight);
    const scale = Math.min(vw / iw, availableHeight / ih);
    newWidth = parseInt(iw * scale);
    newHeight = parseInt(ih * scale);
    return { width: newWidth, height: newHeight, viewWidth: vw  };
}
