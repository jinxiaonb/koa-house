<template>
  <div>Home</div>
  <h1>{{ userObj.userName }}</h1>
  <h3>{{ obj.msg }}</h3>
  <h5>{{ msg }}</h5>
  <button class="home-btn" @click="updateStore">更改store</button>
</template>
<script setup>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";

import { httpGet } from "@api/http.js";
const store = useStore();
const userObj = computed(() => store.state.user.userInfo);

let obj = reactive({ msg: "fd" });
let msg = ref("fsdf");

async function updateStore() {
  store.dispatch("user/getUserInfo");

  const res = await httpGet({}, "/test");
  console.log(res);
  obj.msg = res.msg;
  msg.value = res.msg;
}
</script>
