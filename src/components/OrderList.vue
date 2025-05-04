<template>
	<div class="grid grid-cols-3 gap-4">
		<!-- Pending Orders -->
		<div class="border border-[#FFC72C] rounded-md shadow-xl/20 p-5">
			<h2 class="font-semibold mb-2 pb-2 border-b border-[#DA291C] ">📦 Pending Orders ({{ pending.length }})
			</h2>
			<p v-if="pending.length < 1">No order Yet French Fries!</p>
			<ul v-else>
				<li v-for="order in pending" :key="order.id">
					#{{ order.id }} - {{ order.type }} - 🍔{{ order.meal }}
					<button @click="$emit('cancel-order', order.id)" class="ml-2 text-[#DA291C] hover:font-extrabold">
						×
					</button>
				</li>
			</ul>
		</div>

		<!-- Processing Orders -->
		<div class="border border-[#FFC72C] rounded-md shadow-xl/20 p-5">
			<h2 class="font-semibold mb-2 pb-2 border-b border-[#DA291C] ">🔥 Processing Orders ({{ processing.length
				}})</h2>
			<p v-if="processing.length < 1">Chef is drinking tea!</p>
			<ul v-else>
				<li v-for="order in processing" :key="order.id">
					#{{ order.id }} - {{ order.type }} - 🍔{{ order.meal }} - ⏱️ {{ order.timer }}s left
				</li>
			</ul>
		</div>

		<!-- Completed Orders -->
		<div class="border border-[#FFC72C] rounded-md shadow-xl/20 p-5">
			<h2 class="font-semibold mb-2 pb-2 border-b border-[#DA291C]  ">✅ Completed Orders</h2>
			<p v-if="complete.length < 1">No order Yet French Fries!</p>
			<ul v-else>
				<li v-for="order in complete" :key="order.id">
					#{{ order.id }} - {{ order.type }} - 🍔{{ order.meal }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	pending: Array,
	processing: Array,
	complete: Array
});
</script>
