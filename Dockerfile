
# The tag here should match the Meteor version of your app, per .meteor/release
FROM geoffreybooth/meteor-base:2.0

# Copy app package.json and package-lock.json into container
COPY ./app/package*.json $APP_SOURCE_FOLDER/

RUN bash $SCRIPTS_FOLDER/build-app-npm-dependencies.sh

# Copy app source into container
COPY ./app $APP_SOURCE_FOLDER/

RUN bash $SCRIPTS_FOLDER/build-meteor-bundle.sh

# Use the specific version of Node expected by your Meteor release, per https://docs.meteor.com/changelog.html; this is expected for Meteor 1.10.1
FROM node:12-alpine

ENV APP_BUNDLE_FOLDER /opt/bundle
ENV SCRIPTS_FOLDER /docker

# Install OS build dependencies, which we remove later after we’ve compiled native Node extensions
RUN apk --no-cache --virtual .node-gyp-compilation-dependencies add \
  g++ \
  make \
  python \
# And runtime dependencies, which we keep
&& apk --no-cache add \
  bash \
  ca-certificates

# Copy in entrypoint
COPY --from=0 $SCRIPTS_FOLDER $SCRIPTS_FOLDER/

# Copy in app bundle
COPY --from=0 $APP_BUNDLE_FOLDER/bundle $APP_BUNDLE_FOLDER/bundle/

RUN bash $SCRIPTS_FOLDER/build-meteor-npm-dependencies.sh --build-from-source \
&& apk del .node-gyp-compilation-dependencies

RUN printenv

# Start app
ENTRYPOINT ["/docker/entrypoint.sh"]

CMD ["node", "main.js"]
