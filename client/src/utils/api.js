import axios from "axios";

export default {
  // Gets articles from NYT
  getarticles: function() {
    return axios.get("/api/articles");
  },
  // Gets all articles on the database
  getsavedarticles: function() {
    return axios.get("/api/articles/");
  },
  // Deletes the article with the given id
  deletearticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a article to the database
  savearticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};