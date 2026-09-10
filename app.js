(function(){
  "use strict";

  /* ---------------- data ---------------- */
  var RAW = {
    "Africa": [
      ["Algeria","Algiers","DZ"],["Angola","Luanda","AO"],["Benin","Porto-Novo","BJ"],
      ["Botswana","Gaborone","BW"],["Burkina Faso","Ouagadougou","BF"],["Burundi","Gitega","BI"],
      ["Cabo Verde","Praia","CV"],["Cameroon","Yaoundé","CM"],["Central African Republic","Bangui","CF"],
      ["Chad","N'Djamena","TD"],["Comoros","Moroni","KM"],["Democratic Republic of the Congo","Kinshasa","CD"],
      ["Republic of the Congo","Brazzaville","CG"],["Côte d'Ivoire","Yamoussoukro","CI"],["Djibouti","Djibouti","DJ"],
      ["Egypt","Cairo","EG"],["Equatorial Guinea","Malabo","GQ"],["Eritrea","Asmara","ER"],
      ["Eswatini","Mbabane","SZ"],["Ethiopia","Addis Ababa","ET"],["Gabon","Libreville","GA"],
      ["Gambia","Banjul","GM"],["Ghana","Accra","GH"],["Guinea","Conakry","GN"],
      ["Guinea-Bissau","Bissau","GW"],["Kenya","Nairobi","KE"],["Lesotho","Maseru","LS"],
      ["Liberia","Monrovia","LR"],["Libya","Tripoli","LY"],["Madagascar","Antananarivo","MG"],
      ["Malawi","Lilongwe","MW"],["Mali","Bamako","ML"],["Mauritania","Nouakchott","MR"],
      ["Mauritius","Port Louis","MU"],["Morocco","Rabat","MA"],["Mozambique","Maputo","MZ"],
      ["Namibia","Windhoek","NA"],["Niger","Niamey","NE"],["Nigeria","Abuja","NG"],
      ["Rwanda","Kigali","RW"],["São Tomé and Príncipe","São Tomé","ST"],["Senegal","Dakar","SN"],
      ["Seychelles","Victoria","SC"],["Sierra Leone","Freetown","SL"],["Somalia","Mogadishu","SO"],
      ["South Africa","Pretoria","ZA"],["South Sudan","Juba","SS"],["Sudan","Khartoum","SD"],
      ["Tanzania","Dodoma","TZ"],["Togo","Lomé","TG"],["Tunisia","Tunis","TN"],
      ["Uganda","Kampala","UG"],["Zambia","Lusaka","ZM"],["Zimbabwe","Harare","ZW"]
    ],
    "Asia": [
      ["Afghanistan","Kabul","AF"],["Armenia","Yerevan","AM"],["Azerbaijan","Baku","AZ"],
      ["Bahrain","Manama","BH"],["Bangladesh","Dhaka","BD"],["Bhutan","Thimphu","BT"],
      ["Brunei","Bandar Seri Begawan","BN"],["Cambodia","Phnom Penh","KH"],["China","Beijing","CN"],
      ["Georgia","Tbilisi","GE"],["India","New Delhi","IN"],["Indonesia","Jakarta","ID"],
      ["Iran","Tehran","IR"],["Iraq","Baghdad","IQ"],["Israel","Jerusalem","IL"],
      ["Japan","Tokyo","JP"],["Jordan","Amman","JO"],["Kazakhstan","Astana","KZ"],
      ["Kuwait","Kuwait City","KW"],["Kyrgyzstan","Bishkek","KG"],["Laos","Vientiane","LA"],
      ["Lebanon","Beirut","LB"],["Malaysia","Kuala Lumpur","MY"],["Maldives","Malé","MV"],
      ["Mongolia","Ulaanbaatar","MN"],["Myanmar","Naypyidaw","MM"],["Nepal","Kathmandu","NP"],
      ["North Korea","Pyongyang","KP"],["Oman","Muscat","OM"],["Pakistan","Islamabad","PK"],
      ["Palestine","Ramallah","PS"],["Philippines","Manila","PH"],["Qatar","Doha","QA"],
      ["Saudi Arabia","Riyadh","SA"],["Singapore","Singapore","SG"],["South Korea","Seoul","KR"],
      ["Sri Lanka","Sri Jayawardenepura Kotte","LK"],["Syria","Damascus","SY"],["Taiwan","Taipei","TW"],
      ["Tajikistan","Dushanbe","TJ"],
      ["Thailand","Bangkok","TH"],["Timor-Leste","Dili","TL"],["Turkey","Ankara","TR"],
      ["Turkmenistan","Ashgabat","TM"],["United Arab Emirates","Abu Dhabi","AE"],["Uzbekistan","Tashkent","UZ"],
      ["Vietnam","Hanoi","VN"],["Yemen","Sanaa","YE"]
    ],
    "Europe": [
      ["Albania","Tirana","AL"],["Andorra","Andorra la Vella","AD"],["Austria","Vienna","AT"],
      ["Belarus","Minsk","BY"],["Belgium","Brussels","BE"],["Bosnia and Herzegovina","Sarajevo","BA"],
      ["Bulgaria","Sofia","BG"],["Croatia","Zagreb","HR"],["Cyprus","Nicosia","CY"],
      ["Czechia","Prague","CZ"],["Denmark","Copenhagen","DK"],["Estonia","Tallinn","EE"],
      ["Finland","Helsinki","FI"],["France","Paris","FR"],["Germany","Berlin","DE"],
      ["Greece","Athens","GR"],["Holy See","Vatican City","VA"],["Hungary","Budapest","HU"],
      ["Iceland","Reykjavík","IS"],["Ireland","Dublin","IE"],["Italy","Rome","IT"],
      ["Kosovo","Pristina","XK"],
      ["Latvia","Riga","LV"],["Liechtenstein","Vaduz","LI"],["Lithuania","Vilnius","LT"],
      ["Luxembourg","Luxembourg","LU"],["Malta","Valletta","MT"],["Moldova","Chișinău","MD"],
      ["Monaco","Monaco","MC"],["Montenegro","Podgorica","ME"],["Netherlands","Amsterdam","NL"],
      ["North Macedonia","Skopje","MK"],["Norway","Oslo","NO"],["Poland","Warsaw","PL"],
      ["Portugal","Lisbon","PT"],["Romania","Bucharest","RO"],["Russia","Moscow","RU"],
      ["San Marino","San Marino","SM"],["Serbia","Belgrade","RS"],["Slovakia","Bratislava","SK"],
      ["Slovenia","Ljubljana","SI"],["Spain","Madrid","ES"],["Sweden","Stockholm","SE"],
      ["Switzerland","Bern","CH"],["Ukraine","Kyiv","UA"],["United Kingdom","London","GB"]
    ],
    "North America": [
      ["Antigua and Barbuda","Saint John's","AG"],["Bahamas","Nassau","BS"],["Barbados","Bridgetown","BB"],
      ["Belize","Belmopan","BZ"],["Canada","Ottawa","CA"],["Costa Rica","San José","CR"],
      ["Cuba","Havana","CU"],["Dominica","Roseau","DM"],["Dominican Republic","Santo Domingo","DO"],
      ["El Salvador","San Salvador","SV"],["Grenada","Saint George's","GD"],["Guatemala","Guatemala City","GT"],
      ["Haiti","Port-au-Prince","HT"],["Honduras","Tegucigalpa","HN"],["Jamaica","Kingston","JM"],
      ["Mexico","Mexico City","MX"],["Nicaragua","Managua","NI"],["Panama","Panama City","PA"],
      ["Saint Kitts and Nevis","Basseterre","KN"],["Saint Lucia","Castries","LC"],
      ["Saint Vincent and the Grenadines","Kingstown","VC"],["Trinidad and Tobago","Port of Spain","TT"],
      ["United States","Washington, D.C.","US"]
    ],
    "South America": [
      ["Argentina","Buenos Aires","AR"],["Bolivia","Sucre","BO"],["Brazil","Brasília","BR"],
      ["Chile","Santiago","CL"],["Colombia","Bogotá","CO"],["Ecuador","Quito","EC"],
      ["Guyana","Georgetown","GY"],["Paraguay","Asunción","PY"],["Peru","Lima","PE"],
      ["Suriname","Paramaribo","SR"],["Uruguay","Montevideo","UY"],["Venezuela","Caracas","VE"]
    ],
    "Oceania": [
      ["Australia","Canberra","AU"],["Fiji","Suva","FJ"],["Kiribati","South Tarawa","KI"],
      ["Marshall Islands","Majuro","MH"],["Micronesia","Palikir","FM"],["Nauru","Yaren","NR"],
      ["New Zealand","Wellington","NZ"],["Palau","Ngerulmud","PW"],["Papua New Guinea","Port Moresby","PG"],
      ["Samoa","Apia","WS"],["Solomon Islands","Honiara","SB"],["Tonga","Nukuʻalofa","TO"],
      ["Tuvalu","Funafuti","TV"],["Vanuatu","Port Vila","VU"]
    ]
  };

  var REGIONS = Object.keys(RAW);

  function codeToFlag(code){
    return code.toUpperCase().replace(/./g, function(c){
      return String.fromCodePoint(127397 + c.charCodeAt(0));
    });
  }

  var COUNTRY_COORDS = {
  "DZ":[3,28],
  "AO":[18,-12],
  "BJ":[2,9],
  "BW":[24,-22],
  "BF":[-2,12],
  "BI":[30,-3],
  "CV":[-24,16],
  "CM":[12,6],
  "CF":[21,6],
  "TD":[19,15],
  "KM":[43,-12],
  "CD":[23,-3],
  "CG":[15,-1],
  "CI":[-5,8],
  "DJ":[43,12],
  "EG":[30,27],
  "GQ":[10,2],
  "ER":[39,15],
  "SZ":[31,-26],
  "ET":[39,9],
  "GA":[11,-1],
  "GM":[-15,13],
  "GH":[-1,8],
  "GN":[-10,10],
  "GW":[-15,12],
  "KE":[38,1],
  "LS":[28,-29],
  "LR":[-9,6],
  "LY":[18,27],
  "MG":[47,-19],
  "MW":[34,-13],
  "ML":[-4,17],
  "MR":[-10,20],
  "MU":[57,-20],
  "MA":[-6,32],
  "MZ":[35,-18],
  "NA":[18,-22],
  "NE":[8,16],
  "NG":[8,9],
  "RW":[30,-2],
  "ST":[7,0],
  "SN":[-14,14],
  "SC":[55,-5],
  "SL":[-12,8],
  "SO":[46,5],
  "ZA":[24,-29],
  "SS":[30,7],
  "SD":[30,15],
  "TZ":[35,-6],
  "TG":[1,8],
  "TN":[9,34],
  "UG":[32,1],
  "ZM":[28,-14],
  "ZW":[30,-19],
  "AF":[66,34],
  "AM":[45,40],
  "AZ":[48,40],
  "BH":[50,26],
  "BD":[90,24],
  "BT":[90,27],
  "BN":[114,4.5],
  "KH":[105,13],
  "CN":[104,35],
  "GE":[43,42],
  "IN":[79,22],
  "ID":[118,-2],
  "IR":[53,32],
  "IQ":[44,33],
  "IL":[35,31],
  "JP":[138,37],
  "JO":[37,31],
  "KZ":[67,48],
  "KW":[48,29],
  "KG":[75,41],
  "LA":[103,18],
  "LB":[36,34],
  "MY":[109,3],
  "MV":[73,3.5],
  "MN":[104,46],
  "MM":[96,21],
  "NP":[84,28],
  "KP":[127,40],
  "OM":[56,21],
  "PK":[69,30],
  "PS":[35,31.9],
  "PH":[122,12],
  "QA":[51,25],
  "SA":[45,24],
  "SG":[104,1.3],
  "KR":[128,36],
  "LK":[81,8],
  "SY":[38,35],
  "TW":[121,24],
  "TJ":[71,39],
  "TH":[101,15],
  "TL":[125.5,-8.8],
  "TR":[35,39],
  "TM":[60,40],
  "AE":[54,24],
  "UZ":[64,42],
  "VN":[106,16],
  "YE":[48,15],
  "AL":[20,41],
  "AD":[1.5,42.5],
  "AT":[14,47.5],
  "BY":[28,53.5],
  "BE":[4.5,50.5],
  "BA":[18,44],
  "BG":[25,43],
  "HR":[16,45],
  "CY":[33,35],
  "CZ":[15.5,49.8],
  "DK":[10,56],
  "EE":[26,59],
  "FI":[26,64],
  "FR":[2,47],
  "DE":[10,51],
  "GR":[22,39],
  "VA":[12.45,41.9],
  "HU":[19,47],
  "IS":[-19,65],
  "IE":[-8,53],
  "IT":[12.5,42.5],
  "XK":[21,42.6],
  "LV":[25,57],
  "LI":[9.5,47.15],
  "LT":[24,55.3],
  "LU":[6.1,49.7],
  "MT":[14.4,35.9],
  "MD":[28.5,47],
  "MC":[7.4,43.7],
  "ME":[19.3,42.7],
  "NL":[5.5,52.3],
  "MK":[21.7,41.6],
  "NO":[10,62],
  "PL":[19,52],
  "PT":[-8,39.5],
  "RO":[25,46],
  "RU":[94,61],
  "SM":[12.45,43.94],
  "RS":[21,44],
  "SK":[19.5,48.7],
  "SI":[14.8,46.1],
  "ES":[-4,40],
  "SE":[16,62],
  "CH":[8,47],
  "UA":[32,49],
  "GB":[-2,54],
  "AG":[-61.8,17.1],
  "BS":[-77,24],
  "BB":[-59.5,13.2],
  "BZ":[-88.5,17.2],
  "CA":[-106,56],
  "CR":[-84,10],
  "CU":[-79,21.5],
  "DM":[-61.4,15.4],
  "DO":[-70.5,19],
  "SV":[-88.9,13.8],
  "GD":[-61.7,12.1],
  "GT":[-90.2,15.5],
  "HT":[-72.3,19],
  "HN":[-86.5,15],
  "JM":[-77.3,18.1],
  "MX":[-102,23],
  "NI":[-85.2,12.8],
  "PA":[-80.1,8.5],
  "KN":[-62.8,17.3],
  "LC":[-60.98,13.9],
  "VC":[-61.2,13.2],
  "TT":[-61.3,10.7],
  "US":[-98,39],
  "AR":[-64,-34],
  "BO":[-64.7,-17],
  "BR":[-53,-10],
  "CL":[-71,-30],
  "CO":[-73,4],
  "EC":[-78.5,-1.5],
  "GY":[-58.9,5],
  "PY":[-58.4,-23.4],
  "PE":[-76,-10],
  "SR":[-56,4],
  "UY":[-56,-33],
  "VE":[-66,8],
  "AU":[134,-25],
  "FJ":[178,-18],
  "KI":[173,1.4],
  "MH":[168,7],
  "FM":[150,6.9],
  "NR":[166.9,-0.5],
  "NZ":[172,-41],
  "PW":[134.6,7.5],
  "PG":[144,-6],
  "WS":[-172,-13.8],
  "SB":[160,-9],
  "TO":[-175.2,-21.2],
  "TV":[179.2,-8],
  "VU":[167,-16]
  };

  var COUNTRIES = [];
  REGIONS.forEach(function(region){
    RAW[region].forEach(function(row){
      var coord = COUNTRY_COORDS[row[2]] || [0,0];
      COUNTRIES.push({ name: row[0], capital: row[1], code: row[2], region: region, flag: codeToFlag(row[2]), lon: coord[0], lat: coord[1] });
    });
  });
  COUNTRIES.forEach(function(c, i){ c.id = c.code + "-" + i; });

  function byName(a,b){ return a.name.localeCompare(b.name); }

  /* ---------------- storage ---------------- */
  var STORE_KEY_MASTERED = "atlas-index:mastered";
  var STORE_KEY_BEST = "atlas-index:best";

  function loadSet(key){
    try{
      var raw = localStorage.getItem(key);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    }catch(e){ return new Set(); }
  }
  function saveSet(key, set){
    try{ localStorage.setItem(key, JSON.stringify(Array.from(set))); }catch(e){}
  }
  function loadObj(key){
    try{
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : {};
    }catch(e){ return {}; }
  }
  function saveObj(key, obj){
    try{ localStorage.setItem(key, JSON.stringify(obj)); }catch(e){}
  }

  var mastered = loadSet(STORE_KEY_MASTERED);
  var bestScores = loadObj(STORE_KEY_BEST);

  function refreshMasteredStat(){
    document.querySelector("#masteredStat b").textContent = mastered.size;
  }

  /* ---------------- tabs ---------------- */
  var tabs = document.querySelectorAll(".tab");
  var panels = {
    directory: document.getElementById("panel-directory"),
    quiz: document.getElementById("panel-quiz")
  };
  tabs.forEach(function(tab){
    tab.addEventListener("click", function(){
      tabs.forEach(function(t){ t.setAttribute("aria-selected", t === tab ? "true" : "false"); });
      Object.keys(panels).forEach(function(k){ panels[k].classList.toggle("active", k === tab.dataset.mode); });
    });
  });

  function makeChipset(container, labels, activeLabel, onChange){
    container.innerHTML = "";
    labels.forEach(function(label){
      var btn = document.createElement("button");
      btn.className = "chip";
      btn.type = "button";
      btn.textContent = label;
      btn.setAttribute("aria-pressed", label === activeLabel ? "true" : "false");
      btn.addEventListener("click", function(){
        container.querySelectorAll(".chip").forEach(function(c){ c.setAttribute("aria-pressed","false"); });
        btn.setAttribute("aria-pressed","true");
        onChange(label);
      });
      container.appendChild(btn);
    });
  }

  function shuffle(arr){
    for(var i=arr.length-1;i>0;i--){
      var j = Math.floor(Math.random()*(i+1));
      var t = arr[i]; arr[i]=arr[j]; arr[j]=t;
    }
    return arr;
  }

  /* ================= DIRECTORY ================= */
  var dirRegion = "All";
  var dirQuery = "";
  var dirLetter = "All";

  var LETTER_COUNTS = {};
  COUNTRIES.forEach(function(c){
    var l = c.name.charAt(0).toUpperCase();
    LETTER_COUNTS[l] = (LETTER_COUNTS[l] || 0) + 1;
  });
  var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  function renderLetterIndex(){
    var wrap = document.getElementById("dirLetterIndex");
    wrap.innerHTML = "";
    var allBtn = document.createElement("button");
    allBtn.className = "letter-btn"; allBtn.type = "button";
    allBtn.setAttribute("aria-pressed", dirLetter === "All" ? "true" : "false");
    allBtn.innerHTML = "All<span class=\"n\">" + COUNTRIES.length + "</span>";
    allBtn.addEventListener("click", function(){ dirLetter = "All"; renderDirectory(); });
    wrap.appendChild(allBtn);
    ALPHABET.forEach(function(letter){
      var count = LETTER_COUNTS[letter] || 0;
      var btn = document.createElement("button");
      btn.className = "letter-btn"; btn.type = "button";
      btn.disabled = count === 0;
      btn.setAttribute("aria-pressed", dirLetter === letter ? "true" : "false");
      btn.innerHTML = letter + "<span class=\"n\">" + count + "</span>";
      btn.addEventListener("click", function(){ dirLetter = letter; renderDirectory(); });
      wrap.appendChild(btn);
    });
  }

  function renderDirectory(){
    document.querySelectorAll("#dirLetterIndex .letter-btn").forEach(function(b, i){
      var label = i === 0 ? "All" : ALPHABET[i-1];
      b.setAttribute("aria-pressed", dirLetter === label ? "true" : "false");
    });
    var list = COUNTRIES.filter(function(c){
      var regionOk = dirRegion === "All" || c.region === dirRegion;
      var letterOk = dirLetter === "All" || c.name.charAt(0).toUpperCase() === dirLetter;
      var q = dirQuery.trim().toLowerCase();
      var queryOk = !q || c.name.toLowerCase().indexOf(q) !== -1 || c.capital.toLowerCase().indexOf(q) !== -1 || c.code.toLowerCase().indexOf(q) !== -1;
      return regionOk && letterOk && queryOk;
    }).sort(byName);

    document.getElementById("dirCount").textContent = list.length + " of " + COUNTRIES.length + " entries";
    var grid = document.getElementById("dirGrid");
    grid.innerHTML = "";
    var frag = document.createDocumentFragment();
    list.forEach(function(c){
      var el = document.createElement("div");
      el.className = "entry";
      el.innerHTML =
        '<span class="flag">' + c.flag + '</span>' +
        '<span class="entry-text"><span class="name">' + c.name + '</span><span class="cap">' + c.capital + '</span></span>' +
        '<span class="entry-side"><span class="stamp">' + c.code + '</span>' +
        '<button class="star-btn" type="button" aria-pressed="' + (mastered.has(c.id) ? "true":"false") + '" aria-label="Mark ' + c.name + ' as known" data-id="' + c.id + '">' + (mastered.has(c.id) ? "★" : "☆") + '</button></span>';
      frag.appendChild(el);
    });
    grid.appendChild(frag);
  }

  document.getElementById("dirSearch").addEventListener("input", function(e){
    dirQuery = e.target.value; renderDirectory();
  });
  makeChipset(document.getElementById("dirRegionChips"), ["All"].concat(REGIONS), "All", function(label){
    dirRegion = label; renderDirectory();
  });
  document.getElementById("dirGrid").addEventListener("click", function(e){
    var btn = e.target.closest(".star-btn");
    if(!btn) return;
    var id = btn.dataset.id;
    if(mastered.has(id)){ mastered.delete(id); } else { mastered.add(id); }
    saveSet(STORE_KEY_MASTERED, mastered);
    refreshMasteredStat();
    renderDirectory();
  });

  /* ================= QUIZ (recall checkpoint) ================= */
  var COUNTRY_ALIASES = {
    "United States": ["USA","US","United States of America","America"],
    "United Kingdom": ["UK","Britain","Great Britain"],
    "Democratic Republic of the Congo": ["DR Congo","DRC","Congo-Kinshasa","Congo Kinshasa"],
    "Republic of the Congo": ["Congo","Congo-Brazzaville","Congo Brazzaville"],
    "Côte d'Ivoire": ["Ivory Coast"],
    "Czechia": ["Czech Republic"],
    "Myanmar": ["Burma"],
    "Eswatini": ["Swaziland"],
    "Cabo Verde": ["Cape Verde"],
    "Timor-Leste": ["East Timor"],
    "Holy See": ["Vatican","Vatican City"],
    "North Macedonia": ["Macedonia"],
    "Bosnia and Herzegovina": ["Bosnia"],
    "Trinidad and Tobago": ["Trinidad"],
    "Antigua and Barbuda": ["Antigua"],
    "Saint Kitts and Nevis": ["St Kitts and Nevis","St Kitts","Saint Kitts"],
    "Saint Lucia": ["St Lucia"],
    "Saint Vincent and the Grenadines": ["St Vincent and the Grenadines","St Vincent","Saint Vincent"],
    "United Arab Emirates": ["UAE"],
    "Central African Republic": ["CAR"],
    "South Korea": ["Korea South","Republic of Korea","Korea"],
    "North Korea": ["Korea North","DPRK"],
    "Micronesia": ["Federated States of Micronesia","FSM"],
    "Laos": ["Lao PDR"],
    "Palestine": ["Palestinian Territories","State of Palestine"],
    "Guinea-Bissau": ["Guinea Bissau"],
    "São Tomé and Príncipe": ["Sao Tome and Principe","Sao Tome"],
    "Taiwan": ["Republic of China","Chinese Taipei"],
    "Vietnam": ["Viet Nam"],
    "Russia": ["Russian Federation"],
    "Syria": ["Syrian Arab Republic"],
    "Iran": ["Islamic Republic of Iran"],
    "Brunei": ["Brunei Darussalam"],
    "Moldova": ["Republic of Moldova"]
  };
  var CAPITAL_ALIASES = {
    "Washington, D.C.": ["Washington DC","Washington"],
    "Sri Jayawardenepura Kotte": ["Colombo","Kotte"]
  };

  function normalizeStr(s){
    return s.normalize("NFD").replace(new RegExp("[\u0300-\u036f]","g"),"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
  }
  function tightStr(s){ return normalizeStr(s).replace(/\s+/g,""); }

  function buildLookup(pool, field, aliasMap){
    var map = {};
    pool.forEach(function(c){
      var key = c[field];
      var variants = [key].concat(aliasMap[key] || []);
      variants.forEach(function(v){
        map[normalizeStr(v)] = c.id;
        map[tightStr(v)] = c.id;
      });
    });
    return map;
  }

  function formatTime(ms){
    if(ms < 0) ms = 0;
    var totalSec = Math.floor(ms/1000);
    var m = Math.floor(totalSec/60);
    var s = totalSec % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  var TIMER_PRESETS = ["3 min","5 min","10 min","Untimed","Custom"];
  var PRESET_MINUTES = { "3 min":3, "5 min":5, "10 min":10 };
  var quizGame = "Countries";
  var quizRegion = "All";
  var quizTimerLabel = "5 min";

  makeChipset(document.getElementById("quizGameChips"), ["Countries","Capitals"], quizGame, function(v){
    quizGame = v;
    document.getElementById("quizInput").placeholder = quizGame === "Countries" ? "Type a country name…" : "Type a capital…";
    refreshBestLine();
  });
  makeChipset(document.getElementById("quizRegionChips"), ["All"].concat(REGIONS), quizRegion, function(v){ quizRegion = v; refreshBestLine(); });
  makeChipset(document.getElementById("quizTimerChips"), TIMER_PRESETS, quizTimerLabel, function(v){
    quizTimerLabel = v;
    document.getElementById("customTimerRow").hidden = (v !== "Custom");
    refreshBestLine();
  });
  ["customMinutes","customSeconds"].forEach(function(id){
    document.getElementById(id).addEventListener("input", function(){
      if(quizTimerLabel === "Custom") refreshBestLine();
    });
  });

  function getDurationSeconds(){
    if(quizTimerLabel === "Untimed") return null;
    if(quizTimerLabel === "Custom"){
      var m = Math.max(0, Math.min(180, parseInt(document.getElementById("customMinutes").value,10) || 0));
      var s = Math.max(0, Math.min(59, parseInt(document.getElementById("customSeconds").value,10) || 0));
      var total = m*60+s;
      return total < 5 ? 5 : total;
    }
    return PRESET_MINUTES[quizTimerLabel] * 60;
  }

  function timerKeyPart(){
    return quizTimerLabel === "Custom" ? ("Custom-" + getDurationSeconds() + "s") : quizTimerLabel;
  }

  function bestKey(){ return quizGame + "|" + quizRegion + "|" + timerKeyPart(); }
  function bestLineText(){
    var b = bestScores[bestKey()];
    return b ? ("Best on this checkpoint — " + b.found + " / " + b.total + " found in " + formatTime(b.timeMs)) : "No attempts logged yet for this checkpoint.";
  }
  function refreshBestLine(){ document.getElementById("quizBestLine").textContent = bestLineText(); }
  refreshBestLine();

  function poolForRegion(region){
    return region === "All" ? COUNTRIES.slice() : COUNTRIES.filter(function(c){ return c.region === region; });
  }

  var quizPool = [];
  var quizLookup = {};
  var quizFound = new Set();
  var quizTimerId = null;
  var quizStartTime = 0;
  var quizDurationMs = 0;
  var quizMode = "countdown";
  var quizFinished = false;

  function startQuiz(){
    quizPool = poolForRegion(quizRegion);
    if(quizPool.length < 2){ quizPool = COUNTRIES.slice(); }
    var field = quizGame === "Countries" ? "name" : "capital";
    var aliasMap = quizGame === "Countries" ? COUNTRY_ALIASES : CAPITAL_ALIASES;
    quizLookup = buildLookup(quizPool, field, aliasMap);
    quizFound = new Set();
    quizFinished = false;

    var durSec = getDurationSeconds();
    quizDurationMs = durSec ? durSec * 1000 : null;
    quizMode = durSec ? "countdown" : "stopwatch";
    quizStartTime = Date.now();

    document.getElementById("quizSetup").hidden = true;
    document.getElementById("quizResults").hidden = true;
    document.getElementById("quizRun").hidden = false;
    document.getElementById("quizTotal").textContent = quizPool.length;
    document.getElementById("quizFound").textContent = "0";
    document.getElementById("quizFeedback").textContent = " ";
    document.getElementById("quizFeedback").className = "quiz-feedback";
    document.getElementById("quizFoundTray").innerHTML = "";
    renderLiveMap(quizPool);

    var input = document.getElementById("quizInput");
    input.placeholder = quizGame === "Countries" ? "Type a country name…" : "Type a capital…";
    input.disabled = false;
    input.value = "";
    input.focus();

    clearInterval(quizTimerId);
    tickTimer();
    quizTimerId = setInterval(tickTimer, 250);
  }

  function tickTimer(){
    var elapsed = Date.now() - quizStartTime;
    var timerEl = document.getElementById("quizTimer");
    if(quizMode === "countdown"){
      var remaining = quizDurationMs - elapsed;
      if(remaining <= 0){
        timerEl.textContent = "0:00";
        finishQuiz();
        return;
      }
      timerEl.textContent = formatTime(remaining);
      timerEl.classList.toggle("low", remaining < 30000);
    } else {
      timerEl.textContent = formatTime(elapsed);
    }
  }

  document.getElementById("quizStart").addEventListener("click", startQuiz);

  document.getElementById("quizInput").addEventListener("input", function(e){
    if(quizFinished) return;
    var raw = e.target.value;
    var norm = normalizeStr(raw);
    if(!norm) return;
    var id = quizLookup[norm] || quizLookup[tightStr(raw)];
    if(id && !quizFound.has(id)){
      quizFound.add(id);
      e.target.value = "";
      var c = quizPool.filter(function(x){ return x.id === id; })[0];
      registerFind(c);
    }
  });

  function registerFind(c){
    document.getElementById("quizFound").textContent = quizFound.size;
    markLiveMapFound(c.id);
    var fb = document.getElementById("quizFeedback");
    fb.textContent = "Approved — " + c.name + (quizGame === "Capitals" ? " · " + c.capital : "");
    var tray = document.getElementById("quizFoundTray");
    var chip = document.createElement("span");
    chip.className = "found-chip";
    var label = quizGame === "Countries" ? c.name : c.capital;
    chip.innerHTML = '<span class="flag">' + c.flag + '</span><span>' + label + '</span>';
    tray.insertBefore(chip, tray.firstChild);
    if(quizFound.size >= quizPool.length){ finishQuiz(); }
  }

  document.getElementById("quizFinish").addEventListener("click", finishQuiz);

  function finishQuiz(){
    if(quizFinished) return;
    quizFinished = true;
    clearInterval(quizTimerId);
    document.getElementById("quizInput").disabled = true;

    var elapsed = Date.now() - quizStartTime;
    var timeTaken = quizMode === "countdown" ? Math.min(elapsed, quizDurationMs) : elapsed;
    var total = quizPool.length;
    var found = quizFound.size;
    var pct = Math.round((found/total)*100);

    document.getElementById("quizRun").hidden = true;
    document.getElementById("quizResults").hidden = false;
    document.getElementById("resultsLabel").textContent = quizGame + " checkpoint · " + quizRegion;
    document.getElementById("resultsScore").textContent = found + " / " + total;
    document.getElementById("resultsPct").textContent = pct + "% · " + formatTime(timeTaken);

    var key = bestKey();
    var prev = bestScores[key];
    var better = !prev || found > prev.found || (found === prev.found && timeTaken < prev.timeMs);
    if(better){
      bestScores[key] = { found: found, total: total, timeMs: timeTaken };
      saveObj(STORE_KEY_BEST, bestScores);
    }
    refreshBestLine();
    document.getElementById("resultsBestLine").textContent = bestLineText();

    var missedCount = quizPool.length - found;
    document.getElementById("missedLabel").textContent = "Recall map — " + missedCount + " missed of " + total;
    document.getElementById("mapHoverLine").textContent = "Hover or tap a point on the map";
    document.getElementById("mapHoverLine").className = "map-hover mono";
    renderRecallMap(quizPool, quizFound);
  }

  var REGION_LABEL_POS = {
    "Africa": [20,5],
    "Asia": [90,35],
    "Europe": [15,50],
    "North America": [-95,42],
    "South America": [-60,-18],
    "Oceania": [140,-22]
  };
  var SVGNS = "http://www.w3.org/2000/svg";

  function svgEl(tag, attrs){
    var e = document.createElementNS(SVGNS, tag);
    for(var k in attrs){ e.setAttribute(k, attrs[k]); }
    return e;
  }

  function setMapHover(text, statusClass){
    var line = document.getElementById("mapHoverLine");
    line.textContent = text;
    line.className = "map-hover mono" + (statusClass ? " " + statusClass : "");
  }

  function drawMapBase(svg, pool){
    while(svg.firstChild) svg.removeChild(svg.firstChild);

    for(var gx = 0; gx <= 360; gx += 30){
      svg.appendChild(svgEl("line", { x1:gx, y1:0, x2:gx, y2:180, "class":"grid-line" }));
    }
    for(var gy = 0; gy <= 180; gy += 30){
      svg.appendChild(svgEl("line", { x1:0, y1:gy, x2:360, y2:gy, "class":"grid-line" }));
    }

    var regionsPresent = {};
    pool.forEach(function(c){ regionsPresent[c.region] = true; });
    Object.keys(REGION_LABEL_POS).forEach(function(region){
      if(!regionsPresent[region]) return;
      var pos = REGION_LABEL_POS[region];
      var t = svgEl("text", { x: pos[0] + 180, y: 90 - pos[1], "class":"region-label", "text-anchor":"middle" });
      t.textContent = region.toUpperCase();
      svg.appendChild(t);
    });
  }

  // Non-interactive live map: every country starts dimmed ("pending") and
  // is flipped to green the instant it's typed correctly. Dot elements are
  // kept in liveMapDotEls for O(1) updates instead of a full re-render.
  var liveMapDotEls = {};

  function renderLiveMap(pool){
    var svg = document.getElementById("liveMap");
    drawMapBase(svg, pool);
    liveMapDotEls = {};
    pool.forEach(function(c){
      var dot = svgEl("circle", {
        cx: c.lon + 180,
        cy: 90 - c.lat,
        r: 2.6,
        "class": "map-dot pending"
      });
      svg.appendChild(dot);
      liveMapDotEls[c.id] = dot;
    });
  }

  function markLiveMapFound(id){
    var dot = liveMapDotEls[id];
    if(dot){ dot.setAttribute("class", "map-dot found"); }
  }

  function renderRecallMap(pool, foundSet){
    var svg = document.getElementById("recallMap");
    drawMapBase(svg, pool);

    pool.forEach(function(c){
      var found = foundSet.has(c.id);
      var cx = c.lon + 180;
      var cy = 90 - c.lat;
      var g = svgEl("g", {});

      // Oversized invisible circle so the tap/hover target stays usable
      // even when the map is scaled down small on a phone screen.
      var hit = svgEl("circle", {
        cx: cx, cy: cy, r: 6,
        "class": "map-hit",
        tabindex: "0",
        role: "button",
        "aria-label": c.name + " — " + c.capital + (found ? ", found" : ", missed")
      });
      var title = svgEl("title", {});
      title.textContent = c.name + " — " + c.capital;
      hit.appendChild(title);

      var dot = svgEl("circle", {
        cx: cx, cy: cy, r: 2.6,
        "class": "map-dot " + (found ? "found" : "missed")
      });

      var hoverText = c.flag + " " + c.name + " — " + c.capital + (found ? " (found)" : " (missed)");
      var statusClass = found ? "found" : "missed";
      hit.addEventListener("mouseenter", function(){ setMapHover(hoverText, statusClass); });
      hit.addEventListener("focus", function(){ setMapHover(hoverText, statusClass); });
      hit.addEventListener("mouseleave", function(){ setMapHover("Hover or tap a point on the map", ""); });
      hit.addEventListener("blur", function(){ setMapHover("Hover or tap a point on the map", ""); });

      g.appendChild(hit);
      g.appendChild(dot);
      svg.appendChild(g);
    });
  }

  document.getElementById("resultsNewQuiz").addEventListener("click", function(){
    document.getElementById("quizResults").hidden = true;
    document.getElementById("quizSetup").hidden = false;
  });

  document.getElementById("resultsRetry").addEventListener("click", startQuiz);

  /* ================= reset ================= */
  document.getElementById("resetProgress").addEventListener("click", function(){
    if(!confirm("Clear all saved progress and best scores in this browser?")) return;
    mastered = new Set(); bestScores = {};
    saveSet(STORE_KEY_MASTERED, mastered); saveObj(STORE_KEY_BEST, bestScores);
    refreshMasteredStat(); refreshBestLine(); renderDirectory();
  });

  /* ================= boot ================= */
  function start(){
    refreshMasteredStat();
    renderLetterIndex();
    renderDirectory();
  }

  if(window.claude && window.claude.hot){
    window.claude.hot.ready ? window.claude.hot.ready(start) : start(window.claude.hot.data || {});
  } else {
    start();
  }
})();
