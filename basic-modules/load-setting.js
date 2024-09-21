"use strict";

module.exports = function (fileData){
  class Setting {
    constructor(path="", data){
      this.path = Object.freeze(path);
      this.data = data;
    }
    static new(path="", isMustData){
      try {
        const loadedText = readFileSync(path, "utf-8");
        const loadedData = loadedText == "" ? null : JSON.parse(loadedText);
        return Object.freeze(new Setting(path, loadedData));
      } catch (e) {
        console.error(e);
        if(isMustData){
          console.error("stop this process because essential json file does not exist.");
        }
        return null;
      }
    }
  }
  
  const moduleObject = {};
  for(const fileDatum of fileData){
    const setting = Setting.new(fileDatum.path, fileDatum.isMustData || false);
    if(setting){
      moduleObject[fileDatum.key+"Setting"] = setting;
    }
  }
  return moduleObject;
};