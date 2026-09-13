(function(){
  "use strict";

  /* ---------------- data ---------------- */
  // RAW, COUNTRY_COORDS, COUNTRY_ALIASES, CAPITAL_ALIASES, REGION_LABEL_POS,
  // ALPHABET, SVGNS, TIMER_PRESETS, PRESET_MINUTES and the STORE_KEY_*
  // constants all come from constants.js, loaded before this file.
  var REGIONS = Object.keys(RAW);

  // Flag glyphs are rendered as real images rather than Unicode regional-
  // indicator emoji: Windows browsers largely don't have flag glyphs in
  // their emoji font and fall back to showing the raw two-letter code.
  function flagImgUrl(code, width){
    return "https://flagcdn.com/w" + width + "/" + code.toLowerCase() + ".png";
  }
  function flagImgHTML(c, width){
    width = width || 80;
    return '<img class="flag-img" src="' + flagImgUrl(c.code, width) + '" srcset="' +
      flagImgUrl(c.code, width) + ' 1x, ' + flagImgUrl(c.code, width * 2) + ' 2x" alt="' + c.name +
      '" loading="lazy" width="' + width + '" height="' + Math.round(width * 0.75) + '">';
  }

  var COUNTRIES = [];
  REGIONS.forEach(function(region){
    RAW[region].forEach(function(row){
      var coord = COUNTRY_COORDS[row[2]] || [0,0];
      COUNTRIES.push({ name: row[0], capital: row[1], code: row[2], region: region, lon: coord[0], lat: coord[1] });
    });
  });
  COUNTRIES.forEach(function(c, i){ c.id = c.code + "-" + i; });

  function byName(a,b){ return a.name.localeCompare(b.name); }

  function shuffle(arr){
    var a = arr.slice();
    for(var i = a.length - 1; i > 0; i--){
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function debounce(fn, wait){
    var t;
    return function(){
      var ctx = this, args = arguments;
      clearTimeout(t);
      t = setTimeout(function(){ fn.apply(ctx, args); }, wait);
    };
  }

  /* ---------------- storage ---------------- */
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

  /* ================= DIRECTORY ================= */
  var dirRegion = "All";
  var dirQuery = "";
  var dirLetter = "All";

  function regionPool(region){
    return region === "All" ? COUNTRIES : COUNTRIES.filter(function(c){ return c.region === region; });
  }

  // Rebuilt whenever the region filter changes, so each letter's count
  // reflects only the countries in the currently selected region.
  function renderLetterIndex(){
    var pool = regionPool(dirRegion);
    var counts = {};
    pool.forEach(function(c){
      var l = c.name.charAt(0).toUpperCase();
      counts[l] = (counts[l] || 0) + 1;
    });

    var wrap = document.getElementById("dirLetterIndex");
    wrap.innerHTML = "";
    var allBtn = document.createElement("button");
    allBtn.className = "letter-btn"; allBtn.type = "button";
    allBtn.setAttribute("aria-pressed", dirLetter === "All" ? "true" : "false");
    allBtn.innerHTML = "All<span class=\"n\">" + pool.length + "</span>";
    allBtn.addEventListener("click", function(){ dirLetter = "All"; renderDirectory(); });
    wrap.appendChild(allBtn);
    ALPHABET.forEach(function(letter){
      var count = counts[letter] || 0;
      var btn = document.createElement("button");
      btn.className = "letter-btn"; btn.type = "button";
      btn.disabled = count === 0;
      btn.setAttribute("aria-pressed", dirLetter === letter ? "true" : "false");
      btn.innerHTML = letter + "<span class=\"n\">" + count + "</span>";
      btn.addEventListener("click", function(){ dirLetter = letter; renderDirectory(); });
      wrap.appendChild(btn);
    });
  }

  var MOBILE_QUERY = "(max-width: 640px)";
  function isMobileLayout(){ return window.matchMedia(MOBILE_QUERY).matches; }

  function entryHTML(c){
    return '<span class="flag">' + flagImgHTML(c) + '</span>' +
      '<span class="entry-text"><span class="name">' + c.name + '</span><span class="cap">' + c.capital + '</span></span>' +
      '<span class="entry-side"><span class="stamp">' + c.code + '</span>' +
      '<button class="star-btn" type="button" aria-pressed="' + (mastered.has(c.id) ? "true":"false") + '" aria-label="Mark ' + c.name + ' as known" data-id="' + c.id + '">' + (mastered.has(c.id) ? "★" : "☆") + '</button></span>';
  }

  function makeEntryEl(c){
    var el = document.createElement("div");
    el.className = "entry";
    el.dataset.id = c.id;
    el.tabIndex = 0;
    el.setAttribute("role", "button");
    el.setAttribute("aria-label", "View details for " + c.name);
    el.innerHTML = entryHTML(c);
    return el;
  }

  function renderFlatGrid(grid, list){
    var frag = document.createDocumentFragment();
    list.forEach(function(c){
      frag.appendChild(makeEntryEl(c));
    });
    grid.appendChild(frag);
  }

  // Mobile-only A→Z accordion, built with native <details> so expand/collapse
  // needs no extra state to track — the DOM element's own open attribute is it.
  function renderAccordion(grid, list){
    var groups = {};
    var order = [];
    list.forEach(function(c){
      var l = c.name.charAt(0).toUpperCase();
      if(!groups[l]){ groups[l] = []; order.push(l); }
      groups[l].push(c);
    });
    order.sort();
    var openAll = dirQuery.trim().length > 0;
    var frag = document.createDocumentFragment();
    order.forEach(function(letter){
      var items = groups[letter];
      var details = document.createElement("details");
      details.className = "letter-group";
      if(openAll) details.open = true;
      var summary = document.createElement("summary");
      summary.className = "letter-group-summary";
      summary.innerHTML = '<span class="letter-group-letter">' + letter + '</span><span class="n">' + items.length + '</span>';
      details.appendChild(summary);
      var listEl = document.createElement("div");
      listEl.className = "letter-group-list";
      items.forEach(function(c){
        listEl.appendChild(makeEntryEl(c));
      });
      details.appendChild(listEl);
      frag.appendChild(details);
    });
    grid.appendChild(frag);
  }

  function renderDirectory(){
    document.querySelectorAll("#dirLetterIndex .letter-btn").forEach(function(b, i){
      var label = i === 0 ? "All" : ALPHABET[i-1];
      b.setAttribute("aria-pressed", dirLetter === label ? "true" : "false");
    });
    var mobile = isMobileLayout();
    var list = COUNTRIES.filter(function(c){
      var regionOk = dirRegion === "All" || c.region === dirRegion;
      // On mobile the letter-index bar is hidden in favor of the accordion,
      // so the single-letter filter doesn't apply there.
      var letterOk = mobile || dirLetter === "All" || c.name.charAt(0).toUpperCase() === dirLetter;
      var q = dirQuery.trim().toLowerCase();
      var queryOk = !q || c.name.toLowerCase().indexOf(q) !== -1 || c.capital.toLowerCase().indexOf(q) !== -1 || c.code.toLowerCase().indexOf(q) !== -1;
      return regionOk && letterOk && queryOk;
    }).sort(byName);

    document.getElementById("dirCount").textContent = list.length + " of " + COUNTRIES.length + " entries";
    var grid = document.getElementById("dirGrid");
    grid.innerHTML = "";

    if(!list.length){
      grid.className = "grid";
      grid.innerHTML = '<p class="dir-empty">No entries match.</p>';
      return;
    }

    if(mobile){
      grid.className = "grid accordion";
      renderAccordion(grid, list);
    } else {
      grid.className = "grid";
      renderFlatGrid(grid, list);
    }
  }

  var dirLayoutIsMobile = isMobileLayout();
  window.addEventListener("resize", debounce(function(){
    var nowMobile = isMobileLayout();
    if(nowMobile !== dirLayoutIsMobile){
      dirLayoutIsMobile = nowMobile;
      renderDirectory();
    }
  }, 150));

  document.getElementById("dirSearch").addEventListener("input", function(e){
    dirQuery = e.target.value; renderDirectory();
  });
  makeChipset(document.getElementById("dirRegionChips"), ["All"].concat(REGIONS), "All", function(label){
    dirRegion = label;
    dirLetter = "All";
    renderLetterIndex();
    renderDirectory();
  });
  document.getElementById("dirGrid").addEventListener("click", function(e){
    var star = e.target.closest(".star-btn");
    if(star){
      var id = star.dataset.id;
      if(mastered.has(id)){ mastered.delete(id); } else { mastered.add(id); }
      saveSet(STORE_KEY_MASTERED, mastered);
      renderDirectory();
      return;
    }
    var entryEl = e.target.closest(".entry");
    if(!entryEl || !entryEl.dataset.id) return;
    if(e.target.closest(".flag")){ openFlagPopupForId(entryEl.dataset.id); return; }
    openEntryModal(entryEl.dataset.id);
  });
  document.getElementById("dirGrid").addEventListener("keydown", function(e){
    if(e.key !== "Enter" && e.key !== " ") return;
    if(e.target.classList && e.target.classList.contains("entry")){
      e.preventDefault();
      openEntryModal(e.target.dataset.id);
    }
  });

  /* ---------------- entry details modal ---------------- */
  function openEntryModal(id){
    var c = COUNTRIES.filter(function(x){ return x.id === id; })[0];
    if(!c) return;
    document.getElementById("entryModalFlag").innerHTML = flagImgHTML(c, 160);
    document.getElementById("entryModalName").textContent = c.name;
    document.getElementById("entryModalRegion").textContent = c.region;
    document.getElementById("entryModalCapital").textContent = c.capital;
    var langs = LANGUAGES[c.code] || [];
    document.getElementById("entryModalLanguages").textContent = langs.length ? langs.join(", ") : "—";
    document.getElementById("entryModalCurrency").textContent = CURRENCIES[c.code] || "—";
    document.getElementById("entryModalCode").textContent = c.code;
    document.getElementById("entryModalOverlay").hidden = false;
    document.body.classList.add("modal-open");
  }
  function closeEntryModal(){
    document.getElementById("entryModalOverlay").hidden = true;
    document.body.classList.remove("modal-open");
  }
  document.getElementById("entryModalClose").addEventListener("click", closeEntryModal);
  document.getElementById("entryModalOverlay").addEventListener("click", function(e){
    if(e.target === this) closeEntryModal();
  });
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape" && !document.getElementById("entryModalOverlay").hidden) closeEntryModal();
    if(e.key === "Escape" && !document.getElementById("flagPopupOverlay").hidden) closeFlagPopup();
  });

  /* ---------------- flag preview popup ---------------- */
  // Clicking a flag anywhere it appears (directory list, quiz found/missed
  // trays) shows it enlarged here, instead of whatever the flag's container
  // would otherwise do (e.g. opening the full entry-details modal).
  function openFlagPopup(c){
    document.getElementById("flagPopupImg").innerHTML = flagImgHTML(c, 320);
    document.getElementById("flagPopupOverlay").hidden = false;
    document.body.classList.add("modal-open");
  }
  function closeFlagPopup(){
    document.getElementById("flagPopupOverlay").hidden = true;
    document.body.classList.remove("modal-open");
  }
  document.getElementById("flagPopupClose").addEventListener("click", closeFlagPopup);
  document.getElementById("flagPopupOverlay").addEventListener("click", function(e){
    if(e.target === this) closeFlagPopup();
  });
  function openFlagPopupForId(id){
    var c = COUNTRIES.filter(function(x){ return x.id === id; })[0];
    if(c) openFlagPopup(c);
  }

  /* ---------------- confirm modal ---------------- */
  function showConfirm(message, okLabel, onConfirm){
    var overlay = document.getElementById("confirmModalOverlay");
    var okBtn = document.getElementById("confirmModalOk");
    var cancelBtn = document.getElementById("confirmModalCancel");
    document.getElementById("confirmModalMessage").textContent = message;
    okBtn.textContent = okLabel;
    overlay.hidden = false;
    document.body.classList.add("modal-open");

    function cleanup(){
      overlay.hidden = true;
      document.body.classList.remove("modal-open");
      okBtn.removeEventListener("click", handleOk);
      cancelBtn.removeEventListener("click", handleCancel);
      overlay.removeEventListener("click", handleOverlayClick);
      document.removeEventListener("keydown", handleKeydown);
    }
    function handleOk(){ cleanup(); onConfirm(); }
    function handleCancel(){ cleanup(); }
    function handleOverlayClick(e){ if(e.target === overlay) cleanup(); }
    function handleKeydown(e){ if(e.key === "Escape") cleanup(); }

    okBtn.addEventListener("click", handleOk);
    cancelBtn.addEventListener("click", handleCancel);
    overlay.addEventListener("click", handleOverlayClick);
    document.addEventListener("keydown", handleKeydown);
  }

  /* ================= QUIZ (recall checkpoint) ================= */
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

  var quizGame = "Countries";
  var quizRegion = "All";
  var quizLetters = new Set(); // empty = no letter filter ("All")
  var quizTimerLabel = "5 min";

  function updateModeUi(){
    var input = document.getElementById("quizInput");
    var hint = document.getElementById("quizHint");
    if(quizGame === "Flags"){
      input.placeholder = "Type the country for this flag…";
      hint.textContent = "Click a flag below, then type the matching country.";
    } else if(quizGame === "Capitals"){
      input.placeholder = "Type a capital…";
      hint.textContent = "Matches register as you type — no need to press Enter.";
    } else {
      input.placeholder = "Type a country name…";
      hint.textContent = "Matches register as you type — no need to press Enter.";
    }
  }

  makeChipset(document.getElementById("quizGameChips"), ["Countries","Capitals","Flags"], quizGame, function(v){
    quizGame = v;
    updateModeUi();
    refreshBestLine();
  });
  makeChipset(document.getElementById("quizRegionChips"), ["All"].concat(REGIONS), quizRegion, function(v){
    quizRegion = v;
    quizLetters.clear();
    renderQuizLetterIndex();
    refreshBestLine();
  });

  // Mirrors the directory's letter index but allows multiple letters at
  // once: each letter toggles independently, and "All" clears the set
  // rather than being just another exclusive choice. Counts reflect
  // whichever region is currently selected, so switching region clears
  // the letter selection back to "All".
  function renderQuizLetterIndex(){
    var pool = poolForRegion(quizRegion);
    var counts = {};
    pool.forEach(function(c){
      var l = c.name.charAt(0).toUpperCase();
      counts[l] = (counts[l] || 0) + 1;
    });

    var wrap = document.getElementById("quizLetterIndex");
    wrap.innerHTML = "";
    var allBtn = document.createElement("button");
    allBtn.className = "letter-btn"; allBtn.type = "button";
    allBtn.setAttribute("aria-pressed", quizLetters.size === 0 ? "true" : "false");
    allBtn.innerHTML = "All<span class=\"n\">" + pool.length + "</span>";
    allBtn.addEventListener("click", function(){ quizLetters.clear(); renderQuizLetterIndex(); refreshBestLine(); });
    wrap.appendChild(allBtn);
    ALPHABET.forEach(function(letter){
      var count = counts[letter] || 0;
      var btn = document.createElement("button");
      btn.className = "letter-btn"; btn.type = "button";
      btn.disabled = count === 0;
      btn.setAttribute("aria-pressed", quizLetters.has(letter) ? "true" : "false");
      btn.innerHTML = letter + "<span class=\"n\">" + count + "</span>";
      btn.addEventListener("click", function(){
        if(quizLetters.has(letter)){ quizLetters.delete(letter); } else { quizLetters.add(letter); }
        renderQuizLetterIndex();
        refreshBestLine();
      });
      wrap.appendChild(btn);
    });
  }
  renderQuizLetterIndex();
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

  function letterKeyPart(){ return quizLetters.size ? Array.from(quizLetters).sort().join("") : "All"; }
  function bestKey(){ return quizGame + "|" + quizRegion + "|" + letterKeyPart() + "|" + timerKeyPart(); }
  function bestLineText(){
    var b = bestScores[bestKey()];
    return b ? ("Best on this checkpoint — " + b.found + " / " + b.total + " found in " + formatTime(b.timeMs)) : "No attempts logged yet for this checkpoint.";
  }
  function refreshBestLine(){ document.getElementById("quizBestLine").textContent = bestLineText(); }
  refreshBestLine();

  function poolForRegion(region){
    return region === "All" ? COUNTRIES.slice() : COUNTRIES.filter(function(c){ return c.region === region; });
  }

  function applyLetterFilter(pool, letters){
    return letters.size === 0 ? pool : pool.filter(function(c){ return letters.has(c.name.charAt(0).toUpperCase()); });
  }

  var quizPool = [];
  var quizLookup = {};
  var quizFound = new Set();
  var quizTimerId = null;
  var quizStartTime = 0;
  var quizDurationMs = 0;
  var quizMode = "countdown";
  var quizFinished = false;
  var quizCurrentFlagId = null;

  function startQuiz(){
    quizPool = applyLetterFilter(poolForRegion(quizRegion), quizLetters);
    if(quizPool.length < 2){ quizPool = COUNTRIES.slice(); }
    quizPool.sort(byName);
    // Flags mode still tests country names, so it shares the name lookup/aliases.
    var field = quizGame === "Capitals" ? "capital" : "name";
    var aliasMap = quizGame === "Capitals" ? CAPITAL_ALIASES : COUNTRY_ALIASES;
    quizLookup = buildLookup(quizPool, field, aliasMap);
    quizFound = new Set();
    quizFinished = false;
    quizCurrentFlagId = null;

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

    document.getElementById("quizFlagPrompt").hidden = quizGame !== "Flags";
    document.getElementById("quizFlagGrid").hidden = quizGame !== "Flags";
    document.getElementById("quizLiveMapSection").hidden = quizGame === "Flags";
    updateModeUi();
    var input = document.getElementById("quizInput");
    input.disabled = false;
    input.value = "";
    if(quizGame === "Flags"){ renderFlagGrid(); selectFlagTile(quizPool[0].id); }

    clearInterval(quizTimerId);
    tickTimer();
    quizTimerId = setInterval(tickTimer, 250);
  }

  function renderFlagGrid(){
    var grid = document.getElementById("quizFlagGrid");
    grid.innerHTML = "";
    quizPool.forEach(function(c){
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "flag-tile";
      btn.dataset.id = c.id;
      btn.setAttribute("aria-label", "Answer this flag");
      // Same width as the enlarged prompt image below, so selecting a tile
      // reuses the already-cached asset instead of firing a fresh request.
      btn.innerHTML = flagImgHTML(c, 160) + '<span class="tile-name"></span>';
      btn.addEventListener("click", function(){ selectFlagTile(c.id); });
      grid.appendChild(btn);
    });
  }

  function resetFlagPrompt(){
    quizCurrentFlagId = null;
    document.getElementById("quizFlagBig").textContent = "🏳️";
    document.getElementById("quizFlagPickedHint").textContent = "Pick a flag below to begin.";
    document.getElementById("quizInput").value = "";
  }

  function currentFlagIndex(){
    for(var i = 0; i < quizPool.length; i++){
      if(quizPool[i].id === quizCurrentFlagId) return i;
    }
    return -1;
  }

  function autoSelectNextFlag(){
    var total = quizPool.length;
    var startIdx = currentFlagIndex();
    if(startIdx < 0) startIdx = -1;
    for(var offset = 1; offset <= total; offset++){
      var idx = (startIdx + offset) % total;
      if(!quizFound.has(quizPool[idx].id)){ selectFlagTile(quizPool[idx].id); return; }
    }
    resetFlagPrompt();
  }

  function stepFlag(direction){
    var total = quizPool.length;
    if(quizFinished || !total) return;
    var startIdx = currentFlagIndex();
    for(var offset = 1; offset <= total; offset++){
      var idx = ((startIdx + direction * offset) % total + total) % total;
      if(!quizFound.has(quizPool[idx].id)){ selectFlagTile(quizPool[idx].id); return; }
    }
  }

  function selectFlagTile(id){
    if(quizFinished || quizFound.has(id)) return;
    quizCurrentFlagId = id;
    var c = quizPool.filter(function(x){ return x.id === id; })[0];
    document.getElementById("quizFlagBig").innerHTML = flagImgHTML(c, 160);
    document.getElementById("quizFlagPickedHint").textContent = "Type the country for this flag…";
    var grid = document.getElementById("quizFlagGrid");
    var selectedTile = null;
    Array.prototype.forEach.call(grid.querySelectorAll(".flag-tile"), function(tile){
      var isSelected = tile.dataset.id === id;
      tile.classList.toggle("selected", isSelected);
      if(isSelected) selectedTile = tile;
    });
    if(selectedTile) selectedTile.scrollIntoView({ behavior: "smooth", block: "nearest" });
    var input = document.getElementById("quizInput");
    input.value = "";
    input.focus();
  }

  function flashFlagIncorrect(){
    var fb = document.getElementById("quizFeedback");
    fb.textContent = "Not this flag — try again";
    fb.className = "quiz-feedback wrong";
    var prompt = document.getElementById("quizFlagPrompt");
    prompt.classList.remove("shake");
    void prompt.offsetWidth;
    prompt.classList.add("shake");
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
    if(!id) return;

    if(quizGame === "Flags"){
      if(!quizCurrentFlagId) return;
      if(id !== quizCurrentFlagId){ flashFlagIncorrect(); return; }
      quizFound.add(id);
      var cFlag = quizPool.filter(function(x){ return x.id === id; })[0];
      registerFind(cFlag);
      var tile = document.querySelector('.flag-tile[data-id="' + id + '"]');
      if(tile){
        tile.disabled = true;
        tile.classList.remove("selected");
        tile.classList.add("found");
        var nameEl = tile.querySelector(".tile-name");
        if(nameEl) nameEl.textContent = cFlag.name;
      }
      if(!quizFinished) autoSelectNextFlag();
      return;
    }

    if(!quizFound.has(id)){
      quizFound.add(id);
      e.target.value = "";
      var cFound = quizPool.filter(function(x){ return x.id === id; })[0];
      registerFind(cFound);
    }
  });

  function registerFind(c){
    document.getElementById("quizFound").textContent = quizFound.size;
    markLiveMapFound(c);
    var fb = document.getElementById("quizFeedback");
    fb.textContent = "Approved — " + c.name + (quizGame === "Capitals" ? " · " + c.capital : "");
    fb.className = "quiz-feedback correct";
    var tray = document.getElementById("quizFoundTray");
    var chip = document.createElement("span");
    chip.className = "found-chip";
    chip.dataset.id = c.id;
    var label = quizGame === "Capitals" ? c.capital : c.name;
    chip.innerHTML = '<span class="flag">' + flagImgHTML(c) + '</span><span>' + label + '</span>';
    tray.insertBefore(chip, tray.firstChild);
    if(quizFound.size >= quizPool.length){ finishQuiz(); }
  }

  [document.getElementById("quizFoundTray"), document.getElementById("missedTray")].forEach(function(tray){
    tray.addEventListener("click", function(e){
      var flagEl = e.target.closest(".flag");
      if(!flagEl) return;
      var chip = e.target.closest("[data-id]");
      if(chip) openFlagPopupForId(chip.dataset.id);
    });
  });

  document.getElementById("quizFlagPrev").addEventListener("click", function(){ stepFlag(-1); });
  document.getElementById("quizFlagNext").addEventListener("click", function(){ stepFlag(1); });

  document.getElementById("quizFinish").addEventListener("click", finishQuiz);

  document.getElementById("quizCancel").addEventListener("click", function(){
    showConfirm("Cancel this checkpoint? Your progress on it won't be saved.", "Cancel checkpoint", function(){
      quizFinished = true;
      clearInterval(quizTimerId);
      document.getElementById("quizInput").disabled = true;
      document.getElementById("quizRun").hidden = true;
      document.getElementById("quizSetup").hidden = false;
    });
  });

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
    document.getElementById("resultsLabel").textContent = quizGame + " checkpoint · " + quizRegion + (quizLetters.size ? " · “" + Array.from(quizLetters).sort().join(", ") + "”" : "");
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
    document.getElementById("resultsMapSection").hidden = quizGame === "Flags";
    if(quizGame !== "Flags"){
      document.getElementById("missedLabel").textContent = "Recall map — " + missedCount + " missed of " + total;
      document.getElementById("mapHoverLine").textContent = "Hover or tap a point on the map";
      document.getElementById("mapHoverLine").className = "map-hover mono";
      renderRecallMap(quizPool, quizFound);
    }

    var missed = quizPool.filter(function(c){ return !quizFound.has(c.id); }).sort(byName);
    document.getElementById("missedListLabel").textContent = "Missed (" + missed.length + ")";
    var missedTray = document.getElementById("missedTray");
    missedTray.innerHTML = "";
    if(!missed.length){
      missedTray.innerHTML = '<p class="missed-empty">Clean sweep — nothing missed.</p>';
    } else {
      missed.forEach(function(c){
        var chip = document.createElement("span");
        chip.className = "missed-chip";
        chip.dataset.id = c.id;
        chip.innerHTML = '<span class="flag">' + flagImgHTML(c) + '</span><span>' + c.name + '</span>';
        missedTray.appendChild(chip);
      });
    }
  }

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
  // is flipped to the success color the instant it's typed correctly. Dot
  // elements are kept in liveMapDotEls for O(1) updates instead of a full
  // re-render, and liveFindLabelEl is one reused <text> that jumps to
  // whichever dot was just found and briefly names it.
  var liveMapDotEls = {};
  var liveFindLabelEl = null;
  var liveFindLabelTimer = null;

  function renderLiveMap(pool){
    var svg = document.getElementById("liveMap");
    drawMapBase(svg, pool);
    liveMapDotEls = {};
    clearTimeout(liveFindLabelTimer);
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
    liveFindLabelEl = svgEl("text", { "class": "find-label" });
    svg.appendChild(liveFindLabelEl);
  }

  function markLiveMapFound(c){
    var dot = liveMapDotEls[c.id];
    if(dot){
      dot.setAttribute("class", "map-dot found pop");
      dot.addEventListener("animationend", function handler(){
        dot.setAttribute("class", "map-dot found");
        dot.removeEventListener("animationend", handler);
      });
    }
    if(liveFindLabelEl){
      var x = Math.max(24, Math.min(336, c.lon + 180));
      var y = Math.max(8, (90 - c.lat) - 6);
      liveFindLabelEl.setAttribute("x", x);
      liveFindLabelEl.setAttribute("y", y);
      liveFindLabelEl.textContent = c.name;
      liveFindLabelEl.classList.add("show");
      clearTimeout(liveFindLabelTimer);
      liveFindLabelTimer = setTimeout(function(){
        liveFindLabelEl.classList.remove("show");
      }, 1600);
    }
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

      var hoverText = c.name + " — " + c.capital + (found ? " (found)" : " (missed)");
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
    showConfirm("Clear all saved progress and best scores in this browser?", "Clear progress", function(){
      mastered = new Set(); bestScores = {};
      saveSet(STORE_KEY_MASTERED, mastered); saveObj(STORE_KEY_BEST, bestScores);
      refreshBestLine(); renderDirectory();
    });
  });

  /* ================= boot ================= */
  function start(){
    renderLetterIndex();
    renderDirectory();
  }

  if(window.claude && window.claude.hot){
    window.claude.hot.ready ? window.claude.hot.ready(start) : start(window.claude.hot.data || {});
  } else {
    start();
  }
})();
