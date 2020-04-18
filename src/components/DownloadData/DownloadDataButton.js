import React from "react";

const DownloadDataButton = (props) => {
  const downloadAsCsv = () => {
    let headers = [["Type", "Latitude", "Longitude", "DateTime", "SessionID"]];
    let data = JSON.parse(sessionStorage.items).list;
    let arr = headers.concat(data);
    let csvContent = arr.map((e) => e.join(",")).join("\n");
    let defaultName = sessionStorage.sessionName;
    defaultName = defaultName
      ? defaultName.split(" ").join("_")
      : "GeoTrasher_" + new Date().toISOString().slice(0, 10);
    let setName = window.prompt("Download data", defaultName);
    if (setName) {
      let fileName = setName + ".csv";
      download(fileName, csvContent);
    }
  };

  const download = (filename, text) => {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  return <button onClick={downloadAsCsv}>Download Session Data</button>;
};

export default DownloadDataButton;
