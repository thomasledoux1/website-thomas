import React from 'react'
import {faEye} from '@fortawesome/free-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const Blog = ({blogs}) => {
  const blogsToShow = blogs
    .sort((a, b) => b.page_views_count - a.page_views_count)
    .slice(0, 5)

  return (
    <>
      {blogsToShow &&
        blogsToShow.map((blog, i) => (
          <a
            target="_blank"
            rel="noopener noreferrer"
            key={blog.id}
            href={blog.url}
            aria-label={blog.title}
            className="transform transition-transform hover:scale-[1.02]"
          >
            <article
              className={`bg-white relative rounded-lg dark:bg-lightgrey text-text p-6 mx-6 sm:mx-0 ${
                i !== blogsToShow.length - 1 ? 'mb-6' : ''
              }`}
            >
              <>
                <div className="flex justify-between">
                  <div className="flex justify-between mb-3 items-start w-full">
                    <h3 className="text-xl font-medium dark:text-white pr-4">
                      {blog.title}
                    </h3>
                    <div className="flex flex-col md:flex-row items-center">
                      <FontAwesomeIcon className="md:mr-2" icon={faEye} />
                      <span>{blog.page_views_count}</span>
                    </div>
                  </div>
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
              </>
            </article>
          </a>
        ))}
      <a
        href="https://dev.to/thomasledoux1"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 px-4 py-2 text-primary rounded-md border-2 border-primary"
      >
        Read more blogs
      </a>
    </>
  )
}

export default Blog
