// 1. 背景漂浮爱心
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 6 + 6) + 's';
    document.getElementById('heartBg').appendChild(heart);
    setTimeout(() => heart.remove(), 12000);
}
setInterval(createHeart, 280);

// 2. 点击页面弹出多种浪漫特效 (爱心, 星星, 花朵)
const EFFECTS = ['❤', '✨', '🌸', '💖', '⭐'];
document.addEventListener('click', function(e) {
    // 随机选择一个特效
    const randomEffect = EFFECTS[Math.floor(Math.random() * EFFECTS.length)];
    // 随机选择一个颜色
    const colors = ['#ff4d79', '#ff6b8b', '#e0527a', '#c73e6d', '#ff94a9'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.innerHTML = randomEffect;
    effect.style.color = randomColor;
    effect.style.left = e.clientX + 'px';
    effect.style.top = e.clientY + 'px';
    
    document.getElementById('clickEffects').appendChild(effect);
    setTimeout(() => effect.remove(), 1200);
});

// 3. 计算结婚总天数
function calcLoveDay() {
    const dateInput = document.getElementById('loveDate').value;
    if (!dateInput) {
        alert('请选择你们的结婚纪念日 💗');
        return;
    }
    const start = new Date(dateInput);
    const now = new Date();
    const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    
    // 为数字添加动画效果
    const dayCountEl = document.getElementById('dayCount');
    let current = 0;
    const increment = Math.ceil(diff / 30); // 分30步动画完成
    const timer = setInterval(() => {
        current += increment;
        if (current >= diff) {
            dayCountEl.innerText = diff;
            clearInterval(timer);
        } else {
            dayCountEl.innerText = current;
        }
    }, 50);
}

// 4. 四周年花果婚专属告白文案
const loveWordList = [
    "四年花果相伴，花开有时，爱无止境。",
    "从初见欢喜到如今相守，四季轮回，幸好一直是你。",
    "花果婚快乐，愿我们日子如繁花绚烂，生活比果实甘甜。",
    "一千四百多个日夜，烟火寻常，因你而万般温柔。",
    "四年相守，褪去青涩，爱意沉淀，愈发醇厚动人。",
    "春看花，夏听雨，秋赏月，冬踏雪，岁岁年年皆有你。",
    "婚姻是一场漫长旅途，第四个年头，我们依旧十指紧扣。",
    "花开四季情不改，果落年年意如初，四周年快乐。",
    "谢谢你四年以来的包容与陪伴，未来漫漫，继续同行。",
    "时光匆匆四年，最幸运的事，便是身边始终是你。",
    "以四年为序章，往后余生，朝朝暮暮，不离不弃。",
    "鲜花易谢，果实长存，就像我们的爱，安稳且长久。"
];

function getRandomWord() {
    const randomIdx = Math.floor(Math.random() * loveWordList.length);
    const wordsEl = document.getElementById('loveWords');
    // 添加淡入动画
    wordsEl.classList.remove('fade-in');
    void wordsEl.offsetWidth; // 触发重绘
    wordsEl.innerText = loveWordList[randomIdx];
    wordsEl.classList.add('fade-in');
}

// 5. 本地留言功能
function addMsg() {
    const input = document.getElementById('msgInput');
    const content = input.value.trim();
    if (!content) {
        alert('写下纪念日的心里话再保存吧 💌');
        return;
    }
    let msgArr = JSON.parse(localStorage.getItem('loveMsg')) || [];
    msgArr.push(content);
    localStorage.setItem('loveMsg', JSON.stringify(msgArr));
    input.value = '';
    renderMsg();
    
    // 提交成功的动画反馈
    const btn = document.querySelector('.msg-card .btn');
    const originalText = btn.innerText;
    btn.innerText = '✅ 已封存';
    btn.style.background = 'linear-gradient(120deg, #52c41a, #389e0d)';
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = '';
    }, 1500);
}

function renderMsg() {
    const msgList = document.getElementById('msgList');
    const msgArr = JSON.parse(localStorage.getItem('loveMsg')) || [];
    let html = '';
    msgArr.forEach((item, index) => {
        // 为每条留言添加延迟动画
        html += `<div class="msg-item" style="animation-delay: ${index * 0.1}s">${item}</div>`;
    });
    msgList.innerHTML = html;
}

// 页面加载初始化
window.onload = function() {
    renderMsg();
    // 页面加载时，为“未来期许”卡片添加动画
    const wishCard = document.querySelector('.wish-card');
    setTimeout(() => {
        wishCard.style.opacity = '1';
    }, 500);
}