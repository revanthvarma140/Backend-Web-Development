// src/repositories/postRepository.js

// Repository Pattern:
// Storage is handled only inside this repository.
// If we replace this implementation with Prisma later,
// the service, controller, and API contract will remain unchanged.

const posts = new Map([
  [
    1,
    {
      id: 1,
      title: 'First post',
      body: 'Repository boundaries protect change.',
      authorId: 7,
    },
  ],
  [
    2,
    {
      id: 2,
      title: 'Second post',
      body: 'Services should speak in domain language.',
      authorId: 8,
    },
  ],
]);

let nextId = 3;

const postRepository = {
  // Return all posts as a new array
  findAll() {
    return Array.from(posts.values(), (post) => ({ ...post }));
  },

  // Find a post by ID
  findById(id) {
    const post = posts.get(Number(id));
    return post ? { ...post } : null;
  },

  // Create a new post
  create(fields) {
    const post = {
      ...fields,
      id: nextId++,
    };

    posts.set(post.id, post);

    return { ...post };
  },

  // Update an existing post
  update(id, patch) {
    const postId = Number(id);
    const post = posts.get(postId);

    if (!post) {
      return null;
    }

    const updatedPost = {
      ...post,
      ...patch,
      id: postId,
    };

    posts.set(postId, updatedPost);

    return { ...updatedPost };
  },

  // Remove a post
  remove(id) {
    return posts.delete(Number(id));
  },
};

module.exports = postRepository;
