import time
import os

from zipfile import ZipFile


with ZipFile(f"plugin_{int(time.time())}.zip", "w") as zip_folder:
    for folderName, subfolders, filenames in os.walk("assets"):
        for filename in filenames:
            filePath = os.path.join(folderName, filename)
            zip_folder.write(filePath)

    include_files = ["indexPlugin.html", "manifest.json"]
    for g in include_files:
        zip_folder.write(g)
