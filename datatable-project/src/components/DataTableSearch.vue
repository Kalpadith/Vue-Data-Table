<template>
    <input
      type="text"
      :value="searchQuery"
      @input="$emit('update:searchQuery', $event.target.value)"
      placeholder="Search..."
    />
  </template>
  
  <script>
  export default {
    props: {
      searchQuery: String,
    },
  };
  </script>
  