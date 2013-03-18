//web app part 3
//Matt Nowakowski
//Visual frameworks
//1303




window.addEventListener("DOMContentLoaded", function doItAll(){
    
    function $(e){
        var elementID = document.getElementById(e);
        return elementID;
    }

    function makeSelect(){
        var formTag = document.getElementsByTagName("form"),
            selectLi = $("select"),
            makeSelect = document.createElement("select");
            makeSelect.setAttribute("id", "weapons");
        for(var i = 0, j = weaponType.length; i < j; i++){
            var makeOption = document.createElement("option");
            var optText = weaponType[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    }

    function getRadio(){
        var radios = document.forms[0].sclass;
        for(var i = 0; i < radios.length; i++){
            if (radios[i].checked){
                sclassValue = radios[i].value;
            }
        }
    }

    function getCheckbox(){
        if($('fav').checked){
            favoriteValue = $('fav').value;
        } else {
            favoriteValue = "No"
        }
    }
  
    function toggleControls(n){
        switch(n){
            case "on":
                $("weaponForm").style.display = "none";
                $('clearData').style.display = "inline";
                $("displayData").style.display = "none";
                $("addNew").style.display = "inline";
                break;
            case "off":
                $("weaponForm").style.display = "block";
                $('clearData').style.display = "inline";
                $("displayData").style.display = "inline";
                $("addNew").style.display = "none";
                $("items").style.display = "none";
                break;
            default:
                return false;
        }
    }

    function validate(e){
        var getLoadoutName = $("lon");
        var getWeaponCategory = $("weapons");
        var getDate = $("date");

        errMsg.innerHTML = "";
        getLoadoutName.style.border = "1px solid black";
        getWeaponCategory.style.border = "1px solid black";
        getDate.style.border = "1px solid black";

        var messageArray = [];

        if(getLoadoutName.value === ""){
            var loadoutNameError = "Please enter a name for the Load out.";
            getLoadoutName.style.border = "1px solid red";
            messageArray.push(loadoutNameError);
        }

        if(getWeaponCategory.value === "--Weapon Category--"){
            var weaponCategoryError = "Please choose a weapon type.";
            getWeaponCategory.style.border = "1px solid red";
            messageArray.push(weaponCategoryError);
        }


        if(getDate.value === ""){
            var dateError = "Please enter a date.";
            getDate.style.border = "1px solid red";
            messageArray.push(dateError);
        }

        if(messageArray.length >= 1){
            for(var i = 0, j = messageArray.length; i < j; i++){
                var text = document.createElement("li");
                text.innerHTML = messageArray[i];
                errMsg.appendChild(text);
            }
            e.preventDefault();
            return false;
        } else {
            storeData(this.key);
        }
    }

    function storeData(key){
        if(!key){
            var id = Math.floor(Math.random()*100000001);
        } else {
            id = key;
        }
        getRadio();
        getCheckbox();
        var item = {};
            item.loadoutName = ["Load out Name:", $("lon").value];
            item.weaponCategory = ["Weapon Category:", $("weapons").value];
            item.sclass = ["Class:", sclassValue];
            item.favorite = ["Often used:", favoriteValue];
            item.rate = ["Rating:", $("rate").value];
            item.comments = ["Comments:", $("comments").value];
            item.date = ["Date Created:", $("date").value];
        localStorage.setItem(id, JSON.stringify(item));
        alert("Load out Saved!");
    }

function getData(){
        toggleControls("on");
        if(localStorage.length === 0){
            alert("There are no current Load outs.");
        }
        var makeDiv = document.createElement("div");
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement("ul");
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        $("items").style.display = "block";
        for(var i = 0, len=localStorage.length; i < len; i++){
            var makeli = document.createElement("li");
            var linksLi = document.createElement("li");
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
            var makeSubList = document.createElement("ul");
            makeli.appendChild(makeSubList);
            for(var n in obj){
                var makeSubli = document.createElement("li");
                makeSubList.appendChild(makeSubli);
                var optSubText = obj[n][0] + " " + obj[n][1];
                makeSubli.innerHTML = optSubText;
                makeSubList.appendChild(linksLi);
            }
            makeItemLinks(localStorage.key(i), linksLi)
        }
    }

    function makeItemLinks(key, linksLi){
        var editLink = document.createElement("a");
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Load out";
        editLink.addEventListener("click", editItem);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);

        var breakTag = document.createElement('br');
        linksLi.appendChild(breakTag);

        var deleteLink = document.createElement("a");
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Load out";
        deleteLink.addEventListener("click", deleteItem);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);
    }

    function editItem(){
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);

        toggleControls("off");

        $("lon").value = item.loadoutName[1];
        $("weapons").value = item.weaponCategory[1];
        var radios = document.forms[0].sclass;
        for(var i = 0; i < radios.length; i++){
            if(radios[i].value == "Sniper" && item.sclass[1] == "Sniper"){
                radios[i].setAttribute("checked", "checked");
            } else if(radios[i].value == "Assault" && item.sclass[1] == "Assault"){
                radios[i].setAttribute("checked", "checked");
            } else if(radios[i].value == "Support" && item.sclass[1] == "Support"){
                radios[i].setAttribute("checked", "checked");
            }
        }
        if(item.favorite[1] == "Yes"){
            $('fav').setAttribute("checked", "checked");
        }
        $("rate").value = item.rating[1];
        $("comments").value = item.comments[1];
        $("date").value = item.date[1];

        saveData.removeEventListener("click", storeData);

        $("saveData").value = "Edit Load out";
        var editSubmit = $("saveData");

        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;
    }

    function deleteItem(){
        var ask = confirm("Are you sure you want to delete this load out?");
        if(ask){
            localStorage.removeItem(this.key);
            alert("Load out was Deleted.");
            window.location.reload();
        } else {
            alert("Load out was Not deleted.");
        }
    }

    function eraseData(){
        if(localStorage.length === 0){
            alert("There are no Load outs.");
        } else {
            localStorage.clear();
            alert("Load outs have been deleted.");
            window.location.reload();
            return false;
        }
    }
    
    var weaponType = ["--Weapon Category--", "--Assault rifles--", "Scar H", "AK47", "Aug A3", "M4a1", "--Sniper rifles--", "Dragonov", "Ballista", "Barrett M90", "--LMGs--", "LSAT", "HMAR","RPK"],
       sclassValue,
        favoriteValue = "No",
        errMsg = $("errors");

    makeSelect();

    var saveData = $("saveData");
    saveData.addEventListener("click", validate);
    var displayData = $("displayData");
    displayData.addEventListener("click", getData);
    var clearData = $("clearData");
    clearData.addEventListener("click", eraseData);

});