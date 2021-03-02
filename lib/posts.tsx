import path from "path";
import { getPostsDirectory } from "../globals.config";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";
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

  const processedContent = await remark().use(html).process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    id: id,
    content: matterResult.content,
    contentHtml: contentHtml,
    ...matterResult.data
  };
}