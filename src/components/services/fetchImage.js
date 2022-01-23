const KEY = '24260489-c6ae81bdca94ae3f2fdf467ab';

export default function fetchImage(query, page) {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`There is no data for this query ${query}`),
    );
  });
}
