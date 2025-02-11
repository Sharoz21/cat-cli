const { stdin, stdout, argv, env } = require("node:process");
const path = require("path");
const fs = require("node:fs/promises");
const { Transform } = require("stream");

let count = 0;

const createLineNumberTransform = (excludeBlanks) =>
  new Transform({
    transform: (chunk, _, cb) => {
      let lines = chunk.toString().split("\n").slice(0, -1);
      lines = lines.map((line) => {
        if (excludeBlanks && line === "") return "";

        return `${++count} ${line}`;
      });

      return cb(null, Buffer.from(lines.join("\n")));
    },
  });

const bootstrap = async () => {
  const args = argv.slice(2);
  const options = {
    numberLines: args.includes("-n"),
    numberNonBlankLines: args.includes("-b"),
  };

  const files = args.filter((arg) => arg !== "-n" && arg !== "-b");

  const transforms = [];
  if (options.numberLines || options.numberNonBlankLines) {
    transforms.push(createLineNumberTransform(options.numberNonBlankLines));
  }

  if (files.length === 0 || files[0] === "-") {
    let currentStream = stdin;
    transforms.forEach((transform) => {
      currentStream = currentStream.pipe(transform);
    });
    currentStream.pipe(stdout);
  } else {
    for (const file of files) {
      const fileHandler = await fs.open(path.resolve(env.PWD, file), "r");
      const readStream = fileHandler.createReadStream();

      await new Promise((resolve) => {
        let currentStream = readStream;
        if (options.numberLines || options.numberNonBlankLines) {
          currentStream = currentStream.pipe(
            createLineNumberTransform(options.numberNonBlankLines)
          );
        }
        currentStream.pipe(stdout);
        currentStream.on("end", resolve);
      });

      transforms.forEach((transform) => transform.end());
      await fileHandler.close();
    }
  }
};

bootstrap();
