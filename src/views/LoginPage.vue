<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="2" md="4">
        <v-card>
          <v-card-title class="text-h5 text-center"> 로그인 </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="doLogin">
              <v-text-field
                label="email"
                v-model="email"
                type="email"
                prepend-icon="mdi-email"
                required
              >
              </v-text-field>
              <v-text-field
                label="패스워드"
                v-model="password"
                type="password"
                prepend-icon="mdi-lock"
                required
              >
              </v-text-field>
              <v-row>
                <v-col cols="6">
                  <v-btn color="red" block>비밀번호 변경</v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn type="submit" color="primary" block>로그인</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { jwtDecode } from "jwt-decode";
export default {
  data() {
    return {
      email: "",
      password: "",
      token: "",
    };
  },

  methods: {
    async doLogin() {
      // try catch로 묶어서 login 성공 시 token 을 console.log로 출력
      try {
        const loginData = {
          email: this.email,
          password: this.password,
        };
        const response = await axios.post(
          `${process.env.VUE_APP_API_BASE_URL}/doLogin`,
          loginData
        );
        // localstorage라는 브라우저의 특정 공간에 서버로부터 받아온 토큰값 저장
        const token = response.data.result.token;
        const refreshToken = response.data.result.refreshToken;
        const role = jwtDecode(token).role;
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("role", role);
        // this.$router.push("/");
        window.location.href = "/";
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
