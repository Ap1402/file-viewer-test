import axios from "axios";

export async function fetchFiles(name) {
  const params = {};
  if (name) {
    params["fileName"] = name;
  }

  const { data } = await axios.get("http://localhost:3005/api/files/data", {
    params
  });
  return data;
}
