$(".menu").on("click", () => {
  if ($(".mobileNav").css("display") == "none") {
    $(".mobileNav").fadeIn("fast");
    $(".mobileNav").css("display", "flex");
    $("body").css("overflow-y", "hidden");
  } else {
    $(".mobileNav").fadeOut("fast");
    $("body").css("overflow-y", "visible");
  }
})
$(document).ready(function() {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
        trigger: ".hero",
        start: "top+=100px top",
        onEnter: () => {
        	$("#desktopNavBar").css("background-color", "black")
      },
      onLeaveBack: () => {
        	$("#desktopNavBar").css("background-color", "transparent")
      }
    });
});