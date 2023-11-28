<template>
  <div class="admin-user-list">
    <h2 class="text-lg font-semibold mb-4">User List</h2>
    <div v-if="items.length > 0">
      <q-list bordered class="mb-8">
        <q-item v-for="item in items" :key="item.id" class="p-4">
          <q-item-section>
            <q-item-label>
              <div class="mb-2">
                <strong>Username:</strong> {{ item.username }}
              </div>
              <div class="mb-2"><strong>Email:</strong> {{ item.email }}</div>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div v-else>
      <div class="text-lg">No items available</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async fetchItems() {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:3000/api/auth/", {
          headers: {
            "x-access-token": accessToken,
          },
        });
        this.items = response.data;
      } catch (error) {
        console.error("Error fetching items", error);
      }
    },
  },
  async created() {
    await this.fetchItems();
  },
};
</script>

<style scoped>
/* Styles for the admin user list page */
.admin-user-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 20px;
}

/* Styles for q-list */
.q-list {
  width: 100%;
  max-width: 600px;
}

/* Styles for q-item */
.q-item {
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

/* Styles for q-item-section */
.q-item-section {
  padding: 16px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

/* Responsive styles for smaller screens */
@media screen and (max-width: 600px) {
  .q-item-section {
    padding: 12px;
  }
}
</style>
