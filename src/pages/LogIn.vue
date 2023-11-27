<template>
  <q-page class="flex flex-center">
    <q-card dark bordered class="bg-grey-2 my-card q-px-md p-py-md">
      <div>
        <h2 style="color: black; font-weight: 50">Login</h2>
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
      const apiUrl = "http://localhost:3000/api/auth/login";

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

          this.$router.push("/courses");
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
