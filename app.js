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

// ====================== القوائم الافتراضية المحدثة (40 طلباً لكل طرف) ======================

// طلبات الزوجة التي يطلبها الزوج منها (تركز على الإثارة البصرية والأنوثة والدلال)
const defaultHusbandTasks = [
  "اخلعي جزءاً من ملابسك ببطء أمام الكاميرا وأنت تنظرين إليّ بشهوة.",
  "المسي حلماتك ببطء ودلكيهما حتى تحمرا وأنت تتأوهين.",
  "انحني ببطء وأريني مؤخرتك ومنحنيات جسمك بوضوح.",
  "ارفعي ثوبك قليلاً وافتحي ساقيك ببطء ودعيني أتأمل جمالك.",
  "ضعي وسادة بين ساقيك وفركي نفسك عليها وأنت تنظرين لعيني.",
  "ارتدي ملابس داخلية شفافة فقط وأرقصي لي رقصة إغراء بطيئة.",
  "اقتربي من الكاميرا وضعي أصبعك في فمك وامتصيه ببطء شديد.",
  "استلقي على السرير وارفعي ساقيك عالياً وأريني كل شيء.",
  "قولي لي بصوت عالٍ ومثير: «أنا أشتعل شوقاً لجسدك الليلة».",
  "امسحي جسمك بالزيت ببطء واجعلي بشرتك تلمع أمامي.",
  "انظري إلى الكاميرا والعقي شفتيك بنظرة ملؤها الشهوة.",
  "اركعي أمام الكاميرا وقولي: «أنا ملكك وحدك الليلة يا حبيبي».",
  "المسي نفسك بأصابعك وأريني كيف تستمتعين من أجلي.",
  "ضعي ثلجاً على حلماتك وأريني ردة فعلك المشتعلة.",
  "قولي لي ثلاثة أشياء جريئة تريدين أن أفعلها بجسمك الليلة.",
  "ارتدي جوارب طويلة فقط ودعيني أتأمل جسدك الفاتن.",
  "اجلسي على الكرسي بوضعية مثيرة جداً وافتحي ساقيك ببطء.",
  "دلّكي ثديك بحركات دائرية وأخبريني كم تحبين لمساتي.",
  "قولي كلمات جريئة عن الشيء الذي ترغبين أن أفعله بفمك.",
  "انهي بنفسك أمام الكاميرا وأريني وجهك لحظة الوصول للذروة.",
  "ارتدي قميص نوم شفاف فقط وأريني كيف يلتصق بجسدك.",
  "انحني على السرير وارفعي مؤخرتك عالياً وأنت تبتسمين بمكر.",
  "أرسلي لي فيديو قصير وأنت تتنفسين بصوت عالٍ من الإثارة.",
  "المسي صدرك وجسمك في نفس الوقت وأنت تغمضين عينيك.",
  "قولي لي أين تريدين أن أبدأ بلمسك وتقبيلك عندما نلتقي.",
  "اجلسي أمام المرآة وافتحي ملابسك بينما أنظر إليك.",
  "استلقي على بطنك وارفعي مؤخرتك واضغطي عليها بيدك ببطء.",
  "افتحي فمك وأخرجي لسانك ببطء كأنك مستعدة لقبلة حارة.",
  "أرييني كيف تلعقين أصابعك بعد أن تلمسي شفتيك وجسدك.",
  "قولي بصوت ناعم ومثير: «أنا لك بالكامل الليلة، افعل بي ما تشاء».",
  "ارفعي ثديك بيدك وقبليه أو قرّبيه من فمك ببطء.",
  "استخدمي عطرك المفضل ورشيه على رقبتك وصدرك وأنت تتأوهين.",
  "تعمدي المشي أمامي بخصر مائل وحركات إغراء تدوبني.",
  "أرسلي قبلة طويلة ومثيرة في الهواء مع غمزة من عينيك.",
  "تلمسي رقبتك ونزولاً إلى صدرك بأطراف أصابعك الحنونة.",
  "همسي بكلمات جريئة ودافئة عن مدى اشتياقك لقربي.",
  "ضع يدي على صدرك واجعلينا نتخيل اللحظة معاً.",
  "اخترقي عيني بنظراتك واطلبي مني الحركة التي تمتعك أكثر.",
  "المسي شفاهك بإصبعك ثم مرريه على جسدك ببطء شديد.",
  "قولي بصوت خافت: «كل جزء في جسدي ينتظر لمساتك الليلة»."
];

// طلبات الزوج التي تطلبها الزوجة منه (تركز على القوة، الرجولة، المداعبة والإثارة)
const defaultWifeTasks = [
  "انزع قميصك ببطء وأرني صدرك وعضلاتك وأنت تتلمسها.",
  "أمسك قضيبك أمام الكاميرا ودلّكه ببطء وأنت تنظر إليّ بشهوة.",
  "قل لي بصوت خشن ومثير: «أنا ملكك وحدك ولن أتركك أبداً».",
  "أرسل لي فيديو قصير وأنت تتنفس بصوت عالٍ وتتخيلني معك.",
  "اقترب من الكاميرا واهمس بكلمات جريئة عما ستفعله بي الليلة.",
  "تخيل أنني مستلقية أمامك، واركع كأنك ستبدأ بمتعتي.",
  "أرني كيف تفرك قضيبك بإبهامك وأنت تنظر بعيني مباشرة.",
  "قل لي أقذر وأجرأ كلمة تحب أن تسمعني أقولها لك في السر.",
  "امسك قضيبك بقوة من القاعدة إلى الرأس وأرني كيف ينبض.",
  "تحدث معي بصوت واثق ومثير وأخبرني كم تشتهي جسدي.",
  "أرسل لي صورة مقربة وأنت تضغط على قضيبك بحجمه الكامل.",
  "قل لي: «أريد أن أملأ كل إنش في جسدك برغبتي الليلة».",
  "أرني كيف تداعب خصيتيك ببطء وأنت تتأوه باسمي.",
  "تخيل أنني أمتصك الآن، وتصرف بحركات فمك ووجهك بناءً على ذلك.",
  "قل لي كيف ستجعلني أصل إلى الذروة بين ذراعيك الليلة.",
  "دلّك كامل طول قضيبك بالزيت حتى يصبح لامعاً وأرني.",
  "اضغط على رأس قضيبك بأصبعك وأرني السائل وهو يخرج ببطء.",
  "تحدث معي بكلام شهواني جاد واطلب مني أن أكون مطيعة لك.",
  "أرني كيف تضرب قضيبك برفق على راحة يدك بجرأة.",
  "قل لي أين تريد أن أضع فمي ولساني أولاً عندما ألقاك.",
  "دلّك رأس القضيب بحركة دائرية بطيئة جداً أمام الكاميرا.",
  "ارفع قضيبك بيدك وأرني قوته وحجمه بوضوح.",
  "تخيل أنني راكعة أمامك وتكلم معي كأنني موجودة تحتك الآن.",
  "امسك قضيبك بكلتا يديك ودلّكه بقوة وسرعة متصاعدة.",
  "قل لي أقذر شيء تخطط لفصله بجسدي عندما نكون وحدنا.",
  "دلّك قضيبك بسرعة ثم توقف فجأة وأرني ردة فعلك المشتعلة.",
  "أرني خصيتيك بوضوح وأنت ترفعهما بيدك ببطء.",
  "تخيل أنك فوقي وتحرك وركيك كأننا في منتصف اللحظة.",
  "قل لي «أنا أريدك الآن بكل جوارحي» بصوت ملؤه الشهوة.",
  "امسك رأس القضيب فقط وفركه ببطء شديد وأنت تغمض عينيك.",
  "دلّك جسدك وصدرك بيدك واجعلني أشعر برجولتك.",
  "قل لي كيف تريدني أن أستخدم يدي ولساني عليك الليلة.",
  "أرني وجهك وتعبيراته وأنت تمسك نفسك بقوة وتحبس أنفاسك.",
  "اضغط على قاعدة القضيب وأرني كيف ينبض بالرغبة.",
  "تخيل أنني ألتصق بك بقوة وتصرف بناءً على هذا الشعور.",
  "قل كلمات جريئة ومثيرة عن مؤخرتي وجسدي.",
  "أرسل فيديو وأنت تصل تقريباً للذروة ثم تتوقف فجأة.",
  "أنهِ أمام الكاميرا وأرني وجهك وقضيبك لحظة القذف.",
  "اقترب واطبع قبلة دافئة على الكاميرا وكأنك تقبل شفتي.",
  "قولي لي بصوت رجولي حنون: «أنتِ أنثاي الوحيدة والمثيرة دائماً»."
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
