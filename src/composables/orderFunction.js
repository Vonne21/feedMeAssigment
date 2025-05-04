import { ref, reactive, computed } from 'vue';

const mealNames = [
	"Big Mac", "McChicken", "Filet-O-Fish", "McNuggets",
	"Double Cheeseburger", "Quarter Pounder", "Spicy McDelux",
	"Strawberry Sundae", "Sausage McMuffin", "Apple Pie",
	"McFlurry", "Happy Meal"
];

export function orderFunction() {
	let bots = ref([]);
	const state = reactive({
		orders: [],
	});
	let orderIdCounter = 1;
	
	const pendingOrders = computed(() => state.orders.filter(o => o.status === 'pending'));
	const processingOrders = computed(() => state.orders.filter(o => o.status === 'processing'));
	const completeOrders = computed(() => state.orders.filter(o => o.status === 'complete'));

	function getRandomMeal() {
		const index = Math.floor(Math.random() * mealNames.length);
		return mealNames[index];
	}
	
	function addOrder(type) {
		let newOrder = {
			id: orderIdCounter++,
			type,
			status: 'pending',
			meal: getRandomMeal(),
			timer: 10,
			timestamp: new Date().toLocaleString(),
		};

		if (type === 'VIP') {
			const index = state.orders.findLastIndex(o => o.type === 'VIP');
			state.orders.splice(index + 1, 0, newOrder);
		} else {
			state.orders.push(newOrder);
		}

		bots.value.forEach(bot => {
			const isIdle = bot.status === 'idle';
			const isNotProcessing = !state.orders.some(o => o.botId === bot.id);
			if (isIdle && isNotProcessing) {
				processNext(bot);
			}
		});
	}

	function cancelOrder(orderId) {
		const index = state.orders.findIndex(o => o.id === orderId && o.status === 'pending');
		if (index !== -1) {
			state.orders.splice(index, 1);
		}
	}

	function addBot() {
		const botId = bots.value.length + 1;
		const bot = reactive({ id: botId, status: 'idle', intervalId: null });
		bots.value.push(bot);
		processNext(bot);
	}

	function removeBot() {
			const bot = bots.value.pop();
	if (!bot) return;

	clearInterval(bot.intervalId);

	const order = state.orders.find(o => o.botId === bot.id && o.status === 'processing');
	if (order) {
		order.status = 'pending';
		delete order.botId;
		delete order.timer;
	}
	}

	function processNext(bot) {
		if (bot.intervalId) return; 

		bot.intervalId = setInterval(() => {
			
			let currentOrder = state.orders.find(o => o.botId === bot.id && o.status === 'processing');

			if (!currentOrder) {
				
				const nextOrder = state.orders.find(o => o.status === 'pending');
				if (!nextOrder) {
					bot.status = 'idle';
					clearInterval(bot.intervalId);
					bot.intervalId = null;
					return;
				}

				nextOrder.status = 'processing';
				nextOrder.botId = bot.id;
				nextOrder.timer = 10;
				bot.status = 'busy';
				currentOrder = nextOrder;
			}

			// Process countdown
			if (currentOrder.timer > 0) {
				currentOrder.timer--;
			}

			if (currentOrder.timer === 0) {
				currentOrder.status = 'complete';
				delete currentOrder.botId;
				delete currentOrder.timer;
				bot.status = 'idle';
			}
		}, 1000);
	}

	return {
		state,
		bots,
		addOrder,
		cancelOrder,
		addBot,
		removeBot,
		pendingOrders,
		processingOrders,
		completeOrders
	};
}
