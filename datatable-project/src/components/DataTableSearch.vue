<template>
  <input
    type="text"
    :value="searchQuery"
    @input="$emit('update:searchQuery', $event.target.value)"
    placeholder="Search..."
    class="search-bar"
  />
</template>

<script>
export default {
  props: {
    searchQuery: String,
  },
};
</script>
<style src="../styles/searchBar.css"></style>
