<template>
    <form @submit.prevent="onSubmit"> 
        <!-- 这里prevent了什么不是很清楚，教程上说的是阻止浏览器的默认操作 -->
    <input
      type="text"
      id="new-todo-input"
      name="new-todo"
      autocomplete="off" 
      v-model.trim.lazy="label"
      placeholder="write here and press 'enter' to add"
      class=" border-b-2 w-[15cm] text-3xl mx-10 mt-10 outline-none"
      />
    <!-- <button type="submit" class="btn btn_primarybtn__lg">Add</button> -->
  </form>    
</template>
<script>

export default {
    methods: {
        onSubmit(){
            if(this.label == ""){
                return;
            }
            this.$emit('todo-added', this.label);//这里emit要看一下用法
            this.label = "";
        },
    },
    data() {
        return {
            label: "",
        };
    },
};

</script>
