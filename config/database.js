
module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {
        client: 'mongo',
        uri: `mongodb+srv://${env('USERNAME', '')}:${env('PASSWORD', '')}@clustermega.3byam.gcp.mongodb.net/${env('DATABASENAME', '')}?retryWrites=true&w=majority`,
      },
      options: {
        ssl: true,
      },
    },
  },
});