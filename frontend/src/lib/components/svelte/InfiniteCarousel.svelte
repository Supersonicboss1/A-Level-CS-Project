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
		'https://lumiere-a.akamaihd.net/v1/images/image_2c6cb554.jpeg',
		'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/xAKI0O5hUXxbmHRBNg72IzFQ06a.jpg',
		'https://images.justwatch.com/poster/12099128/s276/cannahuana-the-moweed.webp'
	];
</script>

<div class="flex flex-none overflow-x-hidden">
	<div
		class="flex flex-none pb-24 pt-8 justify-center items-center min-h-[50px] gap-4 my-10 transition-all duration-500 scroll translate-x-96 overflow-x-hidden"
	>
		{#each movieURLs as movieURL}
			<img
				alt="movie poster"
				class="flex-none w-[300px] hover:scale-105 hover:translate-y-1 opacity-30 h-[450px] bg-cover bg-center bg-no-repeat rounded-lg hover:opacity-100 transition-all duration-150 hover:shadow-xl hover:shadow-neutral-200 translate-x-4"
				src={movieURL}
			/>
		{/each}
	</div>
	<div
		class="flex flex-none justify-center pb-24 pt-8 items-center min-h-[50px] gap-4 my-10 transition-all duration-500 scroll translate-x-96 overflow-x-hidden"
	>
		{#each movieURLs as movieURL}
			<img
				alt="movie poster"
				class="flex-none w-[300px] opacity-30 h-[450px] bg-cover bg-center bg-no-repeat rounded-lg hover:opacity-100 transition-all duration-150 hover:shadow-xl hover:shadow-neutral-200 translate-x-4"
				src={movieURL}
			/>
		{/each}
	</div>
</div>

<style lang="postcss">
	.scroll {
		white-space: nowrap;
		scroll-behavior: smooth;
		scroll-snap-type: x mandatory;
		scroll-padding: 0 1rem;
		-webkit-overflow-scrolling: touch;
		animation: scrollAnimation 150s linear infinite;
		animation-fill-mode: forwards;
	}

	@keyframes scrollAnimation {
		0% {
			transform: translateX(30%);
		}

		100% {
			transform: translateX(-70%);
		}
	}
</style>
