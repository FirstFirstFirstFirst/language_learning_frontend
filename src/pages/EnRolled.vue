<template>
  <div class="enrolled-courses">
    <div class="text-big">Enrolled Courses</div>
    <div v-if="enrollments.length > 0">
      <div
        v-for="(enrollment, index) in enrollments"
        :key="index"
        class="course-card"
      >
        <div class="course-details">
          <h3>{{ enrollment.course_title }}</h3>
          <p class="description">{{ enrollment.course_description }}</p>
          <div class="details">
            <p><strong>Language:</strong> {{ enrollment.course_language }}</p>
            <p>
              <strong>Proficiency Level:</strong>
              {{ enrollment.course_proficiency_level }}
            </p>
            <p><strong>Instructor:</strong> {{ enrollment.instructor_name }}</p>
          </div>
        </div>
        <div class="additional-details">
          <p class="price">
            <strong>Price:</strong> ${{ enrollment.course_pricing }}
          </p>
          <p class="enrollment-date">
            <strong>Enrollment Date:</strong> {{ enrollment.enrollment_date }}
          </p>

          <!-- Check if there are lesson details available -->
          <template v-if="enrollment.lesson_title && enrollment.lesson_content">
            <div class="lesson-details">
              <p>
                <strong>Lesson Title:</strong> {{ enrollment.lesson_title }}
              </p>
              <p>
                <strong>Lesson Content:</strong> {{ enrollment.lesson_content }}
              </p>
            </div>
          </template>

          <!-- Display progress if available -->
          <template v-if="enrollment.progress">
            <div class="progress-details">
              <p>
                <strong>Progress:</strong>
                {{ enrollment.progress.completion_status }}
              </p>
              <!-- Add more progress details if needed -->
            </div>
          </template>
          <template v-else>
            <div class="no-progress">
              <p>No progress available</p>
            </div>
          </template>

          <!-- Button to open Certificate Popup -->
          <q-btn
            label="View Certificate"
            @click="openCertificatePopup(enrollment)"
          />

          <!-- Certificate Popup -->
          <q-dialog v-model="dialog" persistent>
            <q-card class="certificate-card">
              <q-card-section class="certificate-header">
                <q-card-title class="text-h6">
                  Certificate of Completion
                </q-card-title>
                <q-btn flat icon="close" @click="closePopup" />
              </q-card-section>

              <!-- Certificate Popup Content -->
              <!-- Include the CertificatePopup content here -->
            </q-card>
          </q-dialog>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No enrolled courses available.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      enrollments: [],
      dialog: false,
      selectedEnrollment: null,
    };
  },
  async created() {
    // Retrieve the access token and user_id from localStorage
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("user_id");

    try {
      const response = await axios.get(
        `https://language-learning-backend-rosy.vercel.app/api/enrollment/getEnroll/${userId}`,
        {
          headers: {
            "x-access-token": accessToken,
          },
        }
      );

      // Fetch progress for each enrolled course
      for (const enrollment of response.data) {
        const progressResponse = await axios.get(
          `https://language-learning-backend-rosy.vercel.app/api/progress/${userId}/${enrollment.course_id}`,
          {
            headers: {
              "x-access-token": accessToken,
            },
          }
        );

        // Attach progress information to the enrollment
        enrollment.progress = progressResponse.data;
      }

      this.enrollments = response.data;
    } catch (error) {
      console.error("Error fetching enrollments", error);
    }
  },
  methods: {
    openCertificatePopup(enrollment) {
      this.selectedEnrollment = enrollment;
      this.dialog = true;
    },
    closePopup() {
      this.dialog = false;
      this.selectedEnrollment = null;
    },
  },
};
</script>

<style scoped>
/* Existing styles */

.course-card {
  display: flex;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.course-details {
  flex: 1;
  padding: 16px;
  background-color: #f8fafc;
}

.course-details h3 {
  margin-top: 0;
  color: #2d3748;
}

.description {
  margin-bottom: 12px;
  color: #4a5568;
}

.details {
  color: #718096;
}

.additional-details {
  text-align: right;
  padding: 16px;
  background-color: #f8fafc;
}

.price,
.enrollment-date,
.progress-details,
.no-progress {
  margin-bottom: 8px;
  color: #4a5568;
}

.no-progress {
  font-style: italic;
}

.progress-details {
  margin-top: 16px;
}

.enrolled-courses p {
  color: #4a5568;
}
.text-big {
  font-size: xx-large;
  margin: 40px 40px 40px 20px;
  font-weight: 600;
}
</style>
