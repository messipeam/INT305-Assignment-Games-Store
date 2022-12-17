<script setup>

import {computed, reactive, ref} from 'vue'
import db from "../firebase/init.js"
import {collection, addDoc, getDocs, Timestamp} from "firebase/firestore"

const props = defineProps({
    games: {
        type: Object,
        required: true
    }

})

const emit = defineEmits(['delete-games'])

const newGame = reactive({
    name: '',
    overview: {
        developer: '',
        genre: '',
        mode: '',
        publisher: '',
        release_date: Timestamp.fromDate(new Date)
    },
    details: [
        {
            platform: '',
            price: '',
            stock: '',
            update_stock: Timestamp.fromDate(new Date)
        }
    ]
    
    
})

let plusz = ref(0)

const addNewGames = async () => {

const gamesRef = collection(db,"games")


const dataObj = {
    name: newGame.name,
    overview: {
        developer: newGame.overview.developer.split(','),
        genre: newGame.overview.genre.split(','),
        mode: newGame.overview.mode.split(','),
        publisher: newGame.overview.publisher,
        release_date: newGame.overview.release_date
    },
    details: newGame.details
    

}





const docRef = await addDoc(gamesRef,dataObj)
console.log('Document was created with ID:', docRef.id)
}

const plusDetail = () => {
    newGame.details.push(
        {
            platform: '',
            price: '',
            stock: '',
            update_stock: Timestamp.fromDate(new Date)
        }
    )
    console.log("plus detail success")
}





</script>
 
<template>
    <div class="flex justify-around">
    <div class="m-5 ">
        <p class="text-2xl">Add Games</p>

  <label for="name">Name:</label><br>
  <div class="m-2">
  <input type="text" id="name" class="border-2 border-slate-500 rounded-xl" v-model="newGame.name" > <br>
</div>
<div>
  <label >Overview:</label><br>
<div class="m-2">
  <label >Developer:</label><br>
  <input type="text" class="border-2 border-slate-500 rounded-xl" v-model="newGame.overview.developer"> <br>

  <label >Genre:</label><br>
  <input type="text" class="border-2 border-slate-500 rounded-xl" v-model="newGame.overview.genre"> <br>

  <label >Mode</label><br>
  <input type="text" class="border-2 border-slate-500 rounded-xl" v-model="newGame.overview.mode"> <br>



  <label >Publisher</label><br>
  <input type="text" class="border-2 border-slate-500 rounded-xl" v-model="newGame.overview.publisher"> <br>

</div>
</div>

<div >
    <label>Details: </label> <br>
<div class="m-2" v-for="game in newGame.details">
    <label>Platform: </label>
    <input type="text" class="mt-2 border-2 border-slate-500 rounded-xl" v-model="game.platform"> 
  
    <label>Price: </label>

    <input type="text" class="border-2 border-slate-500 rounded-xl" v-model="game.price">
    <label>Stock: </label>
    <input type="text" class="border-2 border-slate-500 rounded-xl" v-model="game.stock"> 
   
 
</div>

<button  @click="plusDetail "
class="m-2 border-2 border-white  px-3 py-1 bg-gray-500 "
>+</button>


</div>


  <button  @click="addNewGames" 
  class="border-2  border-white px-5 py-2 bg-green-500 rounded-full"

  >Send</button>

  
</div>
<div>
<p>List games</p>
<div class="w-full max-w-md p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
     
       <div class="flow-root">
   
           <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
               <li v-for="(game,index) in games" :key="game.id" class="py-3 sm:py-4">
                   <div class="flex items-center space-x-4">
                       
                       <div class="flex-1 min-w-0">
                           <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                              {{game.name}}
                           </p>
                        
                       
                       </div>
   
                       <div>
                        <button class="bg-red-500 px-3 rounded-full" @click="emit('delete-games',index)" >Delete</button>
                       </div>
   
   
                   </div>
               </li>
             
           </ul>
      </div>
    </div>
   </div>
</div>


</template>
 
<style>

</style>