<template>
  <div>
    <button @click="prevPage" :disabled="currentPage <= 1">Previous</button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage >= totalPages">Next</button>
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
