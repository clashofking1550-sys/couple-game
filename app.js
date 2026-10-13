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
  if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();
  }
} catch (e) {
  console.warn("العمل في وضع التخزين المحلي");
}

// ====================== القوائم الافتراضية المتبادلة ======================
const wifeRequestsForHusband = [
  "انظر في عيني بنظرة حب دافئة ودعني أقرأ كم تشتاق لي.",
  "احضنّي بين ذراعيك بقوة وحنان واجعلني أشعر بالأمان الكامل.",
  "قبّل جبهتي برفق وأنت تهمس لي بكلمات شكر وتقدير.",
  "اقترب مني واهمس بصوت هادئ: «أنتِ أجمل نعمة في حياتي».",
  "امسك يديّ الاثنتين واطبع عليهما قبلة دافئة ومليئة بالحب.",
  "انزع قميصك ببطء وأرني صدرك وعضلاتك وأنت تتلمسها.",
  "أمسك قضيبك أمام الكاميرا ودلّكه ببطء وأنت تنظر إليّ بشهوة.",
  "قل لي بصوت خشن ومثير: «أنا ملكك وحدك ولن أتركك أبداً».",
  "أرسل لي فيديو قصير وأنت تتنفس بصوت عالٍ وتتخيلني معك.",
  "اقترب من الكاميرا واهمس بكلمات جريئة عما ستفعله بي الليلة."
];

const husbandRequestsForWife = [
  "انظري في عيني مباشرة لمدة دقيقة كاملة دون أن تتحدثي أو تضحكي.",
  "اقتربي وضعي رأسك على صَدري واستمعي لنبضات قلبي وأنت تغمضين عينيك.",
  "ارسمي بإصبعك شكلاً خفيفاً أو قلباً على كفّ يدي ببطء.",
  "اهمسي في أذني بصوت هادئ جداً بأجمل صفة تحبينها في شخصيتي.",
  "ضعي عطرك المفضل واطبعي قبلة دافئة على خدّي.",
  "اخلعي جزءاً من ملابسك ببطء أمام الكاميرا وأنت تنظرين إليّ بشهوة.",
  "المسي حلماتك ببطء ودلكيهما حتى تحمرا وأنت تتأوهين.",
  "انحني ببطء وأريني مؤخرتك ومنحنيات جسمك بوضوح.",
  "ارفعي ثوبك قليلاً وافتحي ساقيك ببطء ودعيني أتأمل جمالك.",
  "ضعي وسادة بين ساقيك وفركي نفسك عليها وأنت تنظرين لعيني."
];

// ====================== حالة التطبيق ======================
let currentRole = null; 
let roomCode = null;
let myTasks = [];
let isMyTurn = false;
let currentRequest = null;

// ====================== عناصر DOM وتشغيل الصفحة ======================
window.addEventListener('load', () => {
  const btnHusband = document.getElementById('btn-husband');
  const btnWife = document.getElementById('btn-wife');
  const btnJoin = document.getElementById('btn-join');

  if (btnHusband) {
    btnHusband.addEventListener('click', () => {
      currentRole = 'husband';
      btnHusband.style.outline = '3px solid #fff';
      if (btnWife) btnWife.style.outline = 'none';
    });
  }

  if (btnWife) {
    btnWife.addEventListener('click', () => {
      currentRole = 'wife';
      btnWife.style.outline = '3px solid #fff';
      if (btnHusband) btnHusband.style.outline = 'none';
    });
  }

  if (btnJoin) {
    btnJoin.addEventListener('click', joinRoom);
  }

  const actionBtn = document.getElementById('action-btn');
  if (actionBtn) {
    actionBtn.addEventListener('click', sendRandomRequest);
  }

  const btnDone = document.getElementById('btn-done');
  if (btnDone) {
    btnDone.addEventListener('click', () => {
      const modal = document.getElementById('request-modal');
      if (modal) modal.classList.add('hidden');
      
      const nextTurnRole = currentRole;

      if (database && roomCode) {
        database.ref(`rooms/${roomCode}/currentRequest`).remove().catch(() => {});
        database.ref(`rooms/${roomCode}/turn`).set(nextTurnRole).catch(() => {});
      } else if (roomCode) {
        localStorage.removeItem(`request_${roomCode}`);
        localStorage.setItem(`turn_${roomCode}`, nextTurnRole);
      }
    });
  }

  const btnHide = document.getElementById('btn-hide');
  if (btnHide) {
    btnHide.addEventListener('click', () => {
      const modal = document.getElementById('request-modal');
      if (modal) modal.classList.add('hidden');
    });
  }

  const btnEditList = document.getElementById('btn-edit-list');
  if (btnEditList) {
    btnEditList.addEventListener('click', () => {
      renderTasksList();
      showScreen('edit');
    });
  }

  const btnBack = document.getElementById('btn-back');
  if (btnBack) {
    btnBack.addEventListener('click', () => {
      updateTurnUI();
      showScreen('game');
    });
  }

  const btnAddTask = document.getElementById('btn-add-task');
  if (btnAddTask) {
    btnAddTask.addEventListener('click', () => {
      const newTask = prompt('اكتب طلباً جديداً لتضيفه إلى قائمتك:');
      if (newTask && newTask.trim()) {
        myTasks.push(newTask.trim());
        saveMyTasks();
        renderTasksList();
      }
    });
  }

  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      if (confirm('هل تريد الخروج؟')) {
        location.reload();
      }
    });
  }

  showScreen('login');
});

// ====================== دالة الدخول الفوري ======================
function joinRoom() {
  const roomInput = document.getElementById('room-code');
  const code = roomInput ? roomInput.value.trim() : '';
  
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
  startListeningSafe();
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
  myTasks = currentRole === 'husband' ? [...wifeRequestsForHusband] : [...husbandRequestsForWife];
  saveMyTasks();
}

function saveMyTasks() {
  const key = `tasks_${roomCode}_${currentRole}`;
  localStorage.setItem(key, JSON.stringify(myTasks));
}

// ====================== واجهة اللعب ======================
function setupGameUI() {
  const themeWrapper = document.getElementById('theme-wrapper');
  if (themeWrapper) {
    themeWrapper.className = currentRole === 'husband' ? 'theme-husband' : 'theme-wife';
  }
  updateTurnUI();
}

function updateTurnUI() {
  const turnText = document.getElementById('turn-text');
  const statusMessage = document.getElementById('status-message');
  const actionBtn = document.getElementById('action-btn');

  if (isMyTurn) {
    if (turnText) turnText.textContent = currentRole === 'husband' ? 'دورك (اسحب طلباً لتنفذه)' : 'دورك (اسحبي طلباً لتنفذيه)';
    if (statusMessage) statusMessage.textContent = `لديك ${myTasks.length} طلب في قائمتك – اضغط لسحب الطلب`;
    if (actionBtn) {
      actionBtn.disabled = myTasks.length === 0;
      actionBtn.textContent = myTasks.length > 0 ? 'اسحب طلباً' : 'انتهت الطلبات! أعد تعيين القائمة';
    }
  } else {
    if (turnText) turnText.textContent = currentRole === 'husband' ? 'دور الزوجة' : 'دور الزوج';
    if (statusMessage) statusMessage.textContent = 'الطرف الآخر ينفذ مهمته الآن... انتظر حتى ينهيها';
    if (actionBtn) {
      actionBtn.disabled = true;
      actionBtn.textContent = 'في انتظار إتمام المهمة...';
    }
  }
}

// ====================== سحب وإرسال الطلب ======================
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

  if (database && roomCode) {
    database.ref(`rooms/${roomCode}/currentRequest`).set(requestData).catch(() => {});
    database.ref(`rooms/${roomCode}/turn`).set(nextTurnRole).catch(() => {});
  } else if (roomCode) {
    localStorage.setItem(`request_${roomCode}`, JSON.stringify(requestData));
    localStorage.setItem(`turn_${roomCode}`, nextTurnRole);
  }

  isMyTurn = false;
  updateTurnUI();
}

// ====================== استقبال وعرض الطلب ======================
function receiveRequest(data) {
  if (!data) return;

  currentRequest = data;
  const requestText = document.getElementById('request-text');
  const requestImage = document.getElementById('request-image');
  const requestModal = document.getElementById('request-modal');

  if (requestText) requestText.textContent = data.text;
  if (requestImage) requestImage.innerHTML = data.image || '💋';
  if (requestModal) requestModal.classList.remove('hidden');
}

// ====================== الاستماع الآمن (يعمل أينما كان) ======================
function startListeningSafe() {
  if (database && roomCode) {
    try {
      database.ref(`rooms/${roomCode}/turn`).on('value', (snap) => {
        const turn = snap.val();
        if (turn === null) {
          if (currentRole === 'husband') {
            database.ref(`rooms/${roomCode}/turn`).set('husband').catch(() => {});
          }
          isMyTurn = (currentRole === 'husband');
        } else {
          isMyTurn = (turn === currentRole);
        }
        updateTurnUI();
      }, (error) => {
        console.warn("خطأ في الاتصال بالسيرفر، تفعيل التزامن المحلي البديل");
        startListeningLocalFallback();
      });

      database.ref(`rooms/${roomCode}/currentRequest`).on('value', (snap) => {
        const data = snap.val();
        const modal = document.getElementById('request-modal');
        if (data) {
          receiveRequest(data);
        } else {
          if (modal) modal.classList.add('hidden');
        }
      });
    } catch(e) {
      startListeningLocalFallback();
    }
  } else {
    startListeningLocalFallback();
  }
}

function startListeningLocalFallback() {
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
    const modal = document.getElementById('request-modal');
    if (req) {
      const data = JSON.parse(req);
      if (!currentRequest || currentRequest.timestamp !== data.timestamp) {
        receiveRequest(data);
      }
    } else {
      if (modal) modal.classList.add('hidden');
    }
  }, 1000);
}

// ====================== تعديل وإدارة القائمة ======================
function renderTasksList() {
  const tasksList = document.getElementById('tasks-list');
  if (!tasksList) return;

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

// ====================== التنقل بين الشاشات ======================
function showScreen(name) {
  const loginScreen = document.getElementById('login-screen');
  const gameScreen = document.getElementById('game-screen');
  const editScreen = document.getElementById('edit-screen');

  if (loginScreen) loginScreen.classList.remove('active');
  if (gameScreen) gameScreen.classList.remove('active');
  if (editScreen) editScreen.classList.remove('active');

  if (name === 'login' && loginScreen) loginScreen.classList.add('active');
  if (name === 'game' && gameScreen) gameScreen.classList.add('active');
  if (name === 'edit' && editScreen) editScreen.classList.add('active');
}
