<template>
  <v-contatier>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="text-center text-h5"> 회원 목록 </v-card-title>
          <v-card-text>
            <v-data-table :headers="tableHeaders" :items="memberList"> </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-contatier>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tableHeaders: [
        { title: "ID", key: "id", allign: "start" },
        { title: "이름", key: "name", allign: " start" },
        { title: "EMAIL", key: "email", allign: " start" },
      ],
      memberList: [],
    };
  },
  async created() {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    // {"headers" : {Authorziation, 토큰 값}}
    const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/list`, {
      headers: headers,
    });
    this.memberList = response.data.result.content;
  },
};
</script>
