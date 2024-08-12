<script setup>
import { reactive,onMounted } from 'vue';
import { useGameStore } from '@/stores/gameStore';

const store = useGameStore()



function startSpawning(){
    setInterval(()=>{
        store.crateCoords.left = Math.floor(Math.random() * 640)
        store.crateCoords.top = Math.floor(Math.random() * 640)
        store.crateCoords.animation = 1
        
    },Math.floor(Math.random() * 4000) + (2000))
    
}

onMounted(()=>{
    startSpawning()
    store.setTime()
    
})



</script>

<template>
    <div class=" z-100 crate">
        <img
        class="w-[40px] h-[30px] absolute transition-all duration ease-linear"
        :class="store.crateCoords.animation ? 'crate' : ''"
        :style="{ 'left': store.crateCoords.left + 'px', 'top': store.crateCoords.top + 'px', transform: `scale(${store.crateCoords.animation})` }"
        src="../../assets/IronCrate.png" alt="">
    </div>
</template>

<style scoped>

.crate {
    animation: 0.5s 1 alternate slidein;
    
}

@keyframes slidein {
  to {
    transform: scale(0);
  }
}

</style>