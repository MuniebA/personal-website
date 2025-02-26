class MatrixRain {
	constructor(canvasId) {
		this.canvas = document.getElementById(canvasId);
		if (!this.canvas) return;
		this.ctx = this.canvas.getContext("2d");

		// Add resize handler properly
		this.handleResize = this.handleResize.bind(this);
		window.addEventListener("resize", this.handleResize);

		this.setup();
	}

	setup() {
		this.canvas.width = this.canvas.offsetWidth;
		this.canvas.height = this.canvas.offsetHeight;

		this.fontSize = 14;
		this.columns = Math.floor(this.canvas.width / this.fontSize);
		this.drops = Array(this.columns).fill(1);

		this.animate();
	}

	drawLaptopFrame() {
		this.ctx.strokeStyle = "#64ffda";
		this.ctx.lineWidth = 2;
		this.ctx.setLineDash([5, 3]); // Add dashed line effect

		// Draw screen
		this.ctx.beginPath();
		this.ctx.roundRect(
			10,
			10,
			this.canvas.width - 20,
			this.canvas.height - 40,
			5,
		);
		this.ctx.stroke();

		// Draw base
		this.ctx.beginPath();
		this.ctx.moveTo(20, this.canvas.height - 20);
		this.ctx.lineTo(this.canvas.width - 20, this.canvas.height - 20);
		this.ctx.stroke();
	}

	animate() {
		this.ctx.fillStyle = "rgba(10, 25, 47, 0.05)";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.ctx.fillStyle = "#64ffda";
		this.ctx.font = `${this.fontSize}px monospace`;

		for (let i = 0; i < this.drops.length; i++) {
			const text = String.fromCharCode(0x30a0 + Math.random() * 96);
			const x = i * this.fontSize;
			const y = this.drops[i] * this.fontSize;

			this.ctx.fillText(text, x, y);

			if (y > this.canvas.height - 40 && Math.random() > 0.98) {
				this.drops[i] = 0;
			}
			this.drops[i]++;
		}

		this.drawLaptopFrame();
		requestAnimationFrame(() => this.animate());
	}

	handleResize() {
		this.setup();
	}
}
