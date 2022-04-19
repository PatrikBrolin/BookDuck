module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '39310f7cb7aeaa10a94efd92c22c4474'),
  },
});
