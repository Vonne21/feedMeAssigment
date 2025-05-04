<script setup>
import OrderBtn from './components/OrderBtn.vue';
import BotController from './components/BotController.vue';
import OrderList from './components/OrderList.vue';
import { orderFunction } from './composables/orderFunction.js';

const {
  state,
  bots,
  addOrder,
  cancelOrder,
  addBot,
  removeBot,
  pendingOrders,
  processingOrders,
  completeOrders
} = orderFunction();

</script>

<template>
  <div class="flex mb-4 justify-center bg-[#FFC72C] py-3">
    <img src="/logo.svg" alt="Balabababa I loving it!" class="self-center rounded-lg">
    <h1 class="text-2xl font-bold ml-3 ">McDonald's Order Controller</h1>
  </div>
  <div class="p-4">
    
    <BotController :bots="bots" @add-bot="addBot" @remove-bot="removeBot" />
    
    <OrderBtn @add-order="addOrder" />
    <OrderList :pending="pendingOrders" :processing="processingOrders" :complete="completeOrders"
      @cancel-order="cancelOrder" />
  </div>
</template>

<style scoped>
</style>
