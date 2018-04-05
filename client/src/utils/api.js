import axios from "axios";

export default {
  // Gets all articles
  getarticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the article with the given id
  getsavedarticle: function() {
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