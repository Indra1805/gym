import api from "../api";

export const fetchUsers = async () => {
  const res = await api.get("api/admin/users/");
  return res.data;
};

export const fetchWorkouts = async () => {
  const res = await api.get("api/workouts/");
  return res.data;
};

export const assignWorkouts = async (userId, workoutIds) => {
  return await api.post("api/admin/assign-workouts/", { user_id: userId, workout_ids: workoutIds });
};
