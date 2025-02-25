class NeuralNetwork {
	constructor(canvasId) {
		this.canvas = document.getElementById(canvasId);
		if (!this.canvas) return;
		this.ctx = this.canvas.getContext("2d");
		this.nodes = [];
		this.connections = [];
		this.setup();
	}

	setup() {
		this.canvas.width = this.canvas.offsetWidth;
		this.canvas.height = this.canvas.offsetHeight;

		// Create neural network layers
		this.createNetworkLayers();
		this.animate();
	}

	createNetworkLayers() {
		// Create 3 layers of nodes
		const layers = [
			{ x: 0.2, count: 5 }, // Input layer
			{ x: 0.5, count: 8 }, // Hidden layer
			{ x: 0.8, count: 4 }, // Output layer
		];

		layers.forEach((layer) => {
			for (let i = 0; i < layer.count; i++) {
				const node = {
					x: this.canvas.width * layer.x,
					y: (this.canvas.height * (i + 1)) / (layer.count + 1),
					baseX: this.canvas.width * layer.x,
					baseY: (this.canvas.height * (i + 1)) / (layer.count + 1),
					radius: 3 + Math.random() * 2,
					activation: 0,
				};
				this.nodes.push(node);
			}
		});

		// Create connections between layers
		this.nodes.forEach((source, i) => {
			this.nodes.slice(i + 1).forEach((target) => {
				if (Math.random() > 0.7 && this.isForwardConnection(source, target)) {
					this.connections.push({
						source,
						target,
						weight: Math.random(),
						active: false,
					});
				}
			});
		});
	}

	isForwardConnection(source, target) {
		// Only allow connections from left to right
		return source.x < target.x;
	}

	animate() {
		this.ctx.fillStyle = "rgba(10, 25, 47, 0.05)";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		// Update neural activations
		this.nodes.forEach((node) => {
			node.activation = Math.max(
				0,
				node.activation * 0.95 + (Math.random() - 0.45) * 0.1,
			);
		});

		// Draw connections
		this.connections.forEach((conn) => {
			const intensity = (conn.source.activation + conn.target.activation) / 2;
			this.ctx.beginPath();
			this.ctx.moveTo(conn.source.x, conn.source.y);
			this.ctx.lineTo(conn.target.x, conn.target.y);
			this.ctx.strokeStyle = `rgba(100, 255, 218, ${intensity * conn.weight})`;
			this.ctx.lineWidth = 1 + intensity * 2;
			this.ctx.stroke();
		});

		// Draw nodes
		this.nodes.forEach((node) => {
			this.ctx.beginPath();
			this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
			this.ctx.fillStyle = `rgba(100, 255, 218, ${0.3 + node.activation})`;
			this.ctx.fill();

			// Add glow effect
			this.ctx.shadowColor = "#64ffda";
			this.ctx.shadowBlur = 10 * node.activation;
			this.ctx.fill();
			this.ctx.shadowBlur = 0;
		});

		// Random activation pulses
		if (Math.random() > 0.97) {
			this.triggerActivationPulse();
		}

		requestAnimationFrame(() => this.animate());
	}

	triggerActivationPulse() {
		// Activate random input node
		const inputs = this.nodes.filter((n) => n.x === this.canvas.width * 0.2);
		const randomInput = inputs[Math.floor(Math.random() * inputs.length)];
		randomInput.activation = 1;
	}
}