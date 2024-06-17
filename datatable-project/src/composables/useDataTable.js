import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

export default function useDataTable() {
  const comments = ref([]);

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


  return {
    comments
  };
}
