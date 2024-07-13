<template>
    <div>
      <h2>Horse List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Condition</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(horse, index) in horses" :key="index">
            <td>{{ horse.name }}</td>
            <td>{{ horse.condition }}</td>
            <td :style="{ backgroundColor: horse.color }">{{ horse.color }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: ['horses']
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  th {
    background-color: #f2f2f2;
  }
  </style>