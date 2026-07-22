// ==========================================
// المتغيرات الأساسية وعناصر واجهة المستخدم
// ==========================================
const bismillahText = document.getElementById("bismillahText");
const ta7at = document.getElementById("ta7at");
const lewa7 = document.getElementById("lewa7");
const abiat = document.getElementById("abiat");
const menu = document.getElementById("menu");
const toggleMenuDisplay = document.getElementById("toggleMenuDisplay");
const elkalamah = document.getElementById("elkalamah");
const qid = document.getElementById("qid");
const mithal = document.getElementById("mithal");

const Angko = {
    questionsData: localStorage.questions ? JSON.parse(localStorage.questions) : [], 
    answersData: localStorage.answers ? JSON.parse(localStorage.answers) : [], 
    qiyoodData: localStorage.qiyood ? JSON.parse(localStorage.qiyood) : [], 
    amthilahData: localStorage.amthilah ? JSON.parse(localStorage.amthilah) : [],
    dmairData: localStorage.damir ? JSON.parse(localStorage.damir) : [],
    rulesData: [],
    lamatRulesData: []
};

// متغيرات تتبع التقدم
let sessionStartTime = Date.now(); // وقت بدء التطبيق
let totalSessionJatk = parseInt(localStorage.getItem("zarag_total_jatk")) || 0; // إجمالي الأخطاء المحفوظة
let currentSessionJatk = 0; // أخطاء الجلسة الحالية فقط

let currentIndex = 0;
let qaydIndex = 0;
let mithalIndex = 0;
let jatkTimes = 0;

const gatk = "جاتك"; 

const answerPairs = {
    "محذوفة": ["محذوفة", "ثابتة"],
    "ثابتة": ["محذوفة", "ثابتة"],
    "محذوفان": ["محذوفان", "ثابتان"],
    "ثابتان": ["محذوفان", "ثابتان"],
    "الأول محذوف": ["الأول محذوف", "الأول ثابت"],
    "الأول ثابت": ["الأول محذوف", "الأول ثابت"],
    "ألف": ["ألف", "ياء"],
    "ياء": ["ألف", "ياء"],
    "واو": ["واو", "واو محذوفة"],
    "واو محذوفة": ["واو", "واو محذوفة"],
    "النون الأولى": ["النون الأولى", "النون الثانية"],
    "النون الثانية": ["النون الأولى", "النون الثانية"],
    "ياء ثابتة": ["ياء ثابتة", "ياء محذوفة"],
    "الا": ["ل", "الا"],
    "ل": ["ل", "الا"],
    "ياء محذوفة": ["ياء ثابتة", "ياء محذوفة"],
    "ياء زائدة": ["ياء زائدة", "بلا ياء"],
    "بلا ياء": ["ياء زائدة", "بلا ياء"],
    "الواو الأول": ["الواو الأول", "الواو الثاني"],
    "الواو الثاني": ["الواو الأول", "الواو الثاني"],
    "نقل": ["نقل", "وصل"],
    "وصل": ["نقل", "وصل"],
    "متصلة": ["متصلة", "منفصلة"],
    "منفصلة": ["متصلة", "منفصلة"],
    "اللام الأول": ["اللام الأول", "اللام الثاني"],
    "اللام الثاني": ["اللام الأول", "اللام الثاني"],
    "ة": ["ة", "ت"],
    "ت": ["ة", "ت"],
    "ء": ["ء", "أ"],
    "أ": ["ء", "أ"],
    "ؤ": ["ؤ", "ئ"],
    "ئ": ["ؤ", "ئ"],
    "للا": ["للا", "ال"],
    "ال": ["للا", "ال"],
    "وا": ["وا", "ى"],
    "ى": ["وا", "ى"],
    "الف المزيد": ["الف المزيد", "ياء مردودة"],
    "ياء مردودة": ["الف المزيد", "ياء مردودة"],
    "الياء الأولى": ["الياء الأولى", "الياء الثانية"],
    "الياء الثانية": ["الياء الأولى", "الياء الثانية"],
    "ألف ياء": ["ألف واو", "ألف ياء"],
    "ألف واو": ["ألف واو", "ألف ياء"],
    "ے" : ["ا", "ے"],
    "ا" : ["ا", "ے"],
    "نون": ["نون", "مافيها شي"],
    "مافيها شي": ["نون", "مافيها شي"]
};

const bismillahTextContent = "لسم الله الرحمن الرحيم";
const abiatDefult = "يــــاربنا عـــبدك ذلك لامـــــات\nلامــات يـارب أخـر عــنه المــــمات\nحـتى يــكون عـــــالما وحــــــاملا\nكــتاب ربـه الـذي قــــد أنــــــزلا\nوللـــتقاء والـــــــــسخا مــــلازما\nوللــعلوم فــــوق كـــــل الــــعلما\nوســــع لــه فـــي قـــبره وأدخـــله\nأعـــــلى الـــجنان يـالها مــن درجـه\nومـــن أحــــب ربــــنا فــــاكرمه\nمــــــعه وانـــت راض راض عـــــنه\n\nهذا النظم\nكانت جدة الوالد\nلأبيه رحمها\nالله وأسكنها\nفسيح جناته\nتدعوا له به";
const adsText = "هذه مساحة خاصة بالإعلانات للمزيد من المعلومات تواصلوا معنا عبر صفحتنا على الفيسبوك.";
const marqueeTextContent = "قال الشيخ الفاضل لامات ولد الطالب: يا طالبے رسم القرَان هاكم * هذا الذے  ابن شيخنا أهداكم | وهو بسبق حائز تفضيلا * مستوجب ثناءنا الجميلا";

// ==========================================
// إدارة الميزات والباقات
// ==========================================
const ZARAG_FEATURES = {
    NONE: 0,            // 0000 (مستخدم مجاني بدون ميزات إضافية)
    COLOR_THEMES: 1,    // 0001 (ميزة تغيير ألوان لوحة الرسم)
    KUNNASH_SAVE: 2,    // 0010 (ميزة حفظ وتدوين القيود في الكناش)
    ADVANCED_STATS: 4,  // 0100 (ميزة رؤية إحصائيات متقدمة لتقدمك)
};

const ZARAG_PLANS = {
    FREE: ZARAG_FEATURES.NONE,
    PLUS: ZARAG_FEATURES.COLOR_THEMES | ZARAG_FEATURES.ADVANCED_STATS,
    PRO: ZARAG_FEATURES.COLOR_THEMES | ZARAG_FEATURES.KUNNASH_SAVE | ZARAG_FEATURES.ADVANCED_STATS
};

const ACTIVATION_CODES = {
    "ZARAG-PLUS-2026": ZARAG_PLANS.PLUS, 
    "ZARAG-PRO-MAX": ZARAG_PLANS.PRO     
};

const activationPlusCodes = ["1234", "5678", "9999", "8788", "2026"];
const activationProCodes  = ["3457", "5678", "0984", "5643", "2008"];

const premiumCodeInput = document.getElementById("premiumCodeInput");
const activateBtn = document.getElementById("activateBtn");

if (activateBtn && premiumCodeInput) {
    activateBtn.addEventListener("click", () => {
        const userCode = premiumCodeInput.value.trim();
        if (ACTIVATION_CODES[userCode] !== undefined) {
            const assignedPlanValue = ACTIVATION_CODES[userCode];
            localStorage.setItem("zarag_permissions", assignedPlanValue);
            alert("🎉 تم تفعيل باقتك بنجاح! سيتم تحديث التطبيق الآن لتفعيل الميزات.");
            location.reload(); 
        } else {
            alert("❌ رمز التفعيل غير صحيح. يرجى التحقق منه أو التواصل عبر واتساب.");
        }
    });
}

function getUserPermissions() {
    return ZARAG_PLANS.PRO; // تعطيل نظام الدفع وجعل كل الميزات متاحة مجاناً
}

function handleOpenKunnash() {
    const currentPermissions = getUserPermissions();
    if (currentPermissions & ZARAG_FEATURES.KUNNASH_SAVE) {
        console.log("تم السماح بالدخول إلى الكناش.");
    } else {
        alert("🔒 ميزة الكناش مخصصة لمشتركي باقة برو (PRO). يمكنك الترقية من نافذة العروض.");
    }
}

function handleThemeChange() {
    const currentPermissions = getUserPermissions();
    if (!(currentPermissions & ZARAG_FEATURES.COLOR_THEMES)) {
        alert("🔒 ميزة تخصيص الألوان تتطلب باقة بلس أو برو.");
        return; 
    }
    console.log("تم تطبيق اللون الجديد بنجاح.");
}

function toggleAdvancedStatsFeature() {
    let currentPermissions = getUserPermissions();
    currentPermissions = currentPermissions ^ ZARAG_FEATURES.ADVANCED_STATS;
    localStorage.setItem("zarag_permissions", currentPermissions);
    console.log("تم تحديث الصلاحيات لتصبح قيمتها الرقمية الحالية: " + currentPermissions);
}

// ==========================================
// الدوال الأساسية (جلب البيانات والتقدم)
// ==========================================
function createLookupMap(indices, texts) {
    const map = {};
    indices.forEach((id, index) => {
        if (texts[index]) {
            map[id] = texts[index];
        }
    });
    return map;
}

async function fetchLocalJSON(fileName) {
    try {
        const response = await fetch(`json/${fileName}`);
        if (!response.ok) throw new Error(`تعذر تحميل ${fileName}`);
        const arr = await response.json();
        return Array.isArray(arr) ? arr : [];
    } catch (error) {
        console.error("⚠️ خطأ في تحميل الملف:", error);
        return [];
    }
}

async function loadRules() {
    try {
        const response = await fetch('json/aldoali.json');
        if (!response.ok) throw new Error('فشل تحميل القواعد');
        Angko.rulesData = await response.json();
    } catch (error) {
        console.error('⚠️ خطأ في تحميل القواعد:', error);
        Angko.rulesData = [];
    }
}

async function loadAllTables() {
    await loadRules();
    const merged = await fetchLocalJSON("angko.json");
    
    Angko.questionsData = merged.map(item => item[0]);
    Angko.answersData   = merged.map(item => item[1]);
    Angko.qiyoodData    = merged.map(item => item[2]);
    Angko.amthilahData  = merged.map(item => item[3]);
    
    localStorage.setItem("questions", JSON.stringify(Angko.questionsData));
    localStorage.setItem("answers",   JSON.stringify(Angko.answersData));
    localStorage.setItem("qiyood",    JSON.stringify(Angko.qiyoodData));
    localStorage.setItem("amthilah",  JSON.stringify(Angko.amthilahData));
    
    const lastQuestion = localStorage.elkalamah ? Number(localStorage.elkalamah) : 0;
    showQuestion(lastQuestion);
}

async function loadLamatRules() {
    try {
        const response = await fetch('json/lamat.json');
        if (!response.ok) throw new Error('فشل تحميل قواعد لامات');
        Angko.lamatRulesData = await response.json();
    } catch (error) {
        console.error('⚠️ خطأ في تحميل قواعد لامات:', error);
        Angko.lamatRulesData = []; 
    }
}

function jatk() {
    jatkTimes++;
    totalSessionJatk++; 
    currentSessionJatk++; 
    
    localStorage.setItem("zarag_total_jatk", totalSessionJatk);

    if (jatkTimes >= 3) {
        lewa7.classList.add("shake");
        elkalamah.classList.add("shake");
        
        setTimeout(() => {
            lewa7.classList.remove("shake");
            elkalamah.classList.remove("shake");
            jatkTimes = 0;
            ta7at.textContent = jatkTimes;
        }, 2000);
    }
    ta7at.textContent = jatkTimes;
}

function calculateProgress() {
    const timeNow = Date.now();
    const timeSpentSeconds = Math.floor((timeNow - sessionStartTime) / 1000);
    const minutes = Math.floor(timeSpentSeconds / 60);
    const seconds = timeSpentSeconds % 60;

    let score = 100 - (currentSessionJatk * 5) - minutes;
    if (score < 0) score = 0;
    if (score > 100) score = 100;

    let statsContainer = document.getElementById('progressStatsContainer');
    if (!statsContainer) {
        statsContainer = document.createElement('div');
        statsContainer.id = 'progressStatsContainer';
        statsContainer.style.cssText = 'background: #fdf5e6; border: 2px dashed #dbb42c; border-radius: 12px; padding: 15px; margin-bottom: 20px; text-align: right; color: #3a2c1f;';
        const progressModalInfo = document.querySelector('#progressModal .modal-info');
        if (progressModalInfo) {
            progressModalInfo.insertBefore(statsContainer, progressModalInfo.firstChild);
        }
    }

    const scoreColor = score >= 80 ? '#2b6e2f' : (score >= 50 ? '#dbb42c' : '#d4493c');
    statsContainer.innerHTML = `
        <h4 style="color: #a7634b; margin-bottom: 12px; text-align: center;"><i class="fa-solid fa-chart-pie"></i> إحصائيات الجلسة</h4>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-weight: bold;">
            <span><i class="fa-solid fa-clock" style="color: #2b6e2f;"></i> الوقت المستغرق:</span>
            <span style="color: #555;">${minutes} د و ${seconds} ث</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-weight: bold;">
            <span><i class="fa-solid fa-triangle-exclamation" style="color: #d4493c;"></i> أخطاء (جاتك):</span>
            <span style="color: #d4493c;">${currentSessionJatk} <small>(الإجمالي: ${totalSessionJatk})</small></span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 12px; padding-top: 12px; border-top: 1px solid #dbb42c; font-weight: bold;">
            <span><i class="fa-solid fa-star" style="color: #dbb42c;"></i> نسبة الإتقان:</span>
            <span style="color: ${scoreColor}; font-size: 1.2rem;">${score}%</span>
        </div>
    `;
}

function showQuestion(index = 0) {
    index = parseInt(index);
    elkalamah.classList = "elkalamah";

    if (!Angko.questionsData.length) return;

    if (index >= Angko.questionsData.length) index = 0;
    if (index < 0) index = Angko.questionsData.length;

    currentIndex = index;

    const question = Angko.questionsData[index];
    const answer   = Angko.answersData[index];
    const qaydText   = Angko.qiyoodData[index];
    const mithalText = Angko.amthilahData[index];

    elkalamah.textContent = question;

    if (qaydText) {
        qid.textContent = qaydText;
    } else {
        qid.textContent = "قيد";
    }

    if (mithalText) {
        mithal.textContent = mithalText;
        if (mithalText.length > 20) {
            mithal.classList.add("minimize");
        } else {
            mithal.classList.remove("minimize");
        }
    } else {
        mithal.textContent = "...";
    }

    showAnswerButtons(answer);
    localStorage.setItem("elkalamah", index);
    
    bismillahText.textContent = bismillahTextContent;
    abiat.textContent = abiatDefult;
}

function checkAnswer(chosenWord) {
    chosenWord = chosenWord.trim();
    const correctAnswer = Angko.answersData[currentIndex].trim();

    if (chosenWord !== correctAnswer) {
        jatk();
        elkalamah.classList.add("jatk");
        return;
    }
    
    if (chosenWord === "محذوفة" || chosenWord === "محذوفان" || chosenWord === "الأول محذوف") {
        elkalamah.classList.add("red");
    } else if (chosenWord === "ثابتة" || chosenWord === "ثابتان" || chosenWord === "الأول ثابت") {
        elkalamah.classList.add("black");
    } else {
        elkalamah.classList.add("correct");
    }
    
    if (chosenWord === correctAnswer) {
        const newWord = applySpecialRules(elkalamah.textContent, chosenWord);
        if (newWord !== elkalamah.textContent) {
            elkalamah.textContent = newWord;
            return;
        }
    }

    if (chosenWord === "محذوفة") {
        const chars = [...elkalamah.textContent];
        const lastAlifIndex = chars
            .map((ch, i) => ch === "ا" && i !== 0 && i !== chars.length - 1 ? i : -1)
            .filter(i => i !== -1)
            .pop(); 
        if (lastAlifIndex !== undefined) {
            chars[lastAlifIndex] = "ٰ";
            elkalamah.textContent = chars.join('');
        }
    }
    
    if (chosenWord === "محذوفان") {
        if (elkalamah.textContent.indexOf("ال") !== -1) {
            elkalamah.textContent = elkalamah.textContent.replaceAll("ا", "ٰ").replace("ٰ", "ا");
        } else {
            elkalamah.textContent = elkalamah.textContent.replaceAll("ا", "ٰ");
        }
    }
    
    if (chosenWord === "الأول محذوف" || chosenWord === "الأول ثابت") {
        const chars = [...elkalamah.textContent];
        const lastAlifIndex = chars
            .map((ch, i) => ch === "ا" && i !== 0 && i !== chars.length - 1 ? i : -1)
            .filter(i => i !== -1)
            .pop();
        if (lastAlifIndex !== undefined) {
            chars[lastAlifIndex] = "ٰ";
            elkalamah.textContent = chars.join('');
        }
    }
    
    if (chosenWord === "ت") {
        const chars = [...elkalamah.textContent];
        const atahIndexes = chars.map((ch, i) => (ch === "ة" && i !== 0) ? i : -1).filter(i => i !== -1);
        if (atahIndexes.length > 0) {
            chars[atahIndexes.pop()] = "ت";
            elkalamah.textContent = chars.join('');
        }
    }
    
    if (chosenWord === "اللام الثاني") {       
        const chars = [...elkalamah.textContent];
        const atahIndexes = chars.map((ch, i) => (ch === "ل" && i !== 0) ? i : -1).filter(i => i !== -1);
        if (elkalamah.textContent === "لله") {
            elkalamah.textContent = "لله";
            return;
        }
        if (atahIndexes.length > 0) {
            chars[atahIndexes.pop()] = "";
            elkalamah.textContent = chars.join('');
        }
    }
    
    if (chosenWord === "ء") {
        const chars = [...elkalamah.textContent];
        const atahIndexes = chars.map((ch, i) => (ch === " " && i !== 0) ? i : -1).filter(i => i !== -1);
        if (atahIndexes.length > 0) {
            chars[atahIndexes.pop()] = "ءً";
            elkalamah.textContent = chars.join('');
        }
    }
    
    if (chosenWord === "واو") {
        const chars = [...elkalamah.textContent];
        const alifIndexes = chars.map((ch, i) => (ch === "ا" && i !== 0) ? i : -1).filter(i => i !== -1);
        if (alifIndexes.length > 0) {
            chars[alifIndexes.pop()] = "وٰ";
            elkalamah.textContent = chars.join('');
        }
    }
    
    if (chosenWord === "النون الأولى" || chosenWord === "النون الثانية") {
        const chars = [...elkalamah.textContent];
        const lastAlifIndex = chars
            .map((ch, i) => ch === "ن" && i !== 0 && i !== chars.length - 1 ? i : -1)
            .filter(i => i !== -1)
            .pop();
        if (lastAlifIndex !== undefined) {
            chars[lastAlifIndex] = "";
            elkalamah.textContent = chars.join('');
        }
    }
    
    if (chosenWord === "الواو الأول") {
        const chars = [...elkalamah.textContent];
        const wawIndex = chars.findIndex((ch, i) => ch === "و" && i !== 0);
        const hamzaIndex = chars.findIndex((ch, i) => ch === "ء" && i !== 0);
        if (wawIndex !== -1) chars[wawIndex] = "ـࣳ"; 
        if (hamzaIndex !== -1) chars[hamzaIndex] = "ئ"; 
        elkalamah.textContent = chars.join('');
    }
    
    if (chosenWord === "الواو الثاني") {
        const chars = [...elkalamah.textContent];
        const alifIndexes = chars.map((ch, i) => (ch === "و" && i !== 0) ? i : -1).filter(i => i !== -1);
        if (alifIndexes.length > 0) {
            chars[alifIndexes.pop()] = "ۥ";
            elkalamah.textContent = chars.join('');
        }
    }
    
    if (chosenWord === "ياء") {
        const chars = [...elkalamah.textContent];
        const alifIndices = [];
        for (let i = 0; i < chars.length; i++) {
            if (chars[i] === "ا" && i !== 0) alifIndices.push(i);
        }
        if (alifIndices.length === 0) return; 
        
        let targetIndex;
        if (alifIndices.length === 1) {
            targetIndex = alifIndices[0];
        } else {
            targetIndex = (alifIndices[alifIndices.length - 1] === chars.length - 1) 
                          ? alifIndices[alifIndices.length - 2] 
                          : alifIndices[alifIndices.length - 1];
        }
        chars[targetIndex] = "ي";
        elkalamah.textContent = chars.join('');
    }
    
    if (chosenWord === "واو محذوفة") {
        const chars = [...elkalamah.textContent];
        const alifIndexes = chars.map((ch, i) => (ch === "و" && i !== 0) ? i : -1).filter(i => i !== -1);
        if (alifIndexes.length > 0) {
            chars[alifIndexes.pop()] = "ۥ";
            elkalamah.textContent = chars.join('');
        }
    }
    
    if (chosenWord === "ياء محذوفة" || chosenWord === "ياء زائدة") {
        const chars = [...elkalamah.textContent];
        const alifIndexes = chars.map((ch, i) => ((ch === "ي" || ch === "ے") && i !== 0) ? i : -1).filter(i => i !== -1);
        if (alifIndexes.length > 0) {
            chars[alifIndexes.pop()] = "ۦ";
            elkalamah.textContent = chars.join('');
        }
    }
    
    if (chosenWord === "الياء الأولى" || chosenWord === "الياء الثانية") {
        const chars = [...elkalamah.textContent];
        const lastAlifIndex = chars
            .map((ch, i) => ch === "ي" && i !== 0 && i !== chars.length - 1 ? i : -1)
            .filter(i => i !== -1)
            .pop();
        if (lastAlifIndex !== undefined) {
            chars[lastAlifIndex] = "";
            elkalamah.textContent = chars.join('');
        }
    }

    if (chosenWord === "متصلة") {
        const chars = [...elkalamah.textContent];
        const spaceIndex = chars
            .map((ch, i) => ch === " " && i !== 0 && i !== chars.length - 1 ? i : -1)
            .filter(i => i !== -1)
            .pop();
        if (spaceIndex !== undefined) {
            chars[spaceIndex] = "";
            elkalamah.textContent = chars.join('');
        }
    }
    
    if (chosenWord === "منفصلة") {
        const chars = [...elkalamah.textContent];
        const spaceIndex = chars
            .map((ch, i) => ch === " " && i !== 0 && i !== chars.length - 1 ? i : -1)
            .filter(i => i !== -1)
            .pop();
            
        if (elkalamah.textContent.includes("وانما")) { elkalamah.textContent = "وان ما"; return; }
        if (elkalamah.textContent.includes("انما")) { elkalamah.textContent = "ان ما"; return; }
        
        if (spaceIndex !== undefined) {
            if (elkalamah.textContent.includes("ا لا") || elkalamah.textContent.includes("ا لن") ||
                elkalamah.textContent.includes("ا لم") || elkalamah.textContent.includes("ا ما")) {
                chars[spaceIndex] = "ن ";
                elkalamah.textContent = chars.join('');
            }
        }
    }
}

function applySpecialRules(word, chosenWord) {
    const matchedRule = Angko.rulesData.find(rule => rule.type === chosenWord && rule.input === word);
    if (matchedRule) {
        return matchedRule.output;
    }
    return word;
}

function showAnswerButtons(answerWord) {
    answerWord = answerWord ? answerWord.trim() : "محذوفة";
    const btn1 = document.getElementById("pair1");
    const btn2 = document.getElementById("pair2");

    if (answerPairs[answerWord]) {
        const pairs = answerPairs[answerWord];
        btn1.innerText = pairs[0];
        btn2.innerText = pairs[1];
    } else {
        console.warn("لم يتم العثور على زوج إجابات للكلمة: " + answerWord);
    }
}

function setupButtons() {
    const allButtons = document.querySelectorAll(".btns button");
    allButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            checkAnswer(btn.innerText);
            setTimeout(() => showQuestion(currentIndex + 1), 800);
        });
    });
}

function loadProgress() {
    const loadOverlay = document.getElementById('loadOverlay'); // إضافة استدعاء المتغير
    if (loadOverlay) {
        setTimeout(() => {
            loadOverlay.style.display = "none";
        }, 500);
    }
}

function generateAndSetProgressCode() {
    let code = localStorage.getItem('zarag_progress_code');
    if (!code) {
        code = Math.floor(100000 + Math.random() * 900000).toString();
        localStorage.setItem('zarag_progress_code', code);
    }
    const linkElement = document.querySelector('.directing_payment_image');
    if (linkElement) {
        const baseUrl = 'https://wa.me/22249014788?text=';
        const message = `مرحبا سأشترك في ميزة التقدم رمزي هو ${code}`;
        linkElement.href = baseUrl + encodeURIComponent(message);
    }
}

// ==========================================
// أحداث البداية (DOM Load & PWA)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    loadAllTables();
    setupButtons();
    showQuestion();
    loadProgress();
    generateAndSetProgressCode(); 

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js');
    }
});

let deferredPrompt;
const installModal = document.getElementById('installModal');
const installOverlay = document.getElementById('installOverlay'); // توحيد اسم المتغير
const showInstallModalBtn = document.getElementById('showInstallModalBtn');
const continueBrowserBtn = document.getElementById('continueBrowserBtn');
const confirmInstallBtn = document.getElementById('confirmInstallBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

function openInstallModal() {
    if(installModal && installOverlay) {
        installModal.classList.remove('hidden');
        installOverlay.classList.remove('hidden');
    }
}

function closeInstallModal() {
    if(installModal && installOverlay) {
        installModal.classList.add('hidden');
        installOverlay.classList.add('hidden');
    }
}

document.addEventListener("fullscreenchange", ()=> {
    if (document.fullscreenElement) {
        closeInstallModal();
    } else {
        openInstallModal();
    }
});

if(showInstallModalBtn) {
    showInstallModalBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('تم قبول تثبيت التطبيق');
            } else {
                console.log('تم رفض تثبيت التطبيق');
            }
            deferredPrompt = null;
        } else {
            alert("لتثبيت التطبيق، يرجى الضغط على زر 'مشاركة' في أسفل المتصفح ثم اختيار 'إضافة إلى الشاشة الرئيسية'.");
        }
    });
}

window.addEventListener('appinstalled', () => {
    if(showInstallModalBtn) showInstallModalBtn.style.display = 'none';
    deferredPrompt = null;
    console.log('تم تثبيت تطبيق الزرگ بنجاح');
    closeInstallModal();
});

if(continueBrowserBtn) {
    continueBrowserBtn.addEventListener('click', ()=>{
        closeInstallModal();
        document.querySelectorAll(".modal").forEach(e=> e.classList.add("hidden"));
        document.documentElement.requestFullscreen();
    });
}

// ==========================================
// كشف المتصفحات والتطبيقات غير المدعومة
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    (function detectBrowsers() {
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        const isInApp = (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1) || 
                        (ua.indexOf("Instagram") > -1) || (ua.indexOf("TikTok") > -1) || (ua.indexOf("Line") > -1);

        if (isInApp) {
            if (/android/i.test(ua)) {
                const url = window.location.href.replace(/^https?:\/\//i, '');
                window.location.href = `intent://${url}#Intent;scheme=https;package=com.android.chrome;end;`;
            }
            const warningDiv = document.getElementById('inAppBrowserWarning');
            if (warningDiv) {
                warningDiv.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
            return; 
        }

        const isSamsung = ua.indexOf("SamsungBrowser") > -1;
        const isChrome = (ua.indexOf("Chrome") > -1 || ua.indexOf("CriOS") > -1) && !isSamsung && ua.indexOf("Edg") === -1 && ua.indexOf("OPR") === -1;
        const isSafari = ua.indexOf("Safari") > -1 && ua.indexOf("Chrome") === -1 && ua.indexOf("CriOS") === -1;

        if (!isSamsung && !isChrome && !isSafari) {
            const pwaWarningDiv = document.getElementById('pwaBrowserWarning');
            if (pwaWarningDiv) pwaWarningDiv.style.display = 'flex';
        }
    })();
});

// ==========================================
// الميزة المدفوعة: تخصيص الألوان
// ==========================================
(function() {
    const premiumColors = ["#549E91", "#D4493C", "#54C866", "#A89122"];
    function hexToRgba(hex, alpha = 0.1) {
        let c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3) c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            c= '0x'+c.join('');
            return `rgba(${(c>>16)&255}, ${(c>>8)&255}, ${c&255}, ${alpha})`;
        }
        return `rgba(0, 0, 0, ${alpha})`;
    }
    
    let isUnlocked   = true;
    let currentColor = localStorage.getItem("zarag_premium_color") || null;
    let currentRgba  = localStorage.getItem("zarag_premium_rgba")  || null;
    
    const colorModal = document.getElementById('colorModal');
    const colorOverlay = document.getElementById('colorModalOverlay');
    const showColorBtn = document.getElementById('showColorModalBtn');
    const closeColorBtn = document.getElementById('closeColorModalBtn');
    
    const codeInput = document.getElementById('premiumCodeInput');
    const premiumMessage = document.getElementById('premiumMessage');
    const colorOptions = document.querySelectorAll('.color-option');

    const lewa7Back = document.querySelector(".lewa7-back");
    const aboutMe = document.querySelector(".about-me");
    const btns = document.querySelectorAll(".btns button");
    const mithalSpan = document.querySelector(".mithal");
    const qidSpan = document.querySelector(".qid");
    const hameshSpans = document.querySelectorAll(".hamesh");

    function applyPremiumColor(colorHex, colorRgba) {
        if (!colorHex || !isUnlocked) return;
        if (!colorRgba) colorRgba = hexToRgba(colorHex, 0.1);
        
        if (lewa7Back) {
            lewa7Back.style.backgroundColor = colorHex;
            lewa7Back.style.backgroundImage = `linear-gradient(${colorHex}cc 5%, transparent 5%), linear-gradient(90deg, ${colorHex}cc 5%, transparent 5%)`;
        }
        if (aboutMe) aboutMe.style.backgroundColor = colorHex;
        if (btns) btns.forEach(btn => btn.style.backgroundColor = colorHex);
        if (mithalSpan) mithalSpan.style.borderColor = colorHex;
        if (qidSpan) qidSpan.style.color = colorHex;
        if (hameshSpans) hameshSpans.forEach(h => { if (h) h.style.backgroundColor = colorHex; });
        
        document.documentElement.style.setProperty('--gold-dark', colorHex);
        document.documentElement.style.setProperty('--gold-transparent', colorRgba);
        
        localStorage.setItem("zarag_premium_color", colorHex);
        localStorage.setItem("zarag_premium_rgba", colorRgba);
        currentColor = colorHex;
        currentRgba = colorRgba;

        colorOptions.forEach(opt => {
            if(opt.getAttribute('data-color') === colorHex) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });
    }

    function toggleModal(show) {
        if (show) {
            colorModal.classList.remove('hidden');
            colorOverlay.classList.remove('hidden');
            document.getElementById('menu').classList.remove("show-menu");
            
            if (isUnlocked && premiumMessage) {
                premiumMessage.textContent = "الميزة مفعّلة لديك، يمكنك تغيير الألوان بحرية!";
                premiumMessage.style.color = '#2b6e2f';
                premiumMessage.style.backgroundColor = '#e9f5e6';
                premiumMessage.classList.remove('hidden');
            } else if (premiumMessage) {
                premiumMessage.classList.add('hidden');
            }
        } else {
            colorModal.classList.add('hidden');
            colorOverlay.classList.add('hidden');
            if(codeInput) codeInput.value = "";
        }
    }

    showColorBtn?.addEventListener('click', () => toggleModal(true));
    closeColorBtn?.addEventListener('click', () => toggleModal(false));
    colorOverlay?.addEventListener('click', () => toggleModal(false));

    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            if (!isUnlocked && premiumMessage) {
                premiumMessage.textContent = "يرجى تفعيل الميزة أولاً لتتمكن من تغيير الألوان.";
                premiumMessage.style.color = '#d4493c';
                premiumMessage.style.backgroundColor = '#fdecea';
                premiumMessage.classList.remove('hidden');
                return;
            }
            const selectedColor = option.getAttribute('data-color');
            const generatedRgba = hexToRgba(selectedColor, 0.1); 
            applyPremiumColor(selectedColor, generatedRgba);
        });
    });

    if (isUnlocked && currentColor) {
        setTimeout(() => applyPremiumColor(currentColor, currentRgba), 100);
    }
})();

// ==========================================
// مصادقة الدخول (Supabase)
// ==========================================
(function() {
    const SUPABASE_URL = 'https://ozbiezzvxdetdfhkvzij.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96Ymllenp2eGRldGRmaGt2emlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2OTE0NTgsImV4cCI6MjA5NjI2NzQ1OH0.vZO6tCsAvZnM9-JqrWezSaqXO3yBd4PUGQ2LM0KMHg4'; 
    const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
    if(supabase) window.supabaseClient = supabase;

    const authModal = document.getElementById('authModal');
    const authOverlay = document.getElementById('authModalOverlay');
    const showAuthBtn = document.getElementById('showAuthModalBtn');
    const closeAuthBtn = document.getElementById('closeAuthModalBtn');
    
    const authTitle = document.getElementById('authTitle');
    const emailInput = document.getElementById('authEmail'); 
    const passInput = document.getElementById('authPassword');
    const actionBtn = document.getElementById('authActionBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const toggleModeBtn = document.getElementById('toggleAuthModeBtn');
    const messageDiv = document.getElementById('authMessage');

    if(toggleModeBtn) toggleModeBtn.style.display = 'none';

    const toggleAuthModal = (show) => {
        if(!authModal || !authOverlay) return;
        const action = show ? 'remove' : 'add';
        authModal.classList[action]('hidden');
        authOverlay.classList[action]('hidden');
        if (!show) clearInputs();
    };

    const clearInputs = () => {
        if(emailInput) emailInput.value = '';
        if(passInput) passInput.value = '';
        if(messageDiv) {
            messageDiv.textContent = '';
            messageDiv.classList.add('hidden');
        }
    };

    const showMessage = (msg, isError = false) => {
        if(!messageDiv) return;
        messageDiv.textContent = msg;
        messageDiv.classList.remove('hidden');
        messageDiv.style.color = isError ? '#d4493c' : '#2b6e2f';
        messageDiv.style.backgroundColor = isError ? '#fdecea' : '#e9f5e6';
    };

    const checkSession = async () => {
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser && supabase) {
            try {
                const { data, error } = await supabase
                    .from('students')
                    .select('is_premium')
                    .eq('username', currentUser)
                    .single();
                if (!error && data) {
                    localStorage.setItem("zarag_premium_unlocked", data.is_premium ? "true" : "false");
                }
            } catch (e) {
                console.error("خطأ أثناء جلب بيانات التميز:", e);
            }
            updateUIToLoggedIn(currentUser);
        } else {
            updateUIToLoggedOut();
        }
    };

    const updateUIToLoggedIn = (displayName) => {
        if(authTitle) authTitle.textContent = "حسابك";
        if(emailInput) emailInput.classList.add('hidden');
        if(passInput) passInput.classList.add('hidden');
        if(actionBtn) actionBtn.classList.add('hidden');
        if(logoutBtn) logoutBtn.classList.remove('hidden');
        showMessage(`مرحباً بك الطالب: ${displayName}`);
        if(showAuthBtn) showAuthBtn.innerHTML = `<i class="fa-solid fa-user-check"></i> متصل`;
    };
    
    const updateUIToLoggedOut = () => {
        if(authTitle) authTitle.textContent = "تسجيل الدخول";
        if(emailInput) emailInput.classList.remove('hidden');
        if(passInput) passInput.classList.remove('hidden');
        if(actionBtn) actionBtn.classList.remove('hidden');
        if(logoutBtn) logoutBtn.classList.add('hidden');
        if(showAuthBtn) showAuthBtn.innerHTML = `<i class="fa-solid fa-user"></i> الحساب`;
        clearInputs();
    };

    showAuthBtn?.addEventListener('click', () => toggleAuthModal(true));
    closeAuthBtn?.addEventListener('click', () => toggleAuthModal(false));
    authOverlay?.addEventListener('click', () => toggleAuthModal(false));

    actionBtn?.addEventListener('click', async () => {
        if(!supabase) return;
        const username = emailInput.value.trim();
        const password = passInput.value.trim();

        if (!username || !password) {
            showMessage("الرجاء إدخال اسم الطالب وكلمة المرور", true);
            return;
        }

        actionBtn.disabled = true;
        actionBtn.textContent = "جاري التحقق...";

        const { data, error } = await supabase
            .from('students')
            .select('*')
            .eq('username', username)
            .eq('password', password)
            .single();

        if (error) {
            showMessage("خطأ في الاتصال: " + error.message, true);
            console.error("Supabase Error:", error);
            actionBtn.disabled = false;
            actionBtn.textContent = "تسجيل الدخول";
        } else if (!data) {
            showMessage("اسم الطالب أو كلمة المرور غير صحيحة.", true);
            actionBtn.disabled = false;
            actionBtn.textContent = "تسجيل الدخول";
        } else {
            showMessage("تم تسجيل الدخول بنجاح!");
            localStorage.setItem("currentUser", data.username);
            await checkSession();
            setTimeout(() => {
                toggleAuthModal(false);
                window.location.reload(); 
            }, 1000);
        }
    });

    logoutBtn?.addEventListener('click', () => {
        logoutBtn.textContent = "جاري الخروج...";
        localStorage.removeItem("currentUser");
        localStorage.removeItem("zarag_premium_unlocked");
        localStorage.removeItem("zarag_premium_color");
        localStorage.removeItem("zarag_premium_rgba");
        
        updateUIToLoggedOut();
        showMessage("تم تسجيل الخروج.");
        setTimeout(() => {
            toggleAuthModal(false);
            window.location.reload(); 
        }, 1000);
    });

    checkSession();
})();

// ==========================================
// النوافذ الأخرى والمشاركة وإغلاق القوائم
// ==========================================
document.onclick = (e) => {
    if (menu && toggleMenuDisplay && !menu.contains(e.target) && !toggleMenuDisplay.contains(e.target)) {
        menu.classList.remove("show-menu");
    }
};

const aboutModal = document.getElementById('aboutModal');
const aboutOverlay = document.getElementById('aboutModalOverlay');
const openAboutBtn = document.getElementById('openAboutModalBtn');
const closeAboutBtn = document.getElementById('closeAboutModalBtn');

function openAboutModal() {
    aboutModal?.classList.remove('hidden');
    aboutOverlay?.classList.remove('hidden');
}

function closeAboutModal() {
    aboutModal?.classList.add('hidden');
    aboutOverlay?.classList.add('hidden');
}

openAboutBtn?.addEventListener('click', openAboutModal);
closeAboutBtn?.addEventListener('click', closeAboutModal);
aboutOverlay?.addEventListener('click', closeAboutModal);

(function() {
    const shareBtn = document.getElementById('shareAppBtn');
    const shareToast = document.getElementById('shareToast');

    if (!shareBtn) return;

    shareBtn.addEventListener('click', async () => {
        const menu = document.getElementById('menu');
        if (menu) menu.classList.remove("show-menu");

        const shareData = {
            title: 'تطبيق الزرگ',
            text: 'برنامج تعليمي تفاعلي لرسم القرآن الكريم بطريقة سهلة ومبسطة.',
            url: window.location.href 
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                console.log('تمت المشاركة بنجاح');
            } catch (err) {
                console.log('تم إلغاء المشاركة أو حدث خطأ:', err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareData.url);
                if(shareToast) {
                    shareToast.classList.remove('hidden');
                    setTimeout(() => {
                        shareToast.classList.add('hidden');
                    }, 2000);
                }
            } catch (err) {
                console.error('فشل نسخ الرابط:', err);
                alert('رابط التطبيق هو: ' + shareData.url);
            }
        }
    });
})();

// ==========================================
// الكناش (المذكرة)
// ==========================================
const kunnashMenuBtnIcon = document.querySelector('li i.fa-note-sticky');
const kunnashMenuBtn = kunnashMenuBtnIcon ? kunnashMenuBtnIcon.parentElement : null;
const kunnashModal = document.getElementById('kunnashModal');
const kunnashOverlay = document.getElementById('kunnashModalOverlay');
const closeKunnashBtn = document.getElementById('closeKunnashBtn');
const kunnashTextArea = document.getElementById('kunnashTextArea');
const saveKunnashBtn = document.getElementById('saveKunnashBtn');
const kunnashMessage = document.getElementById('kunnashMessage');

function isProUser() {
    return true;
}

function isIOS() {
    return ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform)
           || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
}

kunnashMenuBtn?.addEventListener('click', () => {
    const menu = document.getElementById('menu');
    if(menu) menu.classList.remove("show-menu");
    
    kunnashModal?.classList.remove('hidden');
    kunnashOverlay?.classList.remove('hidden');

    if (!isProUser()) {
        if(kunnashTextArea) { kunnashTextArea.value = ""; kunnashTextArea.disabled = true; }
        if(saveKunnashBtn) saveKunnashBtn.disabled = true;
        showKunnashMessage("هذه الميزة حصرياً لمشتركي باقة برو.", true);
        return;
    }

    if (isIOS()) {
        if(kunnashTextArea) { kunnashTextArea.value = ""; kunnashTextArea.disabled = true; }
        if(saveKunnashBtn) saveKunnashBtn.disabled = true;
        showKunnashMessage("عذراً، ميزة الكناش لا تعمل حالياً على أجهزة iPhone.", true);
        return;
    }

    if(kunnashTextArea) kunnashTextArea.disabled = false;
    if(saveKunnashBtn) saveKunnashBtn.disabled = false;

    const savedNotes = localStorage.getItem("zarag_kunnash");
    if(kunnashTextArea) kunnashTextArea.value = savedNotes ? savedNotes : "";
});

closeKunnashBtn?.addEventListener('click', () => {
    kunnashModal?.classList.add('hidden');
    kunnashOverlay?.classList.add('hidden');
});

kunnashOverlay?.addEventListener('click', () => {
    kunnashModal?.classList.add('hidden');
    kunnashOverlay?.classList.add('hidden');
});

saveKunnashBtn?.addEventListener('click', () => {
    if (!isProUser() || isIOS()) return;

    const newNotes = kunnashTextArea ? kunnashTextArea.value : "";
    saveKunnashBtn.disabled = true;
    saveKunnashBtn.innerHTML = 'جاري الحفظ... <i class="fa-solid fa-spinner fa-spin"></i>';

    try {
        localStorage.setItem("zarag_kunnash", newNotes);
        saveKunnashBtn.disabled = false;
        saveKunnashBtn.innerHTML = 'حفظ الملاحظات <i class="fa-solid fa-floppy-disk"></i>';
        showKunnashMessage("تم حفظ الملاحظات محلياً بنجاح!");
    } catch (e) {
        saveKunnashBtn.disabled = false;
        saveKunnashBtn.innerHTML = 'حفظ الملاحظات <i class="fa-solid fa-floppy-disk"></i>';
        showKunnashMessage("حدث خطأ أثناء الحفظ. قد تكون مساحة التخزين غير متاحة.", true);
        console.error("خطأ في التخزين المحلي:", e);
    }
});

function showKunnashMessage(msg, isError = false) {
    if(!kunnashMessage) return;
    kunnashMessage.textContent = msg;
    kunnashMessage.classList.remove('hidden');
    kunnashMessage.style.color = isError ? '#d4493c' : '#2b6e2f';
    kunnashMessage.style.backgroundColor = isError ? '#fdecea' : '#e9f5e6';
    
    setTimeout(() => {
        kunnashMessage.classList.add('hidden');
    }, 3000);
}

// ==========================================
// إدارة الإشعارات (Push Notifications)
// ==========================================
(function() {
    const enableNotificationsBtn = document.getElementById('enableNotificationsBtn');
    
    if (enableNotificationsBtn) {
        enableNotificationsBtn.addEventListener('click', () => {
            const menu = document.getElementById('menu');
            if (menu) menu.classList.remove('show-menu');

            if (!('Notification' in window) || !('serviceWorker' in navigator)) {
                alert('عذراً، متصفحك الحالي لا يدعم ميزة الإشعارات.');
                return;
            }

            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    showWelcomeNotification();
                    const appToast = document.getElementById('appToast');
                    const appToastIcon = document.getElementById('appToastIcon');
                    const appToastText = document.getElementById('appToastText');
                    
                    if (appToast && appToastIcon && appToastText) {
                        appToastText.textContent = "تم تفعيل الإشعارات بنجاح!";
                        appToastIcon.className = "fa-solid fa-bell";
                        appToast.classList.add('show');
                        appToast.classList.remove('hidden');
                        
                        setTimeout(() => {
                            appToast.classList.remove('show');
                            setTimeout(() => appToast.classList.add('hidden'), 400);
                        }, 3000);
                    }
                } else {
                    alert('تم رفض صلاحية الإشعارات. يمكنك تفعيلها لاحقاً من إعدادات المتصفح.');
                }
            });
        });
    }

    function showWelcomeNotification() {
        navigator.serviceWorker.ready.then(registration => {
            registration.showNotification('الزرگ', {
                body: 'مرحباً بك! سيتم تنبيهك هنا بأي تحديثات أو قواعد جديدة.',
                icon: 'logo.png', 
                badge: 'logo.png', 
                vibrate: [200, 100, 200],
                dir: 'rtl',
                tag: 'zarag-welcome-notification'
            });
        });
    }
})();

// ==========================================
// التنقل بين الكلمات (السابق والتالي)
// ==========================================
const previousWordBtn = document.getElementById("previousWordBtn");
const nextWordBtn = document.getElementById("nextWordBtn");

if(previousWordBtn) {
    previousWordBtn.onclick = () => {
        if (currentIndex > 0) showQuestion(currentIndex - 1);
    };
}
if(nextWordBtn) {
    nextWordBtn.onclick = () => {
        showQuestion(currentIndex + 1);
    };
}

// ==========================================
// التوافقية مع المتصفحات القديمة
// ==========================================
(function() {
    var isOldBrowser = false;
    if (!window.localStorage || !window.fetch || !window.Promise || !window.JSON) {
        isOldBrowser = true;
    }
    try {
        eval("var test = async function() { await Promise.resolve(); };");
    } catch (e) {
        isOldBrowser = true; 
    }
    if (isOldBrowser) {
        var oldWarningElement = document.getElementById("oldBrowserWarning");
        if (oldWarningElement) oldWarningElement.style.display = "flex";
    }
})();

// ==========================================
// النوافذ المتنوعة (المشتركين، العروض، الإعدادات)
// ==========================================
(function() {
    const subscribersModal = document.getElementById('subscribersModal');
    const subscribersOverlay = document.getElementById('subscribersModalOverlay');
    const showSubscribersBtn = document.getElementById('showSubscribersModalBtn');
    const closeSubscribersBtn = document.getElementById('closeSubscribersModalBtn');

    function openSubscribersModal() {
        if (subscribersModal && subscribersOverlay) {
            subscribersModal.classList.remove('hidden');
            subscribersOverlay.classList.remove('hidden');
        }
        const menu = document.getElementById('menu');
        if (menu) menu.classList.remove('show-menu');
    }

    function closeSubscribersModal() {
        if (subscribersModal && subscribersOverlay) {
            subscribersModal.classList.add('hidden');
            subscribersOverlay.classList.add('hidden');
        }
    }

    if (showSubscribersBtn) showSubscribersBtn.addEventListener('click', openSubscribersModal);
    if (closeSubscribersBtn) closeSubscribersBtn.addEventListener('click', closeSubscribersModal);
    if (subscribersOverlay) subscribersOverlay.addEventListener('click', closeSubscribersModal);
})();

(function() {
    const offersModal = document.getElementById('offersModal');
    const offersOverlay = document.getElementById('offersModalOverlay');
    const showOffersBtn = document.getElementById('showOffersModalBtn');
    const closeOffersBtn = document.getElementById('closeOffersModalBtn');
    const showOffersModalBtn = document.getElementById("showOffersModalBtn"); // تم إصلاح التعريف

    function openOffersModal() {
        const menu = document.getElementById('menu');
        if (menu) menu.classList.remove('show-menu');
    }

    function closeOffersModal() {
        if (offersModal && offersOverlay) {
            offersModal.classList.add('hidden');
            offersOverlay.classList.add('hidden');
        }
    }

    if (showOffersBtn) showOffersBtn.addEventListener('click', openOffersModal);
    if (closeOffersBtn) closeOffersBtn.addEventListener('click', closeOffersModal);
    if (offersOverlay) offersOverlay.addEventListener('click', closeOffersModal);
    
    if(showOffersModalBtn) showOffersModalBtn.style.display = "none";
})();

(function() {
    const settingsBtn = document.getElementById('showSettingsModalBtn');
    const settingsModal = document.getElementById('settingsModal');
    const settingsOverlay = document.getElementById('settingsModalOverlay');
    const closeSettingsBtn = document.getElementById('closeSettingsModalBtn');
    
    const notificationToggle = document.getElementById('notificationToggle');
    const settingsMessage = document.getElementById('settingsMessage');

    const isNotificationsEnabled = localStorage.getItem('zarag_notifications') === 'true';
    if (notificationToggle) {
        notificationToggle.checked = isNotificationsEnabled;
    }

    function openSettingsModal() {
        if (settingsModal && settingsOverlay) {
            settingsModal.classList.remove('hidden');
            settingsOverlay.classList.remove('hidden');
        }
        const menu = document.getElementById('menu');
        if (menu) menu.classList.remove('show-menu');
    }

    function closeSettingsModal() {
        if (settingsModal && settingsOverlay) {
            settingsModal.classList.add('hidden');
            settingsOverlay.classList.add('hidden');
        }
        if (settingsMessage) settingsMessage.classList.add('hidden');
    }

    function showSettingsMsg(msg, isError = false) {
        if (!settingsMessage) return;
        settingsMessage.textContent = msg;
        settingsMessage.classList.remove('hidden');
        settingsMessage.style.color = isError ? '#d4493c' : '#2b6e2f';
        settingsMessage.style.backgroundColor = isError ? '#fdecea' : '#e9f5e6';
        
        setTimeout(() => {
            settingsMessage.classList.add('hidden');
        }, 3000);
    }

    if (notificationToggle) {
        notificationToggle.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            if (isChecked) {
                if ('Notification' in window) {
                    Notification.requestPermission().then(permission => {
                        if (permission === 'granted') {
                            localStorage.setItem('zarag_notifications', 'true');
                            showSettingsMsg("تم تفعيل الإشعارات بنجاح!");
                        } else {
                            e.target.checked = false;
                            localStorage.setItem('zarag_notifications', 'false');
                            showSettingsMsg("تم رفض صلاحية الإشعارات من المتصفح.", true);
                        }
                    });
                } else {
                    e.target.checked = false;
                    showSettingsMsg("متصفحك لا يدعم خاصية الإشعارات.", true);
                }
            } else {
                localStorage.setItem('zarag_notifications', 'false');
                showSettingsMsg("تم إيقاف الإشعارات.");
            }
        });
    }

    if (settingsBtn) settingsBtn.addEventListener('click', openSettingsModal);
    if (closeSettingsBtn) closeSettingsBtn.addEventListener('click', closeSettingsModal);
    if (settingsOverlay) settingsOverlay.addEventListener('click', closeSettingsModal);
})();

// ==========================================
// ميزة شگرلي (استخراج النص وتصحيحه)
// ==========================================
(function() {
    const shagarlyBtn = document.getElementById('shagarlyBtn');
    const cameraInput = document.getElementById('cameraInput');
    const shagarlyModal = document.getElementById('shagarlyModal');
    const shagarlyOverlay = document.getElementById('shagarlyModalOverlay');
    const closeShagarlyBtn = document.getElementById('closeShagarlyBtn');
    const shagarlyLoading = document.getElementById('shagarlyLoading');
    const shagarlyResult = document.getElementById('shagarlyResult');

    function toggleShagarlyModal(show) {
        if (show) {
            shagarlyModal?.classList.remove('hidden');
            shagarlyOverlay?.classList.remove('hidden');
            const menu = document.getElementById('menu');
            if (menu) menu.classList.remove('show-menu');
        } else {
            shagarlyModal?.classList.add('hidden');
            shagarlyOverlay?.classList.add('hidden');
        }
    }

    if (closeShagarlyBtn) closeShagarlyBtn.addEventListener('click', () => toggleShagarlyModal(false));
    if (shagarlyOverlay) shagarlyOverlay.addEventListener('click', () => toggleShagarlyModal(false));

    if (shagarlyBtn) {
        shagarlyBtn.addEventListener('click', () => {
            if(cameraInput) cameraInput.click();
        });
    }

    if (cameraInput) {
        cameraInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            toggleShagarlyModal(true);
            if(shagarlyResult) shagarlyResult.innerHTML = "";
            if(shagarlyLoading) shagarlyLoading.style.display = "block";

            try {
                // Tesseract.js (يحتاج المكتبة ليعمل)
                const result = await Tesseract.recognize(file, 'ara', {
                    logger: m => console.log(m) 
                });

                const extractedText = result.data.text;
                const correctedHTML = correctQuranicText(extractedText);
                
                if(shagarlyLoading) shagarlyLoading.style.display = "none";
                if(shagarlyResult) shagarlyResult.innerHTML = correctedHTML;

            } catch (error) {
                console.error("خطأ في قراءة الصورة:", error);
                if(shagarlyLoading) shagarlyLoading.style.display = "none";
                if(shagarlyResult) shagarlyResult.innerHTML = "<span style='color: red;'>حدث خطأ أثناء قراءة اللوح. حاول التقاط صورة أوضح.</span>";
            }
        });
    }

    function correctQuranicText(extractedText) {
        const extractedWords = extractedText.trim().replace(/\s+/g, ' ').split(' ');
        const allCorrectWords = Angko.questionsData.join(" ").split(" ");
        let finalHTML = "";

        extractedWords.forEach(word => {
            const cleanWord = word.replace(/[\u064B-\u065F]/g, ''); 
            const isCorrect = allCorrectWords.some(correctWord => correctWord.includes(cleanWord));

            if (isCorrect) {
                finalHTML += `<span style="color: #2b6e2f;">${word}</span> `;
            } else {
                finalHTML += `<span style="color: #d4493c; border-bottom: 2px dashed #d4493c;" title="كلمة بها خطأ أو غير واضحة">${word}</span> `;
            }
        });

        return finalHTML || "لم يتم التعرف على أي نص واضح.";
    }
})();

// ==========================================
// البوت (حساني)
// ==========================================
(function() {
    const chatbotModal = document.getElementById('chatbotModal');
    const chatbotOverlay = document.getElementById('chatbotModalOverlay');
    const closeChatbotBtn = document.getElementById('closeChatbotBtn');
    const showChatBtn = document.getElementById('showChatAiModalBtn');
    const chatbotInput = document.getElementById('chatbotInput');
    const sendBtn = document.getElementById('sendChatbotBtn');
    const messagesContainer = document.getElementById('chatbotMessages');

    let botData = {}; 

    async function loadBotData() {
        try {
            const response = await fetch('json/data.json');
            if (!response.ok) throw new Error('فشل تحميل البيانات');
            botData = await response.json();
            console.log('✅ تم تحميل بيانات حساني بنجاح');
        } catch (error) {
            console.error('⚠️ خطأ في تحميل بيانات البوت:', error);
            botData = {};
        }
    }
    loadBotData();

    function getBotResponse(input) {
        if (!botData || Object.keys(botData).length === 0) {
            return "عذراً، قاعدة البيانات غير جاهزة بعد.";
        }
        const normalizedInput = input.trim();
        for (const key in botData) {
            if (normalizedInput.includes(key)) {
                return botData[key];
            }
        }
        return "ذ الي گلت مافهمت";
    }

    function addMessage(text, isUser = false) {
        if(!messagesContainer) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = isUser ? 'user-msg' : 'bot-msg';
        msgDiv.textContent = text;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; 
    }

    function handleSend() {
        if(!chatbotInput) return;
        const userText = chatbotInput.value.trim();
        if (!userText) return;

        addMessage(userText, true);
        chatbotInput.value = '';

        setTimeout(() => {
            const reply = getBotResponse(userText);
            addMessage(reply, false);
        }, 300);
    }

    function toggleModal(show) {
        if (show) {
            chatbotModal?.classList.remove('hidden');
            chatbotOverlay?.classList.remove('hidden');
            const menu = document.getElementById('menu');
            if (menu) menu.classList.remove('show-menu');
            setTimeout(() => { if(chatbotInput) chatbotInput.focus(); }, 100);
        } else {
            chatbotModal?.classList.add('hidden');
            chatbotOverlay?.classList.add('hidden');
        }
    }

    if (showChatBtn) showChatBtn.addEventListener('click', () => toggleModal(true));
    if (closeChatbotBtn) closeChatbotBtn.addEventListener('click', () => toggleModal(false));
    if (chatbotOverlay) chatbotOverlay.addEventListener('click', () => toggleModal(false));
    if (sendBtn) sendBtn.addEventListener('click', handleSend);
    
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
            }
        });
    }
})();

// ==========================================
// إدارة تقدم الطالب (Progress Modal) الموحدة
// ==========================================
const progressModal = document.getElementById('progressModal');
const progressModalOverlay = document.getElementById('progressModalOverlay');
const closeProgressModalBtn = document.getElementById('closeProgressModalBtn');
const activateProgressBtn = document.getElementById('activateProgressBtn'); 
const showProgressBtn = document.getElementById('showProgressModalBtn');

function toggleProgressModal(show) {
    if (show) {
        calculateProgress();
        if(progressModal) progressModal.classList.remove('hidden');
        if(progressModalOverlay) progressModalOverlay.classList.remove('hidden');
        
        const menu = document.getElementById('menu');
        if (menu) menu.classList.remove('show-menu');
    } else {
        if(progressModal) progressModal.classList.add('hidden');
        if(progressModalOverlay) progressModalOverlay.classList.add('hidden');
    }
}

if (showProgressBtn) showProgressBtn.addEventListener('click', () => toggleProgressModal(true));
if (closeProgressModalBtn) closeProgressModalBtn.addEventListener('click', () => toggleProgressModal(false));
if (progressModalOverlay) progressModalOverlay.addEventListener('click', () => toggleProgressModal(false));

function isAppInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

document.addEventListener("DOMContentLoaded", () => {
    if (!isAppInstalled()) {
        if(installModal) installModal.classList.remove('hidden');
        if(installOverlay) {
            installOverlay.classList.remove('hidden');
            installOverlay.removeEventListener('click', installModal);
        }
    }
});

// ==========================================
// فتح المودال عبر الهاش (#modal-name)
// ==========================================
(function() {
    const modalMap = {
        'auth': 'showAuthModalBtn',
        'about': 'openAboutModalBtn',
        'color': 'showColorModalBtn',
        'kunnash': 'showKennachModal',
        'subscribers': 'showSubscribersModalBtn',
        'offers': 'showOffersModalBtn',
        'settings': 'showSettingsModalBtn',
        'shagarly': 'shagarlyBtn',
        'chatbot': 'showChatAiModalBtn',
        'progress': 'showProgressModalBtn'
    };

    function openModalByName(name) {
        const id = modalMap[name];
        if (!id) {
            console.warn('مودال غير معروف: ' + name);
            return;
        }
        const element = document.getElementById(id);
        if (element) {
            element.click();
        } else {
            console.warn('عنصر الزر غير موجود: ' + id);
        }
    }

    function handleHash() {
        const hash = window.location.hash.replace('#', '').trim();
        if (hash) {
            // استخراج اسم المودال (تجاهل أي معلمات بعد ? أو &)
            const modalName = hash.split('?')[0].split('&')[0];
            openModalByName(modalName);
        }
    }

    // عند تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', handleHash);
    } else {
        handleHash();
    }

    // عند تغيير الهاش يدوياً
    window.addEventListener('hashchange', handleHash);
})();