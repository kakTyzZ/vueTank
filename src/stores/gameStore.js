import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {

  const playerCoords = ref({
    left: 0,
    top: 0,
    upDown: 0,
    leftRight: 0
  })
  const wormCoords = ref([])
  const crateCoords = reactive({
    left: -500,
    top: -500,
    animation: 1
  })

  const shakeState = ref(false)

  const time = ref(0)
  const HP = ref(5)
  const crates = ref(0)
  const debounceState = ref(true)

  function setTime() {
    const x = setInterval(() => time.value += 1, 1000)

  }

  function shakeCanvas() {
    shakeState.value = !shakeState.value
    setTimeout(() => shakeState.value = !shakeState.value, 100)
  }

  function decreaseHp() {
    if (debounceState.value === true) {
      if (HP.value > 0) {
        shakeCanvas()
        HP.value--
        debounceState.value = false
        setTimeout(() => {
          debounceState.value = true

        }, 500)
      }

    }

  }
  function increaseAmountOfCrates() {
    if (debounceState.value === true) {

      crates.value++
      crateCoords.animation = 0
      /* setTimeout(() => {
        crateCoords.top = -500
        crateCoords.left = -500
      }, 1500) */

      debounceState.value = false
      setTimeout(() => { debounceState.value = true }, 700)


    }

  }


  return { wormCoords, playerCoords, time, decreaseHp, HP, crates, crateCoords, increaseAmountOfCrates, shakeState, setTime }
})
