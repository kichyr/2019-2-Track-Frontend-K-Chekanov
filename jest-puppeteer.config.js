module.exports = {
  launch: {
    headless: true,
    args: ['--disable-breakpad', '--window-size=1200,800', '--no-sandbox', '--disable-setuid-sandbox'],
  },
  server: {
    command: `npm start`,
    port: 3000,
    launchTimeout: 5000,
    debug: true,
  },
}
