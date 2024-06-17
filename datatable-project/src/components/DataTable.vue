<template>
  <div>
    <h1>Comments DataTable</h1>

    <div v-if="loading">Loading...</div>

    <div v-else>
      <DataTableSearch
        :searchQuery="searchQuery"
        @update:searchQuery="searchQuery = $event"
        :debounceSearch="debounceSearch"
      />
      <div class="select-text-container">
        <span>Page Size:</span>
      </div>
      <div class="select-container">
    <select class="custom-select" v-model="rowsPerPage">
      <option class="custom-option" value="10">10</option>
      <option class="custom-option" value="15">15</option>
      <option class="custom-option" value="20">20</option>
      <option class="custom-option" value="all">All</option>
    </select>
    </div>

      <table>
        <DataTableHeader :sortTable="sortTable" />
        <tbody>
          <tr v-for="comment in paginatedComments" :key="comment.id">
            <td>{{ comment.id }}</td>
            <td>{{ comment.email }}</td>
            <td>{{ comment.name }}</td>
            <td>{{ comment.body }}</td>
            <td>
              <button class = "update-button" @click="editComment(comment)">Edit</button>
              <button class = "delete-button" @click="removeComment(comment.id)">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>

      <DataTablePagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        :prevPage="prevPage"
        :nextPage="nextPage"
      />
    </div>

    <div v-if="isEditing" class="modal">
      <div class="modal-content">
        <h2>Edit Comment</h2>
        <form @submit.prevent="saveEdit">
          <label for="editName">Name</label>
          <input id="editName" v-model="editForm.name" />

          <label for="editEmail">Email</label>
          <input id="editEmail" v-model="editForm.email" />

          <label for="editBody">Body</label>
          <textarea id="editBody" v-model="editForm.body"></textarea>

          <button type="submit">Save</button>
          <button type="button" @click="cancelEdit">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import DataTableSearch from './DataTableSearch.vue';
import DataTableHeader from './DataTableHeader.vue';
import DataTablePagination from './DataTablePagination.vue';
import useDataTable from '../composables/useDataTable';

export default {
  name: 'DataTable',
  components: {
    DataTableSearch,
    DataTableHeader,
    DataTablePagination,
  },
  setup() {
    const {
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
    } = useDataTable();

    const comments = ref([]);
    const isEditing = ref(false);
    const editForm = ref({
      id: null,
      name: '',
      email: '',
      body: '',
    });

    const startEdit = (comment) => {
      isEditing.value = true;
      editForm.value = { ...comment };
    };

    const saveEdit = () => {
      const commentIndex = comments.value.findIndex(comment => comment.id === editForm.value.id);
      if (commentIndex !== -1) {
        comments.value[commentIndex] = { ...editForm.value };
      }
      isEditing.value = false;
    };

    const cancelEdit = () => {
      isEditing.value = false;
    };

    return {
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
      isEditing,
      editForm,
      editComment: startEdit,
      saveEdit,
      cancelEdit,
    };
  },
};
</script>
<style src="../styles/dataTable.css"></style>
<style src="../styles/pagination.css"></style>
