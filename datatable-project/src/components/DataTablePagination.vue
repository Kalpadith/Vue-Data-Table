<template>
  <div>
    <button class="previous-button" @click="prevPage" :disabled="currentPage <= 1">&lt;&lt; Previous</button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button class="next-button" @click="nextPage" :disabled="currentPage >= totalPages">Next &gt;&gt;</button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: Number,
    totalPages: Number,
    prevPage: Function,
    nextPage: Function,
  },
};
</script>
<style src="../assets/styles/pagination.css"></style>