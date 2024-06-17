<template>
  <thead>
    <tr>
      <th @click="sortTable('id')">ID</th>
      <th @click="sortTable('email')">Email</th>
      <th>Name</th>
      <th>Body</th>
      <th>Actions</th>
    </tr>
  </thead>
</template>

<script>
export default {
  name: 'DataTableHeader',
  props: {
    sortTable: Function,
  },
};
</script>

<style scoped>
th {
  cursor: pointer;
}
</style>
