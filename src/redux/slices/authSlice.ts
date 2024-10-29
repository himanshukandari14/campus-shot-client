  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-nocheck
  import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
  import axios from "axios";


  // Use import.meta.env for Vite
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
    userData: null, // Store fetched user data here
    posts: [],
  };

  // Thunks for async actions like login/signup
  export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ username, password }, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/login`, {
          username,
          password,
        });
        return response.data; // expected to return { user, token }
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const signupUser = createAsyncThunk(
    "auth/signup",
    async ({ email, password, name, username }, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/sign-up`, {
          email,
          password,
          name,
          username,
        });
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const verifyRegistrationOTP= createAsyncThunk(
    "auth/verify-otp",
    async({email,otp}, { rejectWithValue })=>{
      try {
        const response = await axios.post(`${API_BASE_URL}/verify-otp`,{
          email,
          otp
          
        });
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  )

  export const fetchUserData= createAsyncThunk(
    "auth/fetchUserData",
    async(token,{rejectWithValue})=>{
      try {
        const response = await axios.get(`${API_BASE_URL}/fetchLoggedInUser`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token in the headers
          },
        });
        return response.data; // Return user data
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  )

  export const fetchAllPost= createAsyncThunk(
    "auth/fetchAllPost",
    async(token,{rejectWithValue})=>{
      try {
        const response = await axios.get(`${API_BASE_URL}/allposts`,{
          headers: {
            Authorization: `Bearer ${token}`, // Add the token in the headers
            },
        });
        return response.data; // Return user data
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }

  )

  export const likePost = createAsyncThunk(
    "auth/likePost",
    async ({ postId, token }, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/user/post/like/${postId}`,
          {}, // Add an empty object as data
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );


  // create post
  export const createPost = createAsyncThunk(
    "auth/createPost",
    async ({ title, media, token }, { rejectWithValue }) => {
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("media", media);

        const response = await axios.post(
          `${API_BASE_URL}/createPost`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data || "Failed to create post");
      }
    }
  );





  export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      logout: (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          localStorage.setItem("user", JSON.stringify(action.payload.user));
          localStorage.setItem("token", action.payload.token);
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(signupUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(signupUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          localStorage.setItem("user", JSON.stringify(action.payload.user));
          localStorage.setItem("token", action.payload.token);
        })
        .addCase(signupUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(fetchUserData.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchUserData.fulfilled, (state, action) => {
          state.loading = false;
          state.userData = action.payload; // Store user data in state
        })

        .addCase(fetchUserData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        .addCase(fetchAllPost.pending, (state, action) => {
          state.loading = true;
          state.error = action.payload;
        })

        .addCase(fetchAllPost.fulfilled, (state, action) => {
          state.loading = false;
          state.posts = action.payload;
        })

        .addCase(fetchAllPost.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        .addCase(likePost.pending, (state, action) => {
          state.loading = true;
          state.error = action.payload;
        })

        .addCase(likePost.fulfilled, (state, action) => {
          state.loading = false;
          state.posts = action.payload;
        })

        .addCase(likePost.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        // Upload Post
        .addCase(createPost.pending, (state) => {
          state.loading = true;
        })
        .addCase(createPost.fulfilled, (state, action) => {
          state.loading = false;
          state.posts = action.payload;
        })
        .addCase(createPost.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });

  export const { logout } = authSlice.actions;

  export default authSlice.reducer;
