const btn = document.getElementById('button');
const container = document.querySelector('.game-container');
const WAIT_TIME = 59;
const cat = document.querySelector('.cat');
const text = document.getElementById('comeon');

btn.addEventListener('click', () => {
    // Если кнопка уже нажата (есть класс active), выходим, 
    // чтобы повторные клики во время таймера ничего не ломали
    if (container.classList.contains('active') && btn.disabled) return;

    if (!container.classList.contains('active')) {
        btn.disabled = true;
        container.classList.add('active');
        setTimeout(function() {startTimer()}, 1500);

    } else {
        showResult();
    }
});

function startTimer() {
    let timeLeft = WAIT_TIME;
    btn.innerText = `0:${timeLeft}`;

    const countdown = setInterval(() => {
        timeLeft--;
        
        if (timeLeft >= 0) {
            if (timeLeft < 10) {btn.innerText = `0:0${timeLeft}`;} else{
                btn.innerText = `0:${timeLeft}`;
            }
        } else {
            clearInterval(countdown);
            btn.classList.add('ready');
            btn.disabled = false;
            setTimeout(function() {btn.innerText = "Открыть коробку";}, 500);
        }
    }, 1000);
}

function showResult() {
    const isAlive = Math.random() > 0.5;
    btn.disabled = true;
    // 1. ЗАМЕР: Узнаем высоту ДО изменений
    const oldHeight = text.offsetHeight;

    // 2. ФИКСАЦИЯ: Записываем её в инлайновый стиль, чтобы блок не прыгнул
    text.style.height = oldHeight + 'px';

    if (!isAlive) {
        cat.src = 'img/cat_asleep.png';
        cat.classList.add('asleep')
        text.innerText = "Котик расслабился и уснул!"
    } else {
        text.innerText = "Котик бодр как никогда!"
    }
    // 4. НОВЫЙ ЗАМЕР: Узнаем, какая высота нужна новому тексту
    // Сначала временно сбрасываем высоту в auto, чтобы померить реальный размер контента
    text.style.height = 'auto';

    const newHeight = text.offsetHeight;

    // 5. АНИМАЦИЯ: Возвращаем старую высоту и тут же назначаем новую
    text.style.height = oldHeight + 'px';
    
    // Маленький хак для браузера (force reflow), чтобы он заметил смену высоты
    text.offsetHeight; 

    // Теперь задаем финальную высоту, и она плавно изменится благодаря CSS transition
    text.style.height = newHeight + 'px';

    container.classList.add('final');
}