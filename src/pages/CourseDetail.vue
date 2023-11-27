<template>
  <div class="course-detail-page">
    <div v-if="course">
      <h2 class="text-h3 q-mb-md">{{ course.title }}</h2>
      <p class="text-body1 q-mb-md">{{ course.description }}</p>
      <p class="text-subtitle2 q-mb-md">Syllabus: {{ course.syllabus }}</p>
      <p class="text-subtitle2 q-mb-md">Price: ${{ course.pricing }}</p>

      <h3 class="text-h5 q-mb-md">Lesson Plans</h3>
      <ul class="q-pl-md">
        <li v-for="lessonPlan in course.lessonPlans" :key="lessonPlan.id" class="text-body2 q-mb-xs">{{ lessonPlan.title }}</li>
      </ul>

      <h3 class="text-h5 q-mb-md">Sample Lessons</h3>
      <ul class="q-pl-md">
        <li v-for="lesson in course.sampleLessons" :key="lesson.id" class="text-body2 q-mb-xs">{{ lesson.title }}</li>
      </ul>

      <!-- Link to navigate back to the course list -->
      <router-link to="/courses" class="text-subtitle1 q-mt-md">Back to Course List</router-link>
    </div>
    <div v-else>
      <q-spinner-square size="80px" color="primary" />
      <p class="text-h6 q-mt-md">Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      course: null,
    };
  },
  mounted() {
    const courseId = this.$route.params.id;

    axios.get(`http://localhost:3000/api/courses/${courseId}`)
      .then(response => {
        this.course = response.data;
      })
      .catch(error => {
        console.error('Error fetching course details:', error);
      });
  },
};
</script>

<style scoped>
</style>
