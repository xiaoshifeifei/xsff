// 全局变量：当前页码 & 总页数
let currentPage = 1;
const totalPage = 6;

// 转场动画核心
function pageTransition() {
    const mask = document.getElementById('transMask');
    mask.classList.add('show');
    setTimeout(() => {
        // 切换页面
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.querySelector(`.page-${currentPage}`).classList.add('active');
        // 最后一页自动生成星空
        if (currentPage === 6) createStar();
        // 关闭遮罩
        setTimeout(() => mask.classList.remove('show'), 350);
    }, 200);
}

// 上一页
function prevPage() {
    if(currentPage > 1) {
        currentPage--;
        pageTransition();
    } else {
        // 第一页点击返回无动作
        return;
    }
}
// 下一页
function nextPage() {
    if(currentPage < totalPage) {
        currentPage++;
        pageTransition();
    }
}

// 1. 全局点击特效 + 花瓣雨
document.addEventListener('click', e => {
    const box = document.getElementById('globalEffect');
    const arr = ['❤','✨','💫','🌸'];
    const item = document.createElement('div');
    item.className = 'effect-item';
    item.innerHTML = arr[Math.floor(Math.random()*arr.length)];
    item.style.left = e.clientX + 'px';
    item.style.top = e.clientY + 'px';
    box.appendChild(item);
    setTimeout(() => item.remove(), 1400);
});
// 定时飘落花瓣
function createPetal() {
    const petalBox = document.getElementById('petalBox');
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = Math.random()*100 + '%';
    petal.style.animationDuration = (Math.random()*4 + 5) + 's';
    petalBox.appendChild(petal);
    setTimeout(() => petal.remove(), 8000);
}
setInterval(createPetal, 600);

// 2. 结婚天数计算（滚动数字动画）
function calcTotalDay() {
    const input = document.getElementById('marryDate').value;
    if(!input) {
        alert('请选择结婚纪念日 💗');
        return;
    }
    const start = new Date(input);
    const now = new Date();
    const total = Math.floor((now - start) / (1000*60*60*24));
    const dom = document.getElementById('totalDay');
    let num = 0;
    const timer = setInterval(() => {
        num += Math.ceil(total / 35);
        if(num >= total) {
            dom.innerText = total;
            clearInterval(timer);
        } else {
            dom.innerText = num;
        }
    }, 40);
}

// 3. 动态爱情树 交互特效
document.getElementById('trunk').addEventListener('click', function(){
    this.style.transform = 'translateX(-50%) scale(1.1)';
    setTimeout(()=> this.style.transform = '', 300);
    createTreeHeart();
});
document.querySelectorAll('.tree-leaf').forEach(leaf => {
    leaf.addEventListener('click', function(){
        this.style.transform = 'scale(1.2) rotate(15deg)';
        setTimeout(()=> this.style.transform = '', 300);
        createTreeHeart();
    });
});
// 树木点击弹出爱心
function createTreeHeart(){
    const treeBox = document.getElementById('treeBox');
    const h = document.createElement('div');
    h.innerHTML = '❤';
    h.style.position = 'absolute';
    h.style.fontSize = '22px';
    h.style.color = '#ff4d79';
    h.style.left = (Math.random()*180 + 40) + 'px';
    h.style.top = (Math.random()*200 + 40) + 'px';
    h.style.animation = 'effectFly 1.6s ease-out forwards';
    treeBox.appendChild(h);
    setTimeout(()=> h.remove(), 1600);
}

// 4. 四周年情话库 & 切换动画
const wordList = [
    "四年花果相伴，花开有时，爱无止境。",
    "一千四百多个日夜，烟火寻常，因你万般温柔。",
    "花果婚快乐，日子如繁花绚烂，生活比果实甘甜。",
    "四季轮回，幸好陪在身边的人一直是你。",
    "以四年为序章，往后余生，朝朝暮暮不离不弃。",
    "鲜花易谢，果实长存，我们的爱安稳且长久。",
    "春看花夏听雨，秋赏月冬踏雪，岁岁年年皆有你。"
];
function changeWord() {
    const el = document.getElementById('loveSentence');
    el.style.opacity = 0;
    setTimeout(()=>{
        const idx = Math.floor(Math.random()*wordList.length);
        el.innerText = wordList[idx];
        el.style.opacity = 1;
    }, 300);
}

// 5. 留言板 本地存储
function saveMsg() {
    const input = document.getElementById('msgInput');
    const val = input.value.trim();
    if(!val) {
        alert('请写下心里话再保存哦~');
        return;
    }
    let list = JSON.parse(localStorage.getItem('loveMsg4')) || [];
    list.push(val);
    localStorage.setItem('loveMsg4', JSON.stringify(list));
    input.value = '';
    renderMsg();
}
function renderMsg() {
    const box = document.getElementById('msgShow');
    const list = JSON.parse(localStorage.getItem('loveMsg4')) || [];
    let html = '';
    list.forEach(item => {
        html += `<div class="msg-item">${item}</div>`;
    });
    box.innerHTML = html;
}

// 6. 最后一页 星空生成
function createStar() {
    const starBox = document.getElementById('starBg');
    starBox.innerHTML = '';
    for(let i=0; i<80; i++){
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 2 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        starBox.appendChild(star);
    }
}

// 页面初始化
window.onload = function(){
    renderMsg();
}