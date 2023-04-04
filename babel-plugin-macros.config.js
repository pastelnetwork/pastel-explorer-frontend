module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "10"
        }
      }
    ]
  ],
  plugins: ["macros"],
  styledComponents: {
    pure: true,
  },
}
