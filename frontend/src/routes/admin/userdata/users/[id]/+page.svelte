<script lang="ts">
	import type { User } from '$lib/stores';
	import type { PageData } from './$types';

	export let data: PageData;
	if (!data.user) throw new Error('No data');
	const user: User = data.user;
</script>



<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
	<div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="name">
				Name
			</label>
			<p class="text-gray-600 text-base">{user.firstName} {user.lastName}</p>
		</div>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="email">
				Email Address
			</label>
			<p class="text-gray-600 text-base">{user.email}</p>
		</div>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="address">
				Date of Birth
			</label>
			<p class="text-gray-600 text-base">{new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' }).format(new Date(user.dob))}</p>
		</div>
	</div>
</div>