import axios from 'axios';

//we are connecting all the apis to the backend

export const getAll = async () => { 
  const { data } = await axios.get('/api/foods'); //creating a get request using get api 
  return data; //returning the data we got from this
};

export const search = async searchTerm => {
  const { data } = await axios.get('/api/foods/search/' + searchTerm);
  return data;
};

export const getAllTags = async () => {
  const { data } = await axios.get('/api/foods/tags');
  return data;
};

export const getAllByTag = async tag => {
  if (tag === 'All') return getAll();
  const { data } = await axios.get('/api/foods/tag/' + tag);
  return data;
};

export const getById = async foodId => {
  const { data } = await axios.get('/api/foods/' + foodId);
  return data;
};

export async function deleteById(foodId) {
  await axios.delete('/api/foods/' + foodId);
}

export async function update(food) {
  await axios.put('/api/foods', food);
}

export async function add(food) {
  const { data } = await axios.post('/api/foods', food);
  return data;
}
