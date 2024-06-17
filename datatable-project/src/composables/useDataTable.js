import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

export default function useDataTable() {
  const comments = ref([]);
  const loading = ref(true);
  const searchQuery = ref('');
  const rowsPerPage = ref(10);
  const currentPage = ref(1);
  const sortKey = ref('');
  const sortOrder = ref('asc');
  const debounceTimeout = ref(null);

  const fetchComments = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
      comments.value = response.data;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchComments);

  const filteredComments = computed(() => {
    let filtered = comments.value;

    if (searchQuery.value) {
      filtered = filtered.filter(comment =>
        comment.name.includes(searchQuery.value) ||
        comment.email.includes(searchQuery.value) ||
        comment.body.includes(searchQuery.value)
      );
    }

    if (sortKey.value) {
      filtered = filtered.sort((a, b) => {
        const sortModifier = sortOrder.value === 'asc' ? 1 : -1;
        if (a[sortKey.value] < b[sortKey.value]) return -1 * sortModifier;
        if (a[sortKey.value] > b[sortKey.value]) return 1 * sortModifier;
        return 0;
      });
    }

    return filtered;
  });

  const paginatedComments = computed(() => {
    if (rowsPerPage.value === 'all') return filteredComments.value;
    const start = (currentPage.value - 1) * rowsPerPage.value;
    const end = start + parseInt(rowsPerPage.value, 10);
    return filteredComments.value.slice(start, end);
  });

  const totalPages = computed(() => {
    if (rowsPerPage.value === 'all') return 1;
    return Math.ceil(filteredComments.value.length / rowsPerPage.value);
  });

  const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value += 1;
  };

  const prevPage = () => {
    if (currentPage.value > 1) currentPage.value -= 1;
  };

  const sortTable = (key) => {
    if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
      sortKey.value = key;
      sortOrder.value = 'asc';
    }
  };

  const debounceSearch = () => {
    if (debounceTimeout.value) clearTimeout(debounceTimeout.value);
    debounceTimeout.value = setTimeout(() => {
      currentPage.value = 1;
    }, 300);
  };

  const removeComment = (id) => {
    comments.value = comments.value.filter(comment => comment.id !== id);
  };

  return {
    comments,
    loading,
    searchQuery,
    rowsPerPage,
    currentPage,
    filteredComments,
    paginatedComments,
    totalPages,
    nextPage,
    prevPage,
    sortTable,
    debounceSearch,
    removeComment,
  };
}
