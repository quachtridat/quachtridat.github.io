import path from "path";
import { getPostsDirectory } from "../globals.config";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeFormat from "rehype-format";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import fs from "fs";

export interface GetPostData {
  id: string;
  content: string;
  contentHtml: string;
  [key: string]: any;
}

export const getPostData = async (id: string, postsDir?: string) => {
  if (!postsDir) postsDir = getPostsDirectory();

  const fullPath = path.join(postsDir, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, 'utf-8');

  const matterResult = matter(fileContent);

  const processedContent =
    await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    id: id,
    content: matterResult.content,
    contentHtml: contentHtml,
    ...matterResult.data
  };
}