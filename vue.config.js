// module.exports = {
//     publicPath: process.env.NODE_ENV === 'production'
//       ? '/xtan-library/'
//       : '/'
//   }



  export default defineConfig({
    base: process.env.CF_PAGES
      ? '/'              
      : process.env.GITHUB_ACTIONS
        ? '/xtan-library/'             
        : '/',                   
    build: {
      outDir: 'dist'
    },
  });