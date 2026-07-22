const bismillahText = document.getElementById("bismillahText")
const ta7at = document.getElementById("ta7at");
const lewa7 = document.getElementById("lewa7");
const abiat = document.getElementById("abiat");
const menu = document.getElementById("menu");
const toggleMenuDisplay = document.getElementById("toggleMenuDisplay");
const elkalamah = document.getElementById("elkalamah");
const qid = document.getElementById("qid");
const mithal = document.getElementById("mithal");

const Angko = {
    questionsData : localStorage.questions ? JSON.parse(localStorage.questions) : [], 
    answersData : localStorage.answers ? JSON.parse(localStorage.answers) : [], 
    qiyoodData : localStorage.qiyood ? JSON.parse(localStorage.qiyood) : [], 
    amthilahData : localStorage.amthilah ? JSON.parse(localStorage.amthilah) : [],
    dmairData :  localStorage.damir ? JSON.parse(localStorage.damir) : [],
    rulesData : [],
    lamatRulesData : []
}

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

const bismillahTextContent     = "لسم الله الرحمن الرحيم"
const abiatDefult        = "يــــاربنا عـــبدك ذلك لامـــــات\nلامــات يـارب أخـر عــنه المــــمات\nحـتى يــكون عـــــالما وحــــــاملا\nكــتاب ربـه الـذي قــــد أنــــــزلا\nوللـــتقاء والـــــــــسخا مــــلازما\nوللــعلوم فــــوق كـــــل الــــعلما\nوســــع لــه فـــي قـــبره وأدخـــله\nأعـــــلى الـــجنان يـالها مــن درجـه\nومـــن أحــــب ربــــنا فــــاكرمه\nمــــــعه وانـــت راض راض عـــــنه\n\nهذا النظم\nكانت جدة الوالد\nلأبيه رحمها\nالله وأسكنها\nفسيح جناته\nتدعوا له به"
const adsText            = "هذه مساحة خاصة بالإعلانات للمزيد من المعلومات تواصلوا معنا عبر صفحتنا على الفيسبوك."
const marqueeTextContent = "قال الشيخ الفاضل لامات ولد الطالب: يا طالبے رسم القرَان هاكم * هذا الذے  ابن شيخنا أهداكم | وهو بسبق حائز تفضيلا * مستوجب ثناءنا الجميلا"

const ZARAG_FEATURES = {
    NONE: 0,            // 0000 (مستخدم مجاني بدون ميزات إضافية)
    COLOR_THEMES: 1,    // 0001 (ميزة تغيير ألوان لوحة الرسم)
    KUNNASH_SAVE: 2,    // 0010 (ميزة حفظ وتدوين القيود في الكناش)
    ADVANCED_STATS: 4,  // 0100 (ميزة رؤية إحصائيات متقدمة لتقدمك)
};

// 2. دمج الميزات لتكوين الباقات المدفوعة باستخدام بوابة OR (|)
const ZARAG_PLANS = {
    FREE: ZARAG_FEATURES.NONE,
    
    // باقة بلس تشمل: تغيير الألوان + الإحصائيات (1 | 4 = 5)
    PLUS: ZARAG_FEATURES.COLOR_THEMES | ZARAG_FEATURES.ADVANCED_STATS,
    
    // باقة برو تشمل كل الميزات: تغيير الألوان + الكناش + الإحصائيات (1 | 2 | 4 = 7)
    PRO: ZARAG_FEATURES.COLOR_THEMES | ZARAG_FEATURES.KUNNASH_SAVE | ZARAG_FEATURES.ADVANCED_STATS
};

// 3. محاكاة لرموز التفعيل التي ترسلها للمستخدمين بعد الدفع (تستبدل بنظامك الخاص لاحقاً)
const ACTIVATION_CODES = {
    "ZARAG-PLUS-2026": ZARAG_PLANS.PLUS, // يمنح القيمة 5
    "ZARAG-PRO-MAX": ZARAG_PLANS.PRO     // يمنح القيمة 7
};

// ربط واجهة التقدم بالأزرار
const showProgressBtn = document.getElementById('showProgressModalBtn');
const progressModalElement = document.getElementById('progressModal');
const progressOverlay = document.getElementById('progressModalOverlay');
const closeProgressBtn = document.getElementById('closeProgressModalBtn');

function toggleProgressModal(show) {
    if (show) {
        // حساب التقدم قبل إظهار النافذة
        calculateProgress();
        
        progressModalElement.classList.remove('hidden');
        progressOverlay.classList.remove('hidden');
        
        // إغلاق القائمة الجانبية
        const menu = document.getElementById('menu');
        if (menu) menu.classList.remove('show-menu');
    } else {
        progressModalElement.classList.add('hidden');
        progressOverlay.classList.add('hidden');
    }
}

if (showProgressBtn) showProgressBtn.addEventListener('click', () => toggleProgressModal(true));
if (closeProgressBtn) closeProgressBtn.addEventListener('click', () => toggleProgressModal(false));
if (progressOverlay) progressOverlay.addEventListener('click', () => toggleProgressModal(false));


// جلب عناصر واجهة التفعيل من الـ HTML
const premiumCodeInput = document.getElementById("premiumCodeInput");
const activateBtn = document.getElementById("activateBtn");

if (activateBtn && premiumCodeInput) {
    activateBtn.addEventListener("click", () => {
        const userCode = premiumCodeInput.value.trim();

        // التحقق مما إذا كان الكود المدخل موجوداً في قائمة الأكواد الصالحة
        if (ACTIVATION_CODES[userCode] !== undefined) {
            const assignedPlanValue = ACTIVATION_CODES[userCode];

            // حفظ القيمة الرقمية للباقة في الذاكرة المحلية
            localStorage.setItem("zarag_permissions", assignedPlanValue);

            alert("🎉 تم تفعيل باقتك بنجاح! سيتم تحديث التطبيق الآن لتفعيل الميزات.");
            location.reload(); // إعادة تحميل الصفحة لتطبيق التغييرات
        } else {
            alert("❌ رمز التفعيل غير صحيح. يرجى التحقق منه أو التواصل عبر واتساب.");
        }
    });
}

// دالة مساعدة لقراءة صلاحيات المستخدم الحالية من الذاكرة
function getUserPermissions() {
    // تعطيل نظام الدفع وجعل كل الميزات متاحة مجاناً
    return ZARAG_PLANS.PRO; // 7
}

// مثال 1: التحقق عند محاولة فتح ميزة الكناش
function handleOpenKunnash() {
    const currentPermissions = getUserPermissions();

    // التحقق باستخدام AND (&): هل البت الخاص بالكناش نشط في باقة المستخدم؟
    if (currentPermissions & ZARAG_FEATURES.KUNNASH_SAVE) {
        // الرمز نشط -> افتح الكناش بشكل طبيعي
        console.log("تم السماح بالدخول إلى الكناش.");
        // كود فتح نافذة الكناش الخاص بك يوضع هنا...
    } else {
        // الرمز غير نشط -> اطلب منه الترقية
        alert("🔒 ميزة الكناش مخصصة لمشتركي باقة برو (PRO). يمكنك الترقية من نافذة العروض.");
    }
}

// مثال 2: استخدام النفي !() لحظر الوصول إلى ميزة تغيير الألوان
function handleThemeChange() {
    const currentPermissions = getUserPermissions();

    // إذا كان المستخدم لا يملك صلاحية تغيير الألوان
    if (!(currentPermissions & ZARAG_FEATURES.COLOR_THEMES)) {
        alert("🔒 ميزة تخصيص الألوان تتطلب باقة بلس أو برو.");
        return; // إيقاف الدالة ومنع التغيير
    }

    // كود تغيير الألوان الخاص بك يوضع هنا...
    console.log("تم تطبيق اللون الجديد بنجاح.");
}

// دالة لتشغيل/إيقاف ميزة الإحصائيات المتقدمة بشكل سريع للمستخدم الحالي
function toggleAdvancedStatsFeature() {
    let currentPermissions = getUserPermissions();

    // باستخدام XOR (^): إذا كانت الميزة موجودة فسيتم حذفها، وإذا كانت غائبة فسيتم إضافتها
    currentPermissions = currentPermissions ^ ZARAG_FEATURES.ADVANCED_STATS;

    // حفظ الحالة الجديدة في الذاكرة
    localStorage.setItem("zarag_permissions", currentPermissions);
    
    console.log("تم تحديث الصلاحيات لتصبح قيمتها الرقمية الحالية: " + currentPermissions);
}

/*const supabaseUrl = 'https://your-project-id.supabase.co';
const supabaseKey = 'your-anon-key';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);*/

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
        Angko.rulesData = []; // مصفوفة فارغة في حال الفشل
    }
}

async function loadAllTables() {
	await loadRules();
	
    const merged = await fetchLocalJSON("angko.json");
	
    Angko.questionsData = merged.map(item => item[0]);
    Angko.answersData   = merged.map(item => item[1]);
    Angko.qiyoodData    = merged.map(item => item[2]);
    Angko.amthilahData  = merged.map(item => item[3]);
    
    localStorage.setItem("questions", JSON.stringify(Angko.questionsData))
    localStorage.setItem("answers",   JSON.stringify(  Angko.answersData))
    localStorage.setItem("qiyood",    JSON.stringify(   Angko.qiyoodData))
    localStorage.setItem("amthilah",  JSON.stringify( Angko.amthilahData))
	
    const lastQuestion = localStorage.elkalamah ? Number(localStorage.elkalamah) : 0
	
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

//ے

// تحديث دالة jatk
function jatk() {
    jatkTimes++;
    totalSessionJatk++; // زيادة الإجمالي المحفوظ
    currentSessionJatk++; // زيادة أخطاء الجلسة الحالية
    
    // حفظ الأخطاء في التخزين المحلي
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

// دالة حساب وعرض التقدم
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
	index = parseInt(index)
    elkalamah.classList = "elkalamah"

    if (!Angko.questionsData.length) return;

    if (index >= Angko.questionsData.length) index = 0;
    if (index < 0) index = Angko.questionsData.length;

    currentIndex = index;

    const question = Angko.questionsData[index];
    const answer   = Angko.answersData[index];

    // جلب القيد مباشرة من الكائن المدمج
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
            mithal.classList.add("minimize")
        } else {
            mithal.classList.remove("minimize")
        }
        
    } else {
        mithal.textContent = "...";
    }

    showAnswerButtons(answer);

    localStorage.setItem("elkalamah", index)
    
    console.log(index)
    
    bismillahText.textContent = bismillahTextContent
    abiat.textContent      =    abiatDefult
	
	//clearCanvas()
}


function checkAnswer(chosenWord) {
	chosenWord = chosenWord.trim();
	let lastYaaIndex = ""
	
	const correctAnswer = Angko.answersData[currentIndex].trim();

    if (!(chosenWord == correctAnswer)) {
		jatk();
		
		elkalamah.classList.add("jatk");
		return;
	}
	
    if (
        chosenWord == "محذوفة" ||
        chosenWord == "محذوفان" ||
        chosenWord == "الأول محذوف"
    ) {
        elkalamah.classList.add("red")
    } else if (
        chosenWord == "ثابتة" || 
        chosenWord == "ثابتان" || 
        chosenWord == "الأول ثابت"
    ) {
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
		
		// ابحث عن آخر ألف لكن تجاهل أول وآخر حرف
		const lastAlifIndex = chars
			.map((ch, i) => ch === "ا" && i !== 0 && i !== chars.length - 1 ? i : -1)
			.filter(i => i !== -1)
			.pop(); // آخر ألف في غير أول وآخر الكلمة

		if (lastAlifIndex !== undefined) {
			chars[lastAlifIndex] = "ٰ";
			elkalamah.textContent = chars.join('');
		}
	}
	
	if (chosenWord === "محذوفان") {
		if (elkalamah.textContent.indexOf("ال") != -1) {
			elkalamah.textContent = elkalamah.textContent.replaceAll("ا", "ٰ").replace("ٰ", "ا")
		} else {
			elkalamah.textContent = elkalamah.textContent.replaceAll("ا", "ٰ")
		}
	}
	
	if (chosenWord === "الأول محذوف") {
		const chars = [...elkalamah.textContent];
		
		const lastAlifIndex = chars
			.map((ch, i) => ch === "ا" && i !== 0 && i !== chars.length - 1 ? i : -1)
			.filter(i => i !== -1)

		if (lastAlifIndex !== undefined) {
			chars[lastAlifIndex] = "ٰ";
			elkalamah.textContent = chars.join('');
		}
	}
	
	if (chosenWord === "الأول ثابت") {
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
    	const lastIndex = chars.length - 1
    	
    	const atahIndexes = chars.map((ch, i) => (ch === "ة" && i != 0) ? i : -1).filter(i => i !== -1);
    
    	if (atahIndexes.length > 0) {
			const lastAttah = atahIndexes.pop();
			
			chars[lastAttah] = "ت"
			
			elkalamah.textContent = chars.join('');
		}
	}
	
	if (chosenWord === "اللام الثاني") {		
    	const chars = [...elkalamah.textContent];
    	const lastIndex = chars.length - 1
    	
    	const atahIndexes = chars.map((ch, i) => (ch === "ل" && i != 0) ? i : -1).filter(i => i !== -1);
    	
    	if (elkalamah.textContent == "لله") {
    		elkalamah.textContent = "لله"
    		return
		}
    
    	if (atahIndexes.length > 0) {
			const lastAttah = atahIndexes.pop();
			
			chars[lastAttah] = ""
			
			elkalamah.textContent = chars.join('');
		}
	}
	
	if (chosenWord === "ء") {
    	const chars = [...elkalamah.textContent];
    	const lastIndex = chars.length - 1
    	
    	const atahIndexes = chars.map((ch, i) => (ch === " " && i != 0) ? i : -1).filter(i => i !== -1);
    
    	if (atahIndexes.length > 0) {
			const lastAttah = atahIndexes.pop();
			
			chars[lastAttah] = "ءً"
			
			elkalamah.textContent = chars.join('');
		}
	}
    
    if (chosenWord === "واو") {
	  	const chars = [...elkalamah.textContent];
  		const lastIndex = chars.length - 1;

	  	const alifIndexes = chars.map((ch, i) => (ch === "ا" && i !== 0) ? i : -1).filter(i => i !== -1);

	  	if (alifIndexes.length > 0) {
			    const lastAlifIndex = alifIndexes.pop();
			    chars[lastAlifIndex] = "وٰ";
		 	    elkalamah.textContent = chars.join('');
		 }
	}
	
	if (chosenWord === "النون الأولى") {
		const chars = [...elkalamah.textContent];
		
		// ابحث عن آخر ألف لكن تجاهل أول وآخر حرف
		const lastAlifIndex = chars
			.map((ch, i) => ch === "ن" && i !== 0 && i !== chars.length - 1 ? i : -1)
			.filter(i => i !== -1)
			.pop(); // آخر ألف في غير أول وآخر الكلمة

		if (lastAlifIndex !== undefined) {
			chars[lastAlifIndex] = "";
			elkalamah.textContent = chars.join('');
		}
	}
	
	if (chosenWord === "النون الثانية") {
		const chars = [...elkalamah.textContent];
		
		// ابحث عن آخر ألف لكن تجاهل أول وآخر حرف
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

		// ابحث عن أول "و" ليست في أول الكلمة
		const wawIndex = chars.findIndex((ch, i) => ch === "و" && i !== 0);
		const hamzaIndex = chars.findIndex((ch, i) => ch === "ء" && i !== 0);

		if (wawIndex !== -1) {
			chars[wawIndex] = "ـࣳ"; 
			elkalamah.textContent = chars.join('');
		}
		
		if (hamzaIndex !== -1) {
			chars[hamzaIndex] = "ئ"; 
			elkalamah.textContent = chars.join('');
		}
	}
	
	if (chosenWord === "الواو الثاني") {
		const chars = [...elkalamah.textContent];
		const lastIndex = chars.length - 1;

		const alifIndexes = chars
			.map((ch, i) => (ch === "و" && i !== 0) ? i : -1)
			.filter(i => i !== -1);

		if (alifIndexes.length > 0) {
			const lastAlifIndex = alifIndexes.pop();
			chars[lastAlifIndex] = "ۥ";
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
       	 if (alifIndices[alifIndices.length - 1] === chars.length - 1) {
          	  targetIndex = alifIndices[alifIndices.length - 2];
     	   } else {
          	  targetIndex = alifIndices[alifIndices.length - 1];
       	 }
   	 }
    
    	chars[targetIndex] = "ي";
   	 elkalamah.textContent = chars.join('');
	}
	
	if (chosenWord === "واو محذوفة") {
		const chars = [...elkalamah.textContent];
		const lastIndex = chars.length - 1;

		const alifIndexes = chars
			.map((ch, i) => (ch === "و" && i !== 0) ? i : -1)
			.filter(i => i !== -1);

		if (alifIndexes.length > 0) {
			const lastAlifIndex = alifIndexes.pop();
			chars[lastAlifIndex] = "ۥ";
			elkalamah.textContent = chars.join('');
		}
	}
	
	if (chosenWord === "ياء محذوفة") {
		const chars = [...elkalamah.textContent];
		const lastIndex = chars.length - 1;

		const alifIndexes = chars
			.map((ch, i) => ((ch === "ي" || ch === "ے") && i !== 0) ? i : -1)
			.filter(i => i !== -1);

		if (alifIndexes.length > 0) {
			const lastAlifIndex = alifIndexes.pop();
			chars[lastAlifIndex] = "ۦ";
			elkalamah.textContent = chars.join('');
		}
	}
	
	if (chosenWord === "ياء زائدة") {
		const chars = [...elkalamah.textContent];
		const lastIndex = chars.length - 1;

		const alifIndexes = chars
			.map((ch, i) => ((ch === "ي" || ch === "ے") && i !== 0) ? i : -1)
			.filter(i => i !== -1);
			
		if (alifIndexes.length > 0) {
			const lastAlifIndex = alifIndexes.pop();
			chars[lastAlifIndex] = "ۦ";
			elkalamah.textContent = chars.join('');
		}
	}
	
	if (chosenWord === "الياء الأولى") {
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
	
	if (chosenWord === "الياء الثانية") {
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
			
		if (elkalamah.textContent.includes("وانما")) {
			elkalamah.textContent = "وان ما"
			return
		}
		
		if (elkalamah.textContent.includes("انما")) {
			elkalamah.textContent = "ان ما"
			return
		}
		
		if (spaceIndex !== undefined) {
			if (
				elkalamah.textContent.includes("ا لا") ||
				elkalamah.textContent.includes("ا لن") ||
				elkalamah.textContent.includes("ا لم") ||
				elkalamah.textContent.includes("ا ما")
			) {
				chars[spaceIndex] = "ن ";
			
				elkalamah.textContent = chars.join('');
			}
		}
	}
}

function applySpecialRules(word, chosenWord) {
    const matchedRule = Angko.rulesData.find(rule => 
        rule.type === chosenWord && rule.input === word
    );
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
    setTimeout(() => {
        loadOverlay.style.display = "none";
    }, 500);
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

document.addEventListener("DOMContentLoaded", () => {
    loadAllTables();
    setupButtons();
    showQuestion();
    loadProgress();
    generateAndSetProgressCode(); // <-- إضافة هذا السطر

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
    }
});

let deferredPrompt;
const installModal = document.getElementById('installModal');
const pwaOverlay = document.getElementById('installOverlay');
const showInstallModalBtn = document.getElementById('showInstallModalBtn');
const continueBrowserBtn = document.getElementById('continueBrowserBtn');
const confirmInstallBtn = document.getElementById('confirmInstallBtn');


window.addEventListener('beforeinstallprompt', (e) => {
    // منع المتصفح من إظهار رسالته الافتراضية[cite: 2]
    e.preventDefault();
    
    // حفظ الحدث لاستخدامه عند ضغط المستخدم[cite: 2]
    deferredPrompt = e;
});

function openInstallModal() {
    installModal.classList.remove('hidden');
    pwaOverlay.classList.remove('hidden');
}

function closeInstallModal() {
    installModal.classList.add('hidden');
    installOverlay.classList.add('hidden');
}

document.addEventListener("fullscreenchange", ()=> {
    if (document.fullscreenElement) {
        closeInstallModal()
    } else {
        openInstallModal()
    }
})

showInstallModalBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        // إظهار نافذة التثبيت الخاصة بالنظام مباشرة
        deferredPrompt.prompt();
        
        // انتظار رد المستخدم[cite: 2]
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('تم قبول تثبيت التطبيق'); //[cite: 2]
        } else {
            console.log('تم رفض تثبيت التطبيق'); //[cite: 2]
        }
        
        deferredPrompt = null; //[cite: 2]
    } else {
        // في حال كان المستخدم على iOS/Safari أو متصفح لا يدعم الحدث[cite: 2]
        alert("لتثبيت التطبيق، يرجى الضغط على زر 'مشاركة' في أسفل المتصفح ثم اختيار 'إضافة إلى الشاشة الرئيسية'.");
    }
});

window.addEventListener('appinstalled', () => {
    // إخفاء زر التثبيت وتفريغ المتغير
    showInstallModalBtn.style.display = 'none';
    deferredPrompt = null;
    console.log('تم تثبيت تطبيق الزرگ بنجاح');

    // إخفاء نافذة الإجبار والخلفية بمجرد التثبيت
    const installModal = document.getElementById('installModal');
    const installOverlay = document.getElementById('installOverlay');
    
    if (installModal && installOverlay) {
        installModal.classList.add('hidden');
        installOverlay.classList.add('hidden');
    }
});

continueBrowserBtn.addEventListener('click', ()=>{
    closeInstallModal()
    document.querySelectorAll(".modal").forEach(e=> e.classList.add("hidden"))
    document.documentElement.requestFullscreen()
})

// ==================== مصفوفة أكواد التفعيل ====================
// يمكنك إضافة أو إزالة الأكواد من هذه المصفوفة بسهولة
const activationPlusCodes = [
    "1234",
    "5678",
    "9999",
    "8788",
    "2026"
];

const activationProCodes  = [
    "3457",
    "5678",
    "0984",
    "5643",
    "2008"
];

// ==================== تحميل صفحات المصحف ====================
// ==================== كشف متصفحات التطبيقات والمتصفحات غير المدعومة لـ PWA ====================
document.addEventListener("DOMContentLoaded", () => {
    
    (function detectBrowsers() {
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        
        // 1. التحقق من وجود بصمة متصفحات التطبيقات داخل فيسبوك/انستغرام وغيرها
        const isInApp = (ua.indexOf("FBAN") > -1) || 
                        (ua.indexOf("FBAV") > -1) || 
                        (ua.indexOf("Instagram") > -1) || 
                        (ua.indexOf("TikTok") > -1) ||
                        (ua.indexOf("Line") > -1);

        if (isInApp) {
            // محاولة التحويل التلقائي في أندرويد لمتصفح كروم
            if (/android/i.test(ua)) {
                const url = window.location.href.replace(/^https?:\/\//i, '');
                window.location.href = `intent://${url}#Intent;scheme=https;package=com.android.chrome;end;`;
            }
            
            // إظهار رسالة التنبيه الإجبارية للتطبيقات الداخلية
            const warningDiv = document.getElementById('inAppBrowserWarning');
            if (warningDiv) {
                warningDiv.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
            return; // إنهاء التنفيذ هنا حتى لا تظهر نافذتان معاً
        }

        // 2. التحقق من المتصفحات المدعومة لتثبيت الـ PWA (Chrome, Safari, Samsung Browser)
        const isSamsung = ua.indexOf("SamsungBrowser") > -1;
        
        // استثناء المتصفحات التي تستخدم محرك كروم ولكنها ليست كروم الرسمي (مثل Edge أو Opera)
        const isChrome = (ua.indexOf("Chrome") > -1 || ua.indexOf("CriOS") > -1) && 
                         !isSamsung && 
                         ua.indexOf("Edg") === -1 && 
                         ua.indexOf("OPR") === -1;
                         
        const isSafari = ua.indexOf("Safari") > -1 && 
                         ua.indexOf("Chrome") === -1 && 
                         ua.indexOf("CriOS") === -1;

        // إذا لم يكن الطالب يستخدم أي من المتصفحات الثلاثة المدعومة، تظهر النافذة التحذيرية
        if (!isSamsung && !isChrome && !isSafari) {
            const pwaWarningDiv = document.getElementById('pwaBrowserWarning');
            if (pwaWarningDiv) {
                pwaWarningDiv.style.display = 'flex';
            }
        }
    })();
});


/* ========================================================
الميزة المدفوعة : تغيير ألوان اللوح (معلقة حالياً)
لفك التعليق عنها مستقبلاً، قم بإزالة علامتي /* و */
// ==================== منطق نافذة تغيير الألوان وتفعيل الميزة ====================
(function() {
    // الألوان المدعومة (Hex)
    const premiumColors = ["#549E91", "#D4493C", "#54C866", "#A89122"];
    
    // دالة مساعدة لتحويل الـ Hex إلى RGBA تلقائياً بشفافية 10% (0.1)
    function hexToRgba(hex, alpha = 0.1) {
        let c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return `rgba(${(c>>16)&255}, ${(c>>8)&255}, ${c&255}, ${alpha})`;
        }
        return `rgba(0, 0, 0, ${alpha})`;
    }
    
    // فحص حالة التفعيل واللون المخزن مسبقاً
    let isUnlocked   = true;
    let currentColor = localStorage.getItem("zarag_premium_color") || null;
    let currentRgba  = localStorage.getItem("zarag_premium_rgba")  || null;
    
    // ربط عناصر واجهة المستخدم
    const colorModal = document.getElementById('colorModal');
    const colorOverlay = document.getElementById('colorModalOverlay');
    const showColorBtn = document.getElementById('showColorModalBtn');
    const closeColorBtn = document.getElementById('closeColorModalBtn');
    
    const codeInput = document.getElementById('premiumCodeInput');
    const premiumMessage = document.getElementById('premiumMessage');
    const colorOptions = document.querySelectorAll('.color-option');

    const lewa7Container = document.getElementById("lewa7Container");
    const lewa7Back = document.querySelector(".lewa7-back");
    const aboutMe = document.querySelector(".about-me");
    const btns = document.querySelectorAll(".btns button");
    const mithalSpan = document.querySelector(".mithal");
    const qidSpan = document.querySelector(".qid");
    const hameshSpans = document.querySelectorAll(".hamesh");

    // دالة تطبيق الألوان على الواجهة
    function applyPremiumColor(colorHex, colorRgba) {
        if (!colorHex || !isUnlocked) return;
        
        // إذا لم يتم تمرير الـ RGBA، نقوم بتوليده تلقائياً من الـ Hex
        if (!colorRgba) {
            colorRgba = hexToRgba(colorHex, 0.1);
        }
        
        if (lewa7Back) {
            lewa7Back.style.backgroundColor = colorHex;
            lewa7Back.style.backgroundImage = `linear-gradient(${colorHex}cc 5%, transparent 5%), linear-gradient(90deg, ${colorHex}cc 5%, transparent 5%)`;
        }
        if (aboutMe) aboutMe.style.backgroundColor = colorHex;
        if (btns) btns.forEach(btn => btn.style.backgroundColor = colorHex);
        if (mithalSpan) mithalSpan.style.borderColor = colorHex;
        if (qidSpan) qidSpan.style.color = colorHex;
        if (hameshSpans) hameshSpans.forEach(h => { if (h) h.style.backgroundColor = colorHex; });
        
        // تحديث متغيرات CSS الشاملة
        document.documentElement.style.setProperty('--gold-dark', colorHex);
        document.documentElement.style.setProperty('--gold-transparent', colorRgba);
        
        // التخزين المحلي
        localStorage.setItem("zarag_premium_color", colorHex);
        localStorage.setItem("zarag_premium_rgba", colorRgba);
        currentColor = colorHex;
        currentRgba = colorRgba;

        // تحديث العنصر النشط
        colorOptions.forEach(opt => {
            if(opt.getAttribute('data-color') === colorHex) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });
    }

    // فتح وإغلاق النافذة
    function toggleModal(show) {
        if (show) {
            colorModal.classList.remove('hidden');
            colorOverlay.classList.remove('hidden');
            document.getElementById('menu').classList.remove("show-menu");
            
            if (isUnlocked) {
                premiumMessage.textContent = "الميزة مفعّلة لديك، يمكنك تغيير الألوان بحرية!";
                premiumMessage.style.color = '#2b6e2f';
                premiumMessage.style.backgroundColor = '#e9f5e6';
                premiumMessage.classList.remove('hidden');
            } else {
                premiumMessage.classList.add('hidden');
            }
        } else {
            colorModal.classList.add('hidden');
            colorOverlay.classList.add('hidden');
            codeInput.value = "";
        }
    }

    showColorBtn?.addEventListener('click', () => toggleModal(true));
    closeColorBtn?.addEventListener('click', () => toggleModal(false));
    colorOverlay?.addEventListener('click', () => toggleModal(false));

    // عند الضغط على خيارات الألوان (تم التعديل هنا لتوليد الـ RGBA وتمريره تلقائياً)
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            if (!isUnlocked) {
                premiumMessage.textContent = "يرجى تفعيل الميزة أولاً لتتمكن من تغيير الألوان.";
                premiumMessage.style.color = '#d4493c';
                premiumMessage.style.backgroundColor = '#fdecea';
                premiumMessage.classList.remove('hidden');
                return;
            }
            const selectedColor = option.getAttribute('data-color');
            const generatedRgba = hexToRgba(selectedColor, 0.1); // توليد شفافية 10% للون المحدد
            applyPremiumColor(selectedColor, generatedRgba);
        });
    });
// زر التحقق من كود التفعيل وتحديد نوع الباقة
    activateBtn?.addEventListener('click', () => {
        const code = codeInput.value.trim();
        
        // 1. التحقق من أكواد باقة بلس (تغيير الألوان فقط)
        if (typeof activationPlusCodes !== 'undefined' && activationPlusCodes.includes(code)) {
            isUnlocked = true;
            localStorage.setItem("zarag_premium_unlocked", "true");
            localStorage.setItem("zarag_user_plan", "plus"); // تعيين الخطة محلياً لتمييزها
            
            premiumMessage.textContent = "🎉 تم تفعيل باقة بلس (+Plus) بنجاح! يمكنك الآن تغيير ألوان اللوح بحرية.";
            premiumMessage.style.color = '#2b6e2f';
            premiumMessage.style.backgroundColor = '#e9f5e6';
            premiumMessage.classList.remove('hidden');
            
            const defaultColor = currentColor || premiumColors[0];
            const defaultRgba = currentRgba || hexToRgba(defaultColor, 0.1);
            applyPremiumColor(defaultColor, defaultRgba);

        // 2. التحقق من أكواد باقة برو (تغيير الألوان + الكناش)
        } else if (typeof activationProCodes !== 'undefined' && activationProCodes.includes(code)) {
            isUnlocked = true;
            localStorage.setItem("zarag_premium_unlocked", "true");
            localStorage.setItem("zarag_user_plan", "pro"); // تفعيل ميزة الكناش تلقائياً
            
            premiumMessage.textContent = "🚀 تم تفعيل باقة برو (Pro) بنجاح! تم فتح ميزة تغيير الألوان وميزة الكناش (المذكرة).";
            premiumMessage.style.color = '#2b6e2f';
            premiumMessage.style.backgroundColor = '#e9f5e6';
            premiumMessage.classList.remove('hidden');
            
            const defaultColor = currentColor || premiumColors[0];
            const defaultRgba = currentRgba || hexToRgba(defaultColor, 0.1);
            applyPremiumColor(defaultColor, defaultRgba);

        // 3. في حال كان الكود خاطئاً
        } else {
            premiumMessage.textContent = "❌ كود التفعيل غير صحيح، يرجى التحقق أو التواصل عبر واتساب.";
            premiumMessage.style.color = '#d4493c';
            premiumMessage.style.backgroundColor = '#fdecea';
            premiumMessage.classList.remove('hidden');
        }
    });
    // تطبيق اللون المخزن عند تشغيل التطبيق إذا كانت الميزة مفعلة
    if (isUnlocked && currentColor) {
        setTimeout(() => {
            applyPremiumColor(currentColor, currentRgba);
        }, 100);
    }
})();

// ==================== منطق تسجيل الدخول عبر Supabase (المطور والمربوط بالـ SQL) ====================
// ==================== منطق تسجيل الدخول المباشر (Vanilla JS) ====================
(function() {
    const SUPABASE_URL = 'https://ozbiezzvxdetdfhkvzij.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96Ymllenp2eGRldGRmaGt2emlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2OTE0NTgsImV4cCI6MjA5NjI2NzQ1OH0.vZO6tCsAvZnM9-JqrWezSaqXO3yBd4PUGQ2LM0KMHg4'; // ضع مفتاحك هنا
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    window.supabaseClient = supabase;

    const authModal = document.getElementById('authModal');
    const authOverlay = document.getElementById('authModalOverlay');
    const showAuthBtn = document.getElementById('showAuthModalBtn');
    const closeAuthBtn = document.getElementById('closeAuthModalBtn');
    
    const authTitle = document.getElementById('authTitle');
    const emailInput = document.getElementById('authEmail'); // سيستخدم كاسم مستخدم
    const passInput = document.getElementById('authPassword');
    const actionBtn = document.getElementById('authActionBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const toggleModeBtn = document.getElementById('toggleAuthModeBtn');
    const messageDiv = document.getElementById('authMessage');

    // إخفاء زر "إنشاء حساب" لأن الدخول مقتصر على الحسابات الموجودة مسبقاً
    if(toggleModeBtn) toggleModeBtn.style.display = 'none';

    const toggleAuthModal = (show) => {
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
        messageDiv.textContent = msg;
        messageDiv.classList.remove('hidden');
        messageDiv.style.color = isError ? '#d4493c' : '#2b6e2f';
        messageDiv.style.backgroundColor = isError ? '#fdecea' : '#e9f5e6';
    };

    // التحقق من الجلسة محلياً عبر localStorage
    const checkSession = async () => {
        const currentUser = localStorage.getItem("currentUser");
        
        if (currentUser) {
            try {
                // جلب حالة التميز مباشرة من الجدول
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
        authTitle.textContent = "حسابك";
        emailInput.classList.add('hidden');
        passInput.classList.add('hidden');
        actionBtn.classList.add('hidden');
        
        logoutBtn.classList.remove('hidden');
        showMessage(`مرحباً بك الطالب: ${displayName}`);
        showAuthBtn.innerHTML = `<i class="fa-solid fa-user-check"></i> متصل`;
    };
    
    const updateUIToLoggedOut = () => {
        authTitle.textContent = "تسجيل الدخول";
        emailInput.classList.remove('hidden');
        passInput.classList.remove('hidden');
        actionBtn.classList.remove('hidden');
        
        logoutBtn.classList.add('hidden');
        showAuthBtn.innerHTML = `<i class="fa-solid fa-user"></i> الحساب`;
        clearInputs();
    };

    showAuthBtn.addEventListener('click', () => toggleAuthModal(true));
    closeAuthBtn.addEventListener('click', () => toggleAuthModal(false));
    authOverlay.addEventListener('click', () => toggleAuthModal(false));

    // زر تسجيل الدخول
    actionBtn.addEventListener('click', async () => {
        const username = emailInput.value.trim();
        const password = passInput.value.trim();

        if (!username || !password) {
            showMessage("الرجاء إدخال اسم الطالب وكلمة المرور", true);
            return;
        }

        actionBtn.disabled = true;
        actionBtn.textContent = "جاري التحقق...";

        // استعلام مباشر للتحقق من صحة البيانات من جدول students
        const { data, error } = await supabase
            .from('students')
            .select('*')
            .eq('username', username)
            .eq('password', password)
            .single();

        // الكود الجديد لمعرفة سبب المشكلة الحقيقي
if (error) {
    // إذا كان هناك خطأ في الاتصال أو المفتاح أو جدار الحماية
    showMessage("خطأ في الاتصال: " + error.message, true);
    console.error("Supabase Error:", error);
    actionBtn.disabled = false;
    actionBtn.textContent = "تسجيل الدخول";
} else if (!data) {
    // إذا كان الاتصال سليماً لكن البيانات غير تطابقة فعلياً
    showMessage("اسم الطالب أو كلمة المرور غير صحيحة.", true);
    actionBtn.disabled = false;
    actionBtn.textContent = "تسجيل الدخول";
} else {
            showMessage("تم تسجيل الدخول بنجاح!");
            
            // حفظ الجلسة محلياً
            localStorage.setItem("currentUser", data.username);
            
            await checkSession();
            setTimeout(() => {
                toggleAuthModal(false);
                window.location.reload(); 
            }, 1000);
        }
    });

    // زر تسجيل الخروج
    logoutBtn.addEventListener('click', () => {
        logoutBtn.textContent = "جاري الخروج...";
        
        // مسح بيانات الجلسة محلياً
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

document.onclick=(e)=> {
    if (!menu.contains(e.target) && !toggleMenuDisplay.contains(e.target)) {
        menu.classList.remove("show-menu")
    }
}

const aboutModal = document.getElementById('aboutModal');
const aboutOverlay = document.getElementById('aboutModalOverlay');
const openAboutBtn = document.getElementById('openAboutModalBtn');
const closeAboutBtn = document.getElementById('closeAboutModalBtn');

function openAboutModal() {
  aboutModal.classList.remove('hidden');
  aboutOverlay.classList.remove('hidden');
}

function closeAboutModal() {
  aboutModal.classList.add('hidden');
  aboutOverlay.classList.add('hidden');
}

openAboutBtn?.addEventListener('click', openAboutModal);
closeAboutBtn?.addEventListener('click', closeAboutModal);
aboutOverlay?.addEventListener('click', closeAboutModal);

// ==================== منطق مشاركة التطبيق ====================
(function() {
    const shareBtn = document.getElementById('shareAppBtn');
    const shareToast = document.getElementById('shareToast');

    if (!shareBtn) return;

    shareBtn.addEventListener('click', async () => {
        // إغلاق القائمة الجانبية بعد الضغط
        const menu = document.getElementById('menu');
        menu.classList.remove("show-menu");

        const shareData = {
            title: 'تطبيق الزرگ',
            text: 'برنامج تعليمي تفاعلي لرسم القرآن الكريم بطريقة سهلة ومبسطة.',
            url: window.location.href // يجلب رابط الموقع الحالي تلقائياً
        };

        // التحقق مما إذا كان المتصفح يدعم خاصية المشاركة الأصلية (الهواتف غالباً)
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                console.log('تمت المشاركة بنجاح');
            } catch (err) {
                console.log('تم إلغاء المشاركة أو حدث خطأ:', err);
            }
        } else {
            // حل بديل في حال عدم دعم الميزة (الحواسب مثلاً): نسخ الرابط للحافظة
            try {
                await navigator.clipboard.writeText(shareData.url);
                
                // إظهار رسالة التنبيه بالنسخ
                shareToast.classList.remove('hidden');
                
                // إخفاء الرسالة بعد ثانيتين
                setTimeout(() => {
                    shareToast.classList.add('hidden');
                }, 2000);
            } catch (err) {
                console.error('فشل نسخ الرابط:', err);
                alert('رابط التطبيق هو: ' + shareData.url);
            }
        }
    });
})();

// ====== برمجة الكناش (المذكرة المحلية) ======

// ====== برمجة الكناش (المذكرة المحلية) ======

const kunnashMenuBtn = document.querySelector('li i.fa-note-sticky').parentElement;
const kunnashModal = document.getElementById('kunnashModal');
const kunnashOverlay = document.getElementById('kunnashModalOverlay');
const closeKunnashBtn = document.getElementById('closeKunnashBtn');
const kunnashTextArea = document.getElementById('kunnashTextArea');
const saveKunnashBtn = document.getElementById('saveKunnashBtn');
const kunnashMessage = document.getElementById('kunnashMessage');

// دالة للتحقق من اشتراك المستخدم في باقة برو
function isProUser() {
    // جلب حالة الحساب من التخزين المحلي (يمكن تعديل المفتاح حسب المسمى المعتمد لديك)
    return true;
}

// دالة للتحقق من أجهزة iPhone و iPad (iOS)
function isIOS() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
}

// 1. فتح الكناش والتحقق من الصلاحيات والبيانات
kunnashMenuBtn.addEventListener('click', () => {
    document.getElementById('menu').classList.remove("show-menu"); // إخفاء القائمة الجانبية
    
    // إظهار النافذة
    kunnashModal.classList.remove('hidden');
    kunnashOverlay.classList.remove('hidden');

    // أولاً: التحقق من الاشتراك في باقة برو
    if (!isProUser()) {
        kunnashTextArea.value = "";
        kunnashTextArea.disabled = true;
        saveKunnashBtn.disabled = true;
        showKunnashMessage("هذه الميزة حصرياً لمشتركي باقة برو.", true);
        return;
    }

    // ثانياً: التحقق مما إذا كان المستخدم يستعمل iPhone
    if (isIOS()) {
        kunnashTextArea.value = "";
        kunnashTextArea.disabled = true;
        saveKunnashBtn.disabled = true;
        showKunnashMessage("عذراً، ميزة الكناش لا تعمل حالياً على أجهزة iPhone.", true);
        return;
    }

    // تفعيل الحقول إذا تخطى الفحوصات بنجاح
    kunnashTextArea.disabled = false;
    saveKunnashBtn.disabled = false;

    // جلب البيانات من التخزين المحلي
    const savedNotes = localStorage.getItem("zarag_kunnash");
    kunnashTextArea.value = savedNotes ? savedNotes : "";
});

// 2. إغلاق الكناش
closeKunnashBtn.addEventListener('click', () => {
    kunnashModal.classList.add('hidden');
    kunnashOverlay.classList.add('hidden');
});
kunnashOverlay.addEventListener('click', () => {
    kunnashModal.classList.add('hidden');
    kunnashOverlay.classList.add('hidden');
});

// 3. حفظ الملاحظات محلياً
saveKunnashBtn.addEventListener('click', () => {
    // إجراءات احترازية إضافية
    if (!isProUser() || isIOS()) return;

    const newNotes = kunnashTextArea.value;

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

// دالة مساعدة لعرض رسائل النجاح أو الخطأ
function showKunnashMessage(msg, isError = false) {
    kunnashMessage.textContent = msg;
    kunnashMessage.classList.remove('hidden');
    kunnashMessage.style.color = isError ? '#d4493c' : '#2b6e2f';
    kunnashMessage.style.backgroundColor = isError ? '#fdecea' : '#e9f5e6';
    
    setTimeout(() => {
        kunnashMessage.classList.add('hidden');
    }, 3000);
}
// ==================== ميزة الإشعارات (Push Notifications) ====================
(function() {
    const enableNotificationsBtn = document.getElementById('enableNotificationsBtn');
    
    if (enableNotificationsBtn) {
        enableNotificationsBtn.addEventListener('click', () => {
            // إغلاق القائمة الجانبية
            const menu = document.getElementById('menu');
            if (menu) menu.classList.remove('show-menu');

            // التحقق من دعم المتصفح
            if (!('Notification' in window) || !('serviceWorker' in navigator)) {
                alert('عذراً، متصفحك الحالي لا يدعم ميزة الإشعارات.');
                return;
            }

            // طلب الإذن من الطالب
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    showWelcomeNotification();
                    
                    // استخدام الـ Toast الخاص بك لإظهار رسالة نجاح
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

    // دالة عرض الإشعار الترحيبي من الـ Service Worker
    function showWelcomeNotification() {
        navigator.serviceWorker.ready.then(registration => {
            registration.showNotification('الزرگ', {
                body: 'مرحباً بك! سيتم تنبيهك هنا بأي تحديثات أو قواعد جديدة.',
                icon: 'logo.png', // استخدام شعار التطبيق الموجود لديك
                badge: 'logo.png', 
                vibrate: [200, 100, 200],
                dir: 'rtl',
                tag: 'zarag-welcome-notification'
            });
        });
    }
})();

const previousWordBtn = document.getElementById("previousWordBtn")
const nextWordBtn     = document.getElementById("nextWordBtn"    )

previousWordBtn.onclick=()=> {
    if (currentIndex > 0) showQuestion(currentIndex - 1)
}

nextWordBtn.onclick=()=> {
    showQuestion(currentIndex+1)
}
    // كود مكتوب بصيغة قديمة (ES5) لضمان تشغيله على المتصفحات القديمة دون حدوث خطأ برمي يوقف التنفيذ
(function() {
    var isOldBrowser = false;

        // 1. فحص دعم الميزات الأساسية (المخزن المحلي، جلب البيانات والوعود) التي يعتمد عليها الزرگ
    if (!window.localStorage || !window.fetch || !window.Promise || !window.JSON) {
        isOldBrowser = true;
    }

        // 2. فحص دعم التقنيات الحديثة مثل (async/await) عبر eval لتجنب انهيار الكود في المتصفحات القديمة
    try {
        eval("var test = async function() { await Promise.resolve(); };");
    } catch (e) {
        isOldBrowser = true; // المتصفح لا يدعم التقنيات الحديثة
    }

        // إذا كان المتصفح قديماً، يتم إجبار النافذة على الظهور فوق كل شيء
    if (isOldBrowser) {
        var oldWarningElement = document.getElementById("oldBrowserWarning");
        if (oldWarningElement) {
            oldWarningElement.style.display = "flex";
        }
    }
})();
 
// ==================== منطق نافذة المشتركين ====================
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
        
        // إخفاء القائمة الجانبية تلقائياً لتجنب تداخل العناصر
        const menu = document.getElementById('menu');
        if (menu) {
            menu.classList.remove('show-menu');
        }
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

// ==================== منطق نافذة العروض والباقات ====================
(function() {
    const offersModal = document.getElementById('offersModal');
    const offersOverlay = document.getElementById('offersModalOverlay');
    const showOffersBtn = document.getElementById('showOffersModalBtn');
    const closeOffersBtn = document.getElementById('closeOffersModalBtn');

    function openOffersModal() {
        if (offersModal && offersOverlay) {
            //offersModal.classList.remove('hidden');
            //offersOverlay.classList.remove('hidden');
        }
        
        // إخفاء القائمة الجانبية تلقائياً عند فتح النافذة
        const menu = document.getElementById('menu');
        if (menu) {
            menu.classList.remove('show-menu');
        }
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
    
    showOffersModalBtn.style.display = "none"
})();

// ==================== ميزة الإشعارات (Push Notifications) ====================
(function() {
    const enableNotificationsBtn = document.getElementById('enableNotificationsBtn');
    
    if (enableNotificationsBtn) {
        enableNotificationsBtn.addEventListener('click', () => {
            // إغلاق القائمة الجانبية
            const menu = document.getElementById('menu');
            if (menu) menu.classList.remove('show-menu');

            // التحقق من دعم المتصفح
            if (!('Notification' in window) || !('serviceWorker' in navigator)) {
                alert('عذراً، متصفحك الحالي لا يدعم ميزة الإشعارات.');
                return;
            }

            // طلب الإذن من الطالب
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    showWelcomeNotification();
                    
                    // استخدام الـ Toast الخاص بك لإظهار رسالة نجاح
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

    // دالة عرض الإشعار الترحيبي من الـ Service Worker
    function showWelcomeNotification() {
        navigator.serviceWorker.ready.then(registration => {
            registration.showNotification('الزرگ', {
                body: 'مرحباً بك! سيتم تنبيهك هنا بأي تحديثات أو قواعد جديدة.',
                icon: 'logo.png', // استخدام شعار التطبيق الموجود لديك
                badge: 'logo.png', 
                vibrate: [200, 100, 200],
                dir: 'rtl',
                tag: 'zarag-welcome-notification'
            });
        });
    }
})();

// ==================== منطق نافذة الإعدادات ====================
(function() {
    const settingsBtn = document.getElementById('showSettingsModalBtn');
    const settingsModal = document.getElementById('settingsModal');
    const settingsOverlay = document.getElementById('settingsModalOverlay');
    const closeSettingsBtn = document.getElementById('closeSettingsModalBtn');
    
    const notificationToggle = document.getElementById('notificationToggle');
    const settingsMessage = document.getElementById('settingsMessage');

    // 1. استرجاع حالة الإشعارات المحفوظة مسبقاً
    const isNotificationsEnabled = localStorage.getItem('zarag_notifications') === 'true';
    if (notificationToggle) {
        notificationToggle.checked = isNotificationsEnabled;
    }

    // 2. دوال فتح وإغلاق النافذة
    function openSettingsModal() {
        if (settingsModal && settingsOverlay) {
            settingsModal.classList.remove('hidden');
            settingsOverlay.classList.remove('hidden');
        }
        // إخفاء القائمة الجانبية
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

    // 3. عرض رسائل النجاح أو الخطأ
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

    // 4. الاستماع لتغيرات زر الإشعارات وطلب الصلاحية
    if (notificationToggle) {
        notificationToggle.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            
            if (isChecked) {
                // التحقق من دعم المتصفح للإشعارات
                if ('Notification' in window) {
                    Notification.requestPermission().then(permission => {
                        if (permission === 'granted') {
                            localStorage.setItem('zarag_notifications', 'true');
                            showSettingsMsg("تم تفعيل الإشعارات بنجاح!");
                        } else {
                            // إذا رفض المستخدم الصلاحية
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
                // إيقاف الإشعارات
                localStorage.setItem('zarag_notifications', 'false');
                showSettingsMsg("تم إيقاف الإشعارات.");
            }
        });
    }

    // 5. ربط الأزرار بالأحداث
    if (settingsBtn) settingsBtn.addEventListener('click', openSettingsModal);
    if (closeSettingsBtn) closeSettingsBtn.addEventListener('click', closeSettingsModal);
    if (settingsOverlay) settingsOverlay.addEventListener('click', closeSettingsModal);
})();

// ==================== ميزة شگرلي (استخراج النص وتصحيحه) ====================
(function() {
    const shagarlyBtn = document.getElementById('shagarlyBtn');
    const cameraInput = document.getElementById('cameraInput');
    const shagarlyModal = document.getElementById('shagarlyModal');
    const shagarlyOverlay = document.getElementById('shagarlyModalOverlay');
    const closeShagarlyBtn = document.getElementById('closeShagarlyBtn');
    const shagarlyLoading = document.getElementById('shagarlyLoading');
    const shagarlyResult = document.getElementById('shagarlyResult');

    // لفتح وإغلاق النافذة
    function toggleShagarlyModal(show) {
        if (show) {
            shagarlyModal.classList.remove('hidden');
            shagarlyOverlay.classList.remove('hidden');
            const menu = document.getElementById('menu');
            if (menu) menu.classList.remove('show-menu');
        } else {
            shagarlyModal.classList.add('hidden');
            shagarlyOverlay.classList.add('hidden');
        }
    }

    if (closeShagarlyBtn) closeShagarlyBtn.addEventListener('click', () => toggleShagarlyModal(false));
    if (shagarlyOverlay) shagarlyOverlay.addEventListener('click', () => toggleShagarlyModal(false));

    // عند الضغط على الزر، يتم فتح الكاميرا
    if (shagarlyBtn) {
        shagarlyBtn.addEventListener('click', () => {
            cameraInput.click();
        });
    }

    // عند التقاط الصورة
    if (cameraInput) {
        cameraInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            toggleShagarlyModal(true);
            shagarlyResult.innerHTML = "";
            shagarlyLoading.style.display = "block";

            try {
                // استخدام Tesseract.js للتعرف على النص العربي
                const result = await Tesseract.recognize(file, 'ara', {
                    logger: m => console.log(m) // يمكنك مراقبة التقدم في الكونسول
                });

                const extractedText = result.data.text;
                
                // مقارنة النص المستخرج وتصحيحه
                const correctedHTML = correctQuranicText(extractedText);
                
                shagarlyLoading.style.display = "none";
                shagarlyResult.innerHTML = correctedHTML;

            } catch (error) {
                console.error("خطأ في قراءة الصورة:", error);
                shagarlyLoading.style.display = "none";
                shagarlyResult.innerHTML = "<span style='color: red;'>حدث خطأ أثناء قراءة اللوح. حاول التقاط صورة أوضح.</span>";
            }
        });
    }

    // دالة المقارنة واستخراج الأخطاء (تعود بـ HTML منسق)
    function correctQuranicText(extractedText) {
        // تنظيف النص المستخرج من الفراغات الزائدة
        const extractedWords = extractedText.trim().replace(/\s+/g, ' ').split(' ');
        
        // جلب النصوص الصحيحة من قاعدة البيانات الحالية للتطبيق (Angko.questionsData)
        // نقوم بدمجها كنص واحد للمقارنة (أو يمكنك جلب الآية المحددة بناءً على السياق)
        const allCorrectWords = Angko.questionsData.join(" ").split(" ");
        
        let finalHTML = "";

        extractedWords.forEach(word => {
            // تنظيف الكلمة من التشكيل لتسهيل المقارنة (اختياري)
            const cleanWord = word.replace(/[\u064B-\u065F]/g, ''); 
            
            // خوارزمية بحث مبسطة: هل الكلمة موجودة في كلمات الزرگ؟
            // في الواقع العملي، يفضل استخدام Levenshtein Distance للمقارنة الدقيقة
            const isCorrect = allCorrectWords.some(correctWord => correctWord.includes(cleanWord));

            if (isCorrect) {
                finalHTML += `<span style="color: #2b6e2f;">${word}</span> `;
            } else {
                // الكلمة خاطئة أو لم يتم التعرف عليها جيداً
                finalHTML += `<span style="color: #d4493c; border-bottom: 2px dashed #d4493c;" title="كلمة بها خطأ أو غير واضحة">${word}</span> `;
            }
        });

        return finalHTML || "لم يتم التعرف على أي نص واضح.";
    }
})();

// دالة للتحقق مما إذا كان التطبيق مثبتاً ويعمل في وضع الشاشة الكاملة
function isAppInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

document.addEventListener("DOMContentLoaded", () => {
    // إذا لم يكن التطبيق مثبتاً، افرض نافذة التثبيت
    if (!isAppInstalled()) {
        const installModal = document.getElementById('installModal');
        const installOverlay = document.getElementById('installOverlay');

        // إظهار النافذة بشكل دائم[cite: 2]
        installModal.classList.remove('hidden');
        installOverlay.classList.remove('hidden');

        // إبطال التفاعل مع الخلفية حتى لا تنغلق النافذة عند النقر خارجها        
        // منع دالة الإغلاق السابقة من العمل[cite: 2]
        installOverlay.removeEventListener('click', installModal);
    }
});

// ==================== منطق المحادثة (حساني) ====================
(function() {
    const chatbotModal = document.getElementById('chatbotModal');
    const chatbotOverlay = document.getElementById('chatbotModalOverlay');
    const closeChatbotBtn = document.getElementById('closeChatbotBtn');
    const showChatBtn = document.getElementById('showChatAiModalBtn');
    const chatbotInput = document.getElementById('chatbotInput');
    const sendBtn = document.getElementById('sendChatbotBtn');
    const messagesContainer = document.getElementById('chatbotMessages');

    let botData = {}; // سيتم تحميلها من data.json

    // تحميل بيانات البوت
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

    // دالة الاستجابة (كما طلبت)
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

    // إضافة رسالة إلى واجهة المحادثة
    function addMessage(text, isUser = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = isUser ? 'user-msg' : 'bot-msg';
        msgDiv.textContent = text;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // التمرير للأسفل
    }

    // معالجة إرسال الرسالة
    function handleSend() {
        const userText = chatbotInput.value.trim();
        if (!userText) return;

        // عرض رسالة المستخدم
        addMessage(userText, true);
        chatbotInput.value = '';

        // الحصول على رد البوت وعرضه بعد تأخير بسيط (محاكاة التفكير)
        setTimeout(() => {
            const reply = getBotResponse(userText);
            addMessage(reply, false);
        }, 300);
    }

    // فتح وإغلاق النافذة
    function toggleModal(show) {
        if (show) {
            chatbotModal.classList.remove('hidden');
            chatbotOverlay.classList.remove('hidden');
            // إخفاء القائمة الجانبية
            const menu = document.getElementById('menu');
            if (menu) menu.classList.remove('show-menu');
            // تركيز على حقل الإدخال
            setTimeout(() => chatbotInput.focus(), 100);
        } else {
            chatbotModal.classList.add('hidden');
            chatbotOverlay.classList.add('hidden');
        }
    }

    // ربط الأحداث
    if (showChatBtn) {
        showChatBtn.addEventListener('click', () => toggleModal(true));
    }
    if (closeChatbotBtn) {
        closeChatbotBtn.addEventListener('click', () => toggleModal(false));
    }
    if (chatbotOverlay) {
        chatbotOverlay.addEventListener('click', () => toggleModal(false));
    }
    if (sendBtn) {
        sendBtn.addEventListener('click', handleSend);
    }
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
            }
        });
    }

    // إضافة رسالة ترحيبية عند فتح النافذة (اختياري)
    // يمكن تفعيلها إذا أردت مسح المحادثة عند كل فتح
    // لكن سنبقي المحادثة مستمرة
})();


// ميزة تقدم الطالب المدفوعة (Progress Modal)
const progressModal = document.getElementById('progressModal');
const progressModalOverlay = document.getElementById('progressModalOverlay');
const closeProgressModalBtn = document.getElementById('closeProgressModalBtn');
const activateProgressBtn = document.getElementById('activateProgressBtn');

// دالة لفتح نافذة الميزة (يمكنك استدعاؤها عندما يضغط الطالب على زر "تقدمي" في القائمة)
function showProgressModal() {
    // إخفاء القائمة الجانبية
    const menu = document.getElementById('menu');
    if (menu) menu.classList.remove('show-menu');
    
    if (progressModal && progressModalOverlay) {
        progressModal.classList.remove('hidden');
        progressModalOverlay.classList.remove('hidden');
    }
}

// دالة لإغلاق النافذة
function hideProgressModal() {
    if (progressModal && progressModalOverlay) {
        progressModal.classList.add('hidden');
        progressModalOverlay.classList.add('hidden');
    }
}