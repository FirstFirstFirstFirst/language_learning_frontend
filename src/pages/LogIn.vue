<template>
  <q-page class="flex flex-center">
    <q-card dark bordered class="bg-grey-2 my-card q-px-md p-py-md">
      <div>
        <h2 style="color: black" class="text-big">Login</h2>
      </div>
      <q-card-section>
        <q-form @submit.prevent="login">
          <div>
            <q-input v-model="username" type="text" label="Your Username" />
          </div>
          <div>
            <q-input v-model="password" label="Your Password"> </q-input>
          </div>
          <div>
            <q-btn
              label="Login"
              type="submit"
              color="primary"
              style="width: 100%"
            />
          </div>
          <div>
            <text-caption style="color: black"
              >Not registered?
              <router-link to="/signup">Sign up here</router-link>
            </text-caption>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  name: "LogIn",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      const apiUrl = "https://language-learning-backend-rosy.vercel.app/api/auth/login";

      axios
        .post(apiUrl, {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("user_id", response.data.user.user_id);
          localStorage.setItem("role", response.data.user.role);
          console.log(response.data.user.role == "admin");
          if (response.data.user.role == "admin") {
            this.$router.push("/admin");
          } else {
            this.$router.push("/courses");
          }
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            alert(error.response.data.message);
          } else {
            console.error(error);
          }
        });
    },
  },
};
</script>

<style scoped>
.text-big {
  font-size: xx-large;
  margin: 40px 40px 40px 20px;
  font-weight: 600;
  color: #333; /* Dark text color */
}

.my-card {
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle box shadow */
}

.q-input {
  background-color: #f8f8f8; /* Light gray background for input fields */
  border-radius: 5px;
  margin-bottom: 15px;
}

.q-btn {
  background-color: #3498db; /* Blue color for the button */
  border: none;
  border-radius: 5px;
  color: white;
  padding: 10px;
  transition: background-color 0.3s ease;
}

.q-btn:hover {
  background-color: #2980b9; /* Darker blue on hover */
}

.login-link {
  text-align: center;
  margin-top: 20px;
  color: #666;
}
</style>
