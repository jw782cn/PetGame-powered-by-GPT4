<script>
    function stopPropagation(event) {
      event.stopPropagation();
    }

  </script>


<div class="footer" on:click={stopPropagation}>
  <div class="hint">
    <a class="hint" href="https://www.buymeacoffee.com/chty627"> Made with ❤️ by Chenran, if you like it, buy me a coffee☕️</a>
    Contact me on 
    <a class="hint" href="https://twitter.com/Nin19536">Twitter</a>
    /
    <a class="hint" href="mailto:cn257@cornell.edu">Email</a>
  </div>
    
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
        color:rgb(255, 172, 113);
      }
  </style>
