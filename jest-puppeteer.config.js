module.exports = {
  launch: {
    args: ['--headless --disable-breakpad', '--window-size=1200,800', '--no-sandbox', '--disable-setuid-sandbox'],
  },
  server: {
    command: `npm start`,
    port: 3000,
    launchTimeout: 20000,
    debug: true,
  },
}
