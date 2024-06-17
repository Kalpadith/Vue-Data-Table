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

      <select v-model="rowsPerPage">
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="all">All</option>
      </select>

      <table>
        <DataTableHeader :sortTable="sortTable" />
        <tbody>
          <tr v-for="comment in paginatedComments" :key="comment.id">
            <td>{{ comment.id }}</td>
            <td>{{ comment.email }}</td>
            <td>{{ comment.name }}</td>
            <td>{{ comment.body }}</td>
            <td>
              <button @click="editComment(comment)">Edit</button>
              <button @click="removeComment(comment.id)">Remove</button>
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
  </div>
</template>

<script>
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
    } = useDataTable();

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
    };
  },
};
</script>

<style src="../styles/dataTable.css"></style>

