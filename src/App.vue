<template>
  <div class=" flex flex-row justify-center h-16 m-8 ">
    <img class=" w-11 h-11 m-2" src="../image/图书.png" alt="To-Do-List head image">
    <h1 class=" text-center text-4xl font-bold m-2">To-Do List</h1>
  </div>
  <div class= " bg-[#ffffff] w-100 shadow-2xl">
    <to-do-form @todo-added="addToDo"></to-do-form>

    <!-- all item -->
    <ul v-if="allFlag" aria-labelledby="list-summary" class="stack-large">
    <!-- 这里aria属性是啥 -->
    <li v-for="item in ToDoItems" :key="item.id">
      <to-do-item :label="item.label" 
                  :done="item.done" 
                  :id="item.id"
                  @checkbox-changed="updateDoneStatus(item.id)"
                  @item-deleted="deleteToDo(item.id)"
                  @item-edited="editToDo(item.id, $event)">
      </to-do-item>
    </li>
    </ul>

    <!-- active item -->
    <ul v-else-if="activeFlag" aria-labelledby="list-summary" class="stack-large">
    <li v-for="item in ToDoItems" :key="item.id">
      <to-do-item v-if="!item.done"
                  :label="item.label" 
                  :done="item.done" 
                  :id="item.id"
                  @checkbox-changed="updateDoneStatus(item.id)"
                  @item-deleted="deleteToDo(item.id)"
                  @item-edited="editToDo(item.id, $event)">
      </to-do-item>
      <div v-else></div>
    </li>
    </ul>

     <!--complete item  -->
     <ul v-else aria-labelledby="list-summary" class="stack-large">
    <li v-for="item in ToDoItems" :key="item.id">
      <to-do-item v-if="item.done"
                  :label="item.label" 
                  :done="item.done" 
                  :id="item.id"
                  @checkbox-changed="updateDoneStatus(item.id)"
                  @item-deleted="deleteToDo(item.id)"
                  @item-edited="editToDo(item.id, $event)">
      </to-do-item>
      <div v-else></div>
    </li>
    </ul>

    <div class=" flex flex-row">
      <div id="list-summary" class=" text-[2px] mx-5 mb-5 mt-3">{{listSummary}}</div>
      <div class=" w-[7cm] mx-[1cm] mb-5 content-start">
        <button class=" outline-none w-[1cm] h-[8mm] text-[2px] mb-5 mx-[3mm] focus:rounded-lg focus:border-solid focus:border-2 focus:border-gray-400" @click="clickAll">all</button>
        <button class=" outline-none w-[15mm] h-[8mm] text-[2px] mb-5 mx-[3mm] focus:rounded-lg focus:border-solid focus:border-2 focus:border-gray-400 " @click="clickActive">active</button>
        <button class=" outline-none w-[22mm] h-[8mm] text-[2px] mb-5 mx-[3mm] focus:rounded-lg focus:border-solid focus:border-2 focus:border-gray-400" @click="clickComplete">completed</button>
      </div>
      <div v-if="this.completeFlag || this.allFlag">
        <button class=" text-[2px] text-green-600 font-bold" @click="clickClear">clear</button>
      </div>
    </div>
  </div>
  <p class=" text-center text-2xl italic text-gray-600 mt-8">© Addbin.</p>
  
</template>

<script>
import ToDoItem from "./components/ToDoItem.vue";
import ToDoForm from './components/ToDoForm.vue';
import uniqueId from 'lodash.uniqueid';

export default {
  name: 'App',
  components: {
    ToDoItem, 
    ToDoForm,
  },
  data(){
    return {
      ToDoItems: [
        {  id: uniqueId("todo-"), label: "Learn HTML", done: true },
        {  id: uniqueId("todo-"), label: "Learn CSS", done: true },
        {  id: uniqueId("todo-"), label: "Learn JavaScript", done: false },
        {  id: uniqueId("todo-"), label: "Learn Vue", done: false },
      ],
      ToDoItemsAll: [
        {  id: uniqueId("todo-"), label: "Learn Vue", done: false },
        {  id: uniqueId("todo-"), label: "Create a Vue project with the CLI", done: true },
        {  id: uniqueId("todo-"), label: "Have fun", done: true },
        {  id: uniqueId("todo-"), label: "Create a to-do list", done: false },      
      ],
      allFlag:true,
      activeFlag:false,
      completeFlag:false
    }
  },
  methods: {
    addToDo(toDoLabel){
      console.log("To-do added", toDoLabel);
      this.ToDoItems.push({id:uniqueId("todo-"), label: toDoLabel, done: false});
    },
    updateDoneStatus(toDoId) {
      const toDoToUpdate = this.ToDoItems.find((item) => item.id === toDoId)
      toDoToUpdate.done = !toDoToUpdate.done
    },
    deleteToDo(toDoId) {
      const itemIndex = this.ToDoItems.findIndex((item) => item.id === toDoId);
      this.ToDoItems.splice(itemIndex, 1);
    },
    editToDo(toDoId, newLabel) {
      const toDoToEdit = this.ToDoItems.find((item) => item.id === toDoId);
      toDoToEdit.label = newLabel;
    },
    clickAll(){
      this.activeFlag = false;
      this.allFlag = true;
      this.completeFlag = false;
    },
    clickActive(){
      this.activeFlag = true;
      this.allFlag = false;
      this.completeFlag = false;
    },
    clickComplete(){
      this.activeFlag = false;
      this.allFlag = false;
      this.completeFlag = true;
    },
    clickClear(){
      for (let i = this.ToDoItems.length - 1; i >= 0; i--) {
        if (this.ToDoItems[i].done) {
          this.ToDoItems.splice(i, 1);
        }
      }
    }
  },
  computed: {
    listSummary(){
      const numberFinishedItems = this.ToDoItems.filter((item)=>item.done).length;
      return `${numberFinishedItems} out of ${this.ToDoItems.length} item(s) completed` 
    }
  }
}
</script>

<style>

  /* 全局样式 */
  .btn {
    padding: 0.8rem 1rem 0.7rem;
    border: 0.2rem solid #4d4d4d;
    cursor: pointer;
    text-transform: capitalize;
  }
  .btn__danger {
    color: #fff;
    background-color: #ca3c3c;
    border-color: #bd2130;
  }
  .btn__filter {
    border-color: lightgrey;
  }
  .btn__danger:focus {
    outline-color: #c82333;
  }
  .btn__primary {
    color: #fff;
    background-color: #000;
  }
  .btn-group {
    display: flex;
    justify-content: space-between;
  }
  .btn-group > * {
    flex: 1 1 auto;
  }
  .btn-group > * + * {
    margin-left: 0.8rem;
  }
  .label-wrapper {
    margin: 0;
    flex: 0 0 100%;
    text-align: center;
  }
  [class*="__lg"] {
    display: inline-block;
    width: 100%;
    font-size: 1.9rem;
  }
  [class*="__lg"]:not(:last-child) {
    margin-bottom: 1rem;
  }
  @media screen and (min-width: 620px) {
    [class*="__lg"] {
      font-size: 2.4rem;
    }
  }
  .visually-hidden {
    position: absolute;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px);
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: rect(1px, 1px, 1px, 1px);
    white-space: nowrap;
  }
  [class*="stack"] > * {
    margin-top: 0;
    margin-bottom: 0;
  }
  .stack-small > * + * {
    margin-top: 1.25rem;
  }
  .stack-large > * + * {
    margin-top: 2.5rem;
  }
  @media screen and (min-width: 550px) {
    .stack-small > * + * {
      margin-top: 1.4rem;
    }
    .stack-large > * + * {
      margin-top: 2.8rem;
    }
  }
  /* 全局样式结束 */
  #app {
    /* background: #fff;
    margin: 2rem 0 4rem 0;
    padding: 1rem;
    padding-top: 0;
    position: relative;
    box-shadow:
      0 2px 4px 0 rgba(0, 0, 0, 0.2),
      0 2.5rem 5rem 0 rgba(0, 0, 0, 0.1); */
  }
  @media screen and (min-width: 550px) {
    #app {
      padding: 4rem;
    }
  }
  #app > * {
    max-width: 50rem;
    margin-left: auto;
    margin-right: auto;
  }
  #app > form {
    max-width: 100%;
  }
  #app h1 {
    /* display: block;
    min-width: 100%;
    width: 100%;
    text-align: center;
    margin: 0;
    margin-bottom: 1rem; */
  }
</style>
