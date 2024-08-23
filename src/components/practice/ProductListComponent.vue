<template>
  <v-container>
    <v-row class="d-flex justify-content-between mt-5">
      <v-col>
        <v-form @submit.prevent="searchProducts">
          <v-row>
            <v-col cols="auto">
              <v-select
                v-model="searchType"
                :items="searchOptions"
                item-title="text"
                item-value="value"
              >
              </v-select>
            </v-col>
            <v-col>
              <v-text-field v-model="searchValue" label="Search"> </v-text-field>
            </v-col>
            <v-col cols="auto" :style="{ marginTop: '10px' }"
              ><v-btn type="submit" style="background-color: cornflowerblue"
                >🔎 검색</v-btn
              ></v-col
            >
          </v-row>
        </v-form>
      </v-col>

      <v-col cols="auto" v-if="!isAdmin" :style="{ marginTop: '10px' }">
        <v-btn class="mr-2" style="background-color: aliceblue" @click="addCart"
          >🛒 장바구니</v-btn
        >
        <v-btn style="background-color: aliceblue" @click="createOrder"
          >🪄 주문하기</v-btn
        >
      </v-col>

      <v-col cols="auto" v-if="isAdmin" :style="{ marginTop: '10px' }">
        <v-btn href="/product/create" style="background-color: lightgoldenrodyellow"
          >🖥️ 상품 등록</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="text-p text-center" style="background-color: aliceblue">{{
            pageTitle
          }}</v-card-title>
          <v-card-text style="background-color: cornsilk">
            <v-table>
              <thead>
                <tr>
                  <th>제품 사진</th>
                  <th>제품명</th>
                  <th>가격</th>
                  <th>재고 수량</th>
                  <th v-if="!isAdmin">주문 수량</th>
                  <th class="text-center" v-if="!isAdmin">주문 선택</th>
                  <th v-if="isAdmin">관리자 권한</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in productList" :key="p.id">
                  <td>
                    <v-img :src="p.imagePath" style="height: 100px; width: auto"></v-img>
                  </td>
                  <td>{{ p.name }}</td>
                  <td>{{ p.price }}</td>
                  <td>{{ p.stockQuantity }}</td>
                  <td>
                    <v-text-field
                      v-model.number="p.quantity"
                      type="number"
                      style="width: 70px"
                    >
                    </v-text-field>
                  </td>
                  <td class="text-center" v-if="!isAdmin">
                    <input type="checkbox" v-model="selected[p.id]" />
                  </td>
                  <td v-if="isAdmin">
                    <v-btn color="secondary" @click="deleteProduct(p.id)"
                      >❌ 삭제하기</v-btn
                    >
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  props: ["isAdmin", "pageTitle"],
  computed: {
    ...mapGetters(["getProductsInCart"]),
  },
  data() {
    return {
      searchType: "optional",
      searchOptions: [
        { text: "✔️ 선택", value: "optional" },
        { text: "🏷️ 상품명", value: "name" },
        { text: "📋 카테고리", value: "category" },
      ],
      searchValue: "",
      productList: [],
      pageSize: 5,
      currentPage: 0,
      isLastPage: false,
      isLoading: false,
      // selected에서
      // 1:true // 1번 상품 선택 시
      // 2:false // 2번 상품 선택 x
      // 3:false // 3번 상품 선택 x
      // 4:true // 4번 상품 선택 시
      // {1:true, 2:false, 3:false 4:true }
      selected: {},
    };
  },
  created() {
    // 화면 열림과 동시에 목록이 불러와지는 created hook 함수.
    this.loadProduct();
    window.addEventListener("scroll", this.scrollPagination);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.scrollPagination);
  },
  methods: {
    deleteProduct(productId) {
      console.log(productId);
    },
    searchProducts() {
      this.productList = [];
      this.currentPage = 0;
      this.isLastPage = false;
      this.isLoading = false;
      this.loadProduct();
    },
    async loadProduct() {
      try {
        // Pageable 객체에 맞게 파라미터 형식으로 데이터를 전송해줘야 함
        // {params:{page:10, size:2}} 와 같은 형식으로 전송 시 parameter 형식으로 변환되어 서버로 전송
        // 방법2. FormData 객체 생성 하여 서버로 데이터 전송
        if (this.isLoading || this.isLastPage) return;
        this.isLoading = true;
        let params = {
          size: this.pageSize,
          page: this.currentPage,
        };
        if (this.searchType == "name") {
          params.searchName = this.searchValue;
        } else if (this.searchType == "category") {
          params.category = this.searchValue;
        }
        // /list?category=fruits&szie=5&page=0 또는 name=apple&size=5
        const response = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}/product/list`,
          { params }
        );
        const additionalData = response.data.result.content.map((p) => ({
          ...p,
          quantity: 0,
        }));
        if (additionalData.length == 0) {
          this.isLastPage = true;
          return;
        }
        this.productList = [...this.productList, ...additionalData];
        this.currentPage++;
        this.isLoading = false;
      } catch (e) {
        console.log(e);
      }
    },
    scrollPagination() {
      // "현재 화면 + 스크롤로 이동한 화면 > 전체 화면 - n" 의 조건이 성립되면 추가 데이터 로드
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      if (isBottom && !this.isLastPage && !this.isLoading) {
        this.loadProduct();
      }
    },

    addCart() {
      const orderPorducts = Object.keys(this.selected)
        .filter((key) => this.selected[key])
        .map((key) => {
          const product = this.productList.find((p) => p.id == key);
          return { id: product.id, name: product.name, quantity: product.quantity };
        });
      orderPorducts.forEach((p) => this.$store.dispatch("addCart", p));
      console.log(this.getProductsInCart);
      // window.location.reload();
    },

    async createOrder() {
      const orderPorducts = Object.keys(this.selected)
        .filter((key) => this.selected[key])
        .map((key) => {
          const product = this.productList.find((p) => p.id == key);
          return { productId: product.id, productCount: product.quantity };
        });
      if (orderPorducts.length < 1) {
        alert("주문 대상 물건이 없습니다.");
      }
      const yesOrNo = confirm(`${orderPorducts.length}개의 상품을 주문하시겠습니까?`);
      if (!yesOrNo) {
        console.log("주문이 취소되었습니다.");
        return;
      }
      try {
        await axios.post(
          `${process.env.VUE_APP_API_BASE_URL}/order/create`,
          orderPorducts
        );
        alert("주문 완료 되었습니다.");
      } catch (e) {
        console.log(e);
        alert("주문 실패 하였습니다.");
      }
    },
  },
};
</script>
