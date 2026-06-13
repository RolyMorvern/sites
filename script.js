const showMobileNav = () => {
    if ($(".mobileNav").css("display") == "none") {
        $(".mobileNav").fadeIn("fast");
        $(".mobileNav").css("display", "flex");
        $("body").css("overflow", "hidden");
    } else {
        $(".mobileNav").fadeOut("fast");
        $("body").css("overflow", "visible");
    }
}
const galleryImageList = [
    "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGMTheBWDAU1aoXOfdDvnZ3UVi6ABZSv7C2nFHiQY3H7Sk0TytBcvEm8iW9ap3paZRHUnuHIX5HpgaPrt4xw9tExhUulAu-Ww6Sh3H0qEVrgRrWMmPpRNNhJ7-h9iLYkr1pk9Km1mRcIdxx=s1360-w1360-h1020-rw",
    "https://lh3.googleusercontent.com/gps-cs-s/APNQkAE7OLinKu_9KafWPmxnlPaT6t8VMBG2Ei6VaP1bp7bG23lR9QXXlzosaieyu7S5dA388t07JOLfM6YzDhtTKIRZPRQ5SqeVq34qkbN-V6LvBj4dbCk1lrP2VpbGsRe4wRwpRhjQ2vnmOsbs=s1360-w1360-h1020-rw",
    "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFppKkYz__NptfI7wskhl3NbK2p2LG0uLL2X3Ijp2zy-Q8UF55d8ioZdE2joOjqM9q5L3onRCcV1PbztfRWxcQyuY73mnpJ1DPdwh6gr858XhKvYmyZNVhGYxC0-GtOvLZgN-UJDgDelYjp=s1360-w1360-h1020-rw",
    "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHnwM-JfKIEYHiQ1urI8MQaTut7CesNBGmaXn5fZWkz7QbdtdBxw6f1nL889Mf-T5XjfGPGWs-6wcjjHyBafZpknil_lQhWdQqlKcMZK6GcvJ7kU0yfz41qFMS9PMcmco0zWQHX5A=s1360-w1360-h1020-rw",
    "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEV0VZ05VZvDSJbcBHCbYnXYQzAwwCh9z0uti47l75-RBGcJP5ouYKVcVG57XzW-ow2xMwjPBea8iAbQoRNErRnUBYNJx-_E1aB5MQ3Kz7B4BriBbNwQfHyOTa1-HDgPhTok46t=s1360-w1360-h1020-rw",
    "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGunfuoTOK7wA3lO6jjIY78Rk5-qCIhqpgpSH74fi5t-jH-2KyPkBsZxEfLqMRSzGBckpVN4Pio10yPfd8pq-J40rwdl1rk02dW7FAtzZ0_fA_YSjIxKSVZRoFtEWVnkHimDqfIE3-W1ZkX=s1360-w1360-h1020-rw",
];
let i = 0;
const changeImg = (direction) => {
    $(".gallery").fadeOut(150, function() {
        $(".galleryCircle").removeClass("galleryCircleActive");
        if (direction === "forward") {
            i = (i + 1) % galleryImageList.length;
        } else if (direction === "back") {
            i = (i - 1 + galleryImageList.length) % galleryImageList.length;
        }
        $(`.galleryCircle${i + 1}`).addClass("galleryCircleActive");
        $(this)
            .css("background-image", `url("${galleryImageList[i]}")`)
            .fadeIn(150);
    });
};
let autoChangeTimer;
const automaticImgChange = () => {
    autoChangeTimer = setTimeout(function() {
        changeImg("forward");
        automaticImgChange();
    }, 5000);
};
const setActive = (previousElement, element) => {
    $(previousElement + "NavTitle").removeClass("active");
    $(element + "NavTitle").addClass("active");
};
const reverseSetActive = (previousElement, element) => {
    $(previousElement + "NavTitle").addClass("active");
    $(element + "NavTitle").removeClass("active");
};

const scrollAbout = (id) => {
    let offset = 0;
    if ($(window).width() > 900) {
        offset = $(".scrollNavDesktop").outerHeight() || 75;
    }
    $('html, body').animate({ 
        scrollTop: $(id).offset().top - offset 
    });
};

$(".mobileNavLink").on("click", () => {
    $("body").css("overflow-y", "visible");
    $(".mobileNav").css("display", "none");
    $("#menuIcon").prop("checked", false);
});

$(document).ready(function() {
    automaticImgChange();

    gsap.registerPlugin(ScrollTrigger);
    gsap.set(".scrollNavDesktop", { y: -100, opacity: 0 });
    const navHeight = $(".scrollNavDesktop").outerHeight();
    ScrollTrigger.create({
        trigger: ".hero",
        start: `bottom-=${navHeight} 1px`,
        end: "+=100",
        toggleActions: "play none none reverse", 
        onEnter: () => {
            gsap.to(".scrollNavDesktop", {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
            });
        },
        onLeaveBack: () => {
            gsap.to(".scrollNavDesktop", {
                y: -100,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
            });
        }
    });
    ScrollTrigger.create({
        trigger: ".moreInfo",
        start: "top-=100px top",
        onEnter: () => {
            setActive(".aboutUs", ".moreInfo");
        },
        onLeaveBack: () => {
            reverseSetActive(".aboutUs", ".moreInfo");
        }
    });
    $('a[href^="#"]').on('click', function (event) {
        event.preventDefault(); 
        const targetId = $(this).attr('href');
        if (targetId !== '#') scrollAbout(targetId); 
    });
});