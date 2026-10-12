// ====================== إعدادات Firebase ======================
const firebaseConfig = {
  apiKey: "AIzaSyBDpevzaNnyk0Nyk7-1L-PFPVgz2rlHvQ",
  authDomain: "couple-game-aeec9.firebaseapp.com",
  databaseURL: "https://couple-game-aeec9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "couple-game-aeec9",
  storageBucket: "couple-game-aeec9.firebasestorage.app",
  messagingSenderId: "132755870810",
  appId: "1:132755870810:web:4f064870e2cb427a6774",
  measurementId: "G-BCF7W6B3YM"
};

// تفعيل Firebase
let database = null;
try {
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();
} catch (e) {
  console.warn("Firebase غير مفعّل - يعمل في الوضع المحلي فقط");
}

// ====================== القوائم الافتراضية ======================
const defaultHusbandTasks = [
  "اخلعي ملابسك ببطء أمام الكاميرا وأريني كل شيء.",
  "اجلسي عارية وامسحي جسمك بالزيت ببطء.",
  "اركعي أمام الكاميرا وقولي «أنا ملكك الليلة».",
  "المسّي صدرك ببطء ودلّكي حلماتك وأنت تنظرين إليّ.",
  "افتحي ساقيك وأريني كل شيء بدون لمس.",
  "استخدمي أصابعك للعب بنفسك وأرييني كيف تستمتعين.",
  "ارتدي ملابس داخلية شفافة فقط وأرقصي لي رقصة بطيئة.",
  "اجلسي على السرير وارفعي ثديك إلى فمك وحاولي مصّه.",
  "استلقي على ظهرك وارفعي ساقيك عالياً وأريني فتحك.",
  "قولي لي بصوت عالٍ كم تشتهينني الآن.",
  "أرسلي لي فيديو وأنت تلمسين نفسك من الخلف.",
  "ضعي إصبعاً داخل فمك وامتصيه ببطء كأنك تمتصين شيئاً آخر.",
  "اركعي وانحني للأمام حتى أرى مؤخرتك بوضوح.",
  "دلّكي مؤخرتك بزيت وارفعيها عالياً.",
  "قولي لي ثلاثة أشياء قذرة تريدين أن أفعلها بك الليلة.",
  "أرييني كيف تضعين إصبعين داخل نفسك.",
  "ارتدي جوارب طويلة فقط ولا شيء آخر.",
  "اجلسي عارية على كرسي وافتحي ساقيك على اتساعهما.",
  "المسّي حلماتك بقوة حتى تحمرّ وأرييني.",
  "أرسلي لي صورة وأنت تلعقين شفتيك وتنظرين بشهوة.",
  "استخدمي لعبة أو شيء في المنزل والعبِ به أمامي.",
  "قولي «أنا عاهرة لك الليلة» بصوت واضح.",
  "انحني على السرير وارفعي مؤخرتك عالياً جداً.",
  "المسّي بظرك بسرعة وأرييني وجهك وأنت تتلذذين.",
  "ضعي وسادة بين ساقيك وفركي نفسك عليها.",
  "أرييني لسانك وأخرجيه بالكامل ثم العبيه.",
  "اجلسي القرفصاء عارية وافتحي نفسك بأصابعك.",
  "دلّكي ثدييك بقوة حتى يصبحا محمرين.",
  "قولي لي أين تريدين أن ألمسكي أولاً عندما ألقاك.",
  "أرسلي فيديو قصير وأنت تتنفسين بصوت عالٍ من الإثارة.",
  "ارتدي قميص نوم شفاف فقط وأرييني كيف يلتصق بجسمك.",
  "استلقي على بطنك وارفعي مؤخرتك واضغطي عليها بيدك.",
  "المسّي نفسك من الأمام والخلف في نفس الوقت.",
  "قولي كلمات قذرة عن ما تريدين أن أفعله بفمك.",
  "أرييني كيف تلعقين أصابعك بعد أن تلمسي نفسك.",
  "اجلسي أمام المرآة وافعلي كل شيء بينما أنظر إليك.",
  "ضعي ثلجاً على حلماتك وأرييني رد فعلك.",
  "افتحي فمك واخرجي لسانك كأنك مستعدة لاستقبال شيء.",
  "أرييني أقذر وضعية يمكنك فعلها الآن.",
  "انهي بنفسك وأرييني وجهك لحظة الوصول للذروة."
];

const defaultWifeTasks = [
  "اخلع ملابسك ببطء وأرني كل شيء بوضوح.",
  "أمسك قضيبك ودلّكه ببطء وأنت تنظر إليّ.",
  "قل لي بصوت عالٍ كم تشتهيني الآن.",
  "أرسل لي فيديو وأنت تمسك نفسك بقوة.",
  "اركع أمام الكاميرا وقل «أنا عبدك الليلة».",
  "دلّك قضيبك بالزيت حتى يصبح لامعاً وأرني.",
  "أرني كيف تلعق أصابعك وأنت تتخيل أنك تلعقني.",
  "اضغط على رأس قضيبك بأصبعك وأرني السائل.",
  "قل لي ثلاثة أشياء قذرة تريد فعلها بي.",
  "أرسل صورة وأنت تمسك قضيبك بقبضة قوية.",
  "تخيّل أن فمي حولك وتصرّف كأنك تشعر به.",
  "دلّك خصيتيك ببطء وأرني كيف تستمتع.",
  "قل «أنا ملكك» بصوت خشن.",
  "أرسل فيديو وأنت تتنفس بصوت عالٍ من الإثارة.",
  "امسك قضيبك من الخلف والأمام في نفس الوقت.",
  "أرني كيف تضربه برفق على راحة يدك.",
  "قل لي أين تريد أن أضع فمي أولاً عندما ألقاك.",
  "دلّك رأس القضيب بحركة دائرية بطيئة جداً.",
  "أرسل صورة مقربة وأنت تفرك رأسه بإبهامك.",
  "تخيّل أنني راكعة أمامك وتكلم معي كأنني موجودة.",
  "اضغط بقوة على قضيبك حتى يحمر وأرني.",
  "قل كلمات قذرة عن ما تريد فعله بثديي.",
  "أرني كيف تلعق شفتيك وأنت تنظر بشهوة.",
  "امسك قضيبك بكلتا يديك ودلّكه بقوة.",
  "أرسل فيديو قصير وأنت تقترب من الذروة ثم تتوقف.",
  "قل لي أقذر شيء تريد أن أفعله لك الليلة.",
  "دلّك قضيبك بسرعة ثم توقف فجأة وأرني رد فعلك.",
  "أرني خصيتيك بوضوح وأنت ترفعهما بيدك.",
  "تخيّل أنني أركب عليك وتحرّك وركيك كأنني موجودة.",
  "قل «أنا أريدك الآن» بصوت مليء بالشهوة.",
  "امسك رأس القضيب فقط وفركه ببطء شديد.",
  "أرسل صورة وأنت تضع إصبعك على فتحة رأسه.",
  "دلّك كامل الطول من الأسفل إلى الأعلى ببطء.",
  "قل لي كيف تريدني أن أستخدم يدي عليك.",
  "أرني وجهك وأنت تمسك نفسك بقوة.",
  "اضغط على قاعدة القضيب وأرني كيف ينبض.",
  "تخيّل أنني أمتصك بقوة وتصرّف بناءً على ذلك.",
  "قل كلمات قذرة عن مؤخرتي.",
  "أرسل فيديو وأنت تصل تقريباً للذروة ثم تتوقف.",
  "أنهِ أمام الكاميرا وأرني وجهك لحظة القذف."
];

// ====================== حالة التطبيق ======================
let currentRole = null;        // 'husband' أو 'wife'
let roomCode = null;
let myTasks = [];
let isMyTurn = false;
let currentRequest = null;

// ====================== عناصر DOM ======================
const loginScreen = document.getElementById('login-screen');
const gameScreen = document.getElementById('game-screen');
const editScreen = document.getElementById('edit-screen');
const requestModal = document.getElementById('request-modal');
const themeWrapper = document.getElementById('theme-wrapper');
const turnText = document.getElementById('turn-text');
const statusMessage = document.getElementById('status-message');
const actionBtn = document.getElementById('action-btn');
const requestText = document.getElementById('request-text');
const requestImage = document.getElementById('request-image');
const tasksList = document.getElementById('tasks-list');

// ====================== أحداث الدخول ======================
document.getElementById('btn-husband').addEventListener('click', () => {
  currentRole = 'husband';
  document.getElementById('btn-husband').style.outline = '3px solid #fff';
  document.getElementById('btn-wife').style.outline = 'none';
});

document.getElementById('btn-wife').addEventListener('click', () => {
  currentRole = 'wife';
  document.getElementById('btn-wife').style.outline = '3px solid #fff';
  document.getElementById('btn-husband').style.outline = 'none';
});

document.getElementById('btn-join').addEventListener('click', joinRoom);

function joinRoom() {
  const code = document.getElementById('room-code').value.trim();
  if (!currentRole) {
    alert('اختر أولاً: زوج أو زوجة');
    return;
  }
  if (!code || code.length < 4) {
    alert('أدخل رمز غرفة من 4 أرقام على الأقل');
    return;
  }

  roomCode = code;
  loadMyTasks();
  setupGameUI();
  startListening();
  showScreen('game');
}

// ====================== تحميل المهام ======================
function loadMyTasks() {
  const key = `tasks_${roomCode}_${currentRole}`;
  const saved = localStorage.getItem(key);
  if (saved) {
    myTasks = JSON.parse(saved);
  } else {
    // الزوج يستخدم مهام الزوجة لكي يطلبها منها، والعكس صحيح!
    myTasks = currentRole === 'husband' ? [...defaultWifeTasks] : [...defaultHusbandTasks];
    saveMyTasks();
  }
}

function saveMyTasks() {
  const key = `tasks_${roomCode}_${currentRole}`;
  localStorage.setItem(key, JSON.stringify(myTasks));
}

// ====================== واجهة اللعب ======================
function setupGameUI() {
  themeWrapper.className = currentRole === 'husband' ? 'theme-husband' : 'theme-wife';
  updateTurnUI();
}

function updateTurnUI() {
  if (isMyTurn) {
    turnText.textContent = currentRole === 'husband' ? 'دور الزوج (أنت تطلب)' : 'دور الزوجة (أنتِ تطلبين)';
    statusMessage.textContent = 'حان دورك لإرسال طلب للطرف الآخر!';
    actionBtn.disabled = false;
    actionBtn.textContent = 'أرسل طلباً عشوائياً';
  } else {
    turnText.textContent = currentRole === 'husband' ? 'دور الزوجة' : 'دور الزوج';
    statusMessage.textContent = 'في انتظار طلب أو تنفيذ الطرف الآخر...';
    actionBtn.disabled = true;
    actionBtn.textContent = 'انتظر دورك';
  }
}

// ====================== إرسال طلب ======================
actionBtn.addEventListener('click', sendRandomRequest);

function sendRandomRequest() {
  if (!isMyTurn || myTasks.length === 0) return;

  const randomIndex = Math.floor(Math.random() * myTasks.length);
  const task = myTasks[randomIndex];

  const requestData = {
    text: task,
    from: currentRole,
    timestamp: Date.now(),
    image: '🔥'
  };

  // تبديل الدور فوراً للطرف الآخر عند الإرسال
  const nextTurnRole = currentRole === 'husband' ? 'wife' : 'husband';

  if (database) {
    database.ref(`rooms/${roomCode}/currentRequest`).set(requestData);
    database.ref(`rooms/${roomCode}/turn`).set(nextTurnRole);
  } else {
    localStorage.setItem(`request_${roomCode}`, JSON.stringify(requestData));
    localStorage.setItem(`turn_${roomCode}`, nextTurnRole);
  }

  isMyTurn = false;
  updateTurnUI();
}

// ====================== استقبال الطلب ======================
function receiveRequest(data) {
  if (!data || data.from === currentRole) return;

  currentRequest = data;
  requestText.textContent = data.text;
  requestImage.innerHTML = data.image || '💋';
  requestModal.classList.remove('hidden');
}

document.getElementById('btn-done').addEventListener('click', () => {
  requestModal.classList.add('hidden');
  
  // الشخص الذي استقبل الطلب ونفذه (مثلاً الزوجة) أصبح دوره الآن هو من يرسل طلباً جديداً للزوج!
  const nextTurnRole = currentRole; // الدور الحالي يصبح هو صاحب الطلب القادم

  if (database) {
    database.ref(`rooms/${roomCode}/currentRequest`).remove();
    database.ref(`rooms/${roomCode}/turn`).set(nextTurnRole);
  } else {
    localStorage.removeItem(`request_${roomCode}`);
    localStorage.setItem(`turn_${roomCode}`, nextTurnRole);
  }
});

document.getElementById('btn-hide').addEventListener('click', () => {
  requestModal.classList.add('hidden');
});

// ====================== الاستماع للتغييرات ======================
function startListening() {
  if (database) {
    // الاستماع لتغييرات الدور
    database.ref(`rooms/${roomCode}/turn`).on('value', (snap) => {
      const turn = snap.val();
      // إذا لم يكن الدور محدد بعد، نعتبر أن الزوج يبدأ أولاً
      if (turn === null) {
        if (currentRole === 'husband') {
          database.ref(`rooms/${roomCode}/turn`).set('husband');
        }
        isMyTurn = (currentRole === 'husband');
      } else {
        isMyTurn = (turn === currentRole);
      }
      updateTurnUI();
    });

    // الاستماع للطلبات الجديدة
    database.ref(`rooms/${roomCode}/currentRequest`).on('value', (snap) => {
      const data = snap.val();
      if (data && data.from !== currentRole) {
        receiveRequest(data);
      }
    });
  } else {
    // وضع محلي للتجربة
    const savedTurn = localStorage.getItem(`turn_${roomCode}`);
    isMyTurn = !savedTurn || savedTurn === currentRole;
    updateTurnUI();

    setInterval(() => {
      const turn = localStorage.getItem(`turn_${roomCode}`);
      const shouldBeMyTurn = !turn || turn === currentRole;
      if (shouldBeMyTurn !== isMyTurn) {
        isMyTurn = shouldBeMyTurn;
        updateTurnUI();
      }

      const req = localStorage.getItem(`request_${roomCode}`);
      if (req) {
        const data = JSON.parse(req);
        if (data.from !== currentRole && (!currentRequest || currentRequest.timestamp !== data.timestamp)) {
          receiveRequest(data);
        }
      }
    }, 1000);
  }
}

// ====================== تعديل القائمة ======================
document.getElementById('btn-edit-list').addEventListener('click', () => {
  renderTasksList();
  showScreen('edit');
});

document.getElementById('btn-back').addEventListener('click', () => {
  showScreen('game');
});

document.getElementById('btn-add-task').addEventListener('click', () => {
  const newTask = prompt('اكتب الطلب الجديد:');
  if (newTask && newTask.trim()) {
    myTasks.push(newTask.trim());
    saveMyTasks();
    renderTasksList();
  }
});

function renderTasksList() {
  tasksList.innerHTML = '';
  myTasks.forEach((task, index) => {
    const div = document.createElement('div');
    div.className = 'task-item';
    div.innerHTML = `
      <span>${task}</span>
      <div class="task-actions">
        <button class="btn-edit" onclick="editTask(${index})">تعديل</button>
        <button class="btn-delete" onclick="deleteTask(${index})">حذف</button>
      </div>
    `;
    tasksList.appendChild(div);
  });
}

window.editTask = function(index) {
  const newText = prompt('عدّل الطلب:', myTasks[index]);
  if (newText && newText.trim()) {
    myTasks[index] = newText.trim();
    saveMyTasks();
    renderTasksList();
  }
};

window.deleteTask = function(index) {
  if (confirm('هل تريد حذف هذا الطلب؟')) {
    myTasks.splice(index, 1);
    saveMyTasks();
    renderTasksList();
  }
};

// ====================== خروج ======================
document.getElementById('btn-logout').addEventListener('click', () => {
  if (confirm('هل تريد الخروج؟')) {
    location.reload();
  }
});

// ====================== مساعدة ======================
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  if (name === 'login') loginScreen.classList.add('active');
  if (name === 'game') gameScreen.classList.add('active');
  if (name === 'edit') editScreen.classList.add('active');
}

// بدء التطبيق
showScreen('login');
