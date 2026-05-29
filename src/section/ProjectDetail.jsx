import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import { getProjectBySlug, projects } from "../data/projects";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = useMemo(() => getProjectBySlug(slug), [slug]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const activeImage = project.images[activeImageIndex];

  return (
    <section
      className="min-h-screen px-4 py-24 text-white sm:px-6 lg:px-10"
      style={{ backgroundColor: project.accent }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-white/70">
              Project Detail
            </p>
            <h1 className="mt-3 text-4xl font-semibold sm:text-5xl lg:text-7xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base text-white/80 sm:text-lg">
              {project.role}
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            Back to Home
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-4xl border border-white/10 bg-black/20 p-4 shadow-2xl sm:p-5">
            <button
              type="button"
              onClick={() => setActiveImageIndex(0)}
              className="group relative block w-full overflow-hidden rounded-[1.75rem]"
            >
              <img
                src={activeImage}
                alt={project.title}
                className="h-[50vh] w-full object-cover transition duration-500 group-hover:scale-[1.02] sm:h-[62vh]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
            </button>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {project.images.map((image, index) => {
                const isActive = index === activeImageIndex;

                return (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative overflow-hidden rounded-2xl border transition duration-300 ${
                      isActive
                        ? "border-white shadow-[0_0_0_2px_rgba(255,255,255,0.35)]"
                        : "border-white/10 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${project.title} image ${index + 1}`}
                      className={`w-full object-cover transition duration-300 ${
                        index === 0 ? "h-32 sm:h-40" : "h-28 sm:h-32"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-5 rounded-4xl border border-white/10 bg-white/10 p-5 backdrop-blur-md sm:p-6">
            <div>
              <h2 className="text-2xl font-semibold">Description</h2>
              <p className="mt-3 text-sm leading-7 text-white/80">
                {project.description}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">How it works</h3>
              <p className="mt-3 text-sm leading-7 text-white/80">
                {project.details}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Challenge</h3>
              <p className="mt-3 text-sm leading-7 text-white/80">
                {project.challenge}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Solution</h3>
              <p className="mt-3 text-sm leading-7 text-white/80">
                {project.solution}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Tech Stack</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 bg-black/15 px-3 py-1 text-xs font-medium text-white/85"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                More projects
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {projects.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/project/${item.slug}`}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      item.slug === project.slug
                        ? "bg-white text-black"
                        : "bg-black/20 text-white/85 hover:bg-black/30"
                    }`}
                  >
                    {item.shortTitle}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;