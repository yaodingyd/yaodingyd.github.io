---
layout: "../../layouts/BlogPost.astro"
title:  "My Experience with Migrating Create-React-App to Vite/Rsbuild"
pubDate: "February 20 2025"
---

Recently, the React team has [officially deprecated Create React App (CRA)](https://react.dev/blog/2025/02/14/sunsetting-create-react-app) and recommends moving to either a framework or a build tool. This created [some discourse](https://x.com/youyuxi/status/1891721924197351497) online about whether the React team had been hesitant to recommend a build tool, and I feel like this is the right time to actually test the migration from Create React App. I’m choosing [one open-source project](https://github.com/aqualinkorg/aqualink-app) I contribute to, which is a rather simple Single Page Application (SPA) and a perfect candidate. In this case, I’m testing Vite and Rsbuild since I’m not really a Parcel user. It’s my grease pass. I'll check all possible angles, including documentation, community support, and overall developer experience.

## Vite

To be honest, I’m kind of surprised that the Vite documentation does not have an official guide for CRA migration. That's not really an issue, though, since there are so many good guides from the community. I used the [migration guide recommended by the React team](https://www.robinwieruch.de/vite-create-react-app/), and it roughly follows these steps:

1. Update dependencies (add Vite, remove react-scripts)
2. Create `vite.config.js` with basic settings
3. Update import path resolution to keep using `src` as `basePath`
4. Move `index.html` out of the `public` folder
5. Install the `svgr` plugin and update import names
6. Update environment variable names to follow the Vite pattern
7. Replace `process.env` usage with `import.meta`

The complete details are in this [PR](https://github.com/aqualinkorg/aqualink-app/pull/1101). With the above guide and the magic of ChatGPT, I was able to finish the migration in under an hour. The app works fine locally, and I can definitely feel the app startup time being shortened. There are some minor issues, like some asset import paths still not resolving correctly, but I feel pretty good about it in general.

## Rsbuild

To be fair, I should say that migrating to Vite already made me familiar with the general process, so I sort of got a head start with Rsbuild. I do want to give the Rsbuild team credit for putting up an official and thorough [migration guide](https://rsbuild.dev/guide/migration/cra), and I didn't really need to look anywhere else. The changes are rather simple:

1. Update dependencies (add Rsbuild, remove react-scripts)
2. Create `rsbuild.config.ts` and add all necessary settings, including SVG, ESLint, environment variables, and build output
3. Update `index.html` for import paths

And that's it! I didn't need to make changes in the source code or really any other places besides the config file, so the change set in this [PR](https://github.com/aqualinkorg/aqualink-app/pull/1102) is ridiculously small. I finished the migration in probably under 10 minutes, and the app runs smoothly locally with no issues at all.

## Conclusion

Technically speaking, I didn't finish the migration completely since I have not verified the build version and didn't really touch on tests. Still, this was a good experience and definitely shows the power of modern tooling. I think both Vite and Rsbuild offer an excellent experience, and honestly, Rsbuild wins here for me with thorough official documentation and fewer invasive changes in the code.