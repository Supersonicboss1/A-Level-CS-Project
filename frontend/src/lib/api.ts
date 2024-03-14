import createClient from "openapi-fetch";
import type {
	AdminCreate,
	AdminRead,
	AgeRating,
	MovieCreate,
	MovieRead,
	User,
	UserCreate,
	UserRead,
} from "./types";
import type { paths } from "./types/api";
class API {
	// The entire API kind of just assumes there are no errors ever
	public client = createClient<paths>({ baseUrl: "http://localhost:8000/" });
}

class Auth extends API {
	async registerUser(user: UserCreate): Promise<UserRead> {
		const response = await this.client.POST("/auth/user/register", {
			body: {
				email: user.email,
				password: user.password,
				firstName: user.firstName,
				lastName: user.lastName,
				dob: user.dob,
			},
		});
		if (response.data === undefined) {
			throw new Error("Failed to register user");
		}
		return response.data;
	}
	async registerAdmin(admin: AdminCreate): Promise<AdminRead> {
		const response = await this.client.POST("/auth/admin/register", {
			body: {
				email: admin.email,
				password: admin.password,
				firstName: admin.firstName,
				lastName: admin.lastName,
				admin_key: admin.admin_key,
			},
		});
		if (response.data === undefined) {
			throw new Error("Failed to register admin");
		}
		return response.data;
	}
	async loginUser(email: string, password: string): Promise<UserRead> {
		const response = await this.client.POST("/auth/user/login", {
			body: {
				email: email,
				password: password,
			},
		});
		if (response.data === undefined) {
			throw new Error("Failed to login user");
		}
		return response.data;
	}
	async loginAdmin(email: string, password: string): Promise<AdminRead> {
		const response = await this.client.POST("/auth/admin/login", {
			body: {
				email: email,
				password: password,
			},
		});
		if (response.data === undefined) {
			throw new Error("Failed to login admin");
		}
		return response.data;
	}
	async sendResetEmail(email: string): Promise<true> {
		const response = await this.client.GET("/auth/user/reset/email", {
			params: {
				query: {
					email: email,
				},
			},
		});
		if (response.data === undefined) {
			throw new Error("Failed to send email");
		}
		return response.data;
	}
	async resetPassword(resetToken: string, newPassword: string): Promise<true> {
		const response = await this.client.PATCH("/auth/user/reset/set", {
			params: {
				query: {
					reset_token: resetToken,
					new_password: newPassword,
				},
			},
		});
		if (response.data === undefined) {
			throw new Error("Failed to send email");
		}
		return response.data;
	}
}

class UserData extends API {
	async getUserData(
		userID: number,
		token: string,
		requesterID?: number,
	): Promise<UserRead> {
		const requestID: number = requesterID || userID;
		const response = await this.client.GET("/userdata/users/{user_id}", {
			params: {
				path: {
					user_id: userID,
				},
				query: {
					requester_user_id: requestID,
					token: token,
				},
			},
		});
		if (response.data === undefined) {
			throw new Error("Failed to get user data");
		}
		return response.data;
	}
	async getAdminData(token: string, userID: number): Promise<AdminRead> {
		const response = await this.client.GET("/userdata/admins/{user_id}", {
			params: {
				path: {
					user_id: userID,
				},
				query: {
					token: token,
				},
			},
		});
		if (response.data === undefined) {
			throw new Error("Failed to get admin data");
		}
		return response.data;
	}
	async getAllUsers(requesterID: number, token: string): Promise<UserRead[]> {
		const response = await this.client.GET("/userdata/all", {
			params: {
				query: {
					requester_user_id: requesterID,
					token: token,
				},
			},
		});
		if (response.data === undefined) {
			throw new Error("Failed to get all users");
		}
		return response.data;
	}
	async deleteUser(
		userID: number,
		requesterID: number,
		token: string,
	): Promise<boolean> {
		const response = await this.client.DELETE("/userdata/users/{user_id}", {
			params: {
				path: {
					user_id: userID,
				},
				query: {
					requester_user_id: requesterID,
					token: token,
				},
			},
		});
		return Boolean(response.data);
	}
	async editUser(
		userInfo: User,
		requesterID: number,
		token: string,
	): Promise<boolean> {
		if (!userInfo.id) {
			throw new Error("User ID is required");
		}
		const response = await this.client.PUT("/userdata/users/{user_id}", {
			params: {
				path: {
					user_id: userInfo.id,
				},
				query: {
					requester_user_id: requesterID,
					token: token,
				},
			},
			body: userInfo,
		});
		return Boolean(response.data);
	}
	async addToLikedMovies(
		userID: number,
		movieID: number,
		token: string,
	): Promise<boolean> {
		const response = await this.client.PATCH("/userdata/movies/add", {
			params: {
				query: {
					token: token,
					user_id: userID,
					movie_id: movieID,
				},
			},
		});
		return Boolean(response.data);
	}
	async removeFromLikedMovies(
		userID: number,
		movieID: number,
		token: string,
	): Promise<boolean> {
		const response = await this.client.PATCH("/userdata/movies/remove", {
			params: {
				query: {
					token: token,
					user_id: userID,
					movie_id: movieID,
				},
			},
		});
		return Boolean(response.data);
	}
	async getLikedMovies(userID: number, token: string): Promise<MovieRead[]> {
		const response = await this.client.GET("/userdata/movies/liked/{user_id}", {
			params: {
				path: {
					user_id: userID,
				},
				query: {
					token: token,
				},
			},
		});
		if (response.data === undefined) {
			throw new Error("Failed to get liked movies");
		}
		return response.data;
	}
}
class Movies extends API {
	async addMovie(
		movieData: MovieCreate,
		id: number,
		token: string,
	): Promise<boolean> {
		const response = await this.client.POST("/movies/add", {
			params: {
				query: {
					token: token,
					id: id,
				},
			},
			body: movieData,
		});
		return Boolean(response.data);
	}
	async getMovie(movieId: number): Promise<MovieRead> {
		const response = await this.client.GET("/movies/movie/{movie_id}", {
			params: {
				path: {
					movie_id: movieId,
				},
			},
		});
		if (response.data === undefined) {
			throw new Error("Failed to get movie");
		}
		return response.data;
	}
	async getMovies(): Promise<MovieRead[]> {
		const response = await this.client.GET("/movies/all");
		if (response.data === undefined) {
			throw new Error("Failed to get movies");
		}
		return response.data;
	}
	async deleteMovie(
		movieId: number,
		token: string,
		id: number,
	): Promise<boolean> {
		const response = await this.client.DELETE("/movies/movie/{movie_id}", {
			params: {
				path: {
					movie_id: movieId,
				},
				query: {
					token: token,
					id: id,
				},
			},
		});
		return Boolean(response.data);
	}
}
class Recommendations extends API {
	async getRecommendations(
		userID: number,
		token: string,
		genre: string,
		ageRating: AgeRating,
		minRuntime: number,
	): Promise<MovieRead[]> {
		const response = await this.client.GET("/recommendations/{user_id}", {
			params: {
				query: {
					token: token,
					genre: genre,
					age_rating: ageRating,
					min_runtime: minRuntime,
				},
				path: {
					user_id: userID,
				},
			},
		});
		if (response.data === undefined) {
			throw new Error("Failed to get recommendations");
		}
		return response.data;
	}
}
const api = {
	auth: new Auth(),
	userdata: new UserData(),
	movies: new Movies(),
	recommendations: new Recommendations(),
};
export default api;
