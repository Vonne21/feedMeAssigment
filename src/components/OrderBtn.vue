<template>
	
	<p class="mb-1 mt-12 text-center text-lg font-semibold">Order Type</p>
	<div class="mb-12 flex justify-center">
		<button @click="$emit('add-order', 'Normal')"
			class="mr-6 bg-[#FFC72C] text-[#DA291C] p-3 rounded font-semibold cursor-pointer hover:bg-[#f8b600]">New
			Normal
			Order</button>
		<button @click="$emit('add-order', 'VIP')"
			class="bg-[#FFC72C] text-[#DA291C] p-3 rounded font-semibold cursor-pointer hover:bg-[#f8b600]">New
			<strong>VIP</strong>
			Order</button>
	</div>
</template>