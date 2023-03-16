import { globSync } from "glob";
import pAll from "p-all";
import { promisify } from "util";
import dayjs from "dayjs";
import childProcess from "child_process";
const exec = promisify(childProcess.exec);

const BUCKET_NAME = "sydneybikemap-tiles";
const CONCURRENT_UPLOADS = 50;
const EXPIRY_DAYS = 0; // 0 for now as we're in development mode, once released and more stable, change to 7

const now = dayjs();
const expiryHeader =
  now.add(EXPIRY_DAYS, "days").format("ddd, DD MMM YYYY HH:mm:ss") + " GMT";
console.log("Expires:", expiryHeader);

const files = globSync("output/**/*", { nodir: true });
// console.log(files);
const totalCount = files.length;
let finishedCount = 0;
const promises = files.map((f) => () => uploadFile(f));
pAll(promises, { concurrency: CONCURRENT_UPLOADS });

const uploadFile = async (sourceFilePath) => {
  const targetFilePath = sourceFilePath.substr(7); // Remove "output/" from start
  const result = await exec(
    `npx wrangler r2 object put ${BUCKET_NAME}/${targetFilePath} --file ${sourceFilePath} --content-encoding gzip --expires "${expiryHeader}"`
  );
  finishedCount++;
  console.log(
    `Uploaded ${finishedCount}/${totalCount} (${(
      100 *
      (finishedCount / totalCount)
    ).toFixed(2)}%)`
  );
};
