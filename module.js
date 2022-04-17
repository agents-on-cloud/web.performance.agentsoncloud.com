// Nuxt exposes its default route builder logic here
import { createRoutes, relativeTo } from "@nuxt/utils";
import path from "path";
import serveStatic from "serve-static";

// with a lot of pages it might be worth considering a folder pass
// to dynamically create this list
const pages = [
  "pages/performance.vue",
];

// TODO: ask:
// when exporting microfrontend page, could we export different routes to different module files, 
// allowing for more flexible microfrontend per layoutContainer per domain, or is it limited to 
// per module file that we will be importing into the container.

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

  // gets layout exported 
  //TODO: check if its possible to switch or override layouts
  // const layoutPath = (file) =>
  //     relativeTo(
  //         this.options.buildDir,
  //         path.resolve(__dirname, 'layouts', file),
  //     )
  // this.nuxt.hook('build:templates', ({ templateVars }) => {
  //     templateVars.layouts.default = layoutPath('default.vue')
  // })

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
    target: "https://api.performance.agentsoncloud.com/api/v1",
    pathRewrite: { "^/backend/": "" },
  },
}

