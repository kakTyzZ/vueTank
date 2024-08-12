<script setup>
import { ref,onMounted, watch } from 'vue';
import Worm from "./components/Worm.vue"
import {useGameStore} from "./stores/gameStore.js"
import DataTable from './components/DataTable.vue';
import FinishScreen from './components/FinishScreen.vue';
import IronCrate from './components/IronCrate.vue';

const store = useGameStore()

const ball = ref(null)
const amountOfWorms = ref(8)
const harvesterDegree = ref(0)




function ballAnimationUpDown() {
  store.playerCoords.upDown = 2
  setTimeout(() => {
    store.playerCoords.upDown = 0
  }, 700);
}
function ballAnimationLeftRight() {
  store.playerCoords.leftRight = 2
  setTimeout(() => {
    store.playerCoords.leftRight = 0
  }, 700);
}

onMounted(()=>{
  window.addEventListener("keypress", e => {
    if(e.key === "d"){
      /* spawnWorms() */
      if(store.playerCoords.left < 700 - 30){
        store.playerCoords.left += 10
        harvesterDegree.value = 90
        ballAnimationLeftRight()
      }
      
    }else if(e.key === "a"){
      if(store.playerCoords.left > 0){
        store.playerCoords.left -= 10
        harvesterDegree.value = 270
        ballAnimationLeftRight()
      }
      
    }else if(e.key === "w"){
      if(store.playerCoords.top > 0){
        store.playerCoords.top -= 10
        harvesterDegree.value = 0
        ballAnimationUpDown()
      }
      
    }else if(e.key === "s"){
      if(store.playerCoords.top < 700 - 30){
        store.playerCoords.top += 10
        harvesterDegree.value = 180
        ballAnimationUpDown()
      }
      
    }
	});
}) 

watch(store.playerCoords,()=>{

    const playerX = store.playerCoords.left;
    const playerY = store.playerCoords.top;

    const crateX = store.crateCoords.left 
    const crateY = store.crateCoords.top
    if (playerX < crateX + 40 && playerX + 30 > crateX &&
        playerY < crateY + 30 && playerY + 30 > crateY){
          store.increaseAmountOfCrates()
    }

    for (const worm of store.wormCoords) {
        const wormX = worm.left;
        const wormY = worm.top;
        
        // Проверка пересечения
        if (playerX < wormX + 50 && playerX + 30 > wormX &&
            playerY < wormY + 50 && playerY + 30 > wormY) {
              
              
              if(worm.wormPic === "../assets/Worm2.png"){
                store.decreaseHp()
                
              }
         
        }
    }


}
)

</script>

<template>
  <div class="flex w-screen h-screen bg-red-50 p-3">
      <FinishScreen v-if="store.HP === 0"/>
      <div 
      :class="{ shakeClass : store.shakeState }"
      class="bgclass w-[700px] h-[700px]  mx-auto relative rounded shadow-2xl p-1">
      <IronCrate />
      <Worm v-for="i in amountOfWorms" :key="i" :delay="i * 1000" />
      <div class="max-w-[30px] max-h-[50px] relative">
        <div 
      ref="ball"
      class="harvester w-[30px] h-[50px]  bg-green-200 absolute shadow-2xl"
      :style="{ 'left': store.playerCoords.left + 'px', 'top': store.playerCoords.top + 'px', 'transform': `translate(${store.playerCoords.leftRight}px,${store.playerCoords.upDown}px)`, 'transform':`rotate(${harvesterDegree}deg)` }"
      ></div>
      </div>
      <DataTable/>
    </div>
    
    
  </div>
</template>

<style>
.bgclass{
  background: url('../assets/Sand.png') no-repeat;
  background-size: cover;
}

.harvester{
  background: url('../assets/Harvester.png') no-repeat;
  background-size: cover;
}
.shakeClass {
  transform: rotate(1deg);
}
</style>

