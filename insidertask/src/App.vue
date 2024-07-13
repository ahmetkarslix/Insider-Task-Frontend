<template>
  <div id="app">
    <header class="top-bar">
      <div class="title">Horse Racing</div>
      <div class="controls">
        <button @click="generateProgram" :disabled="raceRunning">Generate Program</button>
        <button @click="startPauseRace">{{ raceRunning ? 'Pause' : 'Start' }}</button>
      </div>
    </header>
    <div class="container">
      <div class="left-panel">
        <HorseList :horses="horses" />
      </div>
      <div class="center-panel">
        <RaceTrack :horses="selectedHorses" :lapLength="currentLapLength" :lapNumber="currentLapIndex + 1" />
      </div>
      <div class="right-panel">
        <h2>Program</h2>
        <div class="laps-container">
          <div class="lap" v-for="(program, index) in programList" :key="index">
            <h3>{{ index + 1 }}. Lap {{ laps[index].length }}m</h3>
            <Program :program="program" />
          </div>
        </div>
      </div>
      <div class="right-panel2">
        <h2>Results</h2>
        <div class="laps-container">
          <div class="lap" v-for="(result, index) in resultsList" :key="index">
            <h3>{{ index + 1 }}. Lap {{ laps[index].length }}m</h3>
            <Results :results="result" v-if="index <= currentLapIndex" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import HorseList from './components/HorseList.vue';
import RaceTrack from './components/RaceTrack.vue';
import Program from './components/Program.vue';
import Results from './components/Results.vue';

export default {
  components: {
    HorseList,
    RaceTrack,
    Program,
    Results,
  },
  computed: {
    ...mapState(['horses', 'raceRunning', 'laps', 'lapLengthInPixels', 'program', 'results', 'currentLapIndex']),
    ...mapGetters(['selectedHorses']),
    programList() {
      return this.program;
    },
    resultsList() {
      return this.results;
    },
    currentLapLength() {
      return this.laps[this.currentLapIndex]?.length || 0;
    }
  },
  methods: {
    ...mapActions(['generateHorses', 'generateProgram', 'startRace', 'pauseRace']),
    generateProgram() {
      this.generateHorses();
      this.$store.dispatch('generateProgram');
    },
    startPauseRace() {
      if (this.raceRunning) {
        this.pauseRace();
      } else {
        this.startRace();
      }
    }
  },
  mounted() {
    this.generateHorses();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3b5998;
  color: white;
  padding: 10px;
}

.title {
  font-size: 24px;
}

.controls button {
  margin-left: 10px;
  padding: 5px 10px;
}

.container {
  display: flex;
  justify-content: space-between;
  margin: 20px;
}

.left-panel,
.center-panel,
.right-panel,
.right-panel2 {
  border: 1px solid #ccc;
  padding: 10px;
  height: 500px;
  overflow-y: auto;
}

.left-panel {
  width: 20%;
}

.center-panel {
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.right-panel,
.right-panel2 {
  width: 20%;
  display: flex;
  flex-direction: column;
}

.laps-container {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 400px;
  margin-bottom: 10px;
}

.lap {
  margin-bottom: 10px;
}
</style>
