// ==UserScript==
// @name         V~Wave Skins
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Set Pokefarm user skin based on the day's V~Wave (takes effect on reload)
// @author       Firefly (ALeafOnTheWind)
// @match        https://pokefarm.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pokefarm.com
// @grant        GM.getValue
// @grant        GM.setValue
// ==/UserScript==

// Substitute your preferred skins here!
// Believe me, mine are not very good.
const skins = {
    "Normal": "JSBw/normal",
    "Fire": "JSBw/fire",
    "Water": "JSBw/water",
    "Electric": "JSBw/electric",
    "Grass": "JSBw/grass",
    "Ice": "JSBw/iceice",
    "Fighting": "JSBw/fighting",
    "Poison": "JSBw/poison",
    "Ground": "JSBw/ground",
    "Flying": "JSBw/flying",
    "Psychic": "JSBw/psychic",
    "Bug": "JSBw/bug",
    "Rock": "JSBw/rock",
    "Ghost": "JSBw/ghost",
    "Dragon": "JSBw/dragon",
    "Dark": "JSBw/dark",
    "Steel": "JSBw/steel",
    "Fairy": "JSBw/fairy",
};


function getWave() {
    return document.getElementById('dailybonus').getElementsByTagName('li')[1].innerHTML.slice(29)
}


async function getStoredWave() {
    var w = await GM.getValue("storedWave", null);
    return w;
}


function setSkin(wave) {
    var s = skins[wave];
    if (s) {
        console.log(`Setting new wave skin: ${wave}`);
        ajax('skin/set', {
            skin: s
        });
    }
}

function buildSettings() {
    console.log("Building Settings");
}


// TODO Implement settings button
function addButton() {
    var bar = document.getElementById('announcements').getElementsByTagName('ul')[0];
    var barItems = Array.from(bar.getElementsByTagName('li'));
    var spacer = barItems.find(e => e.className == 'spacer');
    var spacerIdx = barItems.indexOf(spacer);

    var item = document.createElement('li');
    item.setAttribute("data-name", "VWS");
}


$(document).on('click', 'li[data-name="VWS"]', function () {
    buildSettings();
});


$(document).ready(function() {
    // addButton();
    getStoredWave().then((storedWave) => {
        var todayWave = getWave();
        if (storedWave != todayWave) {
            GM.setValue("storedWave", todayWave);
            setSkin(todayWave);
        }
    });
});
