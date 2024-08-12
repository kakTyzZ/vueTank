<script setup>
import { ref,computed } from "vue";
import {useGameStore} from "../stores/gameStore.js"
const store = useGameStore()

const minutes = computed(()=>Math.floor((store.time / 60)))


</script>



<template>
    <div class="bg-white shadow-2xl max-w-[200px] h-[400px] w-full absolute z-10 right-[-205px] top-[20%]">
        <ul class="flex flex-col p-1 text-xl gap-2">
            <li class="shadow-xl">Время: {{ minutes > 0 ? "0"+minutes  : minutes }} : {{ store.time % 60 }}</li>
            <li class="shadow-xl">Жизни: {{ store.HP }}</li>
            <li class="shadow-xl">Очков: {{ store.crates }}</li>
            <li class="shadow-xl">Открыто ячеек: 0</li>
        </ul>
    </div>
</template>