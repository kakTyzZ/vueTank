<script setup>
import { useGameStore } from '@/stores/gameStore';

const store = useGameStore()

function onResetClick(){
    store.HP = 5
    store.time = 0
}

</script>

<template>
    <div class="fixed top-0 left-0 w-screen h-screen bg-black opacity-80 z-50 ">
        <div class="opacity-100 text-white text-3xl w-[300px] h-[300px] bg-white relative left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl shadow-2xl">
            <div class="flex flex-col gap-3 p-3 justify-center items-center text-black">
                <div class="text-3xl text-red-600">You Lost</div>
                <div>Time: {{ store.time }}</div>
                <div>Score: {{ store.score }}</div>

                <button
                class="px-[75px] py-[15px] rounded-xl shadow-xl bg-green-600 text-white text-2xl"
                @click="onResetClick"
                >RESTART</button>
            </div>
        
        </div>
        
    </div>
</template>