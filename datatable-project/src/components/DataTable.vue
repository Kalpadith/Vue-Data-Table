<template>
    <div>
        <h1>Comments DataTable</h1>
        <table>
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
    </div>
</template>

<script>
export default {
    name: 'DataTable',
    }
</script>

<style src="../styles/dataTable.css"></style>