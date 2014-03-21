

/* ------------------------------------------------------------------ */
/* snowglobe.js														  */
/*																	  */
/* By Graham Licence, blog.grahamlicence.co.uk/						  */
/*																	  */
/* ------------------------------------------------------------------ */

/*jslint browser: true */
/*globals jQuery,$,window*/

var i = "";
var g = "";
var SnowGlobe = {
	winX: (document.all) ? window.screenLeft : window.screenX,
	flakes: [],
	frameCount: 0,
	flakeCount: 0,
	snowFloor: 275,
	countHundreds: 100,
	count: 0,
	maincanvas: "",
	init: function() {
		this.maincanvas = document.getElementById("example");

		if (!this.maincanvas.getContext) {
			return; // if not supported
		}

		$(".globe").show();

		this.addFlakes(1);

		setInterval(this.draw, 50);
		setInterval(this.position, 50);

		this.touchScroll("touch");

	},
	addFlakes: function(flakeNum) {
		SnowGlobe.flakeCount = SnowGlobe.flakeCount + flakeNum;

		function Flake(w, h, a, s) {
			this.canvasWidth = w;
			this.canvasHeight = h;
			this.x = Math.random() * 300;
			this.y = 0;
			this.speed = Math.random();
			this.size = s - this.speed - this.alfa;
			this.amp = Math.random() * 2;
			this.shift = Math.random() * 25 + 25;
			if (Math.random() > 0.5) { this.shift *= -1; }
			this.drift = Math.random() - 0.5;
			this.base = false;
			this.flakeSize = Math.floor(Math.random() * 7) + 3;

			this.draw = function(g) {
				var snowImage = document.getElementById("snow" + Math.floor(Math.random() * 2));
				g.drawImage(snowImage, this.x, this.y, this.flakeSize, this.flakeSize);
			};

			this.move = function(f) {
				if (this.base === false) {
					if (this.y < SnowGlobe.snowFloor) {
						this.y += this.speed;
						this.x += Math.cos((f) / this.shift) * this.amp + this.drift;
					}
					else {
						this.base = true;
						SnowGlobe.count++;
						if (SnowGlobe.count > SnowGlobe.countHundreds) {
							SnowGlobe.snowFloor--;
							SnowGlobe.countHundreds = SnowGlobe.countHundreds + 100;
						}
					}
				}
			};

		}
		for (i = 0; i < SnowGlobe.flakeCount; i++) {
			//flakes.push(new Flake(this.maincanvas.width, this.maincanvas.height, 0, 5));
			SnowGlobe.flakes.push(new Flake(300, 300, 0, 5));
		}
	},
	draw: function() {
		SnowGlobe.frameCount += 1;
		g = SnowGlobe.maincanvas.getContext("2d");
		g.fillStyle = "black";
		g.fillRect(0, 0, SnowGlobe.maincanvas.width, SnowGlobe.maincanvas.height);
		var xmasImage = document.getElementById("photo");
		g.drawImage(xmasImage, 0, 0);
		for (i = 0; i < SnowGlobe.flakeCount; i++) {
			SnowGlobe.flakes[i].move(SnowGlobe.frameCount);
			SnowGlobe.flakes[i].draw(g);
		}
	},
	position: function() {

		var newWinX = (document.all) ? window.screenLeft : window.screenX;

		if (newWinX != SnowGlobe.winX) {
			SnowGlobe.addFlakes(5);
			SnowGlobe.winX = newWinX;
		}
	},
	isTouchDevice: function() {
		try {
			document.createEvent("TouchEvent");
			return true;
		} catch (e) {
			return false;
		}
	},
	touchScroll: function(id) {
		if (SnowGlobe.isTouchDevice) { //if touch events exist...

			document.getElementById(id).addEventListener("touchmove", function(event) {
				SnowGlobe.addFlakes(5);
				event.preventDefault();
			}, false);
		}
	}
};


$(document).ready(function() {
	SnowGlobe.init();
});