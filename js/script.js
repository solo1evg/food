window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');


    tabs.forEach((item) => {
        console.log(`tabs -> ${item}`);
    });

    function hideTabContent() { // скрываем все фунуции 
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => { // удаляем класс активности
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    // делегирование событий и события клика

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
            //__16: 53
        }
        console.log('not if' + target.classList);
    });

    // timer
    // разница между дедлайном и текущем временем
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock(); // убираем задержку 1 сек при генерации страницы

        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }

        }
    }
    setClock('.timer', '2022-11-14');

    // Modal
    const modalTrigger = document.querySelectorAll('[data-modal]'), // [] дата атрибуты селектор
        modal = document.querySelector('[data-crutch]'),
        // modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');

    function openModal() {
        // modal.classList.add('show');
        // modal.classList.remove('hide');
        document.documentElement.scrollHeight + 1;
        modal.classList.remove('modal');
        modal.classList.remove('hide');
        modal.classList.add('modal_no_display');
        // modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId); // если открыли сами модалку, то отключаем таймер
        console.log('function openModel ');
    }

    function closeModel() {
        modal.classList.remove('modal_no_display');
        modal.classList.add('modal');
        modal.classList.add('hide');
        document.body.style.overflow = '';
        console.log('function closeModel ');
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
            openModal();
            console.log('click button open modal window');
        });
    });



    modalCloseBtn.addEventListener('click', closeModel);
    // modalCloseBtn.addEventListener('click', (e) => { // закрываем модальное окно
    //     // modal.classList.add('hide');
    //     // modal.classList.remove('show');
    //     closeModel(e);
    //     console.log('click off button');
    // });

    modal.addEventListener('click', (e) => { // кликаем в любую часть и модальное окно закрывается 
        if (e.target === modal) { // target - куда кликнул пользователь
            closeModel();
            console.log('click outsize modal window');
        }
    });

    document.addEventListener('keydown', (e) => { // слушаем esc и проверяем активно ли модальное окно
        if (e.code === "Escape" && modal.classList.contains('modal_no_display')) {
            closeModel();
            console.log('click escape ');
        }
    });

    // const modalTimerId = setTimeout(openModal, 15000);

    function showModalByScroll() {
        console.log(Math.round(window.pageYOffset + document.documentElement.clientHeight));
        console.log('scrollHeight ' + document.documentElement.scrollHeight);
        if (Math.round(window.pageYOffset + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) { // докрутили до конца
            openModal();
            console.log('scroll show modal window ');
            window.removeEventListener('scroll', showModalByScroll);
            console.log('scroll remove');
        } // pageXOffset сколько прокрутил + clientHeight видимая часть scrollHeight - вся высота
    }

    window.addEventListener('scroll', showModalByScroll);

    // class

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) { // rest operator
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 60;
            this.changeToRUB();
        }

        changeToRUB() {
            this.price = this.price * this.transfer;
        }
        // <div class="menu_item">            
        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) { // если массив пустой, то устанавливаем дефолтное значение
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt} />
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                     <div class="menu__item-cost">Цена:</div>
                     <div class="menu__item-total"><span>${this.price}</span> рублей/день</div>
                </div>
          `;
            console.log(this.parent);
            this.parent.append(element);
        }
    }
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "новый Фитнес"',
        '"Меню "Фитнес"- это новый подход к приготовлению блюд: больше' +
        'свежих овощей и фруктов. Продукт активных и здоровых людей. Это' +
        'абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        20,
        '.menu .container',
        // 'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "prem",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки,' +
        'но и качественное исполнение блюд. Красная рыба, морепродукты,' +
        'фрукты - ресторанное меню без похода в ресторан!',
        35,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню "Постное" - это тщательный подбор ингредиентов: полное' +
        'отсутствие продуктов животного происхождения, молоко из миндаля,' +
        'овса, кокоса или гречки, правильное количество белков.',
        5,
        '.menu .container',
        'menu__item'
    ).render();

    // Forms ajax
    const forms = document.querySelectorAll('form'); // получаем все теги по селектору form 
    const message = {
        loading: 'Load..',
        success: 'Success!',
        failure: 'ERR..'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) { // функция поиска данных
        form.addEventListener('submit', (e) => { // обработчик событий если отправляем любую форму
            e.preventDefault(); // убираем дефолтное поведение

            // создание нового блока для вывода сообщения
            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            // request.setRequestHeader('Content-type', 'multipart/form-date'); // <- при использовании XMLHttpRequest и formData не нужно устанавливать заголовок
            const formData = new FormData(form); // помещаем в конструктор из какой формы нам нужно собрать данные  обязательно аттрибут name
            request.send(formData);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                } else {
                    statusMessage.textContent = message.failure;
                }
            });
        });
    }
});