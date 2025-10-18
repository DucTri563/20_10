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

