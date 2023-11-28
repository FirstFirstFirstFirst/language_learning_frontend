<template>
  <div class="admin-home">
    <q-page class="q-pa-md">
      <q-card class="q-mb-md">
        <q-card-section>
          <h2 class="text-h6 font-bold">Admin Dashboard</h2>
        </q-card-section>
      </q-card>

      <q-btn
        v-for="item in menuItems"
        :key="item.id"
        :label="item.label"
        :color="item.color"
        class="q-mb-md"
        @click="navigate(item.route)"
      />
    </q-page>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        { id: 1, label: 'User List', color: 'primary', route: '/admin/userlist' },
        { id: 2, label: 'Enrollment List', color: 'primary', route: '/admin/enrollmentlist' },
      ],
    };
  },
  methods: {
    navigate(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style scoped>
/* Styles for the admin home page */
.admin-home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

/* Styles for q-page */
.q-page {
  max-width: 600px;
  margin: auto;
}

/* Styles for q-card */
.q-card {
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Styles for q-card-section */
.q-card-section {
  padding: 16px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

/* Styles for q-btn */
.q-btn {
  width: 100%;
  max-width: 300px;
}
</style>