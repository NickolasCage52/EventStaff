module.exports = {
  apps: [
    {
      name: 'unity-api',
      cwd: '/opt/unity/packages/api',
      script: 'dist/server.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'unity-web',
      cwd: '/opt/unity/packages/web',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
      },
    },
  ],
};
