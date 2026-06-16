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
const map = L.map("map").setView([43.69558970673576, 7.261010938096455], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
const marker = L.marker([43.69558970673576, 7.261010938096455]).addTo(map);
L.tileLayer('https://tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=01a478fe6a45404cb2f0e4540beb479f', {
  attribution: 'Maps © <a href="https://www.thunderforest.com/">Thunderforest</a>, Data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  maxZoom: 22
}).addTo(map);
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