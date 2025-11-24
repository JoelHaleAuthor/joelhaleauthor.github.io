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

