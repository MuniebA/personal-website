function transitionToPage(url, type) {
	const content = document.getElementById("page-content");
	const target = document.getElementById(`${type}-zoom-target`);

	if (!target) {
		window.location.href = url;
		return;
	}

	const rect = target.getBoundingClientRect();
	const centerX = rect.left + rect.width / 2;
	const centerY = rect.top + rect.height / 2;

	content.style.transformOrigin = `${centerX}px ${centerY}px`;
	content.classList.add("zoom-out");

	setTimeout(() => {
		window.location.href = url;
	}, 800);
}

// Handle back navigation
window.addEventListener("pageshow", function (event) {
	const content = document.getElementById("page-content");
	if (content) {
		content.classList.remove("zoom-out");
		content.classList.add("zoom-in");
	}
});

// Add smooth return transition
window.addEventListener("DOMContentLoaded", () => {
	const content = document.getElementById("page-content");
	if (content) {
		content.classList.add("zoom-in");
		content.style.transition =
			"transform 0.8s ease-in-out, opacity 0.8s ease-in-out";
	}
});