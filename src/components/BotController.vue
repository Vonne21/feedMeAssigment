<script setup>
const props = defineProps({
	bots: Array
});
</script>

<template>
	<div class="mb-4 text-center">
		<div class="">
			<h3 class="font-semibold mb-2 text-lg">Chef On Duty: {{ bots.length }} </h3>
			<div v-if="bots.length > 0" class="">
				<ul class="flex justify-center ">
					<li v-for="bot in bots" :key="bot.id" class="mr-2 rounded-full border-2 py-1 px-2 font-semibold"
						:class="[
							bot.status === 'idle' ? 'border-[#006241] text-[#006241] font-bold' : 'border-[#DA291C] text-[#DA291C]'
						]">
						• Chef {{ bot.id }}: {{ bot.status === 'idle' ? '🟢 Idle' : '🔴 Busy' }}
					</li>
				</ul>
			</div>
			<p v-else>- No Chef on duty -</p>
		</div>
		<div class="flex self-start justify-center mt-4 mb-5">
			<button @click="$emit('add-bot')" class="mr-2 bg-[#006241] text-[#FFC72C] p-2 rounded font-semibold">
				+ Chef
			</button>
			<button @click="$emit('remove-bot')" class=" bg-[#DA291C] text-[#FFC72C] p-2 rounded font-semibold">
				- Chef
			</button>
		</div>

	</div>

</template>
