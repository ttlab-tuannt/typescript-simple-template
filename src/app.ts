var walk = require("walk");
import _, { forEach, set, toLower } from "lodash";
var files: any = [];
import xlsx from "node-xlsx";
import fs from "fs";
const imageToBase64 = require("image-to-base64");

// const PrefixMap = {
//   "/en/": "en",
//   "/ja/": "ja",
//   "/cn/": "cn",
//   "/kr/": "kr",
// };

// const getPrefix = (fileName: string) => {
//   for (const [key, value] of Object.entries(PrefixMap)) {
//     if (fileName.includes(key)) {
//       return value;
//     }
//   }
//   return "en";
// };

// function createFile() {
//   const convertData = (data: any, reference: any, oldKey: any) => {
//     _.forEach(data, (value: any, key: any) => {
//       const newKey = oldKey + "." + key;
//       if (typeof value === "string") {
//         reference[newKey] = value;
//       } else {
//         convertData(value, reference, newKey);
//       }
//     });
//   };

//   // Walker options
//   var walker = walk.walk(__dirname + "/mobile-backend", { followLinks: false });

//   walker.on("file", function (root: any, stat: any, next: any) {
//     // Add this file to the list of files
//     files.push(root + "/" + stat.name);
//     next();
//   });

//   walker.on("end", async () => {
//     const _files = _.filter(files, (file: any) => !file.endsWith("index.ts"));
//     const fileContents: any = {};
//     for (let index = 0; index < _files.length; index++) {
//       const file = _files[index];
//       const fileName = file.split("/").pop().split(".")[0];
//       const module = await import(file);
//       let prefix = getPrefix(file);
//       if (!fileContents[fileName]) {
//         fileContents[fileName] = {};
//       }
//       if (!fileContents[fileName][prefix]) {
//         fileContents[fileName][prefix] = {};
//       }
//       const data = {};
//       convertData(module.default, data, "");
//       fileContents[fileName][prefix] = data;
//     }
//     // const list: any = [
//     //   ["Screen", "Image", "Key", "English", "Japanese", "Chinese"],
//     // ];
//     // _.forEach(fileContents, (value: any, screen: any) => {
//     //   _.forEach(value.en, (item: any, key: any) => {
//     //     list.push([screen, "", key, value.en[key], value.ja[key], ""]);
//     //   });
//     // });
//     // var buffer = xlsx.build([
//     //   { name: "myFirstSheet", data: list, options: {} },
//     // ]);
//     var buffer2 = xlsx.build(
//       Object.entries(fileContents).map(([fileName, content]: [string, any]) => {
//         const list: any = [
//           [
//             "Code",
//             "Key",
//             "Screen Name",
//             "Screen shot",
//             "Figma link",
//             "Use case",
//             "English",
//             "Japanese",
//             "Korean",
//             "Chinese",
//           ],
//         ];
//         _.forEach(content.en, (item: any, key: any) => {
//           list.push([
//             fileName,
//             key,
//             "",
//             "",
//             "",
//             "",
//             content.en?.[key],
//             content.ja?.[key],
//             content.kr?.[key],
//             content.cn?.[key],
//           ]);
//         });
//         return {
//           name: fileName,
//           data: list,
//           options: {},
//         };
//       })
//     );
//     fs.writeFileSync("./file.xlsx", buffer2);
//   });
// }

// function parseFile() {
//   // Walker options
//   var walker = walk.walk(__dirname + "/app", { followLinks: false });

//   walker.on("file", function (root: any, stat: any, next: any) {
//     // Add this file to the list of files
//     files.push(root + "/" + stat.name);
//     next();
//   });

//   walker.on("end", async () => {
//     const fileContentsEn: any = {};
//     const fileContentsJa: any = {};
//     const _files = _.filter(files, (file: any) => !file.endsWith("index.ts"));
//     for (let index = 0; index < _files.length; index++) {
//       const file = _files[index].replace("src/app", "output");
//       const fileName = file.split("/").pop().split(".")[0];
//       let prefix = file.includes("/en/") ? "en" : "ja";
//       if (prefix === "en") {
//         fileContentsEn[fileName] = file;
//       } else {
//         fileContentsJa[fileName] = file;
//       }
//     }

//     const en = {};
//     const ja = {};
//     const workSheetsFromFile = xlsx.parse(`${__dirname}/../Languages.xlsx`);
//     workSheetsFromFile.forEach(({ data, name }) => {
//       if (!toLower(name).includes("ready for dev")) {
//         return;
//       }
//       forEach(data, (item: any) => {
//         if (item[0] && item[1]) {
//           set(en, `${item[0]}${item[1]}`, item[7] || item[6]);
//           set(ja, `${item[0]}${item[1]}`, item[8] || item[7] || item[6]);
//         }
//       });

//       const makeDir = (path: string) => {
//         const arr = path.split("/");
//         arr.pop();
//         path = arr.join("/");
//         if (!fs.existsSync(path)) {
//           fs.mkdirSync(path, { recursive: true });
//         }
//       };

//       forEach(en, (value: any, key: any) => {
//         if (fileContentsEn[key]) {
//           makeDir(fileContentsEn[key]);
//           fs.writeFileSync(
//             fileContentsEn[key],
//             `export default ${JSON.stringify(value)}`
//           );
//         }
//       });
//       forEach(ja, (value: any, key: any) => {
//         if (fileContentsJa[key]) {
//           makeDir(fileContentsJa[key]);
//           fs.writeFileSync(
//             fileContentsJa[key],
//             `export default ${JSON.stringify(value)}`
//           );
//         }
//       });
//     });
//   });
// }

// function createFileFromJSON() {
//   const convertData = (data: any, reference: any, oldKey: any) => {
//     _.forEach(data, (value: any, key: any) => {
//       const newKey = oldKey + "." + key;
//       if (typeof value === "string") {
//         reference[newKey] = value;
//       } else {
//         convertData(value, reference, newKey);
//       }
//     });
//   };

//   // Walker options
//   var walker = walk.walk(__dirname + "/mobile-backend", { followLinks: false });

//   walker.on("file", function (root: any, stat: any, next: any) {
//     // Add this file to the list of files
//     files.push(root + "/" + stat.name);
//     next();
//   });

//   walker.on("end", async () => {
//     const _files = _.filter(files, (file: any) => !file.endsWith("index.ts"));
//     const fileContents: any = {};
//     for (let index = 0; index < _files.length; index++) {
//       const file = _files[index];
//       const fileName = file.split("/").pop().split(".")[0];
//       const module = await import(file);
//       let prefix = file.includes("/en/") ? "en" : "ja";
//       if (!fileContents[fileName]) {
//         fileContents[fileName] = {};
//       }
//       if (!fileContents[fileName][prefix]) {
//         fileContents[fileName][prefix] = {};
//       }
//       const data = {};
//       convertData(module.default, data, "");
//       fileContents[fileName][prefix] = data;
//     }
//     // const list: any = [
//     //   ["Screen", "Image", "Key", "English", "Japanese", "Chinese"],
//     // ];
//     // _.forEach(fileContents, (value: any, screen: any) => {
//     //   _.forEach(value.en, (item: any, key: any) => {
//     //     list.push([screen, "", key, value.en[key], value.ja[key], ""]);
//     //   });
//     // });
//     // var buffer = xlsx.build([
//     //   { name: "myFirstSheet", data: list, options: {} },
//     // ]);

//     var buffer2 = xlsx.build(
//       Object.entries(fileContents).map(([fileName, content]: [string, any]) => {
//         const list: any = [
//           [
//             "Code",
//             "Key",
//             "Screen Name",
//             "Screen shot",
//             "Figma link",
//             "Use case",
//             "English",
//             "Japanese",
//           ],
//         ];
//         _.forEach(content.en, (item: any, key: any) => {
//           list.push([
//             fileName,
//             key,
//             "",
//             "",
//             "",
//             "",
//             content.en?.[key],
//             "",
//             content.ja?.[key],
//           ]);
//         });
//         return {
//           name: fileName,
//           data: list,
//           options: {},
//         };
//       })
//     );
//     fs.writeFileSync("./file.xlsx", buffer2);
//   });
// }

// function parseJSONFile() {
//   // Walker options
//   var walker = walk.walk(__dirname + "/mobile-backend", { followLinks: false });

//   walker.on("file", function (root: any, stat: any, next: any) {
//     // Add this file to the list of files
//     files.push(root + "/" + stat.name);
//     next();
//   });

//   walker.on("end", async () => {
//     const fileContentsEn: any = {};
//     const fileContentsJa: any = {};
//     const _files = _.filter(files, (file: any) => !file.endsWith("index.ts"));
//     for (let index = 0; index < _files.length; index++) {
//       const file = _files[index].replace("src/mobile-backend", "output");
//       const fileName = file.split("/").pop().split(".")[0];
//       let prefix = file.includes("/en/") ? "en" : "ja";
//       if (prefix === "en") {
//         fileContentsEn[fileName] = file;
//       } else {
//         fileContentsJa[fileName] = file;
//       }
//     }

//     const en = {};
//     const ja = {};
//     const workSheetsFromFile = xlsx.parse(`${__dirname}/../Languages-be.xlsx`);
//     workSheetsFromFile.forEach(({ data, name }) => {
//       if (!toLower(name).includes("ready for dev")) {
//         return;
//       }
//       forEach(data, (item: any) => {
//         if (item[0] && item[1]) {
//           set(en, `${item[0]}${item[1]}`, item[7] || item[6]);
//           set(ja, `${item[0]}${item[1]}`, item[8] || item[7] || item[6]);
//         }
//       });

//       const makeDir = (path: string) => {
//         const arr = path.split("/");
//         arr.pop();
//         path = arr.join("/");
//         if (!fs.existsSync(path)) {
//           fs.mkdirSync(path, { recursive: true });
//         }
//       };

//       forEach(en, (value: any, key: any) => {
//         if (fileContentsEn[key]) {
//           makeDir(fileContentsEn[key]);
//           fs.writeFileSync(fileContentsEn[key], `${JSON.stringify(value)}`);
//         }
//       });
//       forEach(ja, (value: any, key: any) => {
//         if (fileContentsJa[key]) {
//           makeDir(fileContentsJa[key]);
//           fs.writeFileSync(fileContentsJa[key], `${JSON.stringify(value)}`);
//         }
//       });
//     });
//   });
// }

// // parseFile();
// createFile();
// // createFileFromJSON();
// // parseJSONFile();

function createJsonFile() {
  const walker = walk.walk(__dirname + "/app/i18n", { followLinks: false });

    walker.on("file", function (root: any, stat: any, next: any) {
    // Add this file to the list of files
    files.push(root + "/" + stat.name);
    next();
  });

  walker.on("end", async () => {
    const _files = _.filter(files, (file: any) => !file.endsWith("index.ts"));
    for (let index = 0; index < _files.length; index++) {
      const file = _files[index];
      const module = await import(file);
      fs.writeFileSync(file.replace('i18n', 'frontend').replace('.ts', '.json'), JSON.stringify(module.default), {});
    }
    
  });
}

createJsonFile()