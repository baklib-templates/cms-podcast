import * as Turbo from "@hotwired/turbo"
import Alpine from 'alpinejs'
import collapse from '@alpinejs/collapse'
import { Application } from "@hotwired/stimulus"
import MenuController from "./menu_controller"
import ViewImagesController from "./view_images_controller"
import NavtreeController from "./navtree_controller"
import ThemeController from "./theme_controller"

// SwiperController没有成功加载，直接在 main.js中定义swiper
//import SwiperController from "./swiper_controller"
import Swiper from 'swiper/bundle'

import AOS from 'aos'
import Dropdown from 'stimulus-dropdown'

window.Alpine = Alpine
Alpine.plugin(collapse)
Alpine.start()

const application = Application.start()
window.Stimulus = application
application.register('menu', MenuController)
application.register('view_images', ViewImagesController)
application.register('navtree', NavtreeController)
application.register('theme', ThemeController)
application.register('dropdown', Dropdown)
//application.register('swiper', SwiperController)


//xiaohui: 下面的方法实现 AOS 能够在每个页面加载时候都生效
Turbo.start()

AOS_options = { duration: 1200, disableMutationObserver: true }

document.addEventListener('DOMContentLoaded', () => {
    AOS.init(AOS_options)
    AOS_options.easing = document.querySelector('body').getAttribute('data-aos-easing')
    AOS_options.duration = document.querySelector('body').getAttribute('data-aos-duration')
    AOS_options.delay = document.querySelector('body').getAttribute('data-aos-delay')
})

document.addEventListener("turbo:load", () => {
    document.querySelector('body').setAttribute('data-aos-easing', AOS_options.easing);
    document.querySelector('body').setAttribute('data-aos-duration', AOS_options.duration);
    document.querySelector('body').setAttribute('data-aos-delay', AOS_options.delay);
    AOS.refreshHard()
})

//加载Swiper
document.addEventListener("turbo:load", () => {
    const carouselEl = document.querySelectorAll('.carousel');
    if (carouselEl.length > 0) {
    const carousel = new Swiper('.carousel', {
        slidesPerView: 'auto',
        grabCursor: true,
        loop: false,
        centeredSlides: false,
        initialSlide: 0,
        spaceBetween: 24,
        watchSlidesProgress: true,
        navigation: {
        nextEl: '.carousel-next',
        prevEl: '.carousel-prev',
        },
    });
    }
})

