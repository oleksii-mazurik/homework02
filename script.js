// === Database of questions ===

var question = [
    {
        question: "1. Какое свойство используется для задания отступа у блока?",
        a: ['padding', 'direction', 'position', 'margin'],
        right: [0],
        type: 1
    },
    {
        question: "2. Настя обнаружила, что цвет ссылок меняется, когда они являются посещёнными. Какой CSS-код необходимо задать, чтобы цвет посещённых и непосещённых ссылок был одним и тем же:",
        a: ['a:active, a:visited {color: yellow;}', 'a:link, a:active {color: yellow;}', 'a:link {color: yellow;}', 'a:link, a:visited {color: yellow;}'],
        right: [3],
        type: 1
    },
    {
        question: "3. Какой вариант задания цвета НЕ сработает?",
        a: ['color: #hhh;','color: #000;','color: #aaaaaa;','color: #aaa;'],
        right: [0],
        type: 1
    },
    {
        question: "4. Есть такой CSS-код: body {font-size: 14pt;} p {font-size: 2em;}. Какой размер текста будет в теге p:",
        a: ['7pt','16pt','12pt','28pt'],
        right: [3],
        type: 1
    },
    {
        question: "5. Как изменить цвет фона для всех элементов h1 на странице?",
        a: ['h1[all] {background-color: #ccc;}','h1:all {background-color: #ccc;}','h1 {background-color: #ccc;}','h1.all {background-color: #ccc;}'],
        right: [2],
        type: 1
    },
    {
        question: "6. Укажите относительные единицы измерения:",
        a: ['pc','px','pt','ex'],
        right: [1,3],
        type: 2
    },

    {
        question: "7. Василий обнаружил, что границы его страницы не примыкают к краям окна браузера. Он решил, что надо добавить свойство margin: 0; Но вот куда?",
        a: ['head','doctype','html','body'],
        right: [3],
        type: 1
    },
    {
        question: "8. Укажите несуществующие значения свойства float.",
        a: ['inherit','top','bottom','left'],
        right: [1,2],
        type: 2
    },
    {
        question: "9. Каким свойством css, указанным для элемента фиксированной ширины, можно расположить его по центру обрамляющего блока?",
        a: ['margin : 0 auto;','float : none;','centered : true;','text-align : center;'],
        right: [0],
        type: 1
    },
    {
        question: "10. Что означают параметры свойства clear?",
        a: ['Параметр устанавливает, с какой стороны элемента задается его обтекание другими элементами.','Параметр устанавливает, с какой стороны элемента запрещено его обтекание другими элементами.','Параметр устанавливает, с какой стороны элемент, которому задается свойство clear будет обтекать другой элемент.'],
        right: [1],
        type: 1
    }

];
// === КОНЕЦ БАЗЫ ВОПРОСОВ ===


// temp for answers (count)

var globalCount = 0;
var globalAnswers = 0;

window.onload = function(){

//***** LOGIN PASSWORD FORM ******

var container = document.createElement('div');
    container.style.width = '500px';
    container.style.height = '350px';
    container.style.border = '1px solid black';
    container.style.margin = '0 auto 0 auto';
    container.style.padding = '10px';
    container.className = 'logPass';

var body = document.querySelector('#content');
    body.appendChild(container);

// Header

var header = document.createElement('h1');
    header.innerHTML = 'Введите логин/пароль чтобы войти в систему:';
    header.style.textAlign = 'center';
    header.className = 'styled';
    container.appendChild(header);

// Form for data input

var form = document.createElement('form');
    form.className = 'contact_form';
    container.appendChild(form);
var list = document.createElement('ul');
    form.appendChild(list);


    // LOGIN:

    var listItem = document.createElement('li');
    list.appendChild(listItem);

    var label = document.createElement('label');
    label.innerHTML = 'Login:';
    listItem.appendChild(label);
    var input = document.createElement('input');
    input.type = 'text';
    input.required = 'required';
    listItem.appendChild(input);

    // PASSWORD:

    var listItem = document.createElement('li');
    list.appendChild(listItem);

    var label = document.createElement('label');
    label.innerHTML = 'Password:';
    listItem.appendChild(label);
    var input = document.createElement('input');
    input.type = 'password';
    input.required = 'required';
    listItem.appendChild(input);


// Submit button

var submitBtn = document.createElement('button');
    submitBtn.className = 'button_styled';
    submitBtn.innerHTML = 'Войти';
    var listItem = document.createElement('li');
    list.appendChild(listItem);
    listItem.appendChild(submitBtn);

// === Submit Event ===

    form.addEventListener('submit', function(event){
    event.preventDefault();

    var need = document.querySelector('.logPass');
    need.parentNode.removeChild(need);

    var header = document.createElement('h1');
        header.className = 'styled';
        header.innerHTML = 'Тест на знание CSS';
        body.appendChild(header);

    for (var i = 0; i < question.length; i++) {
        addTest(question[i].question, question[i].a, question[i].type, question[i].right);
    }


    // Кнопка для подтверждения результатов

    var bigsubmit = document.createElement('button');
    bigsubmit.className = 'button_styled';
    bigsubmit.className += ' submit_but';
    bigsubmit.innerHTML = "Подтвердить";
    body.appendChild(bigsubmit);

    bigsubmit.addEventListener('click', function(event) {
        event.preventDefault();
        check(question);
        var need = document.querySelector('#content');
        bigsubmit.disabled = 'true';
        bigsubmit.style.opacity = '0';
        var right_container = document.createElement('div');
        right_container.className = 'right_answers';
        body.appendChild(right_container);
        var answers_count = document.createElement('p');
        answers_count.style.fontSize = '30px';
        answers_count.innerHTML = "Ваш результат:"+globalAnswers+"/10";
        right_container.appendChild(answers_count);

    });
});


}

// КОНЕЦ ОСНОВНОГО КОДА!

// === Checking test function ===

function check(question) {

    // Выбираем все блоки с вопросами

    var divs = document.querySelectorAll('.question');
    var div_length = divs.length;


    // Выделяем правильные варианты ответа

    var correctVars = document.querySelectorAll('.correct');
    for (var i = 0; i < correctVars.length; i++) {
        correctVars[i].className += ' right_variant';
    }


    // Выделяем правильные ответы

    for (i = 0; i < div_length; i++) {

        if (question[i].type == 1) {

            var radio_buttons = divs[i].querySelectorAll('.quest');

            for (var j = 0; j < radio_buttons.length; j++) {

                if (j == question[i].right[0]) {
                    if (radio_buttons[j].checked == true) {
                        divs[i].className = 'right';
                        globalAnswers += 1;
                        break;
                    }

                    else {
                        divs[i].className = 'wrong';
                        break;
                    }
                }
            }
        }

        else {

            var checkboxes = divs[i].querySelectorAll('.quest_2');
            var sumRight = question[i].right.length;
            var sum = 0;
            for (j = 0; j < checkboxes.length; j++) {
                if (checkboxes[j].checked == true) {
                    for (var k = 0; k < sumRight; k++) {
                        if (j == question[i].right[k]) sum += 1;
                    }
                }
            }

            if (sum == sumRight) {
                divs[i].className = 'right';
                globalAnswers += 1;
            }
            else divs[i].className = 'wrong';

        }


        }


}

// === Test with radio buttons inside ===

function addTest(question, answers, type, right) {

    // Создаем контейнер для вопроса

    var test_container = document.createElement('div');

    // Стилизация контейнера

    test_container.style.width = '1000px';
    test_container.style.height = '400px';
    test_container.className = 'question';
    test_container.style.padding = '5px';
    test_container.style.marginBottom = '10px'
    test_container.style.border = '1px solid black';
    var body = document.querySelector('#content');
    body.appendChild(test_container);

    // Добавляем вопрос в хедер

    var test_question = document.createElement('h2');
    test_question.innerHTML = question;
    test_question.style.textAlign = 'left';

    test_container.appendChild(test_question);

    // Создаем список вопросов

    var list = document.createElement('ol');
    test_container.appendChild(list);

    // C одним правильным ответом

    if (type==1)
    for (var i = 0; i < answers.length; i++) {
        var listItem = document.createElement('li');
        list.appendChild(listItem);
        var radiobut = document.createElement('input');
        radiobut.type = 'radio';
        radiobut.name = 'question'+globalCount;
        radiobut.className = 'quest';

        radiobut.style.display = 'inline block';
        listItem.appendChild(radiobut);
        var answer = document.createElement('p');
        if (i == right[0]) answer.className = 'correct'
        answer.innerHTML = answers[i];
        listItem.appendChild(answer);
    }

    // С несколькими правильными ответами

    else for (var i = 0; i < answers.length; i++) {
        var listItem = document.createElement('li');
        list.appendChild(listItem);
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'question'+globalCount;
        checkbox.className = 'quest_2';
        checkbox.style.display = 'inline block';
        listItem.appendChild(checkbox);
        var answer = document.createElement('p');
        for (var j = 0; j < right.length; j++) {
            if (i == right[j]) answer.className = 'correct';
        }
        answer.innerHTML = answers[i];
        listItem.appendChild(answer);
    }

    globalCount++;

}






