// ====================== إعدادات Firebase ======================
const firebaseConfig = {
  apiKey: "AIzaSyBDpevzaNnyk0Nyk7-1L-PFPVgz2rlHvQ",
  authDomain: "couple-game-aeec9.firebaseapp.com",
  databaseURL: "https://couple-game-aeec9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "couple-game-aeec9",
  storageBucket: "couple-game-aeec9.appspot.com",
  messagingSenderId: "132755870810",
  appId: "1:132755870810:web:4f064870e2cb427a6774",
  measurementId: "G-BCF7W6B3YM"
};

let database = null;
try {
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();
} catch (e) {
  console.warn("Firebase غير مفعّل - يعمل في الوضع المحلي فقط");
}

// ====================== القوائم الافتراضية ======================
const defaultHusbandCreatedForWife = [
  "انظري في عيني مباشرة لمدة دقيقة كاملة دون أن تتحدثي أو تضحكي.",
  "اقتربي وضعي رأسك على صَدري واستمعي لنبضات قلبي وأنت تغمضين عينيك.",
  "ارسمي بإصبعك شكلاً خفيفاً أو قلباً على كفّ يدي ببطء.",
  "اهمسي في أذني بصوت هادئ جداً بأجمل صفة تحبينها في شخصيتي.",
  "ضعي عطرك المفضل واطبعي قبلة دافئة على خدّي.",
  "أمسكِ بيدي الاثنتين وقبّلي أطراف أصابعي بحنان.",
  "اجلسي بقربي وضعي رأسك على كتفي ودعيني أحيطك بذراعي.",
  "ابتسمي لي ابتسامة عريضة ومحببة كما كنت تفعلين في أول لقاء بيننا.",
  "مرّري أطراف أصابعك برفق على شعري واملأيه بلمسات دافئة.",
  "اكتبي لي رسالة قصيرة بكلمات تعبر عن حبك وشوقك لي.",
  "اخلعي جزءاً من ملابسك ببطء أمام الكاميرا وأنت تنظرين إليّ بشهوة.",
  "المسي حلماتك ببطء ودلكيهما حتى تحمرا وأنت تتأوهين.",
  "انحني ببطء وأريني مؤخرتك ومنحنيات جسمك بوضوح.",
  "ارفعي ثوبك قليلاً وافتحي ساقيك ببطء ودعيني أتأمل جمالك.",
  "ضعي وسادة بين ساقيك وفركي نفسك عليها وأنت تنظرين لعيني."
];

const defaultWifeCreatedForHusband = [
  "انظر في عيني بنظرة حب دافئة ودعني أقرأ كم تشتاق لي.",
  "احضنّي بين ذراعيك بقوة وحنان واجعلني أشعر بالأمان الكامل.",
  "قبّل جبهتي برفق وأنت تهمس لي بكلمات شكر وتقدير.",
  "اقترب مني واهمس بصوت هادئ: «أنتِ أجمل نعمة في حياتي».",
  "امسك يديّ الاثنتين واطبع عليهما قبلة دافئة ومليئة بالحب.",
  "دمِج أصابعك بأصابع يدي وشبّكها بثبات ودفء.",
  "دلك كتفيّ ورقبتي بحركات دائرية خفيفة لتخفيف تعب اليوم.",
  "انحُنِ أمامي قليلاً وامتدح جمالي وأناقتي بعبارات رقيقة.",
  "ضع يدك على قلبي وقل لي بصوت حنون: «هذا المكان ملك لكِ وحدكِ».",
  "امسح بيدك على وجنتي بحركة رقيقة جداً وحنونة.",
  "انزع قميصك ببطء وأرني صدرك وعضلاتك وأنت تتلمسها.",
  "أمسك قضيبك أمام الكاميرا ودلّكه ببطء وأنت تنظر إليّ بشهوة.",
  "قل لي بصوت خشن ومثير: «أنا ملكك وحدك ولن أتركك أبداً».",
  "أرسل لي فيديو قصير وأنت تتنفس بصوت عالٍ وتتخيلني معك.",
  "اقترب من الكاميرا واهمس بكلمات جريئة عما ستفعله بي الليلة."
];

// ====================== حالة التطبيق ======================
let currentRole = null; 
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

// ====================== تحميل القائمة ======================
function loadMyTasks() {
  const key = `tasks_${roomCode}_${currentRole}`;
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      myTasks = JSON.parse(saved);
    } catch(e) {
      resetToDefaultTasks();
    }
  } else {
    resetToDefaultTasks();
  }
}

function resetToDefaultTasks() {
  myTasks = currentRole === 'husband' ? [...defaultWifeCreatedForHusband] : [...defaultHusbandCreatedForWife];
  saveMyTasks();
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
    turnText.textContent = currentRole === 'husband' ? 'دورك (اسحب طلباً لتنفذه)' : 'دورك (اسحبي طلباً لتنفذيه)';
    statusMessage.textContent = `لديك ${myTasks.length} طلب في قائمتك – اضغط لسحب الطلب`;
    actionBtn.disabled = myTasks.length === 0;
    actionBtn.textContent = myTasks.length > 0 ? 'اسحب طلباً' : 'انتهت الطلبات! أعد تعيين القائمة';
  } else {
    turnText.textContent = currentRole === 'husband' ? 'دور الزوجة' : 'دور الزوج';
    statusMessage.textContent = 'الطرف الآخر ينفذ مهمته الآن... انتظر حتى ينهيها';
    actionBtn.disabled = true;
    actionBtn.textContent = 'في انتظار إتمام المهمة...';
  }
}

// ====================== سحب وإرسال الطلب ======================
actionBtn.addEventListener('click', sendRandomRequest);

function sendRandomRequest() {
  if (!isMyTurn) return;

  if (myTasks.length === 0) {
    if (confirm('انتهت كافة الطلبات في قائمتك! هل تريد إعادة تحميل القائمة الافتراضية؟')) {
      resetToDefaultTasks();
      updateTurnUI();
    }
    return;
  }

  const randomIndex = Math.floor(Math.random() * myTasks.length);
  const task = myTasks[randomIndex];

  myTasks.splice(randomIndex, 1);
  saveMyTasks();

  const requestData = {
    text: task,
    from: currentRole,
    timestamp: Date.now(),
    image: '🔥'
  };

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

// ====================== استقبال وعرض الطلب للطرفين ======================
function receiveRequest(data) {
  if (!data) return;

  currentRequest = data;
  requestText.textContent = data.text;
  requestImage.innerHTML = data.image || '💋';
  requestModal.classList.remove('hidden');
}

// زر إتمام المهمة (يقفل دور الطرف الآخر ولا يسمح له بالتحرك إلا بالضغط هنا)
document.getElementById('btn-done').addEventListener('click', () => {
  requestModal.classList.add('hidden');
  
  // نقل الدور للشخص الذي كان ينتظر
  const nextTurnRole = currentRequest ? (currentRequest.from === 'husband' ? 'wife' : 'husband') : currentRole;

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
    database.ref(`rooms/${roomCode}/turn`).on('value', (snap) => {
      const turn = snap.val();
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

    database.ref(`rooms/${roomCode}/currentRequest`).on('value', (snap) => {
      const data = snap.val();
      if (data) {
        receiveRequest(data);
      } else {
        requestModal.classList.add('hidden');
      }
    });
  } else {
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
        if (!currentRequest || currentRequest.timestamp !== data.timestamp) {
          receiveRequest(data);
        }
      } else {
        requestModal.classList.add('hidden');
      }
    }, 1000);
  }
}

// ====================== تعديل وإدارة القائمة ======================
document.getElementById('btn-edit-list').addEventListener('click', () => {
  renderTasksList();
  showScreen('edit');
});

document.getElementById('btn-back').addEventListener('click', () => {
  updateTurnUI();
  showScreen('game');
});

// زر لإضافة طلب مفرد
document.getElementById('btn-add-task').addEventListener('click', () => {
  const newTask = prompt('اكتب طلباً جديداً تريد إضافته للقائمة:');
  if (newTask && newTask.trim()) {
    myTasks.push(newTask.trim());
    saveMyTasks();
    renderTasksList();
  }
});

// زر لصق واستبدال القائمة كاملة (تم تصحيح الخطأ النحوي هنا)
const editHeader = document.querySelector('#edit-screen') || document.body;
let btnPasteAll = document.getElementById('btn-paste-all');
if (!btnPasteAll) {
  btnPasteAll = document.createElement('button');
  btnPasteAll.id = 'btn-paste-all';
  btnPasteAll.textContent = '📥 استبدال أو لصق قائمة جديدة كاملة';
  btnPasteAll.className = 'btn-secondary';
  btnPasteAll.style.cssText = 'margin: 10px; padding: 10px; background: #ff4757; color: white; border: none; border-radius: 8px; cursor: pointer; display: block; width: 90%; max-width: 400px; margin-left: auto; margin-right: auto;';
  
  btnPasteAll.onclick = () => {
    const bulk = prompt('اكتب أو الصق الطلبات الجديدة مفصولة بفاصلة (,) أو كل طلب في سطر:');
    if (bulk && bulk.trim()) {
      const newItems = bulk.split(/\r?\n|,/).map(item => item.trim()).filter(item => item.length > 0);
      if (newItems.length > 0) {
        if (confirm(`تم رصد ${newItems.length} طلب. هل تريد استبدال القائمة القديمة بها؟`)) {
          myTasks = newItems;
          saveMyTasks();
          renderTasksList();
          alert('تم تحديث القائمة بنجاح!');
        }
      }
    }
  };
  
  const tasksListElem = document.getElementById('tasks-list');
  if (tasksListElem && tasksListElem.parentNode) {
    tasksListElem.parentNode.insertBefore(btnPasteAll, tasksListElem);
  }
}

function renderTasksList() {
  tasksList.innerHTML = '';
  myTasks.forEach((task, index) => {
    const div = document.createElement('div');
    div.className = 'task-item';
    
    const span = document.createElement('span');
    span.textContent = task;
    
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'task-actions';
    
    const editBtn = document.createElement('button');
    editBtn.className = 'btn-edit';
    editBtn.textContent = 'تعديل';
    editBtn.onclick = () => {
      const newText = prompt('عدّل الطلب:', myTasks[index]);
      if (newText && newText.trim()) {
        myTasks[index] = newText.trim();
        saveMyTasks();
        renderTasksList();
      }
    };
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = 'حذف';
    deleteBtn.onclick = () => {
      if (confirm('هل تريد حذف هذا الطلب؟')) {
        myTasks.splice(index, 1);
        saveMyTasks();
        renderTasksList();
      }
    };
    
    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);
    
    div.appendChild(span);
    div.appendChild(actionsDiv);
    tasksList.appendChild(div);
  });
}

// ====================== خروج ======================
document.getElementById('btn-logout').addEventListener('click', () => {
  if (confirm('هل تريد الخروج؟')) {
    location.reload();
  }
});

// ====================== التنقل بين الشاشات ======================
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  if (name === 'login') loginScreen.classList.add('active');
  if (name === 'game') gameScreen.classList.add('active');
  if (name === 'edit') editScreen.classList.add('active');
}

showScreen('login');
