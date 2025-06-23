import 'dotenv/config';

export default {
  expo: {
    name: 'Smart BloodLink',
    slug: 'smart-blood-link',
    version: '1.0.0',
    extra: {
      apiUrl: process.env.API_URL, // ✅ only this will work
    },
  },
};
