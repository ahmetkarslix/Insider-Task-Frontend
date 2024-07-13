<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Position</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(horse, index) in sortedHorses" :key="horse.id">
          <td>{{ index + 1 }}</td>
          <td>{{ horse.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['results'],
  computed: {
    sortedHorses() {
      return this.results.slice().sort((a, b) => a.finishTime - b.finishTime);
    },
  },
};
</script>

<style scoped>
table {
  width: 250px;
  border-collapse: collapse;
}

th, td {
  font-size: small;
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}
</style>