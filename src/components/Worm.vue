<script setup>
import { ref,onMounted,reactive } from 'vue';
import {useGameStore} from "../stores/gameStore.js"
const props = defineProps({
    delay:Number
})

const store = useGameStore()

const currentId = Math.floor(Math.random() * 10000)
const wormState = ref(true)
const wormsCoords = reactive({
    left:-500,
    top:-500,
    wormPic:"../assets/Worm1.png"
})

function startSpawning(){
    setInterval(()=>{
        wormState.value = true
        wormsCoords.wormPic = "../assets/Worm1.png"

        wormsCoords.left = Math.floor(Math.random() * 640)
        wormsCoords.top = Math.floor(Math.random() * 640)
        const item = {
            id:currentId,
            left:wormsCoords.left, 
            top:wormsCoords.top, 

        }
        store.wormCoords.push(item)
        spawnWorms(item)
        
    },Math.floor(Math.random() * 10000) + (props.delay + 2000))
    
}

onMounted(()=>{
    startSpawning()
    
})

function spawnWorms(item){
  setTimeout(()=> 
  {
    wormsCoords.wormPic = "../assets/Worm2.png"
    const newItem  = {
        ...item,
        wormPic:"../assets/Worm2.png"
    }
    store.wormCoords.push(newItem)
}
  
  , Math.floor(Math.random() * 2000) )
  setTimeout(()=>{
    wormState.value = false
    store.wormCoords = store.wormCoords.filter(e => e.id === !item.id)
},3500)
  
  
}

</script>


<template >
   <div v-if="wormState === true" class="w-[50px] h-[50px] absolute" :style="{ 'left': wormsCoords.left + 'px', 'top': wormsCoords.top + 'px' }"   >
        <img class="w-[50px] h-[50px]" :src="wormsCoords.wormPic" alt="worm1">
    </div>
</template>