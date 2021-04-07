import React, {useState, useRef} from 'react'

const Blog = ({blogs, scrollToBlogRef}) => {
  const [blogPage, setBlogPage] = useState(0)
  const blogWrapperRef = useRef(null)
  const blogsToShow = blogs
    .sort((a, b) => b.page_views_count - a.page_views_count)
    .slice(blogPage * 5, (blogPage + 1) * 5)
  const blogPages = Math.ceil(blogs.length / 5)

  const changeBlogpage = page => {
    scrollToBlogRef()
    setBlogPage(page)
  }

  return (
    <div ref={blogWrapperRef}>
      {blogsToShow &&
        blogsToShow.map((blog, i) => (
          <a
            target="_blank"
            rel="noopener noreferrer"
            key={blog.id}
            href={blog.url}
            aria-label={blog.title}
          >
            <article
              className={`bg-white rounded-lg dark:bg-lightgrey dark:text-whitedarktheme p-6 mx-6 sm:mx-0 ${
                i !== blogsToShow.length - 1 ? 'mb-6' : ''
              }`}
            >
              <div className="flex justify-between">
                <h3 className="text-xl font-medium mb-3 dark:text-white pr-2">
                  {blog.title}
                </h3>
                <time className="text-right text-sm">
                  {blog.readable_publish_date}
                </time>
              </div>
              <p className="mb-3">{blog.description}</p>
              <ul className="flex flex-wrap">
                {blog.tag_list.map((tag, i) => (
                  <li
                    className={`text-sm my-1 py-1 px-4 mr-2 rounded-md ${tag}`}
                    key={i}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          </a>
        ))}
      <div className="flex items-center justify-center mt-6">
        {Array.from({length: blogPages}).map((el, i) => (
          <button
            key={i}
            onClick={() => changeBlogpage(i)}
            className={`bg-white rounded-full focus:outline-none focus:ring focus:orange ${
              i === blogPage ? 'h-4 w-4' : 'h-2 w-2'
            } ${i < blogPages - 1 ? 'mr-2' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Blog
