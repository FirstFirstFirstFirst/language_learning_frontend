<template>
  <div class="admin-enrollment-list">
    <h2 class="text-lg font-semibold mb-4">Enrollment List</h2>
    <div v-if="enrollments.length > 0">
      <q-list bordered class="mb-8">
        <q-item
          v-for="enrollment in enrollments"
          :key="enrollment.id"
          class="p-4"
        >
          <q-item-section>
            <q-item-label>
              <div class="mb-2">
                <strong>User ID:</strong> {{ enrollment.user_id }}
              </div>
              <div class="mb-2">
                <strong>Course ID:</strong> {{ enrollment.course_id }}
              </div>
            </q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label>
              <q-btn
                label="Delete"
                color="negative"
                @click="deleteEnrollment(enrollment.enrollment_id)"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div v-else>
      <div class="text-lg">No enrollments available</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      enrollments: [],
    };
  },
  methods: {
    async fetchEnrollments() {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await axios.get(
          "http://localhost:3000/api/enrollment/allEnroll",
          {
            headers: {
              "x-access-token": accessToken,
            },
          }
        );

        this.enrollments = response.data;
      } catch (error) {
        console.error("Error fetching enrollments", error);
      }
    },
    async deleteEnrollment(enrollmentId) {
      try {
        const accessToken = localStorage.getItem("accessToken");

        await axios.delete(
          `http://localhost:3000/api/enrollment/${enrollmentId}`,
          {
            headers: {
              "x-access-token": accessToken,
            },
          }
        );

        this.fetchEnrollments();
      } catch (error) {
        console.error("Error deleting enrollment", error);
      }
    },
  },
  async created() {
    await this.fetchEnrollments();
  },
};
</script>

<style scoped>
.admin-enrollment-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 20px;
}

.q-list {
  width: 100%;
  max-width: 600px;
}

.q-item {
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, a0.1);
  margin-bottom: 16px;
}

.q-item-section {
  padding: 16px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

/* Styles for q-btn */
.q-btn {
  width: 100%;
  max-width: 200px;
}

/* Responsive styles for smaller screens */
@media screen and (max-width: 600px) {
  .q-item-section {
    padding: 12px;
  }
}
</style>
