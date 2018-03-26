const config = () => ({
  'process.env.CONFIG_SERVICE_USER': JSON.stringify(process.env.CONFIG_SERVICE_USER)
})

module.exports = config()
