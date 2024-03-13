/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/auth/user/register": {
    /** Create User Account */
    post: operations["create_user_account_auth_user_register_post"];
  };
  "/auth/admin/register": {
    /** Create Admin Account */
    post: operations["create_admin_account_auth_admin_register_post"];
  };
  "/auth/user/login": {
    /** Login User Account */
    post: operations["login_user_account_auth_user_login_post"];
  };
  "/auth/admin/login": {
    /** Login Admin Account */
    post: operations["login_admin_account_auth_admin_login_post"];
  };
  "/auth/user/reset/email": {
    /** Send Reset Email */
    get: operations["send_reset_email_auth_user_reset_email_get"];
  };
  "/auth/user/reset/set": {
    /** Set New Password */
    patch: operations["set_new_password_auth_user_reset_set_patch"];
  };
  "/userdata/users/{user_id}": {
    /** Get User Info */
    get: operations["get_user_info_userdata_users__user_id__get"];
    /** Edit User Account */
    put: operations["edit_user_account_userdata_users__user_id__put"];
    /** Delete User Account */
    delete: operations["delete_user_account_userdata_users__user_id__delete"];
  };
  "/userdata/admins/{user_id}": {
    /** Get Admin User Info */
    get: operations["get_admin_user_info_userdata_admins__user_id__get"];
  };
  "/userdata/all": {
    /** Get All Users */
    get: operations["get_all_users_userdata_all_get"];
  };
  "/userdata/movies/add": {
    /** Add To Liked Movies */
    patch: operations["add_to_liked_movies_userdata_movies_add_patch"];
  };
  "/userdata/movies/remove": {
    /** Remove From Liked Movies */
    patch: operations["remove_from_liked_movies_userdata_movies_remove_patch"];
  };
  "/movies/add": {
    /** Add Movie */
    post: operations["add_movie_movies_add_post"];
  };
  "/movies/movie/{movie_id}": {
    /** Get Movie By Id */
    get: operations["get_movie_by_id_movies_movie__movie_id__get"];
    /** Delete Movie */
    delete: operations["delete_movie_movies_movie__movie_id__delete"];
  };
  "/movies/all": {
    /** Get All Movies */
    get: operations["get_all_movies_movies_all_get"];
  };
  "/recommendations/{user_id}": {
    /** Get Recommendations */
    get: operations["get_recommendations_recommendations__user_id__get"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /** AdminCreate */
    AdminCreate: {
      /** Firstname */
      firstName: string;
      /** Lastname */
      lastName: string;
      /** Email */
      email: string;
      /** Password */
      password: string;
      /** Admin Key */
      admin_key: string;
    };
    /** AdminLogin */
    AdminLogin: {
      /** Email */
      email: string;
      /** Password */
      password: string;
    };
    /** AdminRead */
    AdminRead: {
      /** Firstname */
      firstName: string;
      /** Lastname */
      lastName: string;
      /** Email */
      email: string;
      /** Id */
      id: number;
      /** Token */
      token: string;
    };
    /**
     * AgeRatings
     * @enum {string}
     */
    AgeRatings: "Any" | "U" | "PG" | "12" | "12A" | "15" | "18";
    /** HTTPValidationError */
    HTTPValidationError: {
      /** Detail */
      detail?: components["schemas"]["ValidationError"][];
    };
    /** MovieCreate */
    MovieCreate: {
      /** Id */
      id?: null;
      /** Title */
      title: string;
      /** Description */
      description: string;
      /** Poster Url */
      poster_url: string;
      /** Year */
      year: number;
      /** Rating */
      rating: number;
      /** Genre */
      genre: string;
      /** Runtime */
      runtime: number;
      age_rating: components["schemas"]["AgeRatings"];
      /** Actors */
      actors: string[];
      /** Tags */
      tags: string[];
    };
    /** MovieRead */
    MovieRead: {
      /** Id */
      id: number;
      /** Title */
      title: string;
      /** Description */
      description: string;
      /** Poster Url */
      poster_url: string;
      /** Year */
      year: number;
      /** Rating */
      rating: number;
      /** Genre */
      genre: string;
      /** Runtime */
      runtime: number;
      age_rating: components["schemas"]["AgeRatings"];
      /** Actors */
      actors: string[];
      /** Tags */
      tags: string[];
    };
    /** User */
    User: {
      /** Firstname */
      firstName: string;
      /** Lastname */
      lastName: string;
      /** Email */
      email: string;
      /** Dob */
      dob: string;
      /** Id */
      id?: number | null;
      /** Password */
      password: string;
      /** Token */
      token: string;
    };
    /** UserCreate */
    UserCreate: {
      /** Firstname */
      firstName: string;
      /** Lastname */
      lastName: string;
      /** Email */
      email: string;
      /** Dob */
      dob: string;
      /** Password */
      password: string;
    };
    /** UserLogin */
    UserLogin: {
      /** Email */
      email: string;
      /** Password */
      password: string;
    };
    /** UserRead */
    UserRead: {
      /** Firstname */
      firstName: string;
      /** Lastname */
      lastName: string;
      /** Email */
      email: string;
      /** Dob */
      dob: string;
      /** Id */
      id: number;
      /** Token */
      token: string;
    };
    /** ValidationError */
    ValidationError: {
      /** Location */
      loc: (string | number)[];
      /** Message */
      msg: string;
      /** Error Type */
      type: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  /** Create User Account */
  create_user_account_auth_user_register_post: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserCreate"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["UserRead"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Create Admin Account */
  create_admin_account_auth_admin_register_post: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["AdminCreate"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["AdminRead"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Login User Account */
  login_user_account_auth_user_login_post: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserLogin"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["UserRead"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Login Admin Account */
  login_admin_account_auth_admin_login_post: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["AdminLogin"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["AdminRead"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Send Reset Email */
  send_reset_email_auth_user_reset_email_get: {
    parameters: {
      query: {
        email: string;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": true;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Set New Password */
  set_new_password_auth_user_reset_set_patch: {
    parameters: {
      query: {
        reset_token: string;
        new_password: string;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": true;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Get User Info */
  get_user_info_userdata_users__user_id__get: {
    parameters: {
      query: {
        requester_user_id: number;
        token: string;
      };
      path: {
        user_id: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["UserRead"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Edit User Account */
  edit_user_account_userdata_users__user_id__put: {
    parameters: {
      query: {
        requester_user_id: number;
        token: string;
      };
      path: {
        user_id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["User"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": true;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Delete User Account */
  delete_user_account_userdata_users__user_id__delete: {
    parameters: {
      query: {
        requester_user_id: number;
        token: string;
      };
      path: {
        user_id: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": boolean;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Get Admin User Info */
  get_admin_user_info_userdata_admins__user_id__get: {
    parameters: {
      query: {
        token: string;
      };
      path: {
        user_id: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["AdminRead"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Get All Users */
  get_all_users_userdata_all_get: {
    parameters: {
      query: {
        requester_user_id: number;
        token: string;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["UserRead"][];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Add To Liked Movies */
  add_to_liked_movies_userdata_movies_add_patch: {
    parameters: {
      query: {
        user_id: number;
        movie_id: number;
        token: string;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": true;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Remove From Liked Movies */
  remove_from_liked_movies_userdata_movies_remove_patch: {
    parameters: {
      query: {
        user_id: number;
        movie_id: number;
        token: string;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": true;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Add Movie */
  add_movie_movies_add_post: {
    parameters: {
      query: {
        id: number;
        token: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["MovieCreate"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": true;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Get Movie By Id */
  get_movie_by_id_movies_movie__movie_id__get: {
    parameters: {
      path: {
        movie_id: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["MovieRead"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Delete Movie */
  delete_movie_movies_movie__movie_id__delete: {
    parameters: {
      query: {
        id: number;
        token: string;
      };
      path: {
        movie_id: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": true;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Get All Movies */
  get_all_movies_movies_all_get: {
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["MovieRead"][];
        };
      };
    };
  };
  /** Get Recommendations */
  get_recommendations_recommendations__user_id__get: {
    parameters: {
      query: {
        token: string;
        genre: string;
        age_rating: components["schemas"]["AgeRatings"];
        min_runtime: number;
      };
      path: {
        user_id: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["MovieRead"][];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
}
