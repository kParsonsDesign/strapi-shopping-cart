module.exports = [
  'strapi::errors',
  // 'strapi::security',
  {
    name: 'strapi::security',
    config: {
      // contentSecurityPolicy: {
      //   directives: {
      //     'script-src': ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net', 'unpkg.com'],
      //     'img-src': ["'self'", 'data:', 'cdn.jsdelivr.net', 'strapi.io', `${env('AWS_BUCKET')}.s3.${env('AWS_REGION')}.amazonaws.com`],
      //   },
      // }
      contentSecurityPolicy: false,
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
