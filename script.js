// Ensure GSAP and ScrollTrigger are registered
gsap.registerPlugin(ScrollTrigger);

// Locomotive Scroll and ScrollTrigger setup
function locoScrollTrigger() {
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}

locoScrollTrigger();

function loader() {
    var tl = gsap.timeline();

    tl.from('.loader span', {
        x: 40,
        opacity: 0,
        duration: 2,
        stagger: 0.1
    })

    tl.to('.loader span', {
        x: -10,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1
    })

    tl.to('.loader', {
        opacity: 0,
        duration: 0.5,
        stagger: 0.1
    })

    tl.to('.loader', {
        display: 'none',
        duration: 0.5,
        stagger: 0.1
    })
    tl.from('nav div a', {
        x: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0
    })

    tl.to('nav div a', {
        opacity: 1,
        duration: 0, // No duration for immediate opacity change
        stagger: 0 // No stagger
    })
        .from('nav div', {
            x: 40,
            opacity: 0,
            duration: 0.3, // Shorter duration
            stagger: 0 // No stagger
        })
        .to('nav div', {
            opacity: 1,
            duration: 0, // No duration for immediate opacity change
            stagger: 0 // No stagger
        })
        .from('.page1 video', {
            opacity: 0,
            stagger: 0.1, // Reduced stagger for faster appearance
            duration: 0.5, // Shorter duration
        })
        .from('.rejouice span', {
            y: 150,
            opacity: 0,
            stagger: 0.1, // Reduced stagger
            duration: 0.5, // Shorter duration
            ease: "power2.out"
        });
}

loader();

// Cursor effect for Page 1
function cursorEffect1() {
    var page1Content = document.querySelector('.page1-content');
    var cursor = document.querySelector('.page1 .cursor');
    var randomNo = Math.floor(Math.random() * 10) + 1;

    page1Content.addEventListener('mousemove', (MouseEvent) => {
        gsap.to(cursor, {
            x: MouseEvent.x,
            y: MouseEvent.y,
            transform: `translate(${randomNo}px, ${randomNo}px)`
        });
    });

    page1Content.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
            display: 'flex',
            scale: 1,
            opacity: 1,
        });
    });

    page1Content.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
            display: 'none',
            scale: 0,
            opacity: 0,
        });
    });
}

cursorEffect1();

// Page 1 animation
function page1Animation() {
    gsap.from('.rejouice span', {
        y: 120,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out"
    });
}

window.addEventListener('load', page1Animation);

// Page 2 animation
function page2Animation() {
    gsap.from('.elem .headings span, .elem .paraContainer span', {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.9,
        scrollTrigger: {
            trigger: ".page2",
            start: "top 40%",
            end: "top 38%",
            scroller: ".main",
            scrub: 2,
        }
    });
}

page2Animation();

// Page 3 animation with video interactions
function page3Animation() {
    var boxes = document.querySelectorAll('.videos .box');

    boxes.forEach((box) => {
        var cover = box.querySelector('.cover');
        var img = box.querySelector('img:not(.cover)');
        var video = box.querySelector('video');

        box.addEventListener('mouseenter', () => {
            gsap.to([cover, img], { zIndex: 8, opacity: 0, duration: 0.3 });
            gsap.to(video, { zIndex: 12, opacity: 1, duration: 0.3 });
        });

        box.addEventListener('mouseleave', () => {
            gsap.to(video, { zIndex: 8, opacity: 0, duration: 0.3 });
            gsap.to([img, cover], { zIndex: 10, opacity: 1, duration: 0.3 });
        });
    });
}

page3Animation();

// Page 4 animation
function page4Animation() {
    gsap.from('.topContent .headings span, .topContent .paraContainer span', {
        y: 120,
        opacity: 0,
        stagger: 0.2,
        duration: 0.9,
        scrollTrigger: {
            trigger: ".page4",
            start: "top 40%",
            end: "top 38%",
            scroller: ".main",
            scrub: 2,
        }
    });
}

page4Animation();

// Cursor effect for Page 4
function cursorEffect2() {
    var page4Content = document.querySelector('.page4-content');
    var cursor = document.querySelector('.bottomContent .cursor');
    var randomNo = Math.floor(Math.random() * 4) + 1;

    page4Content.addEventListener('mousemove', (MouseEvent) => {
        gsap.to(cursor, {
            x: MouseEvent.x,
            y: MouseEvent.y,
            transform: `translate(${randomNo}px, ${randomNo}px)`
        });
    });

    page4Content.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
            display: 'flex',
            scale: 1,
            opacity: 1,
        });
    });

    page4Content.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
            display: 'none',
            scale: 0,
            opacity: 0,
        });
    });
}

cursorEffect2();

function page4CounterAnimation() {
    ScrollTrigger.create({
        trigger: ".page4",
        start: "top center",
        scroller: ".main",
        onEnter: () => {
            animateCounterAndRotate();
        },
        onEnterBack: () => {
            animateCounterAndRotate();
        },
    });
}

// counter and timer for Page 4
function animateCounterAndRotate() {
    const obj = { count: 1 };
    const targetCount = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    const rotationValue = (targetCount - 1) * 55;

    // Animate both counter and rotation with GSAP
    gsap.to(obj, {
        count: targetCount,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: function () {
            const currentCount = Math.round(obj.count);
            document.querySelector(".counter").textContent = currentCount;
        }
    });

    gsap.to('.timer', {
        rotation: rotationValue,
        duration: 2,
        ease: "power2.inOut"
    });
}

page4CounterAnimation();

// Page 5 animation
function page5Animation() {
    gsap.from('.topContent1 .headings1 span, .topContent1 .paraContainer1 span', {
        y: 120,
        opacity: 0,
        stagger: 0.2,
        duration: 0.9,
        scrollTrigger: {
            trigger: ".page5",
            start: "top 40%",
            end: "top 38%",
            scroller: ".main",
            scrub: 2,
        }
    });
}

page5Animation();

function swipper() {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 'auto',
        spaceBetween: 25,
        loop: true,
        autoplay: {
            delay: 8,
            disableOnInteraction: false,
        },
        speed: 50000,
        centeredSlides: true,
        allowTouchMove: false,
        freeMode: true,
        freeModeMomentum: false,
    });
}

swipper();


// Page 7 animation
function page7Animation() {
    gsap.fromTo('.bottomContent3', {
        y: 50,
        opacity: 0,
    }, {
        y: 0, // End at the original position
        opacity: 1,
        stagger: 0.2,
        duration: 0.5, // Reduce duration for faster animation
        scrollTrigger: {
            trigger: ".page7",
            start: "top 90%", // Start animation a bit later
            end: "top 50%",   // End animation sooner
            scroller: ".main",
            scrub: 1, // Adjust for smoother syncing with scroll
        }
    });
}

page7Animation();

// Page 8 Animation
function page8Animation() {
    gsap.from('.topContent4', {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.9,
        scrollTrigger: {
            trigger: ".page8",
            scroller: ".main",
            scrub: 2,
        }
    });
}

// Initialize the animation
page8Animation();

// Page 8 Animation
function page8midAnimation() {
    gsap.from('.midContent4', {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.9,
        scrollTrigger: {
            trigger: ".page8",
            scroller: ".main",
            scrub: 2,
        }
    });
}

// Initialize the animation
page8midAnimation();

function page8rejouiceAnimation() {
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".page8",
            start: "top 10%",
            end: "top 80%",
            scroller: ".main",
            scrub: 2,
        }
    });

    // Add a delay before the animation starts
    tl.set({}, {}, "+=50") // Adjust the delay here, e.g., "+=5" for a 5-second delay

    tl.from('.bottomContent4 .rejouice2 span .r, .bottomContent4 .rejouice2 span .e, .bottomContent4 .rejouice2 span .j, .bottomContent4 .rejouice2 span .o, .bottomContent4 .rejouice2 span .u, .bottomContent4 .rejouice2 span .i, .bottomContent4 .rejouice2 span .c', {
        y: -50,
        opacity: 0,
        stagger: 9,
        duration: 100
    });
}

page8rejouiceAnimation();
