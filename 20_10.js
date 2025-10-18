const scene1 = document.getElementById("scene1");
const scene2 = document.getElementById("scene2");
const scene3 = document.getElementById("scene3");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const playerNameInput = document.getElementById("playerName");
const genderSelect = document.getElementById("gender");
const kickMessage = document.getElementById("kickMessage");

const gameArea = document.getElementById("gameArea");
const progress = document.getElementById("progress");
const finalMessage = document.getElementById("finalMessage");

let playerName = "";
let clickCount = 0;
let totalClicks = 47;

function showScene(scene) {
  [scene1, scene2, scene3].forEach(s => s.classList.remove("active"));
  scene.classList.add("active");
}

// Cảnh 1 → xử lý giới tính
startBtn.addEventListener("click", () => {
  playerName = playerNameInput.value.trim();
  const gender = genderSelect.value;

  if (playerName === "") {
    alert("Hãy nhập tên trước khi chơi!");
    return;
  }

  if (gender === "") {
    alert("Vui lòng chọn giới tính!");
    return;
  }

  // Nếu là nam → bị kick
  if (gender === "male") {
    kickMessage.textContent = "🚫 Bạn đã bị kick vì là nam! 👋 Ra ngoài chơi đi nhé! 😊";
    kickMessage.classList.remove("hidden");
    // Ẩn các phần còn lại
    playerNameInput.style.display = "none";
    genderSelect.style.display = "none";
    startBtn.style.display = "none";
    return;
  }

  // Nếu là nữ → vào trò chơi
  kickMessage.classList.add("hidden");
  clickCount = 0;
  showScene(scene2);
  spawnButton();
});

// Tạo nút ngẫu nhiên
function spawnButton() {
  gameArea.innerHTML = "";
  const btn = document.createElement("button");
  btn.classList.add("game-btn");

  const messages = [
    "Click tôi!",
    "Click tôi!",
    "Click tôi!",
    "Click tôi!",
    "Click tôi!",
    "Click tôi!",
    "Click tôi!",
    "Click tôi!",
    "Click tôi!",
    "Click đi ? ",
    "Click đi ? ",
    "Click nhanh vào ! :))) ",
    "Click nhanh vào ! :))) ",
    "Lẹ lên! :)))",
    "Lẹ lên! :)))",
    "Sắp tới rồi :))",
    "Sắp tới rồi :))",
    "Cố lên :)))",
    ":)))",
    ":)))",
    ":)))",
    ":)))",
    ":)))",
    ":)))",
    ":)))",
    ":)))",
    ":)))",
    "Cậu vẫn cố gắng hả? :)))",
    "Đúng rồi, phải thế ! :)))",
    "Cuộc sống là như vậy đó :)))",
    "Phải luôn cố gắng :)))",
    "Mỗi giây dừng là bị thụt lùi lại ",
    "Cảm giác ấy nó rất khó chịu, tớ hiểu mà :)",
    "Mặc kệ và bước tiếp nhỉ ?",
    "Phải không ? ",
    "Phải ? :)))",
    "Phải rồi :)))",
    "Tớ quên mất...",
    "Cậu là người mạnh mẽ thế nào...",
    "Ừ !",
    "Có lẽ là người phụ nữ",
    "mạnh mẽ nhất",
    "xinh đẹp nhất",
    "chu đáo nhất",
    "tuyệt vời nhất",
    "mà tớ từng biết hoặc tớ chưa biết :)))",
    "🤗",
  ];
  btn.textContent = messages[clickCount];

  const maxX = gameArea.clientWidth - 100;
  const maxY = gameArea.clientHeight - 50;
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;
  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;

  // --- Hiệu ứng gõ chữ cho bài thơ ---



  btn.addEventListener("click", () => {
    clickCount++;
    progress.textContent = `Đã bấm ${clickCount}/${totalClicks}`;
    if (clickCount >= totalClicks) {
      endGame();
    } else {
      spawnButton();
    }
  });

  gameArea.appendChild(btn);
}

const poemLines = [
  "🌸 Gửi Những Đóa hoa Tổ Quốc 🌸\n",
  "",
  "Tháng mười lại ghé qua đây,",
  "Gửi bao thương mến cho người con gái.",
  "Dẫu quen, dẫu lạ — hôm nay,",
  "Xin chúc nụ cười chẳng hề phôi phai.",
  "",
  "Xin chúc đời vẫn tinh mơ",
  "Như bình minh lên, như mùa xuân tới",
  "Xin chúc lòng vẫn ngây thơ,",
  "Như sương mai đọng trong tờ nắng sớm.",
  "",
  "Tuổi xuân như gió mơn man,",
  "Dẫu bao bão tố — dịu dàng vẫn nguyên.",
  "Tháng mười , tớ chỉ gửi riêng",
  "Một lời chúc nhỏ, mà nghiêng cả trời.",
  "",
  "Cho ai đang sống giữa đời,",
  "Một chút an yên, một lời thương mến.",
  "Chúc cậu, dù lạ hay quen",
  "Mãi là điều đẹp, giữa muôn điều thường. 💖"
];

function typePoem() {
  const poemEl = document.getElementById("poem");
  poemEl.innerHTML = "";
  let line = 0;
  let char = 0;

  function typeChar() {
    if (line < poemLines.length) {
      const currentLine = poemLines[line];
      if (char < currentLine.length) {
        poemEl.innerHTML += currentLine.charAt(char);
        char++;
        setTimeout(typeChar, 40); // tốc độ gõ từng ký tự
      } else {
        poemEl.innerHTML += "\n";
        line++;
        char = 0;
        setTimeout(typeChar, 400); // nghỉ giữa các dòng
      }
    } else {
      // hiệu ứng lung linh khi gõ xong
      poemEl.style.textShadow = "0 0 10px #ff7eb3, 0 0 20px #ffc1dc";
      poemEl.style.transition = "all 1s ease-in-out";
    }
  }

  typeChar();
}

// Gọi hàm này khi đến scene3
const observer = new MutationObserver(() => {
  if (scene3.classList.contains("active")) {
    typePoem();
  }
});
observer.observe(scene3, { attributes: true, attributeFilter: ["class"] });

function endGame() {
  showScene(scene3);
  finalMessage.textContent = `🎉 Xin chúc mừng ${playerName}! Bạn đã hoàn thành trò chơi sau ${clickCount} lần bấm.`;
}

restartBtn.addEventListener("click", () => {
  playerNameInput.value = "";
  genderSelect.value = "";
  progress.textContent = "";
  playerNameInput.style.display = "inline";
  genderSelect.style.display = "inline";
  startBtn.style.display = "inline";
  kickMessage.classList.add("hidden");
  showScene(scene1);
});
