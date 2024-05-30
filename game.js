var canvas = document.getElementById("gameCanvas");
      var ctx = canvas.getContext("2d");

   
      let bird = { x: 30, y: canvas.height / 2, radius: 10, velocityY: 0, gravity: 0.3 };
      let pipes = [];
      let gap = 100;
      let pipeWidth = 50;
      let pipeSpeed = 2;
      let score = 0;
      let gameOver = false;
      let gameStarted = false;

      const btn1 = document.getElementById('btn_level_1')

      btn1.addEventListener('click', function(){
        pipeSpeed = 3
      })
       
     const btn2 =document.getElementById('btn_level_2')

     btn2.addEventListener('click', function(){
        pipeSpeed = 4
       
        bird.velocityY = -7;
      })
     const btn3 = document.getElementById('btn_level_3')
     btn3.addEventListener('click', function(){
        pipeSpeed = 6
      })
      function drawBird() {
          ctx.beginPath();
          ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
          ctx.fillStyle = "#F2BF0B";
          ctx.fill();
          ctx.closePath();
      }

      
      function drawPipes() {
          ctx.fillStyle = "#00FF00";
          for (var i = 0; i < pipes.length; i++) {
              var pipe = pipes[i];
              ctx.fillRect(pipe.x, 0, pipeWidth, pipe.height);
              ctx.fillRect(pipe.x, pipe.height + gap, pipeWidth, canvas.height - pipe.height - gap);
          }
      }

    
      function update() {
          if (!gameOver) {
            
              bird.velocityY += bird.gravity;
              bird.y += bird.velocityY;

              if (bird.y + bird.radius > canvas.height) {
                  gameOver = true;
              }
             
              if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
                  var height = Math.random() * (canvas.height - gap);
                  pipes.push({ x: canvas.width, height: height });
              }

              
              for (var i = 0; i < pipes.length; i++) {
                  pipes[i].x -= pipeSpeed;

                  
                  if (bird.x + bird.radius > pipes[i].x && bird.x - bird.radius < pipes[i].x + pipeWidth &&
                      (bird.y - bird.radius < pipes[i].height || bird.y + bird.radius > pipes[i].height + gap)) {
                      gameOver = true;
                  }

                 
                  if (bird.x > pipes[i].x + pipeWidth && !pipes[i].counted) {
                      score++;
                      pipes[i].counted = true;
                  }
              }

         
              if (pipes.length > 0 && pipes[0].x < -pipeWidth) {
                  pipes.shift();
              }
          }

         
          draw();
      }

      
      function draw() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          drawBird();
          drawPipes();

          
          ctx.fillStyle = "#fff";
          ctx.font = "20px Arial";
          ctx.fillText("Score: " + score, 10, 20);

          
          if (gameOver) {
              ctx.fillStyle = "#48d419";
              ctx.font = "40px Arial";
              ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
          }
      }

      
      document.addEventListener("keydown", function(event) {
          if (event.code === "Space" && !gameOver) {
              bird.velocityY = -5;
          } else if (gameOver && event.code === "Space") {
              resetGame();
          }
      });

      
      function resetGame() {
          bird = { x: 30, y: canvas.height / 2, radius: 10, velocityY: 0, gravity: 0.3 };
          pipes = [];
          score = 0;
          gameOver = false;
      }

      
      document.getElementById("btn").addEventListener("click", resetGame);

      
      function gameLoop() {
          update();
          requestAnimationFrame(gameLoop);
      }

      gameLoop();