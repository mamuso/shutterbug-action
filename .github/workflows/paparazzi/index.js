"use strict";
/**
 * Paparazzi
 * A GitHub action to capture, compare, minify and store screenshots
 */

const config = require("../../../timesled-config");
const dotenv = require("dotenv");
dotenv.config();

const fs = require("fs");
const capture = require("./lib/capture");
const compare = require("./lib/compare");
const minify = require("./lib/minify");
const store = require("./lib/store");
const utils = require("./lib/utils");

const date = new Date().toISOString().split("T")[0];
const tmpPath = "tmp";
const destinationPath = `${tmpPath}/${date}`;
const currentPath = `${tmpPath}/current`;

(async () => {
  utils.logHeader(`✨ Paparazzi - ${date}`);

  /**
   * Create tmp infrastructure
   */
  if (!fs.existsSync(tmpPath)) {
    await fs.promises.mkdir(tmpPath);
  }
  if (!fs.existsSync(destinationPath)) {
    await fs.promises.mkdir(destinationPath);
  }
  if (!fs.existsSync(currentPath)) {
    await fs.promises.mkdir(currentPath);
  }

  /**
   * Capture
   */
  await capture({
    devices: config.devices,
    urls: config.urls,
    format: config.format,
    path: destinationPath
  });

  /**
   * TODO: Check current
   */

  /**
   * Minify
   */
  if (config.minify) {
    await minify({
      path: destinationPath
    });
  }

  /**
   * Compare
   */
  if (config.compare) {
    await compare({
      devices: config.devices,
      urls: config.urls,
      format: config.format,
      path: destinationPath,
      current: currentPath
    });
    if (config.minify) {
      await minify({
        path: destinationPath,
        pattern: "*-diff"
      });
    }
  }

  /**
   * Clean tmp infrastructure
   */
  await fs.promises.rmdir(tmpPath, { recursive: true });
})();