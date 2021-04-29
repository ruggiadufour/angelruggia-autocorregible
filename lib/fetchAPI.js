import axios from 'axios'
export async function fetching(url) {
  let data = null,
    error = null;
  try {
    let res = await axios.get(url);
    return { data: res.data, error: error };
  } catch (error) {
    return { data: data, error: error };
  }
}
