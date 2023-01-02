window.addEventListener('DOMContentLoaded', () => {
    // Service slider start

    const servicesSwiper = new Swiper('.services__content', {
        slidesPerView: 3,
        spaceBetween: 25,
        loop: true,
        autoplay: {
            delay: 5000,
        },
        centerSlide: 'true',
        fade: 'true',
        grabCursor: 'true',
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
        },
    });

    // Service slider end

    // Reviews slider start

    const reviewsSwiper = new Swiper('.reviews__content', {
        slidesPerView: 1,
        spaceBetween: 10,
        cssMode: true,
        loop: true,
        autoplay: {
            delay: 10000,
        },
        centerSlide: 'true',
        fade: 'true',
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Reviews slider end

    // Questions tabs start

    const badgesTrigger = document.querySelectorAll('.questions__item-badge'),
        questionsContent = document.querySelectorAll('.questions__item-body');

    const hideQuestionsContent = () => {
        questionsContent.forEach((item) => {
            item.classList.remove('questions__item-body_show');
        });

        badgesTrigger.forEach((item) => {
            item.classList.remove('questions__item-badge_active');
        });
    };

    hideQuestionsContent();

    const toggleQuestionsContent = (i) => {
        badgesTrigger[i].classList.toggle('questions__item-badge_active');
        questionsContent[i].classList.toggle('questions__item-body_show');
    };

    const handleClick = (index) => {
        toggleQuestionsContent(index);
    };

    badgesTrigger.forEach((item, index) => {
        item.addEventListener('click', () => handleClick(index));
    });

    // Questions tabs end

    // Modal start

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    function showModal() {
        modal.classList.add('modal_active');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.remove('modal_active');
        document.body.style.overflow = '';
    }

    modalTrigger.forEach((btn) => {
        btn.addEventListener('click', showModal);
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('modal_active')) {
            closeModal();
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(showModal, 60000);

    function showModalByScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight - 1
        ) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    // Modal end

    // Form start

    const forms = document.querySelectorAll('form');
    const messages = {
        loading: 'Loading...',
        success: 'Thanks. We wil contact with you!',
        failure: 'Oops, something went wrong',
    };

    forms.forEach((item) => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.style.marginTop = '10px';
            statusMessage.textContent = messages.loading;

            form.insertAdjacentElement('afterend', statusMessage);

            const formData = {
                contactValue: e.target.contacts.value,
                messageValue: e.target.message.value,
            };

            const json = JSON.stringify(formData);

            postData('https://jsonplaceholder.typicode.com/posts', json)
                .then((data) => {
                    showThanksModal(messages.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(messages.failure);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal');

        prevModalDialog.classList.remove('modal_active');
        prevModalDialog.innerHTML = '';
        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__content');
        thanksModal.innerHTML = `
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
        `;

        prevModalDialog.append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('modal_active');
            closeModal();
        }, 2000);
    }

    // Form end

    // Hamburger menu start

    const menu = document.querySelector('.header__list'),
        menuLink = document.querySelectorAll('.header__link'),
        hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        menu.classList.toggle('header__list_active');
    });

    menuLink.forEach((item) => {
        item.addEventListener('click', () => {
            menu.classList.remove('header__list_active');
        });
    });

    // Hamburger menu end
});
