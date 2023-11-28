<template>
  <div class="course-detail-page">
    <div v-if="course">
      <h2 class="course-title">{{ course.title }}</h2>
      <p class="course-description">{{ course.description }}</p>
      <div class="course-info">
        <p class="course-info-item">Syllabus: {{ course.syllabus }}</p>
        <p class="course-info-item">Price: ${{ course.pricing }}</p>
      </div>

      <div class="course-section">
        <h3 class="course-section-title">Lesson Plans</h3>
        <ul class="course-list">
          <li
            v-for="lessonPlan in course.lessonPlans"
            :key="lessonPlan.id"
            class="course-list-item"
          >
            {{ lessonPlan.title }}
          </li>
        </ul>
      </div>

      <div class="course-section">
        <h3 class="course-section-title">Sample Lessons</h3>
        <ul class="course-list">
          <li
            v-for="lesson in course.sampleLessons"
            :key="lesson.id"
            class="course-list-item"
          >
            {{ lesson.title }}
          </li>
        </ul>
      </div>

      <q-btn
        v-if="shouldShowEnrollButton"
        @click="enroll"
        color="primary"
        label="Enroll"
        icon="school"
        class="enroll-button"
        size="md"
      />

      <router-link to="/courses" class="back-link"
        >Back to Course List</router-link
      >
    </div>
    <div v-else>
      <q-spinner-square size="80px" color="primary" />
      <p class="loading-message">Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      course: null,
      isEnrolled: false,
      accessToken: null,
      userId: null,
      courseId: null,
    };
  },
  computed: {
    shouldShowEnrollButton() {
      return !this.isEnrolled;
    },
  },
  mounted() {
    this.courseId = this.$route.params.id;

    this.accessToken = localStorage.getItem("accessToken");
    this.userId = localStorage.getItem("user_id");

    axios
      .get(`https://language-learning-backend-rosy.vercel.app/api/courses/${this.courseId}`)
      .then((response) => {
        this.course = response.data;
      })
      .catch((error) => {
        console.error("Error fetching course details:", error);
      });

    this.checkEnrollmentStatus();
  },
  methods: {
    checkEnrollmentStatus() {
      axios
        .get(
          `https://language-learning-backend-rosy.vercel.app/api/enrollment/check/${this.userId}/${this.courseId}`,
          {
            headers: {
              "x-access-token": this.accessToken,
            },
          }
        )
        .then((response) => {
          this.isEnrolled = response.data.isEnrolled;
        })
        .catch((error) => {
          console.error("Error checking enrollment status:", error);
        });
    },
    enroll() {
      // Use userId and courseId to make the enrollment request
      const enrollmentData = {
        user_id: this.userId,
        course_id: this.courseId,
      };

      axios
        .post("https://language-learning-backend-rosy.vercel.app/api/enrollment/", enrollmentData)
        .then((response) => {
          console.log("Enrollment successful:", response.data);
          this.isEnrolled = true;
        })
        .catch((error) => {
          console.error("Error enrolling:", error);
        });
    },
  },
};
</script>

<style scoped>
.course-detail-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.course-title {
  font-size: 2em;
  margin-bottom: 10px;
  color: #333;
}

.course-description {
  color: #666;
  margin-bottom: 20px;
}

.course-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.course-info-item {
  color: #555;
}

.course-section {
  margin-bottom: 30px;
}

.course-section-title {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #333;
}

.course-list {
  list-style: none;
  padding: 0;
}

.course-list-item {
  color: #666;
  margin-bottom: 8px;
}

.enroll-button {
  background-color: #3498db;
  color: #fff;
  margin-top: 20px;
}

.enroll-button:hover {
  background-color: #2980b9;
}

.back-link {
  display: inline-block;
  color: #3498db;
  margin-top: 20px;
}

.loading-message {
  font-size: 1.2em;
  color: #666;
  margin-top: 20px;
}
</style>
