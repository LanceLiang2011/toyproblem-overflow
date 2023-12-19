const paths = {
  home () {
    return '/';
  },
  problem (slug: string) {
    return `/problem/${slug}`;
  },
  problems () {
    return '/problem';
  },
  postCreate (slug: string) {
    return `/problem/${slug}/post/create`;
  },
  post (slug: string, id: string) {
    return `/problem/${slug}/post/${id}`;
  },
};

export default paths;
