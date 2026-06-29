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
    "./Images/meal.png",
    "./Images/fish-dinner.png",
    "./Images/salad.png",
    "./Images/wine-steak.png",
    "./Images/dessert.png",
    "./Images/interior-3.png",
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