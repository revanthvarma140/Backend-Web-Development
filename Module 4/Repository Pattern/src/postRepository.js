const postStore = require('../data/postStore');

const postRepository = {
  findAll() {
    return postStore.posts.map(post => ({ ...post }));
  },

  findById(id) {
    const post = postStore.posts.find(
      post => post.id === Number(id)
    );

    return post ? { ...post } : null;
  },

  create(fields) {
    const post = {
      id: postStore.nextId(),
      ...fields,
    };

    postStore.posts.push(post);

    return { ...post };
  },

  update(id, patch) {
    const post = postStore.posts.find(
      post => post.id === Number(id)
    );

    if (!post) return null;

    Object.assign(post, patch);

    return { ...post };
  },

  remove(id) {
    const index = postStore.posts.findIndex(
      post => post.id === Number(id)
    );

    if (index === -1) return false;

    postStore.posts.splice(index, 1);

    return true;
  },
};

module.exports = postRepository;
