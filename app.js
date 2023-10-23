const btn = document.querySelectorAll('.btn');
const stat = document.querySelector('.score');
const startGame = document.querySelector('.start');

const turns = {
    0:      [1,5,3],
    1:      [0,2],
    2:      [1,3,4],
    3:      [0,2,4],
    4:      [2,3,5],
    5:      [0,4],
};

let checkTurn = false;

const mouse = {
    currPos: 0,
    targetPos: 0,

    move(currPos, targetPos, currElm, targetEl) {
        if (contains(turns[currPos], targetPos)) {
            mouse.currPos = targetPos;
            mouse.targetPos = '';
            setPlayer(targetEl, currElm);
            checkTurn = true;
        } else {
            stat.textContent = 'Слишком далеко';
        }
    }
}

const cat = {
    currPos: 0,
    targetPos: 0,

    move(currPos, currElm) {
        let targetTurns = turns[currPos];
        cat.targetPos = targetTurns[Math.floor(Math.random() * turns[currPos].length)];
        let targetEl = document.querySelector('.btn[data-num="'+cat.targetPos+'"]');

        cat.currPos = cat.targetPos;
        cat.targetPos = '';
        targetEl.style = "background-image: url(cat.png); background-size: contain; background-repeat: no-repeat;";
        currElm.style = "background-image: none";
    }
}

startGame.addEventListener("click", setup);

btn.forEach(elem => {
    elem.addEventListener("click", function (e) {
        let targetEl = e.target;
        let currEl = document.querySelector('.btn[data-num="'+mouse.currPos+'"]');
        
        mouse.move(mouse.currPos, targetEl.dataset.num, currEl, targetEl);
        if (mouse.currPos == cat.currPos) {
            targetEl.style = "background: url(cat.png); background-size: contain; background-repeat: no-repeat;";
            alert('Вы проиграли! Кошка вас поймала');
            setup();
        }

        if (checkTurn) {
            cat.move(cat.currPos, document.querySelector('.btn[data-num="'+cat.currPos+'"]'));
            checkTurn = false;
        }
        
        if (cat.currPos == mouse.currPos) {
            targetEl.style = "background: url(cat.png); background-size: contain; background-repeat: no-repeat;";
            stat.textContent = 'Вы проиграли! Кошка вас поймала';
            alert('Вы проиграли! Кошка вас поймала');
            setup();
        }
    });
});

function setup() {
    alert('Это игра Кошки-мышки. Вы играете за мышку, ваша задача не дать себя поймать.');
    alert('Кликайте на клетки, чтобы переместиться на выбранную область. Передвигаться вы можете только на одну клетку');
    alert('Светлые клетки обозначают сокращенный путь, то есть они соеденены');
    stat.textContent = 'Новый раунд';
    btn.forEach(elem => {
        elem.style = "background-image: none";
    });

    let positions = [...getRandomSet(0, 5, 2)];
    mouse.currPos = positions[0];
    cat.currPos = positions[1];
    let currentMouse = document.querySelector('.btn[data-num="'+mouse.currPos+'"]');
    let currentCat = document.querySelector('.btn[data-num="'+cat.currPos+'"]');
    currentMouse.style = "background: url(mouse.png); background-size: contain; background-repeat: no-repeat;";
    currentCat.style = "background: url(cat.png); background-size: contain; background-repeat: no-repeat;";
}

function setPlayer(targetEl, currEl) {
    targetEl.style = "background: url(mouse.png); background-size: contain; background-repeat: no-repeat;"
    currEl.style = "background-image: none";
}

function getRandomSet(lo, hi, n) {
    var res = new Set();
    while (res.size < n) res.add(Math.floor(Math.random() * (hi - lo + 1)) + lo);
    return res;
}

function contains(arr, elem) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == elem) {
            return true;
        }
    }
    return false;
}