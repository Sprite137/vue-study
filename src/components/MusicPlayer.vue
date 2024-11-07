<template>
    <div >
        <audio ref="audio" :src='getAudioUrl("素颜.mp3")'  @ended="nextTrack"></audio>
        <div>
            <button @click="togglePlay" class="music-player">{{ currentTrack.title }}</button>
        </div>

      
    </div>
</template>

<script lang="ts">
    export default {
      name:"MusicPlayer",
  }
</script>
  
<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import {getAudioUrl} from '@/utils/getStaticAssets'
  
  const audio = ref();
  const isPlaying = ref(false);
  const currentTrackIndex = ref(0);
  const tracks = ref([
    { title: '素颜', artist: 'Artist 1', url: "../assets/audio/素颜.mp3" },
    { title: 'xx', artist: 'Artist 2', url: '../assets/audio/素颜.mp3' },
    // ... more tracks
  ]);
  
  const currentTrack = computed(() => tracks.value[currentTrackIndex.value]);
  
  function togglePlay() {
    if(audio.value){
        if (isPlaying.value) {
            audio.value.pause();
        } else {
            audio.value.play();
            console.log("开始播放")
        }
        isPlaying.value = !isPlaying.value;
    }
  }
  
  function nextTrack() {
    currentTrackIndex.value = (currentTrackIndex.value + 1) % tracks.value.length;
    playTrack();
  }
  
  
  function playTrack() {
    audio.value.load();
    togglePlay();
  }
  
  onMounted(() => {
    audio.value.addEventListener('ended', nextTrack);
  });


  
  // Cleanup event listener when the component is destroyed
//   onMounted(() => {
//     audio.value.removeEventListener('ended', nextTrack);
//   });
  </script>
  
  <style>
    .music-player {
        background: transparent;
        border: 0px;
        color: antiquewhite;
    }
  </style>