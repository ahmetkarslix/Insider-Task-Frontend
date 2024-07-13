<template>
    <div>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
            <th>Condition</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(horse, index) in program" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ horse.name }}</td>
            <td>{{ horse.condition }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: ['program'],
  };
  </script>
  
  <style scoped>
  table {
    width: 200px;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  tbody {
    font-size: small;
    max-height: 500px;
    overflow-y: auto;
  }
  
  tr {
    border-bottom: 1px solid #ddd;
  }
  </style>