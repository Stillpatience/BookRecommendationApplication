docker run -d -t -p 3456:3000 --env-file tunify.env \
--restart unless-stopped  --memory=”2g” --name=visualization visualization:latest