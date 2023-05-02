<script>
    function stopPropagation(event) {
      event.stopPropagation();
    }

  </script>


<div class="footer" on:click={stopPropagation}>
    <a class="hint" href="https://www.buymeacoffee.com/chty627"> Made with ❤️ by Chenran, if you like it, buy me a coffee☕️</a>
  </div>


  <style>
    .footer {
        position: fixed;
        bottom: 2%;
        width: 100%;
        padding: 0.5rem;
        text-align: center;
      }
      .hint {
        font-size: 14px;
        margin-bottom: 0.2rem;
        color:rgb(255, 172, 113);
      }
  </style>
