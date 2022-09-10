<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th
          scope="col"
          class="text-nowrap"
          v-for="(dataKey, i) in dataKeys"
          :key="i"
        >
          {{ dataKey }}
        </th>
        <th scope="col" v-if="listOf == 'users'"></th>
      </tr>
    </thead>
    <tbody v-if="listOf == 'users'">
      <tr v-if="dataValues && dataValues.length == 0">
        <td colspan="7" class="text-center text-muted">No User found</td>
      </tr>
      <tr v-else v-for="(user, i) in dataValues" :key="i">
        <th scope="row">{{ i + 1 }}</th>
        <td>{{ user.first_name }}</td>
        <td>{{ user.last_name }}</td>
        <td>{{ user.login_id }}</td>
        <td>{{ user.role }}</td>
        <td>
          {{
            user.skills ? user.skills.map((n) => n.skill_name).join(", ") : "-"
          }}
        </td>
        <td>
          <button class="btn btn-danger" @click="handleDeleteUser(user.id)">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
    <tbody v-if="listOf == 'skills'">
      <tr v-if="dataValues && dataValues.length == 0">
        <td colspan="7" class="text-center text-muted">No Skill found</td>
      </tr>
      <tr v-else v-for="(skill, i) in dataValues" :key="i">
        <th scope="row">{{ i + 1 }}</th>
        <td>{{ skill.name }}</td>
        <td>{{ skill.description || "-" }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ["dataKeys", "dataValues", "listOf"],
  methods: {
    handleDeleteUser(id) {
      this.$emit("deleteUser", id);
    },
  },
};
</script>

<style scoped></style>
