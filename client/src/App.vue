<template>
  <h1 class="test">{{ queryObj.name }}</h1>
  <img :src="img" alt="">
</template>

<script>
import { reactive } from "vue";
import img from '@assets/test.jpg'
export default {
  name: "App",
  setup() {
    const queryObj = reactive({
      name: "test范德萨发", //模板名称
    });

    return {
      img,
      queryObj,
    };
  },
};
</script>
