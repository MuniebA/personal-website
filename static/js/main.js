document.addEventListener("DOMContentLoaded", () => {
	// Initialize AOS
	AOS.init({
		duration: 800,
		once: true,
		offset: 100,
	});

	// Navbar scroll effect
	window.addEventListener("scroll", () => {
		const nav = document.querySelector(".navbar");
		if (window.scrollY > 50) {
			nav.classList.add("scrolled");
		} else {
			nav.classList.remove("scrolled");
		}
	});

	// GSAP Animations
	gsap.from(".hero-title", {
		duration: 1,
		y: 100,
		opacity: 0,
		ease: "power4.out",
		delay: 0.5,
	});

	gsap.from(".hero-subtitle", {
		duration: 1,
		y: 50,
		opacity: 0,
		ease: "power4.out",
		delay: 0.8,
	});

	// Project cards animation
	const cards = document.querySelectorAll(".project-card");
	cards.forEach((card, index) => {
		gsap.from(card, {
			duration: 0.8,
			y: 50,
			opacity: 0,
			ease: "power4.out",
			delay: 0.2 * index,
			scrollTrigger: {
				trigger: card,
				start: "top bottom-=100",
				toggleActions: "play none none reverse",
			},
		});
	});
});

document.querySelectorAll(".project-section").forEach((section) => {
	section.addEventListener("click", (e) => {
		const url = section.getAttribute("data-url");
		const type = section.getAttribute("data-type");
		if (url && type) {
			transitionToPage(url, type);
		}
	});
});
