<script>
    let text = "You complete the game!"
  
  </script>
  
  <div
    class="game-description"
  >
  <div class="text-wrapper">
    <p class="text">{text}</p>
  </div>
  </div>
  
  <style>
    .game-description {
      background-color: rgb(255, 227, 206);
      color: rgb(255, 172, 113);
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: fixed;
      z-index: 900;
      overflow: hidden;
      font-family: Comic Sans MS;
      outline:none;
    }
    .text-wrapper {
        width: 60%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
  
    .text {
      font-size: 40px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 1rem;
    }
  
    .hint {
      font-size: 1.2rem;
      color: #fff;
      margin-top: 1rem;
      opacity: 0.8;
    }
  </style>
  