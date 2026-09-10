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

  var COUNTRIES = [];
  REGIONS.forEach(function(region){
    RAW[region].forEach(function(row){
      COUNTRIES.push({ name: row[0], capital: row[1], code: row[2], region: region, flag: codeToFlag(row[2]) });
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

    var manifest = document.getElementById("resultsManifest");
    manifest.innerHTML = "";
    var missed = quizPool.filter(function(c){ return !quizFound.has(c.id); }).sort(byName);
    document.getElementById("missedLabel").textContent = "Missed entries (" + missed.length + " of " + total + ")";
    if(!missed.length){
      manifest.innerHTML = '<p class="manifest-empty">Clean manifest — nothing missed.</p>';
    } else {
      missed.forEach(function(c){
        var row = document.createElement("div");
        row.className = "manifest-row";
        row.innerHTML = '<span class="q">' + c.flag + '&nbsp; ' + c.name + '</span><span class="a">' + c.capital + ' · ' + c.region + '</span>';
        manifest.appendChild(row);
      });
    }
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
