module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('NEXT_PUBLIC_BACKEND_API_URL', 'http://localhost:1337'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '9f533b84d710a0e0aea0933fa5895a5a'),
    },
  },
});
