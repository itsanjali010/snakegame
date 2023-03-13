	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	class Snake {
		constructor() {
			this.body = [
				{x: 10, y: 10},
				{x: 9, y: 10},
				{x: 8, y: 10},
			];
			this.direction = "right";
		}
		
		draw() {
			for (let i = 0; i < this.body.length; i++) {
				ctx.fillRect(this.body[i].x * 10, this.body[i].y * 10, 10, 10);
			}
		}
		
		move() {
			let head = {x: this.body[0].x, y: this.body[0].y};
			if (this.direction === "right") {
				head.x++;
			} else if (this.direction === "left") {
				head.x--;
			} else if (this.direction === "up") {
				head.y--;
			} else if (this.direction === "down") {
				head.y++;
			}
			this.body.unshift(head);
			this.body.pop();
		}
		
		changeDirection(direction) {
			this.direction = direction;
		}
		
		collideWithWall() {
			let head = this.body[0];
			if (head.x < 0 || head.x >= canvas.width / 10 || head.y < 0 || head.y >= canvas.height / 10) {
				return true;
			}
			return false;
		}
		
		collideWithFood(food) {
			let head = this.body[0];
			if (head.x === food.x && head.y === food.y) {
				this.body.push({x: 0, y: 0});
				return true;
			}
			return false;
		}
	}
	
	let snake = new Snake();
	
	function gameLoop() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		snake.move();
		// if (snake.collideWithWall()) {
		// 	alert("Game Over!");
		// 	location.reload();
		// }
		if (snake.collideWithFood(food)) {
			food = {x: Math.floor(Math.random() * (canvas.width / 10)), y: Math.floor(Math.random() * (canvas.height / 10))};
		}
		snake.draw();
		drawFood();
	}
	
	function drawFood() {
		ctx.fillRect(food.x * 10, food.y * 10, 10, 10);
	}
	
	let food = {x: Math.floor(Math.random() * (canvas.width / 10)), y: Math.floor(Math.random() * (canvas.height/ 10))};
    document.addEventListener("keydown", function(event) {
        if (event.code === "ArrowRight") {
            snake.changeDirection("right");
        } else if (event.code === "ArrowLeft") {
            snake.changeDirection("left");
        } else if (event.code === "ArrowUp") {
            snake.changeDirection("up");
        } else if (event.code === "ArrowDown") {
            snake.changeDirection("down");
        }
    });

    setInterval(gameLoop, 100);
