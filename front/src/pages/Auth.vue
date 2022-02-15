<template>
  <q-page class="flex flex-center">
    <div>
    <div><h5>Введите графический ключ</h5></div>
      <div>
      <q-card class="flex flex-center">
        <q-card-section>
        <div v-for="i in 4" :key="i" class="flex">
          <div v-for="j in 4" :key="j" class="q-pa-md q-gutter-md">
            <q-btn size="md" :style="{'background':colors[(i-1)*4+j-1]}" @click="sendBtn(colors[(i-1)*4+j-1])"></q-btn>
          </div>
        </div>
        </q-card-section>
      </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import { useStore } from 'vuex'
import api from "../api/api"

export default defineComponent({
  name: 'PageIndex',
  setup(){
    const $store = useStore()
    let colors = ['maroon',
    'red',
    'purple',
    'fuchsia',
    'green',
    'olive',
    'yellow',
    'navy',
    'blue',
    'teal',
    'aqua',
    'white',
    'black',
    'gray',
    'orange',
    'aquamarine']	
    let intervalCtx = 0
    const auth = computed({
      get: () => $store.state.mes.auth,
      set: val => {
        $store.commit('mes/updateAuth', val)
      }
      }) 
    
    return {
      auth, colors, intervalCtx
      //  <q-btn :style="{'background': colors}"/>
    }
  },
  methods:{
  async getColor(id){
      try{
        const color =  await api.getColor(id)  
        console.log(color)
        return color 
      }catch (e) 
      {
        console.log(e)
      }
    },
  async sendBtn(id){
      try{
        let result =  await api.sendColor(id)  
        console.log(result.length)
        console.log(result)
        if (result.length==8){
          this.auth=1
          // console.log("Ёжики пришли")
          // alert("Ёжики пришли")
          this.$router.push('/')
        }
      }catch (e) 
      {
        console.log(e)
      }
    },
  },
async  mounted() {
      // this.colors.length = 0;
      for (var i = 0; i < 16; i++) { 
      var color = await api.getColor(i)
      console.log(color)
      this.colors.push(color)
      }
      // this.$forceUpdate()

  }
})
</script>
