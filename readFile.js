import path from "node:path";
import { promises as fsPromises } from "node:fs";
import parseJson from "parse-json";
import normalizePackageData from "normalize-package-data";

const readPackage = async ({ cwd, normalize = true } = {}) => {
  cwd = process.cwd();
  const filePath = path.resolve(cwd, "package.json");
  const json = parseJson(await fsPromises.readFile(filePath, "utf8"));
  if (normalize) {
    normalizePackageData(json);
  }
  return json;
};

const readConfig = async () => {
  const filePath = path.resolve(".cli-script", "cli-script.json");
  const file = await fsPromises.readFile(filePath, "utf8");
  return file;
};

const createConfigFile = async () => {
  const filePath = path.resolve(".cli-script");
  const validFolder = await fsPromises.stat(filePath);
  !validFolder && (await fsPromises.mkdir(".cli-script"));
  const file = await fsPromises.writeFile(filePath + "/cli-script.json", "{}");
  return file;
};

export { readPackage, readConfig, createConfigFile };
