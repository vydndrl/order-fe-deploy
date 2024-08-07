<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-card-title class="text-center text-h5"> 주문 목록 </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="tableHeaders"
            :items="OrderList"
            .class="elevation-1"
            show-expand
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn
                color="red"
                v-if="isAdmin && item.orderStatus === 'ORDERED'"
                @click.stop="cancelOrder(item.id)"
              >
                CANCEL
              </v-btn>
            </template>
            <template v-slot:expanded-row="{ item }">
              <v-row>
                <v-col>
                  <v-list-item
                    v-for="orderItem in item.orderDetailDtos"
                    :key="orderItem.id"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ orderItem.productName }} {{ orderItem.cout }} 개
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </template>
          </v-data-table>
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  props: ["isAdmin"],
  data() {
    return {
      OrderList: [],
      tableHeaders: [
        { title: "ID", key: "id", allign: "start" },
        { title: "회원EMAIL", key: "memberEmail", allign: " start" },
        { title: "주문상태", key: "orderStatus", allign: " start" },
        { title: "ACTION", key: "actions", allign: " start" },
      ],
    };
  },
  async created() {
    if (this.isAdmin) {
      const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/order/list`);
      this.OrderList = response.data.result;
    } else {
      const response = await axios.get(
        `${process.env.VUE_APP_API_BASE_URL}/order/myorders`
      );
      this.OrderList = response.data.result;
    }
  },
  methods: {
    async cancelOrder(id) {
      await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/order/${id}/cancel`);
      window.location.reload();
    },
  },
};
</script>
