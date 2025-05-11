import axios from "axios";

// Axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // Include cookies in requests
});

// ------------------------------------
// Auth APIs
// ------------------------------------

export const register = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  return response.data;
};

export const logout = async () => {
  const response = await API.post("/auth/logout");
  return response.data;
};

export const getCurrentUser = async () => {
  try {
    const response = await API.get("/auth/me");
    return response.data;
  } catch {
    return null;
  }
};

// ------------------------------------
// Recipe APIs
// ------------------------------------

export const fetchRecipeHistory = async () => {
  try {
    const response = await API.get("/recipes");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    return [];
  }
};

export const getRecipeForEditing = async (id) => {
  const response = await API.get(`/recipes/${id}`);
  return response.data;
};

export const saveRecipe = async (recipe) => {
  const response = await API.post("/recipes", recipe);
  return response.data;
};

export const updateRecipe = async (id, recipe) => {
  const response = await API.put(`/recipes/${id}`, recipe);
  return response.data;
};

export const deleteRecipe = async (id) => {
  const response = await API.delete(`/recipes/${id}`);
  return response.data;
};

// ------------------------------------
// Recipe Editor APIs
// ------------------------------------

export const getRecipePreview = async (id) => {
  const response = await API.get(`/recipe-editor/preview/${id}`);
  return response.data;
};
