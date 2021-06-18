import axios from "axios";

const apiKey = "21047738-7361f21c2cc8047304301260e";
axios.defaults.baseURL = "https://pixabay.com/api";

const fetchImages = ({ searchQuery = "", currentPage = 1, per_page = 12 }) => {
  return axios
    .get(
      `/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&per_page=${per_page}&page=${currentPage}`
    )
    .then((response) => response.data.hits);
};

export default { fetchImages };
