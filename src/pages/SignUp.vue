<template>
  <q-page class="flex flex-center">
    <q-card dark bordered class="bg-grey-2 my-card q-px-md p-py-md">
      <div class="signup-header">
        <h2 class="text-big">Sign up</h2>
      </div>
      <q-card-section>
        <q-form @submit.prevent="signUp">
          <div class="form-group">
            <label for="username" class="form-label">Username</label>
            <q-input v-model="username" type="text" id="username" />
          </div>
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <q-input v-model="email" type="email" id="email" />
          </div>
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <q-input v-model="password" type="password" id="password" />
          </div>
          <div class="form-group">
            <label for="firstname" class="form-label">First Name</label>
            <q-input v-model="firstname" type="text" id="firstname" />
          </div>
          <div class="form-group">
            <label for="lastname" class="form-label">Last Name</label>
            <q-input v-model="lastname" type="text" id="lastname" />
          </div>
          <div class="form-group">
            <q-btn
              label="Sign up"
              type="submit"
              color="primary"
              class="signup-btn"
            />
          </div>
          <div class="login-link">
            <text-caption
              >Registered?
              <router-link to="/">Login here</router-link></text-caption
            >
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";
import { Notify } from "quasar";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      role: "user",
    };
  },
  methods: {
    signUp() {
      const apiUrl =
        "https://language-learning-backend-rosy.vercel.app/api/auth/signup";

      axios
        .post(apiUrl, {
          username: this.username,
          email: this.email,
          password: this.password,
          firstname: this.firstname,
          lastname: this.lastname,
          role: this.role,
        })
        .then((response) => {
          console.log("Response:", response.data);

          // Set user_id, role, and accessToken in local storage
          localStorage.setItem("user_id", response.data.id);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("accessToken", response.data.accessToken);

          Notify.create({
            type: "positive",
            message: "Registration successful!",
          });

          this.$router.push("/courses");
        })
        .catch((error) => {
          console.error("Error during sign-up:", error);

          Notify.create({
            type: "negative",
            message: "Registration failed. Please try again.",
          });
        });
    },
  },
};
</script>

<style scoped>
.text-big {
  font-size: 2em;
  margin: 20px 0;
  font-weight: bold;
  color: #3498db; /* Blue color for the heading */
}

.my-card {
  background-color: #f5f5f5; /* Light gray background color */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Box shadow for a subtle lift */
  width: 80%; /* Set the desired width */
  max-width: 600px; /* Maximum width to maintain readability */
}

.signup-header {
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  font-size: 1.2em;
  margin-bottom: 5px;
  display: block;
  color: #333;
}

.signup-btn {
  width: 100%;
  background-color: #e67e22; /* Orange color for the button */
  border: none;
  border-radius: 5px;
  color: white;
  padding: 10px;
  transition: background-color 0.3s ease; /* Smooth transition on hover */
}

.signup-btn:hover {
  background-color: #d35400; /* Darker orange on hover */
}

.login-link {
  text-align: center;
  margin-top: 20px;
  color: #666;
}

/* Additional styles for responsiveness */
@media screen and (max-width: 600px) {
  .my-card {
    width: 90%;
    max-width: 400px;
  }
}
</style>
