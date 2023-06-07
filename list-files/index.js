#!/usr/bin/env node

//npm init -y
//modify the json ("bin")
//nls : index.js (to start the file)
//ran this to work: sudo npm link
//now nls does the trick from everywhere

import fs from "fs";
import util from "util";
import chalk from "chalk";
import path from "path";

const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
  if (err) {
    console.log(err);
  }

  /* for (let filename of filenames) {
    try {
      const stats = await lstat(filename);
      console.log(filename, stats.isFile());
    } catch (err) {
      console.log(err);
    }
  }*/

  const statPromises = filenames.map((filename) => {
    return lstat(path.join(targetDir, filename));
  });

  const allStats = await Promise.all(statPromises);

  for (let stats of allStats) {
    const index = allStats.indexOf(stats);

    if (stats.isFile()) {
      console.log(filenames[index]);
    } else {
      console.log(chalk.bold(filenames[index]));
    }
  }
});
