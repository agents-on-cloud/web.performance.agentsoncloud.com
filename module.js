// Nuxt exposes its default route builder logic here
import { createRoutes, relativeTo } from "@nuxt/utils";
import path from "path";
import serveStatic from "serve-static";

// with a lot of pages it might be worth considering a folder pass
// to dynamically create this list
const pages = [
  "pages/performance.vue",
];

export default function NuxtModule() {
  const { routeNameSplitter, trailingSlash } = this.options.router;
  this.extendRoutes((routes) => {
    routes.push(
      ...createRoutes({
        files: pages,
        srcDir: __dirname,
        pagesDir: "pages",
        routeNameSplitter,
        trailingSlash,
      })
    );
  });

  // gets static files such as robot.txt and others that does not
  // need to be optimized by webpack but still needs to be exposed 
  this.addServerMiddleware(
    serveStatic(path.resolve(__dirname, 'static')),
  );

  // gets components exported
  this.nuxt.hook("components:dirs", (dirs) => {
    dirs.unshift({
      path: path.resolve(__dirname, "components"),
      level: 1, // provide a priority
    });
  });
}

export const proxy = {
  "/backend/": {
    // target: "https://api.performance.agentsoncloud.com/api/v1",
    target: "http://localhost:30212/api/v1",
    pathRewrite: { "^/backend/": "" },
  },
}

