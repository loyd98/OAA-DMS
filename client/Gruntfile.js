module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    concat: {
      js: {
        src: [
          "src/js/components.js",
          "src/js/requests.js",
          "src/js/index.js",
          "src/js/navbar.js",
          "src/js/searchbar.js",
          "src/js/pagebtn.js",
          "src/js/popup.js",
          "src/js/sortmodal.js",
          "src/js/document.js",
          "src/js/sortrequests.js",
        ],
        dest: "build/js/scripts.js",
      },
      css: {
        src: [
          "src/css/base.css",
          "src/css/navbar.css",
          "src/css/bar1.css",
          "src/css/bar2.css",
          "src/css/bar3.css",
          "src/css/dashboard.css",
          "src/css/searchbar.css",
          "src/css/pagebtn.css",
          "src/css/popup.css",
          "src/css/table.css",
          "src/css/importexportbtn.css",
          "src/css/sortbtn.css",
          "src/css/selectviewmenu.css",
        ],
        dest: "build/css/styles.css",
      },
    },
    watch: {
      js: {
        files: ["src/**/*.js"],
        tasks: ["concat:js"],
      },
      css: {
        files: ["src/**/*.css"],
        tasks: ["concat:css"],
      },
    },
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.registerTask("default", ["concat", "watch"]);
};
