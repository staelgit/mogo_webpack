//import './tests';    //тесты работоспособности бабеля, лодаша, ленивой загрузки, еслинта
import * as $ from 'jquery';
const jQuery = $;
import './jquery.nicescroll.min';
import './slick.min';

//========================= jq-start.js====================================
$(document).ready(function() {
	var w=$(window).outerWidth();
	var h=$(window).outerHeight();
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");
	var isMobile = {Android: function() {return navigator.userAgent.match(/Android/i);},BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},Windows: function() {return navigator.userAgent.match(/IEMobile/i);},any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}};
	function isIE() {
		ua = navigator.userAgent;
		var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
		return is_ie;
	}
	if(isIE()){
		$('body').addClass('ie');
	}
	if(isMobile.any()){
		$('body').addClass('touch');
	}
//========================= jq-start.js====================================

//-------------- преднастройки, script.js --------------

	$('.wrapper').addClass('loaded');


// burger

	$('.header-menu__icon').click(function(event) {
		$(this).toggleClass('active');
		$('.header-menu').toggleClass('active');
		if($(this).hasClass('active')){
			$('body').data('scroll',$(window).scrollTop());
		}
		$('body').toggleClass('lock');
		if(!$(this).hasClass('active')){
			$('body,html').scrollTop(parseInt($('body').data('scroll')));
		}
	});

// ibg

	function ibg(){
		$.each($('.ibg'), function(index, val) {
			if($(this).find('img').length>0){
				$(this).css('background-image','url("'+$(this).find('img').attr('data-src')+'")');
				$(this).find('img').removeAttr('data-src');
			}
		});
	}
	ibg();

	// lazyLoad

	[].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
		img.setAttribute('src', img.getAttribute('data-src'));
		img.onload = function() {
			img.removeAttribute('data-src');
		};
	});

// ??

	$('body').on('click','.tab__navitem',function(event) {
		var eq=$(this).index();
		if($(this).hasClass('parent')){
			eq=$(this).parent().index();
		}
		if(!$(this).hasClass('active')){
			$(this).closest('.tabs').find('.tab__navitem').removeClass('active');
			$(this).addClass('active');
			$(this).closest('.tabs').find('.tab__item').removeClass('active').eq(eq).addClass('active');
			if($(this).closest('.tabs').find('.slick-slider').length>0){
				$(this).closest('.tabs').find('.slick-slider').slick('setPosition');
			}
		}
	});

// spoller

	$.each($('.spoller.active'), function(index, val) {
		$(this).next().show();
	});
	$('body').on('click','.spoller',function(event) {
		if($(this).hasClass('mob') && !isMobile.any()){
			return false;
		}
		if($(this).hasClass('closeall') && !$(this).hasClass('active')){
			$.each($(this).closest('.spollers').find('.spoller'), function(index, val) {
				$(this).removeClass('active');
				$(this).next().slideUp(300);
			});
		}
		$(this).toggleClass('active').next().slideToggle(300,function(index, val) {
			if($(this).parent().find('.slick-slider').length>0){
				$(this).parent().find('.slick-slider').slick('setPosition');
			}
		});
		return false;
	});

//-------------мой код-------------




	// слайдер
	$('.slider').slick({
		infinite: true,
		arrows:true,
		dots:false,
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: true
	});

	// найсскролл
	$(".accordion-wedo__text").niceScroll({
	});


        // JQ - переход по клику кнопки до его блока
        $('a[data-item]').click(function (e) {
            e.preventDefault();
            let targetSelector = '.' + $(this).attr('data-item');
            $('html, body').animate({
                scrollTop: $(targetSelector).offset().top-56
            }, 1000);
        });


        // JQ - плавающее меню
        $(window).scroll(swimmingMenu);

        swimmingMenu();

        function swimmingMenu () {
            let headerElement = $('.header');
            if ($(this).scrollTop() > 20) {
                if (!headerElement.hasClass('fixed')) {
                    headerElement.addClass('fixed')
                }
            } else if (headerElement.hasClass('fixed')) {
                headerElement.removeClass('fixed')
            }
        }

        // JQ - подсветка кнопок в зависимости от того что сейчас на экране
        $(window).on("scroll resize", highlightButtonByCurrentVisibleElement).scrollTop(1).scrollTop(-1);

        function highlightButtonByCurrentVisibleElement() {
            let currentClientHeight = $(this).height();
	        let documentScroll = $(this).scrollTop();
	        var activeElementId;

            $('.wrapper').children().each(function () {
                let elemTop = $(this).offset().top - documentScroll;
                let elemHeight = $(this).outerHeight();
                let visibleElemPart;

                if (elemTop < currentClientHeight & (elemTop + elemHeight) > 0) {
                    if (elemTop < 0) {
                        visibleElemPart = (elemTop + elemHeight) / currentClientHeight;
                    } else {
                        visibleElemPart = (currentClientHeight - elemTop) / currentClientHeight;
                    }
                    if (visibleElemPart > 0.60) {
                        activeElementId = $(this).attr('id');
                    }
                }
            });

            $('a[data-item]').each(function () {
                if (!activeElementId) {
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active');
                    }
                } else if ($(this).attr('data-item') === activeElementId) {
                    if ($(this).hasClass('active')) {
                    } else {
                        $(this).addClass('active');
                    }
                } else {
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active');
                    }
                }
            })
        }

        // JQ - убирание меню при клике на мобильных
        $('.header-menu').click(function () {
            if ($('.header-menu').hasClass('active')) {
                $('a.header-menu__link').click(function () {
                    $('body').removeClass('lock');
                    $('.header-menu').removeClass('active');
                    $('.icon-menu').removeClass('active');
                })
            }
        })







// ------------- js -------------------
/*
// JS переход по клику кнопки до его блока

	goToElementByButtonClick();

	function goToElementByButtonClick(){
		const buttonList = document.querySelectorAll('a[data-item]');
		for (let button of buttonList) {
			if (button.dataset.item) {
				const element = document.querySelector(`.${button.dataset.item}`);
				addListenerToButton(button, element)
			}
		}

		function addListenerToButton(button, element) {
			button.addEventListener('click', function (event) {
				event.preventDefault();
				let offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 56;
				window.scrollTo({
					top: offsetTop,
					left: 0,
					behavior:'smooth',
				});
			});
		}
	}


// JS плавающее меню
	let lastScroll = window.pageYOffset;
	setInterval(controlSwimmingTopMenu, 100);

	function controlSwimmingTopMenu (){
		let currentScroll = window.pageYOffset;
		if (currentScroll !== lastScroll) {
			lastScroll = currentScroll;
			const elementHeader = document.querySelector(`.header`);
			if (currentScroll > 20) {
				if (elementHeader.classList.contains('fixed')) {}
				else {elementHeader.classList.add('fixed')}
			}
			else {
				if (elementHeader.classList.contains('fixed')) {
					elementHeader.classList.remove('fixed')
				}
			}
		}
	}


// JS кнопки активные в зависимости от раздела
	let lastClientHeight = 0;
	let lastScroll2 = 0;
	let timeout = 100;

	checkChangeScrollOrClientHeight ();

	function checkChangeScrollOrClientHeight () {
		let currentClientHeight = document.documentElement.clientHeight;
		let currentScroll = window.pageYOffset;
		if (currentClientHeight !== lastClientHeight || currentScroll !== lastScroll2) {
			lastClientHeight = currentClientHeight;
			lastScroll2 = currentScroll;
			setActiveButton();
		}
		setTimeout(checkChangeScrollOrClientHeight, timeout);
	}

	function setActiveButton () {
		const allElements = document.querySelector('.wrapper').children;
		let currentClientHeight = document.documentElement.clientHeight;
		let activeElementId;

		for (let elem of allElements) {
			let elemTop = elem.getBoundingClientRect().top;
			let elemHeight = elem.getBoundingClientRect().height;
			let visibleElemPart;

			if (elemTop < currentClientHeight && (elemTop + elemHeight) > 0) {
				if (elemTop < 0) {
					visibleElemPart = (elemTop + elemHeight) / currentClientHeight;
				} else {
					visibleElemPart = (currentClientHeight - elemTop) / currentClientHeight;
				}
				if (visibleElemPart > 0.60) {
					activeElementId = elem.id;
				}
			}
		}

		const allNavElements = document.querySelectorAll('a[data-item]');
		for (let navElement of allNavElements) {
			if (activeElementId === '' || activeElementId === undefined) {
				if (navElement.classList.contains('active')) {
					navElement.classList.remove('active');
				}
			} else if (navElement.dataset.item.includes(activeElementId)) {
				if (navElement.classList.contains('active')) {
				} else {
					navElement.classList.add('active');
				}
			} else {
				if (navElement.classList.contains('active')) {
					navElement.classList.remove('active');
				}
			}
		}
	}



// JS сворачивание меню на мобилках при клике
	let lastStatusMenu = document.querySelector('.header__menu').classList.contains('active');

	setInterval(checkActiveHeaderMenu, 100);

	function checkActiveHeaderMenu() {
		const headerMenu = document.querySelector('.header__menu');
		const headerMenuBody = document.querySelector('.header-menu__body');
		let currentStatusMenu = headerMenu.classList.contains('active');

		if(currentStatusMenu) {
			if (!lastStatusMenu) {
				headerMenuBody.addEventListener('click', handler)
			}
			lastStatusMenu = currentStatusMenu;
		} else {
			if (lastStatusMenu) {
				headerMenuBody.removeEventListener('click', handler)
			}
			lastStatusMenu = currentStatusMenu;
		}

		function handler() {
			if (document.body.classList.contains('lock')) document.body.classList.remove('lock');
			headerMenu.classList.remove('active');
			document.querySelector('.header-menu__icon').classList.remove('active');
		}
	}

	*/
//-------------- преднастройки, script.js --------------

//========================= jq-end.js====================================
});
//========================= jq-end.js====================================






import '@/styles/styles.scss';





