<script lang="ts">
	const movieURLs: string[] = [
		'https://s3.amazonaws.com/static.rogerebert.com/uploads/movie/movie_poster/omar-2013/large_4DimIhSAnEbJxbzs6byZqLnU1mI.jpg',
		'https://m.media-amazon.com/images/M/MV5BMjAxNzU4ODM3Nl5BMl5BanBnXkFtZTgwNTIwMTEyMDE@._V1_.jpg',
		'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg',
		'https://m.media-amazon.com/images/I/617U1Qz4GLL._AC_UF894,1000_QL80_.jpg',
		'https://m.media-amazon.com/images/M/MV5BOTZmMmY2MzctMjU2Yy00YjJlLTk1NjAtY2U4MmMxOWZkZWY4XkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_.jpg',
		'https://lumiere-a.akamaihd.net/v1/images/image_2c6cb554.jpeg',
		'https://s3.amazonaws.com/static.rogerebert.com/uploads/movie/movie_poster/omar-2013/large_4DimIhSAnEbJxbzs6byZqLnU1mI.jpg',
		'https://m.media-amazon.com/images/M/MV5BMjAxNzU4ODM3Nl5BMl5BanBnXkFtZTgwNTIwMTEyMDE@._V1_.jpg',
		'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg',
		'https://m.media-amazon.com/images/I/617U1Qz4GLL._AC_UF894,1000_QL80_.jpg',
		'https://m.media-amazon.com/images/M/MV5BOTZmMmY2MzctMjU2Yy00YjJlLTk1NjAtY2U4MmMxOWZkZWY4XkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_.jpg',
		'https://lumiere-a.akamaihd.net/v1/images/image_2c6cb554.jpeg'
	];
	let activeImage = Math.round(Math.random() * movieURLs.length);
	let isImageB = false;
</script>

<div class="flex flex-none">
	<div
		class="flex flex-none justify-center items-center min-h-[50px] gap-4 my-10 transition-all duration-500 scroll translate-x-96"
	>
		{#each movieURLs as movieURL}
			<div
				class="flex-none w-[300px] opacity-30 h-[450px] bg-cover bg-center bg-no-repeat rounded-xl hover:opacity-100 transition-all duration-150 hover:shadow-2xl hover:shadow-neutral-200"
				style={`background-image: url(${movieURL});`}
			></div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.scroll {
		overflow-x: scroll;
		white-space: nowrap;
		scroll-behavior: smooth;
		scroll-snap-type: x mandatory;
		scroll-padding: 0 1rem;
		-webkit-overflow-scrolling: touch;
		animation: scrollAnimation 300s linear infinite;
		animation-fill-mode: forwards;
		animation-delay: -2s;
	}

	@keyframes scrollAnimation {
		0% {
			transform: translateX(30%);
		}

		100% {
			transform: translateX(-100%);
		}
	}
</style>
