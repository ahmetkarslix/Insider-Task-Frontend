<template>
    <div>
      <h1>Horse Racing Simulation</h1>
      <button @click="generateProgram">Generate Program</button>
      <button @click="startRace" :disabled="raceRunning">Start Race</button>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      raceRunning() {
        return this.$store.state.raceRunning;
      }
    },
    methods: {
      generateProgram() {
        this.$store.dispatch('generateHorses');
        this.$store.dispatch('generateProgram');
      },
      startRace() {
        this.$store.dispatch('startRace');
      },
      changeHorseColor(horseId, newColor) {
        this.$store.dispatch('changeHorseColor', { horseId, newColor });
      }
    }
  }
  </script>
