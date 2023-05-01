<script>
    import { onMount, onDestroy } from 'svelte';
  
    let audio;
  
    onMount(() => {
      audio = new Audio('/music/click.wav');
      window.addEventListener('click', play);
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('click', play);
        window.removeEventListener('keydown', handleKeyDown);
      };
    });
  
    function play() {
      audio.currentTime = 0;
      audio.volume = 0.5;
      audio.play();
    }
  
    function handleKeyDown(event) {
      if (event.key === 'Enter' || event.key === 'Escape') {
        play();
      }
    }
  </script>
  