import remark from 'remark';
import strip from 'strip-markdown';
import { BlogPostModel } from '../models/BlogPost';
import { BlogPreviewModel } from '../models/BlogPreview';

const post2Props = (post: BlogPostModel): BlogPreviewModel => {
  const postDate = new Date(post.created_at).toLocaleDateString('en-GB');
  const description = remark().use(strip).processSync(post.content).toString();
  return {
    post: {
      date: postDate,
      description: description.substring(0, 100),
      image: post.coverPhoto?.formats.small?.url,
      imageText: post.coverPhoto?.alternativeText,
      title: post.title,
      link: post.slug,
    },
  };
};

export default post2Props;
