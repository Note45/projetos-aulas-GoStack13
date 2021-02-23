import { container } from "tsyringe";

import IStorageProvide from "./StorageProvider/models/IStorageProvide";
import DiskStorageProvider from "./StorageProvider/implementations/DiskStorageProvider";

container.registerSingleton<IStorageProvide>(
  "StorageProvider",
  DiskStorageProvider
);
